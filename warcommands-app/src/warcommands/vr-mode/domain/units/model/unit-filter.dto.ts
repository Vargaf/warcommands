import { UnitActionGenericDTO } from "src/warcommands/game-middleware/model/unit-action/unit-action-generic.dto";
import { UnitSpawningStatusENUM } from "src/warcommands/game-middleware/model/unit/unit-spawning-status.enum";
import { UnitTypeENUM } from "src/warcommands/game-middleware/model/unit/unit-type.enum";

export interface UnitFilterDTO {
    id?: string;
    playerId?: string;
    baseId?: string;
    spawnerBuildingId?: string;
    spawningStatus?: UnitSpawningStatusENUM;
    type?: UnitTypeENUM;
    action?: UnitActionGenericDTO;
}