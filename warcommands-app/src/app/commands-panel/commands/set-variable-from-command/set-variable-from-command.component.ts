import { Component, OnInit, Input } from '@angular/core';
import { GenericCommandDTO } from 'src/warcommands/commands-panel/domain/command/model/generic-command.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SetVariableFromCommandCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/set-variable-from-command-command.entity';
import * as _ from 'lodash';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';

@Component({
    selector: 'app-set-variable-from-command',
    templateUrl: './set-variable-from-command.component.html',
    styleUrls: ['./set-variable-from-command.component.scss']
})
export class SetVariableFromCommandComponent implements OnInit {

    @Input() commandData: GenericCommandDTO;
    setVariableCommand: SetVariableFromCommandCommandEntity;

    setVarForm: FormGroup;
    varName: string;
    setVarCommandContainerId: string;
    
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
    ) { }

    ngOnInit(): void {

        this.initializeCommand();
        this.initializeForm();

    }

    private initializeForm(): void {
        this.setVarForm = this.formBuilder.group({
            varName: [this.varName, [Validators.required, Validators.pattern('^[_a-z]\\w*$')]],
        });

        this.setVarForm.valueChanges.subscribe(() => {
            this.setVariableCommand.data = {
                varName: this.setVarForm.get('varName').value
            }

            this.commandUpdatedEvents.commandUpdatedDispatch(this.setVariableCommand);
        });
        
    }

    private initializeCommand(): void {
        this.setVariableCommand = (_.cloneDeep(this.commandData) as SetVariableFromCommandCommandEntity);

        this.varName = this.setVariableCommand.data?.varName || '';
        this.setVarCommandContainerId = this.setVariableCommand.innerCommandContainerIdList.command;
    }

}
