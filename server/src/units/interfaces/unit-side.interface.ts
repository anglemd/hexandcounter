import { UnitMovementTypesEnum } from '../enums/unit-movement-type.enum';

export interface IUnitSideJson {
  combatStrength?: number;
  barrageStrength?: number;
  actionRating?: number; //action rating
  movementPoints?: number;
  movementType?: UnitMovementTypesEnum;
  range?: number;
  transportPoints?: number;
}
