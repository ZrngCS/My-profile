const CACHE_NAME = "zrng-portfolio-v2";

// فایلە سەرەکییەکان
const STATIC_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
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