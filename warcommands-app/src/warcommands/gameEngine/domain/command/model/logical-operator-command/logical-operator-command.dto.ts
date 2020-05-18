import { CommandDTO } from '../command.dto';
import { CommandType } from '../command-type.enum';
import { LogicOperatorENUM } from './logic-operator.enum';

export interface LogicalOperatorCommandDTO extends CommandDTO {
    type: CommandType.LogicOperator;
    data: {
        operator: LogicOperatorENUM
    },
    innerCommandContainerIdList: {
        firstCommandContainerId: string,
        secondCommandContainerId: string
    };
}