import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blogs/blog.module';

@Module({
  imports: [
    BlogModule,
    MongooseModule.forRoot(
      'mongodb+srv://waleed:test@cluster0.4e26b.mongodb.net/blogs?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
