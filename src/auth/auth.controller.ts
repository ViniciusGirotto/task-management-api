import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponseDTO } from './dto/auth-response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(
    @Body('userName') userName: string,
    @Body('password') password: string,
  ): AuthResponseDTO {
    return this.authService.login(userName, password);
  }
}
