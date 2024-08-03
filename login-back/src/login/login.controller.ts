import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  @Post()
  signIn(@Body() signInDto: Record<string, any>) {
    return this.loginService.signIn(signInDto.username, signInDto.password);
  }
}
