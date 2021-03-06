import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { LocalAuthGuard } from './guards/local-auth-guard';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'Auth / is working.';
  }

  @UseGuards(LocalAuthGuard) // This AuthGuard will ensure a username and password are submitted that match a UserRecord.
  @Post('login')
  async login(@Request() req) {
    // console.log('Auth Controller login():');
    // console.log(req.user);
    // console.log(this.authService.btoa('test'));
    let key = this.authService.login(req.user);
    // console.log(key);
    return key;
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  async validate(@Request() req) {
    // console.log('======== Auth controller POST /api/auth/validate =====');
    // console.log(req.user);
    return req.user;
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
