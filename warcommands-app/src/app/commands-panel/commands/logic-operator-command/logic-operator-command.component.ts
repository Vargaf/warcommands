import { Component, OnInit, Input } from '@angular/core';
import { LogicOperatorCommandEntity } from 'src/warcommands/commands-panel/domain/command/model/logic-operator/logic-operator-command.entity';
import { logicOperatorSelectOptions } from 'src/warcommands/commands-panel/domain/command/model/logic-operator/logic-operator-select-options';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommandUpdatedEvents } from 'src/warcommands/commands-panel/domain/command/events/command-updated-events';
import * as _ from 'lodash';

@Component({
    selector: 'app-logic-operator-command',
    templateUrl: './logic-operator-command.component.html',
    styleUrls: ['./logic-operator-command.component.scss']
})
export class LogicOperatorCommandComponent implements OnInit {

    @Input() commandData: LogicOperatorCommandEntity;
    logicOperatorCommandData: LogicOperatorCommandEntity;

    firstCommandContainerId: string;
    secondCommandContainerId: string;

    componentFormGroup: FormGroup;
    logicOperatorSelected: number;

    logicOperatorOptions = logicOperatorSelectOptions;
    logicOperatorSelectedSubscription: Subscription;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandUpdatedEvents: CommandUpdatedEvents,
    ) { }

    ngOnInit(): void {
        this.initialize();

        this.firstCommandContainerId = this.commandData.innerCommandContainerIdList.firstCommandContainerId;
        this.secondCommandContainerId = this.commandData.innerCommandContainerIdList.secondCommandContainerId;

        this.componentFormGroup = this.formBuilder.group({
            logicOperator: [this.logicOperatorSelected, [Validators.required]]
        });

        this.logicOperatorSelectedSubscription = this.componentFormGroup.valueChanges.subscribe(() => {
            if (this.componentFormGroup.valid) {
                this.logicOperatorCommandData.data = {
                    operator: this.componentFormGroup.get('logicOperator').value
                }
                this.commandUpdatedEvents.commandUpdatedDispatch(this.logicOperatorCommandData);
            }
        });
    }

    private initialize(): void {
        this.logicOperatorCommandData = _.cloneDeep(this.commandData);
        this.logicOperatorSelected = this.logicOperatorCommandData.data?.operator || 0;
    }

}