import { useState, useEffect } from "react";
import urlBase64ToUint8Array from "../urlBase64ToUint8Array";
import useServiceWorker from "../useServiceWorker/useServiceWorker";

export default function usePushNotification(serviceWorkerPath) {
  const [registration] = useServiceWorker(serviceWorkerPath);
  const [subscription, setSubscription] = useState(null);

  useEffect(
    () => {
      registration &&
        registration.pushManager.getSubscription().then(function(subscription) {
          setSubscription(subscription);
        });
    },
    [registration]
  );

  return {
    isSubscribed: !(subscription === null),
    subscribeToPush: publicKey => {
      registration &&
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BDHN8DmrU50geNd3NQnSjVu5Tk7cOYxnMzfXuHvBKXjUrp0Av9-ByjF_Ey3zSjPVQ_WMgbnc1dsod_lrojjKPwE"
          )
        });
    },
    subscription,
    registration
  };
}
