import { data } from "autoprefixer";
import axios from "axios";

export const apiService = (function () {

	const API_URL = 'http://localhost:8080/upload';

	function checkUploadState(response) {
		console.log(`📡 response: `, response);
		if (response["added"]) { console.log(`📡 TRUE`); return true; }
		else { console.log(`📡 FALSE`); return false; }
	}

	function handleProgressEvent(progressEvent) {
		const { loaded, total } = progressEvent;
		let percent = Math.floor((loaded * 100) / total);
		console.log(`🔧 >>>>> ${loaded}kb of ${total} | ${percent}% `,);
	}

	function uploadFile(formData) {
		console.log(`📥 uploadFile()`);

		// fetch(API_URL, {
		// 	method: 'POST',
		// 	mode: 'cors',
		// 	cache: 'no-cache',
		// 	headers: {
		// 		'Access-Control-Allow-Origin': '*',
		// 	},
		// 	redirect: 'follow',
		// 	referrerPolicy: 'no-referrer',
		// 	body: formData

		try {
			axios.post(
				API_URL,
				formData,
				{
					onUploadProgress: (e) => handleProgressEvent(e),
					params: {
						mode: 'cors',
						cache: 'no-cache',
						headers: {
							'Access-Control-Allow-Origin': '*',
						},
						redirect: 'follow',
						referrerPolicy: 'no-referrer'
					}
				}
			).then(response => checkUploadState(response))
				.catch(err => console.log(`🚩 Error: `, err));

		} catch (error) {
			console.log(`🚫 uploadFile(): `, error);
		}
	}

	return {
		uploadFile
	}

})();