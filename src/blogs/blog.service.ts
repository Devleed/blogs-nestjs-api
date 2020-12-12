import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Blog } from './blog.model';
import { createBlogDto } from './dtos/create-blog.dto';
import { editBlogDto } from './dtos/edit-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blogs') private readonly blogModel: Model<Blog>) {}

  async findAll(): Promise<any> {
    try {
      const blogs = await this.blogModel.find();
      return { type: 'success', data: blogs };
    } catch (error) {
      console.log(error);
      return { type: 'error', error: String(error) };
    }
  }

  async createBlog(authorUid: string, body: createBlogDto): Promise<any> {
    try {
      const blog = await new this.blogModel({ authorUid, ...body }).save();

      return { type: 'success', data: blog };
    } catch (error) {
      return { type: 'error', error: String(error) };
    }
  }

  async setViewedBlog(id: string): Promise<any> {
    try {
      const blog = await this.blogModel.findById(id);

      if (!blog) throw new Error('no blog found');

      return { type: 'success', data: blog };
    } catch (error) {
      return { type: 'error', error: String(error) };
    }
  }

  async editBlog(
    authorUid: string,
    id: string,
    changes: editBlogDto,
  ): Promise<any> {
    try {
      const updatedBlog = await this.blogModel.findByIdAndUpdate(id, changes, {
        new: true,
      });

      if (!updatedBlog) throw new Error('no blog found to edit');

      if (updatedBlog.authorUid !== authorUid)
        throw new Error("You're not authenticated to edit this blog");

      return { type: 'success', data: updatedBlog };
    } catch (error) {
      return { type: 'error', error: String(error) };
    }
  }

  async deleteBlog(authorUid: string, id: string): Promise<any> {
    try {
      // const blog = await this.blogModel.findById(id);

      // if (!blog) throw new Error('no blog found to delete');

      // if (blog.authorUid !== authorUid)
      //   throw new Error("You're not authenticated to delete this blog");
      const deletedBlog = await this.blogModel.findByIdAndDelete(id);

      return { type: 'success', data: deletedBlog };
    } catch (error) {
      console.log(error);
      return { type: 'error', error: String(error) };
    }
  }
}
