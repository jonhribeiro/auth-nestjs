import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/local-auth.guard';
import { IsPublic } from './decorators/is-public.decorator';

// @Controller()
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   // @IsPublic()
//   @UseGuards(LocalAuthGuard)
//   @Post('login')
//   // @HttpCode(HttpStatus.OK)
//   // async login(@Request() req: AuthRequest) {
//   async login(@Body() body: any) {
//     return this.authService.login(body.username, body.password);
//   }
// }

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post('login')
  login(@Body() body) {
    return this.authService.login(body.username, body.password); 
  }

  //@Role('admin')
  @UseGuards(JwtGuard)
  @Get('test-auth')
  test(@Req() req) {
    console.log(req.user);
    return {
      name: 'Luiz Carlos',
    };
  }
}
