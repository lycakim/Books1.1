import { HttpStatus, Injectable, Param } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Connection, Repository } from 'typeorm';
import { User } from 'src/users/typeorm';
import { find } from 'rxjs';

@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private readonly likeRepo: Repository<Like>, private connection: Connection,) { }
  create(createLikeDto: CreateLikeDto) {
    return 'This action adds a new like';
  }

  async addNew(data: any) {
    var findDup = await this.likeRepo.createQueryBuilder('likes')
      .select(['COUNT(*) as cnt'])
      .where('likes.bookID = :bookID', { bookID: data.bookID })
      .andWhere('likes.userID = :userID', { userID: data.userID })
      .execute();
    if (findDup[0].cnt <= 0) {
      const likeBook = this.likeRepo.create({
        userID: data.userID,
        bookID: data.bookID
      });
      const save = this.likeRepo.save(likeBook);
      if (save) {
        return {
          msg: "Your like has been recorded.",
          status: HttpStatus.CREATED
        }
      }
      else {
        return {
          msg: "Something went wrong!",
          status: HttpStatus.BAD_REQUEST
        }
      }
    }
    else {
      return {
        msg: "You already liked this book.",
        status: HttpStatus.BAD_REQUEST
      }
    }

  }

  async getLikes() {
    return this.likeRepo.createQueryBuilder()
      .select(['COUNT(*) as cnt', 'bookID'])
      .groupBy('bookID')
      .execute();
  }

  async getLikePerBook(data: any) {
    return this.likeRepo.createQueryBuilder('likes')
      .leftJoinAndMapOne('likes.user', User, 'user', 'user.id = likes.userID')
      .where('likes.bookID = :bookID', { bookID: data.bookID })
      .orderBy('likes.date_liked', 'DESC')
      .getMany();
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
