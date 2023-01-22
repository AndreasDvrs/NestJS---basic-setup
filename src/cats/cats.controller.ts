import { 
	Controller, Get, Param, Post, Body, 
	ParseIntPipe, Query, DefaultValuePipe, 
	ParseBoolPipe, UseGuards, SetMetadata, UseInterceptors, UseFilters 
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { JoiValidationPipe } from '../pipes/validation.pipe';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { User } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Get()
	@Auth('admin')
	async findAll(
		@Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
		@Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
	): Promise<Cat[]> {
		return this.catsService.findAll();
	}

	@Post()
	@Roles('admin')
	@UseFilters(HttpExceptionFilter)
	async create(
		@Body(JoiValidationPipe) createCatDto: CreateCatDto,
	): Promise<void> {
		this.catsService.create(createCatDto);
	}

	@Get(':id')
	findOne(
		@Param('id', new ParseIntPipe()) id: number,
		@User('firstName') firstName: string
	): string {
		console.log(this.catsService.makis)
		return `This action returns a #${id} cat`;
	}
}
