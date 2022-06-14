
import { useEffect, useRef, useState } from 'react';
import './App.scss';
import { apiService } from './services/ApiService';

import { MdCheckCircle } from "react-icons/md";



function App() {
	const [isImageUploading, setIsImageUploading] = useState(false);
	const [isImageUploaded, setIsImageUploaded] = useState(false);
	const [imageUploadedFile, setimageUploadedFile] = useState();
	const [previewImageUploaded, setPreviewImageUploaded] = useState();

	const btnSubmitRef = useRef();
	const previewImgRef = useRef();
	const containerUploaderRef = useRef();
	const inputFileRef = useRef();

	function handleOnDragoverEvent(e) {
		e.preventDefault();
	}

	function handleOnDropEvent(e) {
		e.preventDefault();
		let data = e.dataTransfer.getData('text');
		console.log(`📡 #data: `, e.dataTransfer);
	}

	function checkUploadState(response) {
		console.log(`📡 response: `, response);
		if (response['status']) {
			console.log(`📡 TRUE`);
			setIsImageUploaded(true);
		}
		else { console.log(`📡 FALSE`); }
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		console.log(`📡 handleFormSubmit() #formData: `, formData);

		Array.from(formData.entries()).forEach(it => { console.log('🔁 #it:', it) });
		const fileArray = Array
			.from(formData.entries())
			.filter(it => it[0] === 'myfile');

		console.log(`📦 #fileArray: `, fileArray);

		//previewImgRef.current.src = URL.createObjectURL(fileArray[1]);

		setIsImageUploading(true);

		let reader = new FileReader();
		reader.onload = (e) => {
			console.log(`📦 #e.target.result: `, e);
			setPreviewImageUploaded(e.target.result);
		}

		reader.readAsDataURL(inputFileRef.current.files[0]);


		apiService
			.uploadFile(formData)
			.then(response => checkUploadState(response))
			.catch(err => console.log(`🚩 Error: `, err));
	}


	function handleBtnChooseFileEvent(e) {
		e.preventDefault();
		//console.log(`📡 handleBtnChooseFileEvent()`, e);
		btnSubmitRef.current.click();
	}

	return (
		<div className="">
			{isImageUploaded ?
				<SuccessUpload srcImg={previewImageUploaded} />
				:
				isImageUploading ?
					<div className="m-4 shadow rounded-lg flex items-center" >
						<div className="p-8 flex flex-col  w-full" >
							<h2 className="text-lg font-sans font-medium text-[#4f4f4f]" >Uploading...</h2>
							<div ref={containerUploaderRef} className='uploader-bar'></div>
						</div>
					</div>
					:
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
			}
		</div>
	)

	function SuccessUpload({ srcImg }) {
		//previewImgRef.current.src = e.target.result;

		return (
			<div className="p-8 flex flex-col gap-2 md:gap-6 items-center" >
				<div className='flex flex-col gap-4 items-center'>
					<p><MdCheckCircle size={30} fill={'#219653'} /></p>
					<h2 className="text-md sm:text-lg font-medium text-[#4f4f4f]" >Uploaded Successfully!</h2>
				</div>
				<div className='p-4 max-w-[340px]'>
					<img src={srcImg} alt="picture uploaded" />
				</div>
				<div className="container-input" >
					<input className='border-2 overflow-x-hidden text-xs font-medium text-[#4f4f4f]' type="text" placeholder='https://images.yourdomain.com/photo-1496950866446-325...' />
					<button className='min-w-max bg-[#2F80ED] rounded-md py-4 px-6 text-white font-medium text-[10px] sm:text-sm md:text-base'>Copy Link</button>
				</div>
			</div>
		);
	}
}





export default App;
