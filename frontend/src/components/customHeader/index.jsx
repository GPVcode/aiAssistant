import React from 'react'
import { ChatBubbleBottomCenterTextIcon, PhoneIcon } from "@heroicons/react/24/solid";

const Header = ({ chat }) => {

  return (
    <div className='chat-header'>
      <div className='flexbetween'>
        <ChatBubbleBottomCenterTextIcon className='icon-chat' />
        <h3 className='header-text'>{chat.title}</h3>
      </div>
      <div className='flexbetween'>

        {/* User experience purposes */}
        <PhoneIcon className='icon-phone' />
        {chat.description !== "⬅️ ⬅️ ⬅️" ? (
          <p className='header-text'>{chat.description}</p>
        ) : (
          <p className='header-text'>No chat selected</p>
        )}
      </div>
    </div>
  )
}

export default Header
