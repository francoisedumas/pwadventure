function onInstall(event) {
  console.log("[Serviceworker]", "Installing!", event);
}

function onActivate(event) {
  console.log("[Serviceworker]", "Activating!", event);
}

function onFetch(event) {
  console.log("[Serviceworker]", "Fetching!", event);
}
self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("fetch", onFetch);

// https://developer.chrome.com/docs/workbox/managing-fallback-responses/

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

// We first define the strategies we will use and the registerRoute function

const { CacheFirst, NetworkFirst } = workbox.strategies;
const { registerRoute } = workbox.routing;

// For every other page we use network first to ensure the most up-to-date resources
registerRoute(
  ({ request, url }) =>
    request.destination === "document" || request.destination === "",
  new NetworkFirst({
    cacheName: "documents",
  })
);

// For assets (scripts and images), we use cache first
registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new CacheFirst({ cacheName: "assets-styles-and-scripts" })
);
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({ cacheName: "assets-images" })
);


const { warmStrategyCache } = workbox.recipes;
const { setCatchHandler } = workbox.routing;

// Define which page should be cached
const strategy = new CacheFirst();
const urls = [
  '/offline.html',
];

// prepare the cache -> they call it warm the cache
warmStrategyCache({urls, strategy});

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(async ({event}) => {
  switch (event.request.destination) {
    case 'document':
      return strategy.handle({event, request: urls[0]});
    // If we don't have a fallback, return an error response.
    default:
      return Response.error();
  }
});

// NOTIFICATION

self.addEventListener('push', (event) => {
  const title = event.data.text() || "Yay a message";
  const body = "We have received a push notification "

  self.registration.showNotification(title, { body });
});

self.addEventListener("pushsubscriptionchange", event => {
  const newSubscription = event.newSubscription?.toJSON()

  event.waitUntil(
    fetch("/webpush_subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        endpoint: event.newSubscription?.endpoint,
        p256dh: newSubscription?.keys?.p256dh,
        auth: newSubscription?.keys?.auth
      })
    })
  )
})
