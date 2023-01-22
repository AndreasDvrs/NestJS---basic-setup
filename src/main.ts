import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception-filters/all-exceptions.filter';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new LoggingInterceptor());
	app.useGlobalFilters(new HttpExceptionFilter());
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
	await app.listen(3000);
}
bootstrap();
