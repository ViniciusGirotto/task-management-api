import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDTO } from './dto/auth-response.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  login(userName: string, password: string): AuthResponseDTO {
    console.log('userName', userName);
    const user = this.usersService.findByUserName(userName);

    console.log('user', user);

    if (!user && !compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userName: user.userName, sub: user.id };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTime };
  }
}
