import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { CommandsModule } from './commands/commands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    CommandsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
