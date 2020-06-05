import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { WorkerGetWorkersClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/worker-get-workers-class-method-member';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { BaseClassGetWorkersMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/methods/base-class-get-workers-method-option';
import * as _ from 'lodash';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { workerRoleSelectOptions } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-role-select-options';

@Component({
    selector: 'app-get-workers',
    templateUrl: './get-workers.component.html',
    styleUrls: ['./get-workers.component.scss']
})
export class GetWorkersComponent implements OnInit, OnDestroy {

    @Input()
    classMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    workerRoleOptions = workerRoleSelectOptions;

    componentFormGroup: FormGroup;
    onFormValueChangeSubscription: Subscription;

    getWorkersClassMethodMember: WorkerGetWorkersClassMethodMember;
    roleSelected: string;

    constructor(
        private readonly formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initializeClassMember();

        this.componentFormGroup = this.formBuilder.group({
            role: [this.roleSelected]
        });

        this.onFormValueChangeSubscription = this.componentFormGroup.valueChanges.subscribe((event) => {
            this.onRoleChangeListener();
        });
    }

    ngOnDestroy() {
        this.onFormValueChangeSubscription.unsubscribe();
    }

   private onRoleChangeListener(): void {
       this.getWorkersClassMethodMember.args[0] = this.componentFormGroup.get('role').value;
       this.roleSelected = this.componentFormGroup.get('role').value;
       this.emitSelectedMember();
   }

    private initializeClassMember(): void {
        this.getWorkersClassMethodMember =
            (GetClassMemberByclassMemberOption.getClassMember(BaseClassGetWorkersMethodOption) as WorkerGetWorkersClassMethodMember);

        if (this.classMember) {
            this.roleSelected = this.classMember.args[0];
            this.getWorkersClassMethodMember.methodChained = this.classMember.methodChained;
            this.getWorkersClassMethodMember.args[0] = this.roleSelected;
        } else {
            this.roleSelected = 'all';
            this.getWorkersClassMethodMember.args[0] = this.roleSelected;
            this.emitSelectedMember();
        }
    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(_.clone(this.getWorkersClassMethodMember));
        }, 0);
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.getWorkersClassMethodMember.methodChained = classMember;
        this.emitSelectedMember();
    }

}
