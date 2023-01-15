import { 
	Controller, Get, Param, Post, Body, 
	ParseIntPipe, Query, DefaultValuePipe, 
	ParseBoolPipe, UseGuards, SetMetadata 
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { JoiValidationPipe } from '../pipes/validation.pipe';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Get()
	async findAll(
		@Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
		@Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
	): Promise<Cat[]> {
		return this.catsService.findAll();
	}

	@Post()
	@Roles('admin')
	async create(
		@Body(JoiValidationPipe) createCatDto: CreateCatDto,
	): Promise<void> {
		this.catsService.create(createCatDto);
	}

	@Get(':id')
	findOne(@Param('id', new ParseIntPipe()) id: number): string {
		return `This action returns a #${id} cat`;
	}
}
