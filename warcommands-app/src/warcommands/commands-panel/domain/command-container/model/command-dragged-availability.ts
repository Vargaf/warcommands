import { CommandType } from '../../command/model/command-type.enum';

export const commandDraggedAvailability = {
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