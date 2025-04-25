import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator<object>(
  (data, ctx: ExecutionContext) => {
    return data;
  },
);
