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
          .then(() => {
            // Request permission for notifications
            Notification.requestPermission();
          })
          .then((registration) => {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.vapidPublicKeyValue,
              })
              .then(async function (subscription) {
                await fetch("/webpush_subscriptions", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(subscription),
                });
              });
          })
          .then(() => console.log("[Companion]", "Service worker registered!"));
      }
    });
  }
}
