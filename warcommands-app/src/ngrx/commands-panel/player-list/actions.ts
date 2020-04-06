import { createAction, props } from '@ngrx/store';
import { CurrentPlayerDTO } from 'src/warcommands/commands-panel/domain/current-player/model/current-player.dto';

const actionNamespace = '[Player list]';

export const loadCurrentPlayer = createAction(actionNamespace + ' Load the current player', props<{ player: CurrentPlayerDTO }>());