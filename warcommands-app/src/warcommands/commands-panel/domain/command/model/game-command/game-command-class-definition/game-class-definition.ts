import { ClassDefinition } from '../../class-definition/class-definition.dto';
import { GameClassMethodList } from './methods/game-class-method-list';
import { GameClassPropertyList } from './properties/game-class-property-list';

export const GameClassDefinition: ClassDefinition = {
    methods: GameClassMethodList,
    properties: GameClassPropertyList
}