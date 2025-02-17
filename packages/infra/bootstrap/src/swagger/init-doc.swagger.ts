import { ConfigKeyPaths, ISwaggerConfig } from '@aiofc/config';
import { Logger } from '@aiofc/logger';
import { ApiRes } from '@aiofc/rest';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import packageJson from './package-json';

export async function initDocSwagger(
  app: INestApplication,
  configService: ConfigService<ConfigKeyPaths>,
  logger: Logger,
  url: string
): Promise<void> {
  const { enable, path } = configService.get<ISwaggerConfig>('swagger', {
    infer: true,
  });

  if (!enable) return;

  const documentBuilder = new DocumentBuilder()
    .setTitle('Soybean Admin NestJS Backend API')
    .setDescription(
      'This API serves as the backend service for Soybean Admin, providing a comprehensive set of functionalities for system management and operations.'
    )
    .setVersion(packageJson.version)
    .setTermsOfService('Soybean Terms of Service')
    .setContact(
      packageJson.author.name,
      packageJson.author.url,
      packageJson.author.email
    )
    .setLicense(packageJson.license.name, packageJson.license.url);

  documentBuilder.addSecurity('', {
    description: 'Bearer Authentication',
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: false,
    extraModels: [ApiRes],
  });

  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // const logger = new Logger(app.get(Logger), 'SwaggerModule');
  const message = `Swagger Document running on ${url}/${path}`;
  fancyLog(message, logger);
}

function fancyLog(message: string, logger: Logger) {
  const messageLength = message.length;
  const border = '*'.repeat(messageLength + 10);

  const styledMessage = `**** ${message} ****`;

  logger.log(border);
  logger.log(styledMessage);
  logger.log(border);
}
