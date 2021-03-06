import { CommandPathManageable } from 'src/warcommands/commands-panel/domain/command-component/composition/command-path-manageable';
import { CommandFormValidable } from 'src/warcommands/commands-panel/domain/command-component/composition/command-form-validable';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { CommandPathErrorManagerService } from '../../commands-panel/services/command-path-error-manager.service';
import { CommandComponentBase } from 'src/warcommands/commands-panel/domain/command-component/composition/command-component-base';
import { Subscription, Subject } from 'rxjs';

export interface CommandComponent extends CommandPathManageable, CommandFormValidable, CommandComponentBase {}

export class CommandComponent {

    protected subscriptionManager: Subscription = new Subscription();
    protected commandComponentInitializationObserver: Subject<boolean> = new Subject();

    constructor(
        protected readonly commandPathFinderService: CommandPathFinderService,
        protected readonly commandPathErrorManagerService: CommandPathErrorManagerService,
    ) {

    }

    

}