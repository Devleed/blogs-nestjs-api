import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './blog.model';

import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blogs', schema: BlogSchema }])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
