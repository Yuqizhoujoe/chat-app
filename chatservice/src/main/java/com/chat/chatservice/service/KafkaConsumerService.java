package com.chat.chatservice.service;

import com.chat.chatservice.model.Message;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "chat-messages", groupId = "chat-service-group")
    public void consume(Message message) {
        System.out.println("KAFKA_CONSUMER_SERVICE_MESSAGE_RECEIVE： " + message.toString());
    }
}
