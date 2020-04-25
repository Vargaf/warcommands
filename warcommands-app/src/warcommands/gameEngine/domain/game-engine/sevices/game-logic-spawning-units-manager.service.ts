import { EnqueueUnitsManagerService } from './enqueue-units-manager.service';
import { SpawnUnitsManagerService } from './spawn-units-manager.service';

export class GameLogicSpawningUnitsManager {

    constructor(
        private readonly enqueueUnitsManagerService: EnqueueUnitsManagerService,
        private readonly spawnUnitsManagerService: SpawnUnitsManagerService,
    ) {}

    spawnUnits(): void {
        this.spawnUnitsManagerService.spawnUnits();
    }

    enqueueUnits(): void {
        this.enqueueUnitsManagerService.enqueueUnits();
    }

}