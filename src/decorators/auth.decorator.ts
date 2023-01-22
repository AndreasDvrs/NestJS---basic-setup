import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';


export function Auth(...roles: any[]) {
	return applyDecorators(
		SetMetadata('roles', roles),
		UseGuards(AuthGuard, RolesGuard)
		//ApiBearerAuth(),
		//ApiUnauthorizedResponse({ description : 'Unauthorized'})
	)
}
