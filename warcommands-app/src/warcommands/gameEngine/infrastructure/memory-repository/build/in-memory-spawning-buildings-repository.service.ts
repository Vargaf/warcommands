import { SpawingBuildingsRepositoryservice } from 'src/warcommands/gameEngine/domain/building/services/spawning-buildings-repository.service';
import * as _ from "lodash";


export class InMemorySpawningBuildingsRepositoryService implements SpawingBuildingsRepositoryservice {
    
    private spawningBuildingList: Map<string, string> = new Map<string, string>();

    save(buildingId: string): void {
        this.spawningBuildingList.set(buildingId, buildingId);
    }

    getAll(): string[] {
        const list: string[] = [];
        for (const buildingId of this.spawningBuildingList.values()) {
            list.push(buildingId);
        }
        return list;
    }

    remove(buildingId: string): void {
        this.spawningBuildingList.delete(buildingId);
    }
    
    countSpawingBuildings(): number {
        return this.spawningBuildingList.size;
    }
    
}