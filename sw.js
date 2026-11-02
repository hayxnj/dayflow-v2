/* Dayflow service worker: receives server-sent Web Push messages.
   Push delivery is not active until a VAPID-backed subscription and sender are configured. */
self.addEventListener('push', event => {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; }
  catch (_) { payload = { body: event.data ? event.data.text() : '' }; }
  const title = payload.title || 'Dayflow 마감 알림';
  const options = {
    body: payload.body || '확인할 할 일이 있어요.',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: payload.tag || 'dayflow-task-reminder',
    data: { url: payload.url || './' },
    renotify: false
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || './', self.location.origin).href;
  event.waitUntil((async () => {
    const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clientsList) {
      if (new URL(client.url).origin === self.location.origin) {
        await client.focus();
        if ('navigate' in client) await client.navigate(target);
        return;
      }
    }
    await self.clients.openWindow(target);
  })());
});
