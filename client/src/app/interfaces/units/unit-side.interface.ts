import { MovementTypesEnum } from 'src/app/enums/units/movement-type.enum';

export interface IUnitSide {
  combatStrength?: number;
  barrageStrength?: number;
  actionRating?: number; //action rating
  movementType?: MovementTypesEnum;
  movementPoints?: number;
  throwRange?: number;
  transportCapacity?: number;
}
