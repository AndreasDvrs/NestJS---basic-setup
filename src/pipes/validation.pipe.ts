import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NativeTypes } from '../cats/constants/native-types';

@Injectable()
export class JoiValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToInstance(metatype, value);
		const errors = await validate(object);
		if (errors?.length) {
			throw new BadRequestException('Validation failed');
		}
		return value;
	}

	private toValidate(metatype: NativeTypes): boolean {
		const types: NativeTypes[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
