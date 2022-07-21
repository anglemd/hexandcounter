import { UnitMovementTypesEnum } from '../enums/unit-movement-type.enum';

export interface IUnitSideJson {
  combatStrength?: number;
  defendOnly?: boolean;
  barrageStrength?: number;
  actionRating?: number; //action rating
  movementPoints?: number;
  movementType?: UnitMovementTypesEnum;
  range?: number;
  transportPoints?: number;
  supplyCapacity?: number; // TRUCKS / AIRPLANES
}
