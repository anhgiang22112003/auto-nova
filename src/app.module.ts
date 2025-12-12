import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutoLoginService } from './auto-login/auto-login.service';
import { AutoLoginController } from './auto-login/auto-login.controller'

@Module({
  imports: [],
  controllers: [AppController,AutoLoginController],
  providers: [AppService, AutoLoginService],
})
export class AppModule {}
