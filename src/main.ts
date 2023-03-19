import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {VersioningType} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
      .setTitle('OpenAPI - Lavrope')
      .setDescription('The sets given for development integration.')
      .setVersion('1.0')
      .addBearerAuth()
      .setContact('Anirban Sanyal', 'https://fb.me/druvisback', 'druvisback@gmail.com')
      /*.addTag('lavrope')*/
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('open-api', app, document);

  app.use((req, res, next) => {
    const hostname = req.hostname;
    if (hostname === 'sample.com') {
      // use SampleModule
    } else if (hostname === 'contact.sample.com') {
      // use SampleContactModule
    }
    next();
  });
  await app.listen(3000);
  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
      .map(layer => {
        if (layer.route) {
          return {
            route: {
              path: layer.route?.path,
              method: layer.route?.stack[0].method,
            },
          };
        }
      })
      .filter(item => item !== undefined);
  console.log(availableRoutes);
}
bootstrap();
