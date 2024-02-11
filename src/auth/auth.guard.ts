import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //console.log(context.switchToHttp().getRequest().user);
        const user = context.switchToHttp().getRequest().user;
        if (!user) {
            return false
        }
        else {
            return true;
        }

    }

}