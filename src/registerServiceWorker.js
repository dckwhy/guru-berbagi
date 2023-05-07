/* eslint-disable no-console */
import { register } from "register-service-worker";
import Vue from "vue";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered(worker) {
      console.log("Service worker has been registered.");
      const delay = 1000 * 60 * 5;

      setTimeout(function update() {
        worker.update();
        setTimeout(update, delay);
      }, delay);
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated(registration) {
      console.log("New content is available; please refresh.");
      Vue.prototype.$reload(
        "Pembaruan aplikasi tersedia. Silakan muat ulang peramban Anda",
        {
          event: () => {
            registration.waiting.postMessage({ action: "skipWaiting" });
          }
        }
      );
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });

  if ("serviceWorker" in navigator) {
    // Ensure refresh is only called once.
    // This works around a bug in "force update on reload".
    let refreshing;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
  }
}
