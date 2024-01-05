import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/typeorm'
import { Connection, DataSource, getConnection, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private connection: Connection) {

  }

  async getUserId(id: any) {

    const user = await this.userRepository.createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();
    return user;


  }

  getAllUsers(data: any) {
    return this.userRepository.createQueryBuilder()
      .where('id != :id', { id: data.id })
      .getMany();
  }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findUser(username: string, password: string) {
    return this.userRepository.findOneBy({ username: username, password: password });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
