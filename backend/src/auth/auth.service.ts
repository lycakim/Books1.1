import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service'
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly userService: UsersService, private connection: Connection, private jwtService: JwtService,) {

  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async login(user: any) {
    const res_user = await this.userService.findUser(user.username.toString(), user.password.toString());
    if (user.password == null || user.password == '') {
      return new HttpException('Invalid email / password.', HttpStatus.BAD_REQUEST);
    }
    else {
      if (res_user != null) {

        if (user.password.toString() == res_user.password) {
          if (res_user.isValidated) {
            const { password, ...rest } = res_user;
            // JWT sign in using user.id, user.username
            const payload = { firstname: res_user.firstname, id: res_user.id, lastname: res_user.lastname, username: res_user.username, isValidated: res_user.isValidated };
            return {
              status: HttpStatus.ACCEPTED,
              token: this.jwtService.sign(payload),
              user: rest
            };
          }
          else {
            const { password, ...rest } = res_user;
            const payload = { firstname: res_user.firstname, id: res_user.id, lastname: res_user.lastname, username: res_user.username, isValidated: res_user.isValidated };
            return {
              status: HttpStatus.ACCEPTED,
              token: this.jwtService.sign(payload),
              user: rest
            };
          }

        }
        else {
          return {
            status: HttpStatus.BAD_REQUEST
          };
        }
      }
      else {
        return new HttpException('Invalid email / password.', HttpStatus.BAD_REQUEST);
      }

    }
    return res_user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
