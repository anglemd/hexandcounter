import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { UnitRecord, UnitSchema } from './schemas/unit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UnitRecord.name, schema: UnitSchema }]),
  ],
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}
