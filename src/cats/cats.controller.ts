import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat, FindOneCatParams } from './interfaces/cat.interface';
import { JoiValidationPipe } from './pipes/validation.pipe';

@Controller('cats')
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Get()
	async findAll(): Promise<Cat[]> {
		return this.catsService.findAll();
	}

	@Post()
	async create(
		@Body(new JoiValidationPipe()) createCatDto: CreateCatDto,
	): Promise<void> {
		this.catsService.create(createCatDto);
	}

	@Get(':id')
	findOne(@Param() params: FindOneCatParams): string {
		return `This action returns a #${params.id} cat`;
	}
}
