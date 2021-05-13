import { BuildingTypeEnum } from "src/warcommands/game-middleware/model/building/building-type.enum";

export interface BuildingFilterDTO {

    id?: string;

    type?: BuildingTypeEnum;

    playerId?: string;

}