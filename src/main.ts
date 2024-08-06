import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

(async () => {
  console.log(process.env.RABBITMQ_URL)
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({}));
  app.enableVersioning({ type: VersioningType.URI });
  app.use(helmet());
  app.use(compression());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'messages_queue',
      queueOptions: {
        durable: false,
      },
      socketOptions: {
        heartbeatIntervalInSeconds: 60,
        reconnectTimeInSeconds: 5,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(port, (): void => {
    console.log(`🚀 Application running at port ${port}`);
  });
})();
