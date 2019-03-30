self.skipWaiting();
self.addEventListener("push", function(event) {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "Wonder Now";
  const options = {
    body: event.data.text(),
    icon: "images/icon.png",
    badge: "images/badge.jpg"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
