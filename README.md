FRONTEND:
Chat Engine - Chat application
Redux Toolkit - State management library
RTK Query - Make API calls
React Router - Navigation
React Dropzone - Add files into app
HeroIcons - Icons for design
SASS - CSS framework

BACKEND:
NodeJS - Runtime
ExpressJS - Backend framework
OpenAI - AI integration with chat.
body-parser - JSON converter
helmet - API security
cors - allow cross origin resource sharing
morgan - get info anytime an API is called

First I hooked up Chat Engine into my React app and customize the header and message form.
In header, I set up CSS using SASS and brought in heroicons for pleasant interface.
I coded the header to show the chatrooms title and made the chatroom description to dynamically show date and time, otherwise, it would say that there is no chatroom selected.
Then I coded the message form to include attachments, state management, and respective icons for each feature. The attachment feature has a preview functionality. 
I also updated the timezone to pacific time, originally GMT.

After initial set up with Chat Engine, I set up server configurations. The tools installed are:
- body-parser
- concurrently
- cors
- dotenv
- express
- helmet
- morgan
- concurrently
- axios
Once initial server is set up, I set up OpenAI to introduce GPT-3.5 into my application. I started by configuring openAI to my server. I then introduced Axios to inside of my routes file to call the openAI api from node. 

After setting up initial routes in the backend, I went back to client to set up redux and redux toolkit to simplify boilerplate code that manages state and stores api calls in our global store in a simple and straightforward way. I proceeded to set up slices that will make api calls to my backend and then set up store in my main client index file. After creating the hook in my API slice file, I can now use the hook to make an API call in a new component in a Ai.jsx. I set up the code so that if the title of the chat room is AI, to use the AI component. In this AI component I will create a trigger using usePostAiTextMutation hook to trigger the API call. This trigger will submit the form to the backend and make the API request to OpenAI, thus recieving a response in the message list from GPT-3.5. 
Next, I set up openAI in my routers and connected the would be response from OpenAI to ChatEngine so that it would show up in message list from the Bot user. I named my bot after my dog Quest. 

After successfully hooking up OpenAI to Chat Engine, I can now implement different variations of AI in different chat rooms. 

After implementing different variations for different chatrooms, I will set up user authorization and authentication. I first set up mutations for login and sign up. Then I set up the login and signup components. After setting up the components, I set up the logic for which components will be renders based on user's login status.

Once the frontend components are established, I went in the backend to set up my routes.