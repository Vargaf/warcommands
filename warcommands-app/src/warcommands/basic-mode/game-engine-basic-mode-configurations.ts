import { InjectionToken } from '@angular/core';

export const GAME_CONFIG = new InjectionToken<GameEngineBasicModeConfiguration>('src/warcommands/basic-mode/game-engine-basic-mode-configurations.ts');

export interface GameEngineBasicModeConfiguration {
    tileSize: number;
}

export const GAME_ENGINE_BASIC_MODE_CONFIGURATION: GameEngineBasicModeConfiguration = {
    tileSize: 20,
};
