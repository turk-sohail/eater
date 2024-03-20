import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthUser } from './auth/auth-user.decorator';
import { User } from './users/enteties/users.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(AuthGuard)
  @Get()
  getHello(@AuthUser() user: User): string {
    console.log(user)
    return this.appService.getHello();
  }
}
