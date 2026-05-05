import { NestFactory } from '@nestjs/core';
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

// FOR FASTIFY
// async function bootstrap() {
//   const app = await NestFactory.create<NestFastifyApplication>(
//     AppModule, 
//     new FastifyAdapter()
//   );
//   await app.listen(process.env.PORT ?? 3000);
// }

// FOR EXPRESS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
