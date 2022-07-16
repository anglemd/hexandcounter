import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { IUnitJson } from './interfaces/unit.interface';
import { UnitDocument, UnitRecord } from './schemas/unit.schema';

@Injectable()
export class UnitsService {
  constructor(
    @InjectModel(UnitRecord.name)
    private readonly unitModel: Model<UnitDocument>,
  ) {}
  create(createUnitDto: IUnitJson) {
    return 'This action adds a new unit';
  }

  findAll() {
    return `This action returns all units`;
  }

  // using an oid or a markerId string to fetch record....
  findOneByOidOrRecordId(id: string) {
    let query: Object = { markerId: id };
    try {
      let oid = new Types.ObjectId(id);
      query = { _id: oid };
    } catch (err) {
      query = { markerId: id };
    }
    return this.unitModel.findOne(query);
  }

  findAllMatchingRecords(term: string) {
    let regex = { $regex: term.trim(), $options: 'i' };
    let query = {
      $or: [
        { name: regex },
        { markerId: regex },
        { faction: regex },
        { division: regex },
      ],
    };
    return this.unitModel.find(query);
  }

  update(id: string, updateUnitDto: IUnitJson) {
    return this.unitModel.replaceOne({ _id: id }, updateUnitDto);
  }

  remove(id: number) {
    return `This action removes a #${id} unit`;
  }
}
