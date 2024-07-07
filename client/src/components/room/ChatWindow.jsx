import ChatWindowUserInput from "./ChatWindowUserInput";

export default function ChatWindow({
  messages,
  sendMessage,
  messageOnChange,
  newMessage,
}) {
  if (!messages) return null;
  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => {
          return (
            <div key={index} className="message">
              <img
                src={`http://localhost:8001${message.userAvatar}`}
                alt={message.username}
              />
              {message.username}: {message.content}
            </div>
          );
        })}
      </div>
      <ChatWindowUserInput
        sendMessage={sendMessage}
        onChange={messageOnChange}
        value={newMessage}
      />
    </div>
  );
}
