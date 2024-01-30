import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["installPrompt", "manualPrompt"];

  // set keys for local storage hash
  INSTALLATION_STATUS = "my_books_app_status";
  INSTALLATION_MESSAGE = "my_books_app_installed";
  DONT_SHOW_PROMPT_AGAIN = "dont_show_prompt_again";

  connect() {
    this.deferredPrompt = null;
    // comment iOS devices potentially do not support the beforeinstallprompt event
    // we handle this with checkPwaInstallation
    window.addEventListener("beforeinstallprompt", this.handleBeforeInstallPrompt.bind(this));
    window.addEventListener("appinstalled", this.handleAppInstalled.bind(this));
    this.checkPwaInstallation();
  }

  getDeviceInfo() {
    const ua = navigator.userAgent;
    return {
      device: {
        isMobile: /Mobi|Android/i.test(ua),
        isIOS: /iPhone|iPad|iPod/i.test(ua),
      },
      pwa: {
        isStandalone: window.matchMedia('(display-mode: standalone)').matches,
      }
    };
  }

  // beforeinstallprompt detected that PWA can be installed
  // show to the user an install prompt
  handleBeforeInstallPrompt(e) {
    e.preventDefault();
    // store the event object from the beforeinstallprompt event
    this.deferredPrompt = e;
    this.installPromptTarget.classList.remove("hidden");
  }

  // appinstalled detected that PWA already installed
  // hide the install button from user
  handleAppInstalled(e) {
    localStorage.setItem(this.INSTALLATION_STATUS, this.INSTALLATION_MESSAGE);
    this.deferredPrompt = null;
    this.installPromptTarget.classList.add("hidden");
  }

  checkPwaInstallation() {
    const { device, pwa } = this.getDeviceInfo();
    // Comment: if app is running in the brower pwa.isStandalone is false
    const isInstallable = device.isMobile && !pwa.isStandalone;
    const isInstalled = localStorage.getItem(this.INSTALLATION_STATUS);

    // if user say don't show again just make sure it's hidden and return
    const dontShowAgain = localStorage.getItem(this.DONT_SHOW_PROMPT_AGAIN) === 'true';
    if (dontShowAgain) {
      this.installPromptTarget.classList.add("hidden");
      this.manualPromptTarget.classList.add("hidden");
      return;
    }

    if (isInstallable && !isInstalled) {
      if (this.deferredPrompt) {
        this.installPromptTarget.classList.remove("hidden");
      } else {
        this.manualPromptTarget.classList.remove("hidden");
      }
    }
  }

  hidePrompt() {
    localStorage.setItem(this.DONT_SHOW_PROMPT_AGAIN, 'true');
    this.installPromptTarget.classList.add("hidden");
    this.manualPromptTarget.classList.add("hidden");
  }

  async onInstall() {
    if (this.deferredPrompt) {
      // show install prompt
      // The browser uses the name and icons properties from the Manifest to build the prompt.
      // https://web.dev/learn/pwa/installation-prompt
      this.deferredPrompt.prompt();
      try {
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            localStorage.setItem(this.INSTALLATION_STATUS, this.INSTALLATION_MESSAGE);
        }
      } catch (error) {
          console.error('Installation prompt error:', error);
      }
      this.deferredPrompt = null;
      this.installPromptTarget.classList.add("hidden");
    }
  }

  disconnect() {
    window.removeEventListener("beforeinstallprompt", this.handleBeforeInstallPrompt);
    window.removeEventListener("appinstalled", this.handleAppInstalled);
  }
}
