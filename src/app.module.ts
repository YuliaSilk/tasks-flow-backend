import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/trello-clone'),
    BoardsModule,
  ],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { CardsModule } from './cards/cards.module';
// import { BoardsModule } from './boards/boards.module';

// @Module({
//   imports: [CardsModule, BoardsModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
