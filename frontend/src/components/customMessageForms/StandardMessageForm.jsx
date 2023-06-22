
import React, { useState } from 'react';
import MessageFormUI from './MessageFormUI';

const StandardMessageForm = ({ props, activeChat }) => {

  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");

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

    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <MessageFormUI 
      setAttachment={setAttachment}
      message={setMessage}
      handleChange={handleChange} 
      handleSubmit={handleSubmit}
    />
  )
}

export default StandardMessageForm

