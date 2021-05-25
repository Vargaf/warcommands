import { Component, Entity } from "aframe";
import { WorkerUnitDTO } from "src/warcommands/game-middleware/model/unit/worker-unit.dto";
import { AFrameComponentPausableContent } from "../components/aframe-component-pausable-content";

export class AFramePausableContentService {

    private pausableContentElement!: Entity;
    constructor(
        private readonly pausableContentComponent: AFrameComponentPausableContent,
    ) {
        this.pausableContentComponent.getPausableContentElement().then((pausableElement) => {
            this.pausableContentElement = pausableElement;
        });
    }

    pause(): void {
        this.pausableContentElement.pause();
    }

    resume(): void {
        this.pausableContentElement.play();
    }

    getMatterFarmFromPool(): any {
        return this.getPoolEntity('pool__matter_farm_building');
    }

    getEnergyFarmFromPool(): any {
        return this.getPoolEntity('pool__energy_farm_building');
    }

    getBaseFromPool(): any {
        return this.getPoolEntity('pool__base_building');
    }

    getWorkerFromPool():any {
        return this.getPoolEntity('pool__worker_unit');
    }

    returnWorkerToPool(worker: WorkerUnitDTO):any {
        (this.pausableContentElement.components['pool__worker_unit'] as any).returnEntity(worker);
    }

    private getPoolEntity(poolName: string): Component {
        return (this.pausableContentElement.components[poolName] as any).requestEntity();
    }

}