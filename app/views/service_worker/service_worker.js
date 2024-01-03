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

const { CacheFirst } = workbox.strategies;
const { warmStrategyCache } = workbox.recipes;
const { setCatchHandler } = workbox.routing;

// Define what should be cached
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
