import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkerClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-class-options-definition';
import { ClassNameENUM } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-name.enum';
import { GetWorkerClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/methods/get-worker-class-method-member';
import { GameMembersENUM } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/game-members.enum';
import * as _ from 'lodash';

@Component({
    selector: 'app-get-worker',
    templateUrl: './get-worker.component.html',
    styleUrls: ['./get-worker.component.scss']
})
export class GetWorkerComponent implements OnInit {

    @Input()
    classMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    componentFormGroup: FormGroup;

    workerClassOptionsDefinition = WorkerClassOptionsDefinition;

    memberOptionSelected: string;

    getWorkerClassMember: GetWorkerClassMethodMember = {
        className: ClassNameENUM.Game,
        memberName: GameMembersENUM.GetWorker
    };

    workerIndex: number;

    constructor(
        private readonly formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {

        this.initializeGetWorkerClassMember();

        this.componentFormGroup = this.formBuilder.group({
            worker: [this.workerIndex, [Validators.min(0), Validators.required]],
            memberOptionSelected: [this.memberOptionSelected, [Validators.required]],
        });
        
        this.componentFormGroup.get('memberOptionSelected').valueChanges.subscribe((value) => {
            this.memberOptionSelected = value;
        });

        this.componentFormGroup.get('worker').valueChanges.subscribe((value) => {
            this.workerIndex = value;
            this.getWorkerClassMember.args = [value];
        });

        this.componentFormGroup.statusChanges.subscribe(data => {
            if (this.componentFormGroup.valid) {
                this.emitSelectedMember();
            }
        });
    }

    private initializeGetWorkerClassMember(): void {
        if(this.classMember) {
            this.getWorkerClassMember = (_.cloneDeep(this.classMember) as GetWorkerClassMethodMember);
            this.workerIndex = this.getWorkerClassMember.args[0];

            if (this.getWorkerClassMember.methodChained) {
                this.memberOptionSelected = this.getWorkerClassMember.methodChained.memberName;
            }
        } else {
            this.workerIndex = 0;
            this.memberOptionSelected = '';
            this.getWorkerClassMember.args = [this.workerIndex];
        }
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        const clonedClassMember = _.cloneDeep(this.getWorkerClassMember);
        clonedClassMember.methodChained = classMember; 
        this.getWorkerClassMember =  clonedClassMember;
        this.emitSelectedMember();
    }

    emitSelectedMember(): void {
        this.classMemberChange.emit(this.getWorkerClassMember);
    }

}
