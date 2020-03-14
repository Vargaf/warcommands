import { CommandType } from '../../command/model/command-type.enum';
import { CreateMinionPreviewComponent } from 'src/app/commands-panel/drag-previews/create-minion-preview/create-minion-preview.component';
import { VariablePreviewComponent } from 'src/app/commands-panel/drag-previews/variable-preview/variable-preview.component';
import { SetVariablePreviewComponent } from 'src/app/commands-panel/drag-previews/set-variable-preview/set-variable-preview.component';
import { IfThenPreviewComponent } from 'src/app/commands-panel/drag-previews/if-then-preview/if-then-preview.component';
import { IfThenElsePreviewComponent } from 'src/app/commands-panel/drag-previews/if-then-else-preview/if-then-else-preview.component';

export class CommandsPreviewComponentFactory {

    static getComponent(commandType: CommandType) {

        let component: any;
        switch (commandType) {
            case CommandType.CreateMinion: {
                component = CreateMinionPreviewComponent;
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
            case CommandType.IfThen: {
                component = IfThenPreviewComponent;
                break;
            }
            case CommandType.IfThenElse: {
                component = IfThenElsePreviewComponent;
                break;
            }
            default: {
                throw new Error('The component preview does not exist. Component: ' + CommandType[commandType]);
            }
        }

        return component;
    }

}
