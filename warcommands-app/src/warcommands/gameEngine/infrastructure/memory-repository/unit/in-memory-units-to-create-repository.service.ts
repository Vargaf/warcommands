import { UnitsToCreateRepositoryService } from 'src/warcommands/gameEngine/domain/units/services/units-to-create-repository.service';
import { UnitToCreateOnBuildingDTO } from 'src/warcommands/gameEngine/domain/units/model/unit-to-create-on-building.dto';

export class InMemoryUnitsToCreateRepositoryService implements UnitsToCreateRepositoryService {

    private unitsList: UnitToCreateOnBuildingDTO[] = [];

    save(unitToCreate: UnitToCreateOnBuildingDTO): void {
        this.unitsList.push(unitToCreate);
    }

    getAll(): UnitToCreateOnBuildingDTO[] {
        return this.unitsList;
    }

    remove(unitToCreate: UnitToCreateOnBuildingDTO): void {
        const index = this.unitsList.findIndex((item) => {
            return item.buildingId === unitToCreate.buildingId && 
                item.unitType === unitToCreate.unitType;
        });

        this.unitsList.splice(index, 1);
    }
    
}