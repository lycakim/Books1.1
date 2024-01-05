import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [ConfigModule.forRoot(), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
  }), TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [{
    provide: "AUTH_SERVICE",
    useClass: AuthService
  }, {
    provide: "USER_SERVICE",
    useClass: UsersService
  },
  ]
})
export class AuthModule { }
