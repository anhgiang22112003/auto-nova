import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import open from 'open'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT ?? 3000)
  open('http://localhost:3000/auto')

}
bootstrap()
