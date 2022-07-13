import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { tap } from 'rxjs';
import { UserRecord } from 'src/users/schemas/user.schema';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameDocument, GameRecord } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(GameRecord.name)
    private readonly gameModel: Model<GameDocument>,
  ) {}

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  findAllGamesForUser(userRecord: UserRecord) {
    let userId = new Types.ObjectId(userRecord._id); // Use the user._id to find all game records this user is participating in.
    return this.gameModel.find({ users: { $elemMatch: { _id: userId } } });
  }

  findOne(id: string) {
    return this.gameModel.findOne({ _id: id }).exec();
  }

  findAll() {
    return `This action returns all games`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
