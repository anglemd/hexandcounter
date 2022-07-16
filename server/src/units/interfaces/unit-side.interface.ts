import { UnitMovementTypesEnum } from '../enums/unit-movement-type.enum';

export interface IUnitSideJson {
  combatStrength?: number;
  barrageStrength?: number;
  actionRating?: number; //action rating
  movementType?: UnitMovementTypesEnum;
  movementPoints?: number;
  throwRange?: number;
  transportCapacity?: number;
}
