import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="companion"
export default class extends Controller {
  connect() {
    window.addEventListener('load', () => {
      // Is service worker available?
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register("/service_worker.js", { scope: "/" })
          .then(() => navigator.serviceWorker.ready)
          .then((registration) => {
            if ("SyncManager" in window) {
              registration.sync.register("sync-forms");
            } else {
              window.alert("This browser does not support background sync.")
            }
          }).then(() => console.log("[Companion]", "Service worker registered!"));
      }
    });
  }
}
