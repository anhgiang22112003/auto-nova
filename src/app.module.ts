import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutoLoginService } from './auto-login/auto-login.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AutoLoginService],
})
export class AppModule {}
