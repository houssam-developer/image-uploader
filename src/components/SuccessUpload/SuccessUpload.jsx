import React, { useState, useRef } from 'react';
import { MdCheckCircle } from "react-icons/md";
import './SuccessUpload.scss';

function SuccessUpload({ remoteImgUrl }) {
	const [inputLinkValue, setInputLinkValue] = useState(remoteImgUrl);
	const inputLinkRef = useRef();


	console.log(`🚀 SuccessUpload.init()`);

	function handleBtnCopyLinkEvent(e) {
		e.preventDefault();
		/* Select the text field */
		inputLinkRef.current.select();
		inputLinkRef.current.setSelectionRange(0, 99999); /* For mobile devices */

		/* Copy the text inside the text field */
		navigator.clipboard.writeText(inputLinkRef.current.value);

		/* Alert the copied text */
		alert("Copied the text: " + inputLinkRef.current.value);
	}

	function handleInputLinkOnChangeEvent(e) {
		e.preventDefault();
		setInputLinkValue(e.target.value);
	}

	return (
		<div className="p-8 flex flex-col gap-2 md:gap-8 items-center" >
			<div className='flex flex-col gap-4 md:gap-6 items-center'>
				<p><MdCheckCircle size={30} fill={'#219653'} /></p>
				<h2 className="text-md sm:text-lg font-medium text-[#4f4f4f]" >Uploaded Successfully!</h2>
			</div>
			<div className='p-4 max-w-full rounded-md'>
				<img className='max-w-full max-h-[50vh] object-cover' src={remoteImgUrl} alt="picture uploaded" />
			</div>
			<div className="container-input" >
				<input ref={inputLinkRef} value={inputLinkValue} onChange={handleInputLinkOnChangeEvent} className='flex-grow border-2 overflow-x-hidden text-xs font-medium text-[#4f4f4f]' type="text" />
				<button onClick={handleBtnCopyLinkEvent} className='min-w-max bg-[#2F80ED] rounded-md py-3 px-6 text-white font-medium text-[10px] sm:text-sm md:text-base'>Copy Link</button>
			</div>
		</div>
	);
}

export default SuccessUpload;