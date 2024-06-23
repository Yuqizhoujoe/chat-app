import { Kafka } from "kafkajs";
import { KafkaTopics } from "../constant.js";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
});

const producer = kafka.producer();

const runKafkaProducer = async () => {
  try {
    await producer.connect();
    console.log("KAFKA_SERVICE_PRODUCER_CONNECT");
  } catch (error) {
    console.error("KAFKA_SERVICE_PRODUCER_ERROR: ", error);
  }
};

const publishMessage = async (message) => {
  try {
    await producer.send({
      topic: KafkaTopics.ChatMessages,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("KAFKA_SERVICE_PRODUCER_PUBLISH_MESSAGE");
  } catch (error) {
    console.error("KAFKA_SERVICE_PRODUCER_PUBLISH_MESSAGE_ERROR: ", error);
  }
};

export { runKafkaProducer, publishMessage };
