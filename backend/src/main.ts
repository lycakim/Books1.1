import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
  var whitelist = [
    'http://localhost:8080',
    'http://localhost:3001',
    'http://localhost:3000',
  ];
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          console.log('allowed cors for:', origin);
          callback(null, true);
        } else {
          console.log('blocked cors for:', origin);
          callback(new Error('Not allowed by CORS'));
        }
      },
      allowedHeaders:
        'Origin,Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Access-Control-Allow-Origin',
      methods: 'GET,PUT,POST,DELETE,UPDATE, PATCH',
      credentials: true,
    }
  });
  const config = new DocumentBuilder()
    .setTitle('DNSC ReDaMS')
    .setDescription('DNSC ReDaMS API')
    .setVersion('1.0')
    .addTag('Routes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.enableCors()
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(3001);
}
bootstrap();
