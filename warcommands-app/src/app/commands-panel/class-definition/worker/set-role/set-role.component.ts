import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { workerRoleSelectOptions } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-role-select-options';
import { SetRoleClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/set-role-class-method-member';
import * as _ from 'lodash';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { WorkerClassSetRoleMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/worker-class-set-role-method-option';
import { Subscription } from 'rxjs';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';

@Component({
    selector: 'app-set-role',
    templateUrl: './set-role.component.html',
    styleUrls: ['./set-role.component.scss']
})
export class SetRoleComponent implements OnInit, OnDestroy, ClassMemberComponent {

    @Input()
    classMember: ClassMemberDTO;

    @Input()
    commandId: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    componentFormGroup: FormGroup;

    workerRoleOptions = workerRoleSelectOptions;

    roleSelected: string;
    roleSelectedSubscription: Subscription;

    setRoleClassMethodMember: SetRoleClassMethodMember;

    constructor(
        private readonly formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {

        this.initialize();
        
        this.componentFormGroup = this.formBuilder.group({
            roleSelected: [this.roleSelected, [Validators.required]]
        });

        this.componentFormGroup.statusChanges.subscribe(data => {
            if (this.componentFormGroup.valid) {
                this.emitMember();
            }
        });

        
       this.roleSelectedSubscription = this.componentFormGroup.get('roleSelected').valueChanges.subscribe((value) => {
            this.roleSelected = value;
            this.setRoleClassMethodMember.args = [value];
        });
    }

    ngOnDestroy() {
        this.roleSelectedSubscription.unsubscribe();
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.setRoleClassMethodMember.methodChained = classMember;
        this.emitMember();
    }

    private initialize(): void {
        this.setRoleClassMethodMember = 
            (GetClassMemberByclassMemberOption.getClassMember(WorkerClassSetRoleMethodOption) as SetRoleClassMethodMember);
        if (this.classMember) {
            this.setRoleClassMethodMember = (_.cloneDeep(this.classMember) as SetRoleClassMethodMember);
            this.roleSelected = this.classMember.args[0];
        } else {
            this.roleSelected = '';
            this.setRoleClassMethodMember.args = [];
            this.emitMember();
        }
    }

    private emitMember(): void {
        this.classMemberChange.emit(this.setRoleClassMethodMember);
    }

}
