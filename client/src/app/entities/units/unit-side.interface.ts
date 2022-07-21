import { UnitMovementTypesEnum } from './unit-movement-type.enum';

export interface IUnitSideJson {
  combatStrength?: number;
  defendOnly?: boolean;
  barrageStrength?: number;
  actionRating?: number; //action rating
  movementPoints?: number;
  movementType?: UnitMovementTypesEnum;
  range?: number; // THROW RANGE OR BARRAGE RANGE...
  transportPoints?: number;
  supplyCapacity?: number; // TRUCKS / AIRPLANES
}

/*
COMBAT_UNIT: 
combatStrength
actionRating
movementPoints
movementType

ARTILLARY_UNIT
barrageStrength?: number;
range
actionRating
movementPoints
movementType

TRANSPORT_TRUCK | TRANSPORT_WAGON
movementPoints
movementType
transportPoints?: number;

SUPPLY_DUMP
<none>

HQ
range
movementPoints
movementType

*/
