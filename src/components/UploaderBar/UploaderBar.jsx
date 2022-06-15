import React from 'react'

function UploaderBar() {
	return (
		<div className="m-4 shadow rounded-lg flex items-center" >
			<div className="p-8 flex flex-col  w-full" >
				<h2 className="text-lg font-sans font-medium text-[#4f4f4f]" >Uploading...</h2>
				<div className='uploader-bar'></div>
			</div>
		</div>
	);
}


export default UploaderBar