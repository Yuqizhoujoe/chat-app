export default function ChatWindowUserInput({ sendMessage, value, onChange }) {
  return (
    <form onSubmit={sendMessage} className="message-input-form">
      <input
        type="text"
        name="message-input"
        id="message-input"
        className="message-input"
        value={value}
        onChange={onChange}
        placeholder="Type a message..."
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
}
