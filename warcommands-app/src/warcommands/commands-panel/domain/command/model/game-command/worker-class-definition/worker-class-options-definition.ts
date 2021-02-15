import { ClassOptionDefinition } from '../../class-definition/class-option-definition.dto';
import { WorkerClassMethodOptionList } from './methods/worker-class-method-option-list';
import { WorkerClassPropertyOptionList } from './properties/worker-class-property-option-list';


export const WorkerClassOptionsDefinition: ClassOptionDefinition = {
    methods: WorkerClassMethodOptionList,
    properties: WorkerClassPropertyOptionList
}