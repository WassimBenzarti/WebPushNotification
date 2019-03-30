import { useState, useEffect } from "react";

export default function useServiceWorker(serviceWorkerPath) {
  const [registration, setRegistration] = useState(null);

  useEffect(
    () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker
          .register(`serviceWorker.js`)
          .then(function(swReg) {
            console.log("Service Worker is registered", swReg);

            setRegistration(swReg);
          });
      }
    },
    [serviceWorkerPath]
  );

  return [registration];
}
