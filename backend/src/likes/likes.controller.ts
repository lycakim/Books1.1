import { Controller, Get, Post, Body, Patch, Param, Request, Delete, Injectable } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService, @InjectRepository(Like) private readonly likeRepo: Repository<Like>) { }

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Post('addLike')
  addLike(@Request() req) {
    return this.likesService.addNew(req.body);
  }

  @Get('getLikesCount')
  async getLikeCount() {
    return await this.likesService.getLikes();
  }

  @Post('getLikePerBook')
  getLikePerBook(@Request() req) {
    return this.likesService.getLikePerBook(req.body);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
