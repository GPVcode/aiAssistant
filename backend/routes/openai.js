import express from 'express';
import axios from 'axios';
import dotenv from "dotenv";
import { openai } from '../server.js';

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." }, // ai assistant's assumed role
        { role: "user", content: text }, // message from user

      ],
    });

    // handle Submit in the backend
    // automatically paste info from OpenAI to chat engine
    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error.response.data.error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/code", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an assistant coder who responds with only code and no explanations." }, // ai assistant's assumed role
        { role: "user", content: text }, // message from user

      ],
    });

    // handle Submit in the backend
    // automatically paste info from OpenAI to chat engine
    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error.response.data.error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/autoComplete", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that serves to only complete user's thoughts or sentences." }, // ai assistant's assumed role
        { role: "user", content: `Finish my thought: ${text}` }, // message from user
      ],
    });

    // handle Submit in the backend
    // automatically paste info from OpenAI to chat engine
    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      });

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error.response.data.error);
    res.status(500).json({ error: error.message });
  }
});

export default router;