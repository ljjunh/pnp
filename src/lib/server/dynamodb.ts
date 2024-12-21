import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const developmentConfig: DynamoDBClientConfig = {
  region: 'local',
  endpoint: 'http://localhost:8000',
  credentials: {
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
  },
};

const productionConfig: DynamoDBClientConfig = {
  region: process.env.AWS_REGION,
};

const dynamoConfig = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

const client = new DynamoDB(dynamoConfig);
const dynamoDB = DynamoDBDocument.from(client);

export { dynamoDB };
