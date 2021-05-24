import { BuildingDTO } from "src/warcommands/game-middleware/model/building/building.dto";
import { BuildingFilterDTO } from "../model/building-filter.dto";

export abstract class BuildingsRepositoryInterface {

    abstract save(building: BuildingDTO): void;

    abstract findBy(filter: BuildingFilterDTO): BuildingDTO[];

    abstract findOneBy(filter: BuildingFilterDTO): BuildingDTO;

    abstract findOneById(buildingId: string): BuildingDTO;
}