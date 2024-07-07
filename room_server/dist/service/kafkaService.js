import { Kafka } from "kafkajs";
import { saveMessage } from "./roomService";
const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`]
});
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || "" });
const KafkaTopics = {
    ChatMessages: "chat-messages"
};
const runKafka = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({
            topic: KafkaTopics.ChatMessages,
            fromBeginning: true
        });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (message.value) {
                    const messageString = message.value?.toString();
                    try {
                        const messageJson = JSON.parse(messageString);
                        if (topic === KafkaTopics.ChatMessages) {
                            await saveMessage(messageJson);
                        }
                    }
                    catch (error) {
                        console.error("KAFAK_JSON_PARSE_ERROR: ", error);
                    }
                }
            }
        });
    }
    catch (error) {
        console.error("KAFKA_CONSUMER_ERROR: ", error);
    }
};
export { runKafka };
