import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
	private readonly cats: Cat[] = [];
	public makis = 10;
	create(cat: Cat) {
		this.cats.push(cat);
	}

	findAll(): Cat[] {
		return this.cats;
	}
}
