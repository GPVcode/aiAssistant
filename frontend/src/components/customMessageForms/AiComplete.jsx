import React, { useEffect, useState } from 'react';
import MessageFormUI from './MessageFormUI';
import { usePostAiCompleteMutation } from '../../state/api';

// hook to send message after a second
function useDebounce(value, delay) {
  const [ debouncedValue, setDebouncedValue ] = useState(value);

  // handles debounced value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]) // pass in values for useEffect to trigger if values change

  return debouncedValue
}

const AiComplete = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerComplete, resultComplete] = usePostAiCompleteMutation();
  const [appendText, setAppendText] = useState("");

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    // Manually formatting date properly with ISOString
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
      // Particular format if attachment exists, otherwise error
    const att = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    
    // fill up form then submit it and clear form data
    const form = {
      attachments: att,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    } 

    // API req to submit text to chat engine
    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  // Set and store debounced after a second
  const debouncedValue = useDebounce(message, 1000);

  console.log("ARE WE DEBOUNCING? ", debouncedValue)
  useEffect(() => {
    if(debouncedValue){
    // only trigger api call once we have a debounced value
      const form = { text: message };
      triggerComplete(form);
    }
  }, [debouncedValue]); // eslint-disable-line

  // tab and enter functionality
  const handleKeyDown = (e) => {
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      setMessage(`${message} ${appendText}`);
    }
    setAppendText("");
  };

  // useEffect for append text 
  useEffect(() => {
    // resultComplete comes from OpenAI in backend
    if (resultComplete.data?.text) {
      setAppendText(resultComplete.data?.text);
    }
  }, [resultComplete]); // eslint-disable-line


  return (
    <div>
      <MessageFormUI 
        setAttachment={setAttachment}
        message={message}
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        appendText={appendText}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default AiComplete;
