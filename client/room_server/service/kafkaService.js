import { Kafka } from "kafkajs";
import { saveMessageToRoom } from "./roomService.js";
import { KafkaTopics } from "../constant.js";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
});

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const runKafka = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: KafkaTopics.ChatMessages,
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("MESSAGE_RECEIVE_FROM_KAFKA: ", message);
        const msg = JSON.parse(message.value.toString());

        if (topic === KafkaTopics.ChatMessages) {
          await saveMessageToRoom(msg);
        }
      },
    });
  } catch (error) {
    console.error("KAFKA_CONSUMER_ERROR: ", error);
  }
};

export { runKafka };
