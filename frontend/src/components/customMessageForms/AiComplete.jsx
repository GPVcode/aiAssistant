import React, { useEffect, useState } from 'react';
import MessageFormUI from './MessageFormUI';
import { usePostAiCompleteMutation } from '../../state/api';

function useDebounce(value, delay) {
  const [ debouncedValue, setDebouncedValue ] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    }
  }, [value, delay])

  return debouncedValue
}
const AiComplete = ({ props, activeChat }) => {
  
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerComplete] = usePostAiCompleteMutation();

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

  const debouncedValue = useDebounce(message, 1000);

  return (
    <div>
      <MessageFormUI 
        setAttachment={setAttachment}
        message={message}
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default AiComplete;
