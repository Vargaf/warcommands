import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { workerRoleSelectOptions } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-role-select-options';
import { SetRoleClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/set-role-class-method-member';
import * as _ from 'lodash';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { WorkerClassSetRoleMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/worker-class-set-role-method-option';
import { Subscription } from 'rxjs';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';

@Component({
    selector: 'app-set-role',
    templateUrl: './set-role.component.html',
    styleUrls: ['./set-role.component.scss']
})
export class SetRoleComponent implements OnInit, OnDestroy, AfterViewInit, ClassMemberComponent {

    @Input()
    classMember!: ClassMemberDTO;

    @Input()
    commandId!: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    componentFormGroup!: FormGroup;
    formErrorMessage!: string;
    isCommandValid = true;

    workerRoleOptions = workerRoleSelectOptions;

    roleSelected!: string | null;

    setRoleClassMethodMember!: SetRoleClassMethodMember;
    setRoleClassMethodMemberMethodChained!: ClassMemberDTO;

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

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.setRoleClassMethodMember.methodChained = classMember;
        this.setRoleClassMethodMemberMethodChained = classMember;
        this.emitMember();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.componentFormGroup.updateValueAndValidity();
        });
    }

    private initializeClassMember(): void {
        this.setRoleClassMethodMember = 
            (GetClassMemberByclassMemberOption.getClassMember(WorkerClassSetRoleMethodOption) as SetRoleClassMethodMember);
        if (this.classMember) {
            this.setRoleClassMethodMember = (_.cloneDeep(this.classMember) as SetRoleClassMethodMember);
            this.roleSelected = this.classMember.args[0];
        } else {
            this.roleSelected = null;
            this.setRoleClassMethodMember.args = [];
            this.emitMember();
        }
        this.setRoleClassMethodMemberMethodChained = <ClassMemberDTO>this.setRoleClassMethodMember.methodChained;
    }

    private initializeForm(): void {
        this.componentFormGroup = this.formBuilder.group({
            roleSelected: [this.roleSelected, [Validators.required]]
        });

        const valueChangesSubscription = this.componentFormGroup.get('roleSelected')?.valueChanges.subscribe((value) => {
            this.roleSelected = value;
            this.setRoleClassMethodMember.args = [value];
        });

        const statusChangesSubscription = this.componentFormGroup.statusChanges.subscribe(() => {
            const previousFormStatus = this.isCommandValid;
            
            if (this.componentFormGroup.valid) {
                this.emitMember();
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

    private emitMember(): void {
        this.classMemberChange.emit(this.setRoleClassMethodMember);
    }

    private buildCommandErrorMessage(): void {
        let errorFormMessage: Array<string> = [];
        const roleSelectedInput: AbstractControl | null = this.componentFormGroup.get('roleSelected');

        if(roleSelectedInput?.errors) {
            if (roleSelectedInput.errors.required) {
                errorFormMessage.push('- Select a role.');
            }
        }

        this.formErrorMessage = errorFormMessage.join('\n\n');
    }

}
