import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SetVariableCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/set-variable-command.entity';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';
import * as _ from 'lodash';
import { CommandNgrxRepositoryService } from 'src/warcommands/commands-panel/infrastructure/ngrx/command/command-ngrx-repository.service';
import { Subscription } from 'rxjs';

interface CommandContentDinamicClass {
    'set-variable-content-valid': boolean;
    'set-variable-content-invalid': boolean;
}

@Component({
    selector: 'app-set-variable',
    templateUrl: './set-variable.component.html',
    styleUrls: ['./set-variable.component.scss']
})
export class SetVariableComponent implements OnInit, OnDestroy {

    @Input() commandData: GenericCommandDTO;
    setVariableCommand: SetVariableCommandEntity;
    varName: string;
    varValue: string;

    private commandDataSubscription: Subscription;
    
    setVarForm: FormGroup;
    isCommandValid = true;
    commandContentDynamicClass: CommandContentDinamicClass = {
        'set-variable-content-valid': true,
        'set-variable-content-invalid': false
    }

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
        private readonly commandNgrxRepositoryService: CommandNgrxRepositoryService,
    ) { }

    ngOnInit() {
        this.initializeCommand();
        this.initializeForm();
    }

    ngOnDestroy() {
        this.commandDataSubscription.unsubscribe();
    }

    private initializeForm(): void {
        this.setVarForm = this.formBuilder.group({
            varName: [this.varName, [Validators.required, Validators.pattern('^[_a-z]\\w*$')]],
            varValue: [this.varValue, [Validators.required]]
        });

        this.setVarForm.statusChanges.subscribe(() => {
            if (this.setVarForm.valid) {
                this.isCommandValid = true;
            } else {
                this.isCommandValid = false;
            }

            this.setVariableCommand.data = {
                varName: this.setVarForm.get('varName').value,
                varValue: this.setVarForm.get('varValue').value
            }

            this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);

            this.commandContentDynamicClass["set-variable-content-valid"] = this.isCommandValid;
            this.commandContentDynamicClass["set-variable-content-invalid"] = !this.isCommandValid;
        });
    }

    private initializeCommand(): void {
        this.setVariableCommand = (_.cloneDeep(this.commandData) as SetVariableCommandEntity);

        this.varName = this.setVariableCommand.data?.varName || '';
        this.varValue = this.setVariableCommand.data?.varValue || '';

        this.commandDataSubscription = this.commandNgrxRepositoryService.getCommand(this.setVariableCommand.id).subscribe((command) => {
            this.setVariableCommand = (_.cloneDeep(command) as SetVariableCommandEntity);
        });
        
    }

}
