import { GenericCommandDTO } from '../generic-command.dto';
import { CommandType } from '../command-type.enum';
import { LogicOperatorENUM } from './logic-operator.enum';

export interface LogicOperatorCommandEntity extends GenericCommandDTO {
    type: CommandType.LogicOperator;
    data: {
        operator: LogicOperatorENUM
    },
    innerCommandContainerIdList: {
        firstCommandContainerId: string,
        secondCommandContainerId: string
    };
}