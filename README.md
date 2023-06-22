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

After setting up initial routes in the backend, I went back to client to set up redux and redux toolkit to simplify boilerplate code that manages state and stores api calls in our global store in a simple and straightforward way. I proceeded to set up slices that will make api calls to my backend and then set up store in my main client index file. After creating the hook in my API slice file, I can now use the hook to make an API call in a new component in a Ai.jsx file.