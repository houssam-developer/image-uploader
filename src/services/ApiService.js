import { data } from "autoprefixer";
import axios from "axios";

export const apiService = (function () {

	const API_BASE_URL = 'https://uploader-image-backend.herokuapp.com';
	//const API_BASE_URL = 'http://localhost:8080';
	const API_UPLOAD_URL = `${API_BASE_URL}/upload`;


	function handleOnUploadProgressEvent(progressEvent) {
		const { loaded, total } = progressEvent;
		let percent = Math.floor((loaded * 100) / total);

		console.log(`🔥 handleOnUploadProgressEvent() ${loaded}kb of ${total}kb | ${percent}%`);
	}

	function uploadFile(formData) {
		console.log(`📥 uploadFile() attempt...`);

		try {
			return axios.post(
				API_UPLOAD_URL,
				formData,
				{
					onUploadProgress: (e) => handleOnUploadProgressEvent(e),
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
			);

		} catch (error) {
			console.log(`🚫 uploadFile(): `, error);
		}
	}

	function getApiUrl() {
		return API_BASE_URL;
	}

	return {
		uploadFile,
		getApiUrl
	}

})();