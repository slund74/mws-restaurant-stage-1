var staticCacheName = "restaurant-review-v1";

self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				"/",
				"/js/main.js",
				"/js/dbhelper.js",
				"/js/restaurant_info.js",
				"/css/styles.css",
				"/img/",
				"/data/restaurants.json",
				"/index.html",
				"/restaurant.html"
			]);
		})
	);
});

// Modeled after code from https://developers.google.com/web/fundamentals/primers/service-workers/

self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
					return response;
				}

				// IMPORTANT: Clone the request. A request is a stream and
				// can only be consumed once. Since we are consuming this
				// once by cache and once by the browser for fetch, we need
				// to clone the response.
				var fetchRequest = event.request.clone();

				return fetch(fetchRequest).then(
					function(response) {
						// Check if we received a valid response
						if(!response || response.status !== 200 || response.type !== "basic") {
							return response;
						}

						// IMPORTANT: Clone the response. A response is a stream
						// and because we want the browser to consume the response
						// as well as the cache consuming the response, we need
						// to clone it so we have two streams.
						var responseToCache = response.clone();

						caches.open(staticCacheName)
							.then(function(cache) {
								cache.put(event.request, responseToCache);
							});

						return response;
					}
				);
			})
	);
});
