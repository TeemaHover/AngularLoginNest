import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Injectable()
export class LoginService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string; status: number }> {
    const user = await this.userService.findOne(username);

    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, username: user.username };
    const { password: _, ...result } = user;
    return {
      access_token: await this.jwtService.signAsync(payload),
      status: 200,
    };
  }
  validateTokenAndGetUserId(token: string): number | null {
    try {
      const decoded = jwt.verify(token, jwtConstants.secret) as {
        userId: number;
      };
      console.log('Decoded: ', decoded);
      return decoded.userId;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
