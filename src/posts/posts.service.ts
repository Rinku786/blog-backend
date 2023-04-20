import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdUser = new this.postModel(createPostDto);
    return createdUser.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    const user = await this.postModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updatedUser = await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.postModel.deleteOne({ _id: id }).exec();
    // if (result.affected === 0) {
    //   throw new NotFoundException(`Post with ID ${id} not found`);
    // }
    // if (result && result.raw && result.raw.affectedRows === 0) {
    //   throw new NotFoundException(`Post with ID "${id}" not found`);
    // }
  }
}
