var staticCacheName = "restaurant-review-v1";

self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				"../../",
				"../../js/main.js",
				"../../js/dbhelper.js",
				"../../js/restaurant_info.js",
				"../../css/styles.css",
				"../../img/",
				"../../data/restaurants.json",
				"../../index.html",
				"../../restaurant.html"
			]);
		})
	);
});

self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});