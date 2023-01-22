import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { RolesGuard } from './guards/roles.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
	imports: [CatsModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter
		}
	]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes(CatsController);
	}
}
