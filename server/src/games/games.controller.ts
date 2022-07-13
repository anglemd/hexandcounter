import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { UserRecord } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findByUserId(@Request() req: Request) {
    let user = req['user'] as UserRecord;
    // console.log(user);
    return this.gamesService.findAllGamesForUser(user);
  }
  // @Get()
  // findAll() {
  //   return this.gamesService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // console.log(id);
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
