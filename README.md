# React Real-Time Chat Application

A minimal, responsive real-time chat application built with **React, Tailwind CSS, Node.js, Express, and Socket.IO**. The application supports live messaging, message likes, emoji insertion, and user mentions.

## Features

- **Real-Time Messaging:** Send and receive messages instantly using Socket.IO.
- **Random Usernames:** Each message is assigned a random username from a predefined list.
- **Like Messages:** Like messages using the thumbs-up button and see the like count update in real time.
- **Emoji Picker:** Insert emojis directly into messages.
- **@Mentions:** Type `@` to view available usernames and mention users in messages.
- **Reset Chat:** Clear all messages for every connected client.
- **Responsive UI:** Clean, minimal interface built with Tailwind CSS.

## Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Font Awesome
- Socket.IO Client

**Backend**
- Node.js
- Express.js
- Socket.IO
- CORS

## Project Structure

```text
react-chat-app/
├── server/
│   ├── server.js
│   └── package.json
├── src/
│   ├── components/
│   │   ├── ChatMessage.jsx
│   │   ├── ChatInput.jsx
│   │   ├── EmojiPicker.jsx
│   │   └── MentionSuggestions.jsx
│   ├── App.jsx
│   ├── socket.js
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- Git (optional)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd react-chat-app
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Start the Backend Server

From the `server` directory:

```bash
npm run dev
```

The backend server runs at:

`http://localhost:5000`

### 5. Start the Frontend

Open another terminal, navigate to the project root, and run:

```bash
npm run dev
```

The frontend runs at:

`http://localhost:5173`

## How to Use

1. Open the application in your browser.
2. Type a message in the input field and click Send.
3. Each message is displayed with a randomly assigned username.
4. Click the thumbs-up icon to like a message.
5. Use the emoji picker to insert emojis.
6. Type `@` to see available usernames and select someone to mention.
7. Click the broom icon (🧹) in the header to reset the chat for all connected users.
8. Open the application in multiple browser windows to test real-time communication.

## Real-Time Communication

The application uses Socket.IO for bidirectional communication between the frontend and backend.

| Event | Description |
|---|---|
| `chat:message` | Broadcasts a new message to connected clients |
| `chat:like` | Synchronizes message likes |
| `chat:reset` | Clears messages for all connected clients |

## Note

Messages are currently maintained in application memory and are not stored in a database. Refreshing the application clears the chat history.

## Future Improvements

- Persistent message storage using MongoDB.
- User authentication and individual chat identities.
- Private messaging and chat rooms.

---

**Built with React and Socket.IO.**