import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import { createBlogDto } from './dtos/create-blog.dto';
import { editBlogDto } from './dtos/edit-blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  /**
   * ? Retrieves all blogs in the database
   */
  @Get()
  async getAllBlogs(@Res({ passthrough: true }) res): Promise<Blog[]> {
    const response = await this.blogService.findAll();

    if (response.type === 'error') {
      res.status(HttpStatus.BAD_REQUEST);
      return response.error;
    }

    return response.data;
  }

  /**
   * ? Creates new blog in the database
   */
  @Post(':authorUid')
  async createBlog(
    @Res({ passthrough: true }) res,
    @Body() blog: createBlogDto,
    @Param('authorUid') authorUid: string,
  ): Promise<Blog> {
    const response = await this.blogService.createBlog(authorUid, blog);

    if (response.type === 'error') {
      res.status(HttpStatus.BAD_REQUEST);
      return response.error;
    }

    return response.data;
  }

  /**
   * ? Retrieves a single blog in the database
   */
  @Get(':id')
  async setViewedBlog(
    @Res({ passthrough: true }) res,
    @Param('id') id: string,
  ): Promise<any> {
    const response = await this.blogService.setViewedBlog(id);

    if (response.type === 'error') {
      res.status(HttpStatus.NOT_FOUND);
      return response.error;
    }

    return response.data;
  }

  /**
   * ? Edits a blog in the database
   */
  @Patch(':id/:authorUid')
  async editBlog(
    @Res({ passthrough: true }) res,
    @Param('id') id: string,
    @Param('authorUid') authorUid: string,
    @Body() changes: editBlogDto,
  ): Promise<any> {
    let changeableFields = ['title', 'content'];
    for (let key in changes) {
      if (!changeableFields.includes(key)) {
        res.status(HttpStatus.BAD_REQUEST);
        return 'These fields cannot be changed';
      }
    }

    const response = await this.blogService.editBlog(authorUid, id, changes);

    if (response.type === 'error') {
      res.status(HttpStatus.NOT_FOUND);
      return response.error;
    }

    return response.data;
  }

  /**
   * ? Deletes a blog from the database
   */
  @Delete(':id/:authorUid')
  async deleteBlog(
    @Res({ passthrough: true }) res,
    @Param('id') id: string,
    @Param('authorUid') authorUid: string,
  ): Promise<any> {
    const response = await this.blogService.deleteBlog(authorUid, id);

    if (response.type === 'error') {
      res.status(HttpStatus.NOT_FOUND);
      return response.error;
    }

    return response.data;
  }
}
