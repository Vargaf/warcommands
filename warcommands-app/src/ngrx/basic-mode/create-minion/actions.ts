import { createAction, props } from '@ngrx/store';
import { MinionEntityInterface } from 'src/warcommands/basic-mode/domain/minion/minion-entity-interface';

export const addMinionToQueue =
    createAction('[Game base structure action] Add a minion to a base', props<{ baseId: number, minion: MinionEntityInterface}>());
export const minionCreated = createAction('[Game base structure action] Minion created', props<{ minion: MinionEntityInterface }>());
export const addMinionToMinionList =
    createAction('[Game base structure action] Add the minion created to the minions list', props<{ minion: MinionEntityInterface }>());

