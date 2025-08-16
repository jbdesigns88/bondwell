import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import http from 'http';
import baseKnowledge from './knowledge_base/intial_knowledge.js';
import { Server } from 'socket.io';
import cors from 'cors';
import { Storage } from '@google-cloud/storage';
import routes from './routes/index.js';
import { OpenAI } from "openai";
import { socketManager, SocketManager } from './socket/SocketManager.js';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
const app = express();
const server = http.createServer(app);
// Middleware
app.use(cors({ origin: '*' })); // update
app.use(bodyParser.json());
app.use('/api/v1', routes);
const httpServer = http.createServer(app);
// Enable CORS for Express routes
// Enable connection state recovery and CORS for Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: '*', // Replace with your frontend URL
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
        skipMiddlewares: true,
    },
});
socketManager.connect(io);
app.use(bodyParser.json());
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});
// storage to save  conversations...
const storage = new Storage();
const bucketName = 'bondwell-441003.appspot.com'; // Replace with your actual bucket name
// Function to create a directory for each user
const createUserDirectory = (username) => {
    const userDir = path.join(__dirname, 'conversations', username);
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
    }
    return userDir;
};
app.get("/ready", (req, res) => {
    res.json({ "message": "you connected successfuly" });
});
/*
  @deprecated
  -  utilize api/v1/users endpoint
*/
app.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body.data;
        if (!username && !email && !password) {
            return res.status(400).json({ data: null, message: 'A value must be provided for username email' });
        }
        //save user.save(username,email,password)
        return res.status(200).json({ data: { username, email }, message: 'user was successfully created' });
    }
    catch (e) {
        return res.status(400).json({ data: null, message: 'A value must be provided for username email' });
    }
    // save username and password
});
// Load a conversation from storage...
const loadConversation = async (username) => {
    const file = storage.bucket(bucketName).file(`conversations/${username}.json`);
    try {
        const [exists] = await file.exists();
        if (!exists) {
            return [{ role: "system", content: "Welcome back to your private chat with Lisa Bondwell." }];
        }
        const [contents] = await file.download();
        return JSON.parse(contents.toString());
    }
    catch (error) {
        return [{ role: "system", content: "Welcome back to your private chat with Lisa Bondwell." }];
    }
    // const convoFile = path.join(createUserDirectory(username), 'conversation.json');
    // if (fs.existsSync(convoFile)) {
    //   return JSON.parse(fs.readFileSync(convoFile, 'utf8'));
    // }
    // return [{ role: "system", content: "Welcome back to your private chat with Lisa Bondwell." }];
};
// Function to save a conversation to a JSON file
const saveConversation = async (username, conversation) => {
    const file = storage.bucket(bucketName).file(`conversations/${username}.json`);
    try {
        await file.save(JSON.stringify(conversation, null, 2), {
            contentType: 'application/json',
            metadata: {
                cacheControl: 'no-cache',
            },
        });
    }
    catch (error) {
    }
    // const convoFile = path.join(createUserDirectory(username), 'conversation.json');
    // fs.writeFileSync(convoFile, JSON.stringify(conversation, null, 2));
};
// Handle client connections
// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socket.on('join', async (username) => {
//     let userId, conversation;
//     console.log(`user: ${username} has joined the chat`)
//     if (socket.recovered) {
//       userId = socket.userId;
//       conversation = await loadConversation(username);
//       console.log(`Recovered session for ${username}`);
//     } else {
//       userId = uuidv4();
//       conversation =  [
//           ...baseKnowledge
//       ];
//     }
//     socket.userId = userId;
//     socket.username = username;
//     console.log(`User joined: ${username} with ID: ${userId}`);
//     socket.emit('previousMessages', conversation.slice(9)); // fix to now load intial knowledge base, but this is a temporary fix.
//     socket.on('message', async (messageContent) => {
//       console.log(`asked a question: ${messageContent}`)
//       const userMessage = { role: 'user', content: messageContent };
//       conversation.push(userMessage);
//       console.log(`the Convo is ${JSON.stringify(conversation)}`)
//       try {
//         const response = await openai.chat.completions.create({
//           model: "gpt-4",
//           messages: conversation,
//           temperature: 1,
//           max_tokens: 2048,
//           top_p: 1,
//           frequency_penalty: 0,
//           presence_penalty: 0,
//           stream: true
//         });
//         let convo_output  = []
//         for await (const chunk of response) {
//           const partialContent = chunk.choices[0].delta?.content || '';
//           if (partialContent) {
//             console.log(`partian contenet is ${partialContent}` )
//             socket.emit('message', { role: 'assistant', content: partialContent });
//             convo_output.push(partialContent)
//           }
//         }
//         // const assistantReply = response.choices[0].message.content;
//         // const aiMessage = { role: 'assistant', content: assistantReply };
//         // conversation.push(aiMessage);
//         await saveConversation(username, convo_output.join(""));
//         socket.emit('done',{'status':'complete'})
//         console.log(`after the chunk is done`)
//       } catch (error) {
//         console.error("Error fetching AI response:", error);
//         socket.emit('error', { content: "An error occurred while fetching the response." });
//       }
//     });
//     socket.on('disconnect', () => {
//       console.log(`User disconnected: ${username}`);
//     });
//   });
// });
// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map