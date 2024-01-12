import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="offline-to-online-reload"
export default class extends Controller {
  connect() {
    window.addEventListener("online", () => {
      window.location.reload(true);
    });
  }
}
