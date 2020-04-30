import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { workerRoleSelectOptions } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-role-select-options';
import { SetRoleClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/set-role-class-method-member';
import { ClassNameENUM } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-name.enum';
import { WorkerMembersENUM } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-members.enum';
import * as _ from 'lodash';

@Component({
    selector: 'app-set-role',
    templateUrl: './set-role.component.html',
    styleUrls: ['./set-role.component.scss']
})
export class SetRoleComponent implements OnInit {

    @Input()
    classMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    componentFormGroup: FormGroup;

    workerRoleOptions = workerRoleSelectOptions;

    roleSelected: string;

    setRoleClassMethodMember: SetRoleClassMethodMember = {
        className: ClassNameENUM.Worker,
        memberName: WorkerMembersENUM.SetRole
    }

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
                this.emitmember();
            }
        });

        
       this.componentFormGroup.get('roleSelected').valueChanges.subscribe((value) => {
            this.roleSelected = value;
            this.setRoleClassMethodMember.args = [value];
        });
    }

    private initialize(): void {
        if (this.classMember) {
            this.setRoleClassMethodMember = (_.cloneDeep(this.classMember) as SetRoleClassMethodMember);
            this.roleSelected = this.classMember.args[0];
        } else {
            this.roleSelected = '';
            this.setRoleClassMethodMember.args = [];
        }
    }

    private emitmember(): void {
        this.classMemberChange.emit(this.setRoleClassMethodMember);
    }

}
