import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { WorkerGetWorkerListClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/worker-get-worker-list-class-method-member';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { BaseClassGetWorkerListMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/methods/base-class-get-worker-list-method-option';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { workerRoleSelectOptions } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-role-select-options';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';

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
    formErrorMessage: string;
    isCommandValid = true;

    getWorkerListClassMethodMember: WorkerGetWorkerListClassMethodMember;
    roleSelected: string;

    private subscriptionManager: Subscription = new Subscription();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandPathErrorManagerService: CommandPathErrorManagerService
    ) { }

    ngOnInit(): void {
        this.initializeClassMember();
        this.initializeForm();
    }

    ngOnDestroy() {
        this.subscriptionManager.unsubscribe();
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

    private initializeForm(): void {
        this.componentFormGroup = this.formBuilder.group({
            role: [this.roleSelected, [Validators.required]]
        });

        const valueChangesSubscription = this.componentFormGroup.valueChanges.subscribe((event) => {
            this.onRoleChangeListener();
        });

        const statusChangesSubscription = this.componentFormGroup.statusChanges.subscribe(() => {
            const previousFormStatus = this.isCommandValid;

            if (this.componentFormGroup.valid) {
                this.isCommandValid = true;
            } else {
                this.isCommandValid = false;
                this.buildCommandErrorMessage();
            }

            this.commandPathErrorManagerService.buildCommandPathError(this.commandId, previousFormStatus, this.isCommandValid);
        });

        this.subscriptionManager.add(valueChangesSubscription);
        this.subscriptionManager.add(statusChangesSubscription);
    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(_.clone(this.getWorkerListClassMethodMember));
        }, 0);
    }

    private buildCommandErrorMessage(): void {
        let errorFormMessage: Array<string> = [];
        const roleInput: AbstractControl = this.componentFormGroup.get('role');

        if(roleInput.errors) {
            if (roleInput.errors.required) {
                errorFormMessage.push('- Select a worker role to filter.');
            }
        }

        this.formErrorMessage = errorFormMessage.join('\n\n');
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.getWorkerListClassMethodMember.methodChained = classMember;
        this.emitSelectedMember();
    }

}
