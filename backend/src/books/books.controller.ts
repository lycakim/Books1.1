import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Request, Response, Headers, Inject, StreamableFile, Req } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BooksService } from './books.service';
import { diskStorage } from 'multer';
import { Helper } from './helper';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UsersService } from 'src/users/users.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';

@ApiTags('uploads')
@Controller('books')
export class BooksController {
  constructor(@Inject('BOOK_SERVICE') private readonly booksService: BooksService, private jwtService: JwtService, @Inject('USER_SERVICE') private readonly userService: UsersService) { }

  @Post('uploadBook')
  @UseInterceptors(FilesInterceptor('files', 1, {
    storage: diskStorage({
      destination: Helper.filePath,
      filename: Helper.customFileName
    }),
  }))
  async uploadBook(@UploadedFiles() files: Array<Express.Multer.File>, @Request() req, @Headers() headers) {
    var filenameDesc;
    var book_details;

    if (files.length > 0) {
      files.forEach(element => {
        filenameDesc = element.filename;
      });

      book_details = {
        book_name: req.body.book_name,
        cover_image: filenameDesc,
        book_desc: req.body.book_desc,
        userID: req.body.userID
      };

    } else if (files.length == 0) {
      filenameDesc = 'DefaultCoverImg.jpg';
      book_details = {
        book_name: req.body.book_name,
        cover_image: filenameDesc,
        book_desc: req.body.book_desc,
        userID: req.body.userID
      };

    }

    return this.booksService.create(book_details)
  }

  @Get('stream-file/:filename')
  getFile(@Param('filename') filename: string, @Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), '../backend/uploadedCoverImg/' + filename));

    res.set({
      'Content-Type': 'image/jpg',
      'Content-Disposition': 'inline; filename=img.jpg',
    });
    file.on('error', (err) => {
      console.error(err);
    });
    return new StreamableFile(file);
  }

  @Post('updateMyBook')
  updateBook(@Request() req) {
    console.log(req.body)
    return this.booksService.updateBook(req.body);
  }

  @Post('updateBookWithCoverImg')
  @UseInterceptors(FilesInterceptor('files', 1, {
    storage: diskStorage({
      destination: Helper.filePath,
      filename: Helper.customFileName
    }),
  }))

  async updateBookWithCoverImg(@UploadedFiles() files: Array<Express.Multer.File>, @Request() req) {
    if (req.body.itemToDeleteCoverName != 'DefaultCoverImg.jpg') {
      fs.unlink(join(process.cwd(), `../backend/uploadedCoverImg/${req.body.itemToDeleteCoverName}`), async (err) => {
        if (err) {
          console.log(err)
        }

      });
    }
    console.log(req.body)
    var filenameDesc;
    var book_details;
    const getBook = await this.booksService.findOne(req.body.book_id);

    if (files.length > 0) {
      if (getBook.book_name == req.body.book_name) {
        book_details = {
          book_id: req.body.book_id,
          book_name: getBook.book_name,
          cover_image: files[0].filename,
          book_desc: req.body.book_desc,
          allowed_users: req.body.allowed_users,
          userID: req.body.userID
        };
      }
      else {
        book_details = {
          book_id: req.body.book_id,
          book_name: req.body.book_name,
          cover_image: files[0].filename,
          allowed_users: req.body.allowed_users,
          book_desc: req.body.book_desc,
          userID: req.body.userID
        };
      }
    } else if (files.length == 0) {
      filenameDesc = 'DefaultCoverImg.jpg';
      if (getBook.book_name == req.body.book_name) {
        book_details = {
          book_id: req.body.book_id,
          book_name: getBook.book_name,
          cover_image: filenameDesc,
          book_desc: req.body.book_desc,
          allowed_users: req.body.allowed_users,
          userID: req.body.userID
        };
      }
      else {
        book_details = {
          book_id: req.body.book_id,
          book_name: req.body.book_name,
          cover_image: filenameDesc,
          book_desc: req.body.book_desc,
          allowed_users: req.body.allowed_users,
          userID: req.body.userID
        };
      }

    }
    return this.booksService.updateBookWithCoverImg(book_details)
  }

  @Post('getMyBooks')
  getMyBooks(@Request() req) {
    return this.booksService.getMyBooks(req.body);
  }

  @Get('getAllBooks')
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('getAllowedUsers')
  getAllowedUsers() {
    return this.booksService.getAllowedUsers();
  }


  @Post('delete')
  deleteBook(@Request() req) {
    if (req.body.cover_image != 'DefaultCoverImg.jpg') {
      fs.unlink(join(process.cwd(), `../backend/uploadedCoverImg/${req.body.cover_image}`), async (err) => {
        if (err) {
          console.log(err)
        }

      });
    }
    return this.booksService.deleteBook(req.body.id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
