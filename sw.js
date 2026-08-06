const CACHE_NAME = "zrng-portfolio-v5";

// فایلە سەرەکییەکان
const STATIC_FILES = [
    "./",
    "./index.html",
    "./style.css?v=5",
    "./script.js?v=5",
    "./manifest.json",
    "./offline.html"
];

// دامەزراندن
self.addEventListener("install", (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then(async(cache) => {
            for (const file of STATIC_FILES) {
                try {
                    await cache.add(file);
                    console.log("Cached:", file);
                } catch (err) {
                    console.warn("Could not cache:", file, err);
                }
            }
        })
    );
});

// چالاککردن
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        ).then(() => self.clients.claim())
    );
});

// داواکارییەکان
self.addEventListener("fetch", (event) => {

    // تەنها GET Cache بکە
    if (event.request.method !== "GET") return;

    const requestUrl = new URL(event.request.url);

    const isAppShellRequest =
        requestUrl.origin === self.location.origin &&
        (
            event.request.mode === "navigate" ||
            requestUrl.pathname.endsWith("/index.html") ||
            requestUrl.pathname.endsWith("/style.css") ||
            requestUrl.pathname.endsWith("/script.js")
        );

    // Fetch the app shell from the network first so updates are not held back by a stale cache.
    if (isAppShellRequest) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response && response.status === 200) {
                        const clone = response.clone();

                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, clone);
                        });
                    }

                    return response;
                })
                .catch(() =>
                    caches.match(event.request).then((cached) =>
                        cached || caches.match("./offline.html")
                    )
                )
        );

        return;
    }

    event.respondWith(

        caches.match(event.request).then((cached) => {

            // ئەگەر لە Cache هەبوو
            if (cached) {
                return cached;
            }

            // ئەگەر نەبوو لە Network بیهێنە
            return fetch(event.request)
                .then((response) => {

                    // ئەگەر وەڵامەکە دروست نەبوو Cache مەکە
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    // تەنها http/https Cache بکە
                    if (event.request.url.startsWith("http")) {
                        const clone = response.clone();

                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, clone);
                        });
                    }

                    return response;

                })
                .catch(() => {

                    // ئەگەر پەڕەیەک بوو و ئینتەرنێت نەبوو
                    if (event.request.mode === "navigate") {
                        return caches.match("./offline.html");
                    }

                });

        })

    );

});
