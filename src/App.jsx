
import { useEffect, useRef, useState } from 'react';
import './App.scss';
import { apiService } from './services/ApiService';
import SuccessUpload from './components/SuccessUpload/SuccessUpload';
import UploaderBar from './components/UploaderBar/UploaderBar';


function App() {
	const [isImageUploading, setIsImageUploading] = useState(false);
	const [isImageUploaded, setIsImageUploaded] = useState(false);
	const [remoteImageUrl, setRemoteImageUrl] = useState('');
	const [previewImageUploaded, setPreviewImageUploaded] = useState();

	const btnSubmitRef = useRef();
	const inputFileRef = useRef();

	function handleOnDragoverEvent(e) { e.preventDefault(); }

	function handleOnDropEvent(e) {
		e.preventDefault();

		inputFileRef.current.files = e.dataTransfer.files;
		btnSubmitRef.current.click();
	}

	function checkUploadState(response) {
		console.log(`📡 response: `, response);
		if (response.statusText === 'OK') {
			setRemoteImageUrl(`http://localhost:8080/${response.data.file}`);
			setIsImageUploaded(true);
		}
		else {
			setIsImageUploading(false);
			alert(`Image Not Uploaded - ${response.status}`);
		}
	}

	function handleFormSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const fileArray = Array
			.from(formData.entries())
			.filter(it => it[0] === 'myfile');

		setIsImageUploading(true);

		apiService
			.uploadFile(formData)
			.then(response => checkUploadState(response))
			.catch(err => {
				console.log(`🚩 Error: `, err);
				setIsImageUploading(false);
				alert(`Uploading Image Failed - ${err.message}`)
			});
	}

	function handleBtnChooseFileEvent(e) {
		e.preventDefault();
		btnSubmitRef.current.click();
	}

	return (
		<>
			{
				isImageUploaded ? <SuccessUpload remoteImgUrl={remoteImageUrl} />
					:
					isImageUploading ? <UploaderBar /> : <FormFile />

			}
		</>
	)

	function FormFile() {
		return (
			<form onSubmit={handleFormSubmit} className='p-4 flex flex-col gap-8 items-center w-full' encType="multipart/form-data">
				<h1 className='text-[#4f4f4f] text-xl font-medium'>Upload your image</h1>
				<p className='text-[#828282] text-xs font-medium'>File should be Jpeg, Png...</p>
				<div onDrop={handleOnDropEvent} onDragOver={handleOnDragoverEvent}
					className=' self-stretch px-4 py-8 bg-[#F6F8FB] flex flex-col items-center gap-8 min-w-[90] border-[2px] border-dashed border-[#97BEF4] rounded-md'>
					<img className='min-w-[200px] max-w-[340px]' src="./images/image.svg" alt="" />
					<h2 className='text-[#bdbdbd] font-medium text-sm sm:text-base md:text-lg'>Drag & Drop your image here</h2>
				</div>
				<button ref={btnSubmitRef} type='submit' hidden></button>
				<p className='text-[#BDBDBD] md:text-lg font-medium'>Or</p>
				<input ref={inputFileRef} onChange={handleBtnChooseFileEvent} type="file" name='myfile' id='myFile' placeholder='file' hidden />

				<label htmlFor="myFile" className="bg-[#2F80ED] text-white px-4 py-3 rounded-md font-['Noto Sans']">Choose a file</label>
			</form>
		);
	}
}







export default App;
