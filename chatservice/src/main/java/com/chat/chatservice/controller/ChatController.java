package com.chat.chatservice.controller;

import com.chat.chatservice.model.Message;
import com.chat.chatservice.service.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "*")
public class ChatController {
    @Autowired
    private KafkaProducerService kafkaProducerService;

    @MessageMapping("/message")
    @SendTo("/topic/message")
    public Message sendMessage(Message message) {
        kafkaProducerService.sendMessage(message);
        System.out.println("CHAT_CONTROLLER_MESSAGE_RECEIVE: " + message.toString());
        return message;
    }
}
