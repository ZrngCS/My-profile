const CACHE_NAME = "zrng-portfolio-v5";
const STATIC_FILES = ["./", "./index.html", "./style.css?v=5", "./script.js?v=5", "./manifest.json", "./offline.html"];
self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then(async(cache) => {
        for (const file of STATIC_FILES) {
            try { await cache.add(file); console.log("Cached:", file); } catch (err) { console.warn("Could not cache:", file, err); }
        }
    }));
});
self.addEventListener("activate", (event) => {
    event.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((key) => { if (key !== CACHE_NAME) return caches.delete(key); }))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;
    const requestUrl = new URL(event.request.url);
    const isAppShellRequest = requestUrl.origin === self.location.origin && (event.request.mode === "navigate" || requestUrl.pathname.endsWith("/index.html") || requestUrl.pathname.endsWith("/style.css") || requestUrl.pathname.endsWith("/script.js"));
    if (isAppShellRequest) {
        event.respondWith(fetch(event.request).then((response) => {
            if (response && response.status === 200) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => { cache.put(event.request, clone); });
            }
            return response;
        }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("./offline.html"))));
        return;
    }
    event.respondWith(caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
            if (!response || response.status !== 200) return response;
            if (event.request.url.startsWith("http")) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => { cache.put(event.request, clone); });
            }
            return response;
        }).catch(() => {
            if (event.request.mode === "navigate") return caches.match("./offline.html");
        });
    }));
});