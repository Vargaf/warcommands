import { GameLogicClockService } from "src/warcommands/vr-mode/domain/game-engine/game-logic-clock.service";

export class AFrameComponentClock {

    private componentName = 'clock-component';

    constructor(
        private readonly gameClockService: GameLogicClockService,
    ) {

        const scope = this;

        AFRAME.registerComponent(this.componentName, {

            tick: function() {
                scope.gameClockService.updateFrameTime();
            }

        });

    }
}