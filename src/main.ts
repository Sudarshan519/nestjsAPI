import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from './typeorm';
import entities from './typeorm';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const dataSource = new DataSource(
    {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'tutorial_db',
      entities,
      synchronize: true,
    }
  );
  const sessionRepository = dataSource.manager.getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(session({
    name: "NESTJS_SESSION_ID",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,

    },
    store: new TypeormStore().connect(sessionRepository),
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
