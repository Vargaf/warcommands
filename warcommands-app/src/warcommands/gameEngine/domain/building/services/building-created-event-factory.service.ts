import { GameEventBusService } from '../../game-event-bus/services/game-event-bus.service';
import { BuildingDTO } from '../model/building.dto';
import { BuildingTypeEnum } from '../model/building-type.enum';
import { BaseCreaedEvent } from '../../game-event-bus/model/base/base-created.event';
import { EventInterface } from '../../game-event-bus/model/event.interface';
import { BaseBuildingDTO } from '../base/base-building.dto';

export class BuildingCreatedEventFactoryService {

    constructor(
        private readonly gameEventBusService: GameEventBusService,
    ) {}

    cast(building: BuildingDTO): void {

        let event: EventInterface;

        switch (building.type) {
            case BuildingTypeEnum.Base: {
                event = new BaseCreaedEvent((building as BaseBuildingDTO));
                break;
            }
            default: {
                throw new Error('Erong building type: ' + building.type);
            }
        }

        this.gameEventBusService.cast(event);
    }

}