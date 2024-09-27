import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { BoardsModule } from './boards/boards.module';
import { MongooseModule } from '@nestjs/mongoose';

const MONGO_URL = process.env.MONGO_URL;
@Module({
  imports: [CardsModule, BoardsModule, MongooseModule.forRoot(MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { BoardsModule } from './boards/boards.module'; // Import your module

// const MONGO_URL = process.env.MONGO_URL;
// @Module({
//   imports: [
//     MongooseModule.forRoot(MONGO_URL),
//     BoardsModule, // Include your boards module
//   ],

// })
// export class AppModule {}
