import React, { useState } from 'react';
import MessageFormUI from './MessageFormUI';
import { usePostAiCodeMutation } from '../../state/api';

const AiCode = ({ props, activeChat }) => {
  
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerCode] = usePostAiCodeMutation();

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    // Manually formatting date properly with SIOString
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
    // API req to trigger response from OpenAi
    triggerCode(form);
    setMessage("");
    setAttachment("");
  };

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

export default AiCode;
