import { CommandComponent } from 'src/warcommands/commands-panel/domain/command-component/composition/command-component';
import { CommandPathManageable } from './command-path-manageable';
import { CommandFormValidable } from './command-form-validable';
import { CommandPathFinderService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-finder.service';
import { CommandPathErrorManagerService } from '../../commands-panel/services/command-path-error-manager.service';
import { CommandUpdatedEvents } from '../../command/events/command-updated-events';
import { CommandMovedEvents } from '../../command/events/command-moved-events';
import { Subject, Subscription } from 'rxjs';
import { CommandType } from '../../command/model/command-type.enum';

export interface SetVarCommandComponent extends CommandComponent, CommandPathManageable, CommandFormValidable {}

export abstract class SetVarCommandComponent {

    protected commandComponentInitializationObserver: Subject<boolean> = new Subject();
    protected subscriptionManager: Subscription = new Subscription();
    
    constructor(
        protected readonly commandPathFinderService: CommandPathFinderService,
        protected readonly commandPathErrorManagerService: CommandPathErrorManagerService,
        protected readonly commandUpdatedEvents: CommandUpdatedEvents,
        protected readonly commandMovedEvents: CommandMovedEvents,
    ) {
        this.commandComponentInitializationObserver.subscribe(() => {
            this.commandInitialization();
        });
    }

    abstract relaunchFormValidation(): void;

    private commandInitialization(): void {
        const anyCommandUpdateWatcherSubscription = this.commandUpdatedEvents.commandCreatedListener().subscribe((command) => {
            if (command.id !== this.commandData.id) {
                if (command.type === CommandType.SetVariable || command.type === CommandType.SetVariableFromCommand) {
                    this.relaunchFormValidation();
                }
            }
        });

        const commandCreatedWatcherSubscription = this.commandMovedEvents.commandMovedListener().subscribe((event) => {
            if (event.command.id !== this.commandData.id) {
                if (event.command.type === CommandType.SetVariable || event.command.type === CommandType.SetVariableFromCommand) {
                    this.relaunchFormValidation();
                }
            }
        });

        this.subscriptionManager.add(commandCreatedWatcherSubscription);
        this.subscriptionManager.add(anyCommandUpdateWatcherSubscription);
    }

}

