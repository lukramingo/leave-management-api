import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './entities/auth-user.entity';

export const GetUser = createParamDecorator(
  (data: never, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
