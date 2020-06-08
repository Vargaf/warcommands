import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetWorkerClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/methods/get-worker-class-method-member';
import * as _ from 'lodash';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { BaseClassGetWorkerMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/methods/base-class-get-worker-method-option';

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

    getWorkerClassMember: GetWorkerClassMethodMember;

    workerIndex: number;

    constructor(
        private readonly formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {

        this.initializeGetWorkerClassMember();

        this.componentFormGroup = this.formBuilder.group({
            worker: [this.workerIndex, [Validators.min(0), Validators.required]],
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
        this.getWorkerClassMember =
            (GetClassMemberByclassMemberOption.getClassMember(BaseClassGetWorkerMethodOption) as GetWorkerClassMethodMember);
        if(this.classMember) {
            this.getWorkerClassMember = (_.cloneDeep(this.classMember) as GetWorkerClassMethodMember);
            this.workerIndex = this.getWorkerClassMember.args[0];
        } else {
            this.workerIndex = 0;
            this.getWorkerClassMember.args = [this.workerIndex];
            this.emitSelectedMember();
        }
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        const clonedClassMember = _.cloneDeep(this.getWorkerClassMember);
        clonedClassMember.methodChained = classMember; 
        this.getWorkerClassMember =  clonedClassMember;
        this.emitSelectedMember();
    }

    emitSelectedMember(): void {
        this.classMemberChange.emit(_.cloneDeep(this.getWorkerClassMember));
    }
}
