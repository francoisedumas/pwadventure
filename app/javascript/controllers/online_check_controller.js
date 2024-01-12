import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="online-check"
export default class extends Controller {
  connect() {
    window.addEventListener("load", () => {
      this.hasNetwork(navigator.onLine);
    });

    window.addEventListener("online", () => {
      this.hasNetwork(true)
    });
    
    window.addEventListener("offline", () => {
      this.hasNetwork(false)
    });
  }

  hasNetwork(online) {
    const element = this.element;
    // Update the DOM to reflect the current status
    if (online) {
      element.classList.remove("bg-blue-600");
      element.classList.add("bg-green-50");
      element.innerText = "Online";
    } else {
      element.classList.remove("bg-green-50");
      element.classList.add("bg-blue-600");
      element.innerText = "Offline";
    }
  }
}
