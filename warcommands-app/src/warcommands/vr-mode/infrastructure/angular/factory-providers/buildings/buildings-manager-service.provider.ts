import { BaseBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/base-building-manager.service";
import { BuildingsManagerService } from "src/warcommands/vr-mode/domain/buildings/service/buildings-manager-service";
import { BuildingsRepositoryInterface } from "src/warcommands/vr-mode/domain/buildings/service/buildings-repository.interface";
import { EnergyFarmBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/energy-farm-building-manager.service";
import { MatterFarmBuildingManagerService } from "src/warcommands/vr-mode/domain/buildings/service/matter-farm-building-manager.service";


const factory = (
    baseBuildingManager: BaseBuildingManagerService,
    buildingsRepository: BuildingsRepositoryInterface,
    matterFarmBuildingManager: MatterFarmBuildingManagerService,
    energyFarmBuildingManager: EnergyFarmBuildingManagerService
) => {
    return new BuildingsManagerService(
        baseBuildingManager,
        buildingsRepository,
        matterFarmBuildingManager,
        energyFarmBuildingManager,
    );
};

export const provider = {
    provide: BuildingsManagerService,
    useFactory: factory,
    deps: [
        BaseBuildingManagerService,
        BuildingsRepositoryInterface,
        MatterFarmBuildingManagerService,
        EnergyFarmBuildingManagerService,
    ]
};
