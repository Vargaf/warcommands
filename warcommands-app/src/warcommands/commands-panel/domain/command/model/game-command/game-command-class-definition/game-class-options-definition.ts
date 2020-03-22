import { ClassOptionDefinition } from '../../class-definition/class-option-definition.dto';
import { GameClassMethodOptionList } from './methods/game-class-method-option-list';
import { GameClassPropertyOptionList } from './properties/game-class-property-option-list';

export const GameClassOptionsDefinition: ClassOptionDefinition = {
    methods: GameClassMethodOptionList,
    properties: GameClassPropertyOptionList
}