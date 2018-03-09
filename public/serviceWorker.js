const cacheName = 'blakeIsAwesome_00'
const cachedFiles = [
	'/index.html',
	'/index.js',
	'/index.css',
];

// STEP 1: install service worker
self.addEventListener('install', function(e) {
	console.log('🤖 install!')

	// holdup! wait until installation is complete till moving forward
	// if this fails, then service worker is discarded
	e.waitUntil(

		// this is where you version caches
		caches
			.open(cacheName)
			.then((cache) => {
				console.log('🤖 caching app shell:', cachedFiles)

				// cache.addAll takes an array of urls, fetches them from the server and then caches
				// This is an atomic function, so if one url fails, the entire thing 💩
				return cache.addAll(cachedFiles);
			})
	)
})


// STEP 2: activate and validate cached assets
self.addEventListener('activate', function(e) {
	console.log('🤖 activate!');

	// holdup! wait until all fetch procedures are finished before moving forward
	// this allows service workers to update db schemas and delete old caches (done below)
	e.waitUntil(
		// get all cache keys and delete old ones
		caches
			.keys()
			.then((keyList) => {
				console.log('🤖 keyList', keyList)
				return Promise.all(
					// loop through every cached key
					keyList.map((key) => {
						if (key !== cacheName) {
							console.log('🤖 removing old cache', key);
							return caches.delete(key);
						}
					})
				)
			})
	)

	// this can be redundant. it's essentially getting the most recent cache data
	return self.clients.claim();
});


// STEP 3: fetch
self.addEventListener('fetch', function(e) {
	e.respondWith(
		// finds the first requested cached assets and returns
		caches
			.match(e.request)
			.then((response) => {
				if (response) {
					console.log('🤖 fetch response:', response.url)
					return response;
				}
				// else try to refech request url
				// if indexdb isn't set up, then cache will fail here
				try {
					console.log('🤖 fetch request:', e.request.url)
					return fetch(e.request);
				} catch (err) {
					console.error('🚨 in fetch:', err)
				}
			})
	);
});