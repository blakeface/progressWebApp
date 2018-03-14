// register service worker (serviceWorker isn't available everywhere... 🍎)
if ('serviceWorker' in navigator && false) {
	navigator.serviceWorker.register('./serviceWorker.js')
		.then(() => console.log('in index.js: service worker installed'))
		.catch(err => console.error('🚨 in index.js:', err))
}

// setup indexdb
const dbName = 'blakeIndexedDB'
const dbVersion = 1
const dbStoreName = 'responses'
var db;

// cross-broswer fix
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if (window.indexedDB) {

	// open db
	const dbRequest = window.indexedDB.open(dbName, dbVersion);

	// most IndexedDB objects are event-driven. events will bubble so catch them here.
	dbRequest.onerror = (e) => { console.error('🚨 in indexedDB request:', e.target.errorCode) };
	dbRequest.onsuccess = (e) => {
		// set db
		db = e.target.results
		console.log('indexedDB results', db)
	}
	// update schema
	dbRequest.onupgradeneeded = (e) => {
		// create object store with response-id as the key
		const objectStore = e.target.result.createObjectStore(dbStoreName, { keypath: 'response-id' })

		// create indexes for each response options
		objectStore.createIndex('datetime', 'datetime', { unique: false })
		objectStore.createIndex('answers', 'answers', { unique: false });
		objectStore.createIndex('headers', 'headers', { unique: false });
	}

	function saveResponse (responseData) {
		// transactions enable you to make queries to your objectStore
		const objectStore = db.transaction([dbStoreName], 'readwrite').objectStore(dbStoreName)
		// add response data
		responseData.forEach((response) => {
			objectStore.add(response)
		})
		console.log('responseData saved')
	}

	// override submit action for offline mode
	const form = document.querySelector('#form')
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		var formData = {}
		formData['response-id'] = document.querySelector('#response-id').value
		formData['word'] = document.querySelector('#word').value
		formData['drink'] = [].slice.call( document.querySelectorAll('[name="drink"]') )
			.filter(el => el.checked)
			.map(el => el.value).pop()

		saveResponse(formData);

		// increment response-id
		var responseID = document.querySelector('response-id')
		responseID.value = parseInt(responseID.value) + 1;

	})
}