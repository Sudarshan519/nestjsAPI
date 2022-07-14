import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [CustomersModule, UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    'password': 'mysql',
    database: 'tutorial_db',
    entities,
    synchronize: true,
  }), AuthModule,
    PassportModule.register({
      session: true,
    }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
