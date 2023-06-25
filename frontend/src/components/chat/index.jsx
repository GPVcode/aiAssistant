import { 
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow
} from "react-chat-engine-advanced";
import Header from "../customHeader";
// for ai generated responses
import StandardMessageForm from "../customMessageForms/StandardMessageForm";
import Ai from "../customMessageForms/Ai";
import AiCode from "../customMessageForms/AiCode";
import AiComplete from "../customMessageForms/AiComplete";

const projectId = process.env.REACT_APP_PROJECT_ID;
const username = process.env.REACT_APP_USER_NAME;
const secret = process.env.REACT_APP_USER_SECRET;

const Chat = () => {

  const chatProps = useMultiChatLogic(projectId, username, secret)

  return (

    <div style={{ flexBasis: "100%" }}>
      {/* Logic with creating and styling components */}      
      <MultiChatWindow 

        {...chatProps}
        timezoneOffset={-7}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} /> }
        renderMessageForm={(props) => {
          // render AI component if chatroom starts with AiChat
          if(chatProps.chat?.title.startsWith("AiAssistant")){
            return <Ai props={props} activeChat={chatProps.chat} />
          }
          // render AI component that responds with strictly code
          if(chatProps.chat?.title.startsWith("AiCodeAssistant")){
            return <AiCode props={props} activeChat={chatProps.chat} />
          }
          // render autocompletion AI component
          if(chatProps.chat?.title.startsWith("AiAutoComplete")){
            return <AiComplete props={props} activeChat={chatProps.chat} />
          }
          return (
              <StandardMessageForm props={props} activeChat={chatProps.chat} />
          )
        }}
      />

      {/*  render components and provide authentication to connect to react chat engine website */}
      <MultiChatSocket {...chatProps} timezoneOffset={-7} />
    </div>
  )
}

export default Chat
