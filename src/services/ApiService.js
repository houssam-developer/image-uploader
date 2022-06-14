import { data } from "autoprefixer";
import axios from "axios";

export const apiService = (function () {

	const API_URL = 'http://localhost:8080/upload';



	function uploadFile(formData) {
		console.log(`📥 uploadFile()`);

		try {
			return axios.post(
				API_URL,
				formData,
				{
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

	return {
		uploadFile
	}

})();