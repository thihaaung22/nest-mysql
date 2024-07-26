import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { ormconfig } from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return ormconfig
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error("Invalid options passed.")
        }
        return addTransactionalDataSource(new DataSource(options))
      }
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
