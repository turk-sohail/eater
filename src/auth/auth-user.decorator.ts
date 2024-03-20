import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const AuthUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const user = ctx.switchToHttp().getRequest().user;
        return user;
    }
)