import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="companion"
export default class extends Controller {
  static values = { vapidPublicKey: String };

  connect() {
    window.addEventListener('load', () => {
      // Is service worker available?
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register("/service_worker.js", { scope: "/" })
          .then(() => navigator.serviceWorker.ready)
          .then((registration) => {
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: this.vapidPublicKeyValue,
            }).then(function(sub) { console.log(sub) });
          }).then(() => console.log("[Companion]", "Service worker registered!"));
      }
    });
  }
}
