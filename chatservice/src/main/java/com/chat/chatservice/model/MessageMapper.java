package com.chat.chatservice.model;

public class MessageMapper {
    public static MessageDTO toMessageDTO(Message message) {
        if (message == null) {
            return null;
        }

        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setRoomId(message.getRoomId());
        messageDTO.setContent(message.getContent());
        messageDTO.setUsername(message.getUsername());
        messageDTO.setUserAvatar(message.getUserAvatar());
        messageDTO.setTimestamp(message.getTimestamp());

        return messageDTO;
    }
}
