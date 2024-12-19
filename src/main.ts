import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  //Задаем порт сервера
  const PORT = process.env.PORT || 3000;

  //Инициализируем приложение
  const app = await NestFactory.create(AppModule);

  //Запускаем сервер
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
