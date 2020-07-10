import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { WorkerGetWorkerListClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/worker-get-worker-list-class-method-member';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { BaseClassGetWorkerListMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/methods/base-class-get-worker-list-method-option';
import * as _ from 'lodash';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { workerRoleSelectOptions } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-role-select-options';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';

@Component({
    selector: 'app-get-worker-list',
    templateUrl: './get-worker-list.component.html',
    styleUrls: ['./get-worker-list.component.scss']
})
export class GetWorkerListComponent implements OnInit, OnDestroy, ClassMemberComponent {

    @Input()
    classMember: ClassMemberDTO;

    @Input()
    commandId: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    workerRoleOptions = workerRoleSelectOptions;

    componentFormGroup: FormGroup;
    onFormValueChangeSubscription: Subscription;

    getWorkerListClassMethodMember: WorkerGetWorkerListClassMethodMember;
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
       this.getWorkerListClassMethodMember.args[0] = this.componentFormGroup.get('role').value;
       this.roleSelected = this.componentFormGroup.get('role').value;
       this.emitSelectedMember();
   }

    private initializeClassMember(): void {
        this.getWorkerListClassMethodMember =
            (GetClassMemberByclassMemberOption.getClassMember(BaseClassGetWorkerListMethodOption) as WorkerGetWorkerListClassMethodMember);

        if (this.classMember) {
            this.roleSelected = this.classMember.args[0];
            this.getWorkerListClassMethodMember.methodChained = this.classMember.methodChained;
            this.getWorkerListClassMethodMember.args[0] = this.roleSelected;
        } else {
            this.roleSelected = 'all';
            this.getWorkerListClassMethodMember.args[0] = this.roleSelected;
            this.emitSelectedMember();
        }
    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(_.clone(this.getWorkerListClassMethodMember));
        }, 0);
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.getWorkerListClassMethodMember.methodChained = classMember;
        this.emitSelectedMember();
    }

}
