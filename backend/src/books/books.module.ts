import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Book } from './entities/book.entity';
import { User } from 'src/users/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ConfigModule.forRoot(), MulterModule.register({
    dest: './uploadedCoverImg',
  }), TypeOrmModule.forFeature([Book, User]), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRATION },
  })],
  controllers: [BooksController],
  providers: [{
    provide: "BOOK_SERVICE",
    useClass: BooksService
  }, {
    provide: "USER_SERVICE",
    useClass: UsersService
  }],
})
export class BooksModule { }
