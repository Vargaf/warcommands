import { CommandPathManageable } from 'src/warcommands/commands-panel/domain/command-component/composition/command-path-manageable';
import { CommandFormValidable } from 'src/warcommands/commands-panel/domain/command-component/composition/command-form-validable';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { CommandPathErrorManagerService } from '../../commands-panel/services/command-path-error-manager.service';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { Subscription, Subject } from 'rxjs';

export interface CommandComponentBase extends CommandPathManageable, CommandFormValidable {}

export abstract class CommandComponentBase {

    commandData: GenericCommandDTO;

    protected commandPathFinderService: CommandPathFinderService;
    protected commandPathErrorManagerService: CommandPathErrorManagerService;

    protected subscriptionManager: Subscription = new Subscription();
    protected commandComponentInitializationObserver: Subject<boolean> = new Subject();

    protected abstract initializeCommand(): void;

    commandComponentInitialize(): void {
        this.initializeCommand();
        this.initializeForm();
        this.loadCommandPath(this.commandData.id);
        this.commandComponentInitializationObserver.next(true);
    }

    commandComponentDestroy(): void {
        this.resetCommandPathError();
        this.subscriptionManager.unsubscribe();
    }

    commandFormStatusManager(): void {
        setTimeout(() => {
            const previousStatus = this.isCommandValid ?? true;

            this.commandFormStatusChange();
            this.setCommandPathError(this.commandData.id, previousStatus, this.commandForm.valid);
        });
    }

    commandComponentInitializationWatcher(): Subject<boolean> {
        return this.commandComponentInitializationObserver;
    }

}