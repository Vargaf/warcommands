import { CommandType } from '../../command/model/command-type.enum';
import { VariablePreviewComponent } from 'src/app/commands-panel/drag-previews/variable-preview/variable-preview.component';
import { SetVariablePreviewComponent } from 'src/app/commands-panel/drag-previews/set-variable-preview/set-variable-preview.component';
import { IfThenPreviewComponent } from 'src/app/commands-panel/drag-previews/if-then-preview/if-then-preview.component';
import { IfThenElsePreviewComponent } from 'src/app/commands-panel/drag-previews/if-then-else-preview/if-then-else-preview.component';

import { GameCommandPreviewComponent } from 'src/app/commands-panel/drag-previews/game-command-preview/game-command-preview.component';
import { SetVariableFromCommandPreviewComponent } from 'src/app/commands-panel/drag-previews/set-variable-from-command-preview/set-variable-from-command-preview.component';
import { LogicOperatorCommandPreviewComponent } from 'src/app/commands-panel/drag-previews/logic-operator-command-preview/logic-operator-command-preview.component';

export class CommandsPreviewComponentFactory {

    static getComponent(commandType: CommandType) {

        let component: any;
        switch (commandType) {
            case CommandType.Game: {
                component = GameCommandPreviewComponent;
                break;
            }
            case CommandType.Variable: {
                component = VariablePreviewComponent;
                break;
            }
            case CommandType.SetVariable: {
                component = SetVariablePreviewComponent;
                break;
            }
            case CommandType.SetVariableFromCommand: {
                component = SetVariableFromCommandPreviewComponent;
                break;
            }
            case CommandType.IfThen: {
                component = IfThenPreviewComponent;
                break;
            }
            case CommandType.IfThenElse: {
                component = IfThenElsePreviewComponent;
                break;
            }
            case CommandType.LogicOperator: {
                component = LogicOperatorCommandPreviewComponent;
                break;
            }
            default: {
                throw new Error('The component preview does not exist. Component: ' + CommandType[commandType]);
            }
        }

        return component;
    }

}
