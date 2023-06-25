import { 
    PaperAirplaneIcon,
    PaperClipIcon,
    XMarkIcon,
  } from '@heroicons/react/24/solid';
  import React, { useState } from 'react';
  import Dropzone from "react-dropzone";

const MessageFormUI = ({ setAttachment, message, handleChange, handleSubmit}) => {

    const [ preview, setPreview ] = useState('');
    
    return (
        <div className='message-form-container'>
        {/* preview file that was uploaded */}
        {preview && (
            <div className='message-form-preview'>
                <img 
                className='message-form-preview-image' 
                src={preview} 
                // free up resources when you don't need image anymore
                onLoad= {() => URL.revokeObjectURL(preview)}
                alt="message-form-preview"
                />

                {/* delete set preview/attachment */}
                <XMarkIcon
                className="message-form-icon-x" 
                onClick={() => {
                    setPreview("");
                    setAttachment("");
                }}
                />
            </div>
        )}
        {/* MESSAGE FORM */}
        <div className='message-form'>
            <div className='message-form-input-container'>
                <input 
                    className='message-form-input'
                    type='text'
                    value={message}
                    onChange={handleChange}
                    placeholder='Send a message...'
                />
            </div>
            {/* MESSAGE FORM ICONS */}
            <div className='message-form-icons'>
            <Dropzone 
                acceptedFiles=".jpg,.jpeg,.png"
                multipe={false}
                noClick={true}
                onDrop={(acceptedFiles) => {
                setAttachment(acceptedFiles[0]);
                // create object for preview and set it to useState
                setPreview(URL.createObjectURL(acceptedFiles[0]));
                }}
            >
                {({ getRootProps, getInputProps, open }) => (
                // dropzone defaults
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <PaperClipIcon
                    className="message-form-icon-clip"
                    onClick={open}
                    />
                </div>
                )}
            </Dropzone>
            
            <hr className="vertical-line" />
            
            <PaperAirplaneIcon
                className="message-form-icon-airplane"
                onClick={( ) => {
                setPreview("");
                handleSubmit();
                }}
            />
            </div>
        </div>
        </div>
  );
}

export default MessageFormUI
