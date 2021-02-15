import { ClassOptionDefinition } from '../../class-definition/class-option-definition.dto';
import { BaseClassMethodOptionList } from './methods/base-class-method-option-list';
import { BaseClassPropertyOptionList } from './properties/base-class-property-option-list';

export const BaseClassOptionsDefinition: ClassOptionDefinition = {
    methods: BaseClassMethodOptionList,
    properties: BaseClassPropertyOptionList
}