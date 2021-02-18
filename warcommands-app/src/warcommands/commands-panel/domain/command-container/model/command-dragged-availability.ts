import { CommandType } from '../../command/model/command-type.enum';

export interface CommandDraggedAvailability {
    [ id: string ] : CommandType[];
}

export const CommandDraggedAvailabilityList: CommandDraggedAvailability = {
    [CommandType.SetVariableFromCommand]: [
        CommandType.Game,
        CommandType.Variable
    ],
    [CommandType.LogicOperator]: [
        CommandType.Game,
        CommandType.Variable
    ],
    [CommandType.IfThen]: [
        CommandType.Game,
        CommandType.Variable,
        CommandType.LogicOperator
    ]
};