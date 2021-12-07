const cacheName = 's-v1';
const networkFirstPaths = [
  /^(\/english)?\/$/,
  /^(\/english)?\/index.html/,
  /^(\/english)?\/js\/.*\.js$/,
  /^(\/english)?\/css\/.*\.css$/,
];

const cacheFirstPaths = [
  /^\/assets\//,
];

self.addEventListener('fetch', (event) => event.respondWith(resolveResponse(event)));

const resolveResponse = (event) => {
  const { pathname } = new URL(event.request.url);
  if (networkFirstPaths.some((rx) => rx.test(pathname))) {
    return networkFirst(event);
  } else if (cacheFirstPaths.some((rx) => rx.test(pathname))) {
    return cacheFirst(event);
  } else {
    return fetch(event.request).catch(() => '');
  }
};

const putToCache = (event) => (response) =>
  caches
    .open(cacheName)
    .then((cache) => cache
      .put(event.request, response.clone())
      .then(() => response));

const cacheFirst = (event) =>
  caches
    .open(cacheName)
    .then((cache) => cache.match(event.request))
    .then((cached) => cached || fetch(event.request).then(putToCache(event)));


const networkFirst = (event) =>
  fetch(event.request)
    .then(putToCache(event))
    .catch(() => caches
      .open(cacheName)
      .then((cache) => cache.match(event.request)));
