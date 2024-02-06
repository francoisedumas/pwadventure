import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="companion"
export default class extends Controller {
  static values = { vapidPublicKey: String };

  connect() {
    window.addEventListener("load", () => {
      // Is service worker available?
      if (navigator.serviceWorker) {
        navigator.serviceWorker
          .register("/service_worker.js", { scope: "/" })
          .then(() => navigator.serviceWorker.ready)
          .then((registration) => {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.vapidPublicKeyValue,
              })
              .then(async function (subscription) {
                console.log("going to post the subscription");
                console.log("going to post the subscription");
                console.log("going to post the subscription");
                console.log("going to post the subscription");
                const data = await fetch("/webpush_subscriptions", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(subscription),
                });
                console.log(data);
              });
          })
          .then(() => console.log("[Companion]", "Service worker registered!"));
      }
    });
  }
}
