import { SpawnUnitsManagerService } from './spawn-units-manager.service';

export class GameLogicSpawningUnitsManager {

    constructor(
        private readonly spawnUnitsManagerService: SpawnUnitsManagerService,
    ) {}

    spawnUnits(): void {
        this.spawnUnitsManagerService.spawnUnits();
    }

}