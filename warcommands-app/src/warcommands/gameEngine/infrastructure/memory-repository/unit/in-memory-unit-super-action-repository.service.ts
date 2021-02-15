import { UnitSuperAcionRepositopriService } from 'src/warcommands/gameEngine/domain/units/unit-actions/unit-super-action-repository.service';
import { UnitSuperActionDTO } from 'src/warcommands/gameEngine/domain/units/unit-actions/unit-super-action.dto';
import * as _ from 'lodash';

export class InMemoryUnitSuperActionRepositoryService implements UnitSuperAcionRepositopriService {
    
    private superActionList: Map<string, UnitSuperActionDTO> = new Map<string, UnitSuperActionDTO>();

    save(superAction: UnitSuperActionDTO): void {
        const clone = _.cloneDeep(superAction);
        this.superActionList.set(clone.unitId, clone);
    }

    findByUnitId(unitId: string): UnitSuperActionDTO {
        return <UnitSuperActionDTO>_.cloneDeep(this.superActionList.get(unitId));
    }

    remove(superAction: UnitSuperActionDTO): void {
        this.superActionList.delete(superAction.unitId);
    }

    unitHasSuperaction(unitId: string): boolean {
        return this.superActionList.has(unitId);
    }

    getAll(): UnitSuperActionDTO[] {
        const list: UnitSuperActionDTO[] = [];

        this.superActionList.forEach((item) => {
            const clone = _.cloneDeep(item);
            list.push(clone);
        });

        return list;
    }    
}