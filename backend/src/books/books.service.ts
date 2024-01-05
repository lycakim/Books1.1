import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { UsersService } from 'src/users/users.service';
import { find } from 'rxjs';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>, private connection: Connection, @Inject('USER_SERVICE') private readonly userService: UsersService,) { }


  async create(book_details: any) {
    var findDup = await this.bookRepo.createQueryBuilder('book')
      .select(['COUNT(*) as cnt'])
      .where('book.book_name = :book_name', { book_name: book_details.book_name })
      .execute();

    if (findDup[0].cnt <= 0) {
      const newBook = this.bookRepo.create({
        book_name: book_details.book_name,
        book_desc: book_details.book_desc,
        cover_image: book_details.cover_image,
        userID: book_details.userID
      });
      const save = await this.bookRepo.save(newBook);
      if (save) {
        return {
          msg: "Your new book has been uploaded successfully!",
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

  }

  getAllBooks() {
    return this.bookRepo.createQueryBuilder().getMany();
  }

  async getAllowedUsers() {
    var allowed_users_data = [];
    var user = [];
    const book = await this.bookRepo.createQueryBuilder('b').execute();
    // console.log(book)
    for (var i = 0; i < book.length; i++) {
      if (book[i].b_allowed_users != null) {
        var parsed = JSON.parse(book[i].b_allowed_users);
        // console.log('parsed', parsed)
        for (var j = 0; j < parsed.length; j++) {
          var searchUser = await this.userService.findOne(parsed[j]);
          user.push(searchUser);
        }
        if (user.length > 0) {
          allowed_users_data.push({ book: book[i], userData: user });
        }

        user = [];
      }

    }

    // console.log(allowed_users_data);
    return allowed_users_data;

  }


  async getMyBooks(data: any) {
    return await this.bookRepo.createQueryBuilder('b')
      .where('b.userID = :id', { id: data.userID })
      .orderBy('b.date_uploaded', 'DESC')
      .getMany();
  }

  updateBook(book_details: any) {
    console.log(book_details);
    const updateBook = this.bookRepo.update(book_details.book_id, {
      book_name: book_details.book_name,
      book_desc: book_details.book_desc,
      allowed_users: book_details.allowed_users
    });
    if (updateBook) {
      return {
        msg: "Your new book has been updated successfully!",
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

  async updateBookWithCoverImg(book_details: any) {
    console.log(book_details);
    const updateBook = this.bookRepo.update(book_details.book_id, {
      book_name: book_details.book_name,
      book_desc: book_details.book_desc,
      cover_image: book_details.cover_image,
      allowed_users: book_details.allowed_users,
      userID: book_details.userID
    });
    if (updateBook) {
      return {
        msg: "Your new book has been updated successfully!",
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

  deleteBook(id: any) {
    console.log(id);
    const del = this.bookRepo.delete(id);
    if (del) {
      return {
        msg: "Your new book has been deleted successfully!",
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



  findOne(id: number) {
    return this.bookRepo.findOneBy({ id });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
