/**
 * Gigi's Playhouse Service Worker
 * 
 * Caching strategy:
 * - App shell (HTML, CSS, JS): Cache-first with network fallback
 * - API calls: Network-first with cache fallback (stale-while-revalidate)
 * - Images/assets: Cache-first
 * - YouTube thumbnails: Cache with expiration
 * 
 * Offline support:
 * - Daily plan data cached for offline access
 * - Flashcard decks cached for offline practice
 * - Video metadata cached (videos themselves require network)
 */

const CACHE_NAME = 'gigis-playhouse-v1';
const STATIC_CACHE = 'gigis-static-v1';
const DATA_CACHE = 'gigis-data-v1';
const IMAGE_CACHE = 'gigis-images-v1';

// App shell files to pre-cache
const APP_SHELL = [
  '/',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Install: Pre-cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Pre-caching app shell');
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DATA_CACHE && name !== IMAGE_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: Apply caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip OAuth and auth-related requests
  if (url.pathname.startsWith('/api/oauth')) return;

  // API requests: Network-first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstWithCache(request, DATA_CACHE));
    return;
  }

  // Image requests: Cache-first
  if (request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/)) {
    event.respondWith(cacheFirstWithNetwork(request, IMAGE_CACHE));
    return;
  }

  // YouTube thumbnail images: Cache with expiration
  if (url.hostname.includes('ytimg.com') || url.hostname.includes('googleusercontent.com')) {
    event.respondWith(cacheFirstWithNetwork(request, IMAGE_CACHE));
    return;
  }

  // Static assets (JS, CSS): Cache-first
  if (url.pathname.match(/\.(js|css|woff2?|ttf|eot)$/) || url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirstWithNetwork(request, STATIC_CACHE));
    return;
  }

  // HTML navigation: Network-first (SPA routing)
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithCache(request, STATIC_CACHE));
    return;
  }

  // Default: Network-first
  event.respondWith(networkFirstWithCache(request, STATIC_CACHE));
});

// ─── Caching Strategies ──────────────────────────────────────────────────────

async function cacheFirstWithNetwork(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline fallback for navigation requests
    if (request.mode === 'navigate') {
      return cache.match('/') || new Response('Offline', { status: 503 });
    }
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirstWithCache(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;

    // For navigation, return cached index.html
    if (request.mode === 'navigate') {
      return cache.match('/') || new Response('Offline', { status: 503 });
    }
    return new Response(JSON.stringify({ error: 'offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// ─── Background Sync (for offline quiz/progress submissions) ─────────────────

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  // Retrieve pending progress updates from IndexedDB and send to server
  // This is a placeholder — actual implementation would use IndexedDB
  console.log('[SW] Syncing progress data...');
}

// ─── Push Notifications (for daily reminders) ────────────────────────────────

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Gigi's Playhouse";
  const options = {
    body: data.body || "Time for today's learning adventure!",
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: data.tag || 'daily-reminder',
    data: { url: data.url || '/dashboard' },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/dashboard';
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
