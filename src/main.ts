import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

function createSwagger(app: INestApplication) {
  const SWAGGER_TITLE = 'App API';
  const SWAGGER_DESCRIPTION = 'App REST API';
  const SWAGGER_PREFIX = '/docs';
  const SWAGGER_URL = '/';

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion('1.0.0.')
    .addBearerAuth()
    .addServer(SWAGGER_URL, 'App')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS options: allow requests from http://localhost:5173
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173', // Allow requests from your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // If you need to handle cookies or sessions
  };

  app.enableCors(corsOptions); // Enable CORS with specific options
  createSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  console.log(`App started at the port #${process.env.PORT}`);
}
bootstrap();
