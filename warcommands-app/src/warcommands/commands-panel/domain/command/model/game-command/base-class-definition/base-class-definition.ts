import { ClassDefinition } from '../../class-definition/class-definition.dto';
import { BaseClassMethodList } from './methods/base-class-method-list';
import { BaseClassPropertyList } from './properties/base-class-property-list';

export const BaseClassDefinition: ClassDefinition = {
    methods: BaseClassMethodList,
    properties: BaseClassPropertyList
}