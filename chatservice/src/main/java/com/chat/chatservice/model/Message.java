package com.chat.chatservice.model;

public class Message {
    private String roomId;
    private String content;
    private String username;
    private String userAvatar;
    private String timestamp;
    private String _id;

    // Getters and setters
    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    @Override
    public String toString() {
        return "Message{" +
                "roomId='" + roomId + '\'' +
                ", content='" + content + '\'' +
                ", username='" + username + '\'' +
                ", userAvatar='" + userAvatar + '\'' +
                ", timestamp='" + timestamp + '\'' +
                ", _id='" + _id + '\'' +
                '}';
    }
}
