import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { GetWorkerClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/methods/get-worker-class-method-member';
import * as _ from 'lodash';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { BaseClassGetWorkerMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/methods/base-class-get-worker-method-option';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import { Subscription } from 'rxjs';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';

@Component({
    selector: 'app-get-worker',
    templateUrl: './get-worker.component.html',
    styleUrls: ['./get-worker.component.scss']
})
export class GetWorkerComponent implements OnInit, OnDestroy, ClassMemberComponent {

    @Input()
    classMember!: ClassMemberDTO;

    @Input()
    commandId!: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    componentFormGroup!: FormGroup;
    formErrorMessage!: string;
    isCommandValid = true;

    getWorkerClassMember!: GetWorkerClassMethodMember;
    getWorkerClassMemberMethodChained!: ClassMemberDTO;

    workerIndex!: number;

    private subscriptionManager: Subscription = new Subscription();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandPathErrorManagerService: CommandPathErrorManagerService
    ) { }

    ngOnInit(): void {

        this.initializeGetWorkerClassMember();
        this.initializeForm();
    }

    ngOnDestroy() {
        this.subscriptionManager.unsubscribe();
    }

    private initializeForm(): void {
        this.componentFormGroup = this.formBuilder.group({
            worker: [this.workerIndex, [Validators.min(0), Validators.required]],
        });
        
        const valueChangesSubscription = this.componentFormGroup.get('worker')?.valueChanges.subscribe((value) => {
            this.workerIndex = value;
            this.getWorkerClassMember.args = [value];
        });

        const statusChangesSubscription = this.componentFormGroup.statusChanges.subscribe(data => {
            const previousFormStatus = this.isCommandValid;

            if (this.componentFormGroup.valid) {
                this.emitSelectedMember();
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
        this.getWorkerClassMemberMethodChained = <ClassMemberDTO>this.getWorkerClassMember.methodChained;
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        const clonedClassMember = _.cloneDeep(this.getWorkerClassMember);
        clonedClassMember.methodChained = classMember; 
        this.getWorkerClassMember =  clonedClassMember;
        this.getWorkerClassMemberMethodChained = clonedClassMember.methodChained;
        this.emitSelectedMember();
    }

    emitSelectedMember(): void {
        this.classMemberChange.emit(_.cloneDeep(this.getWorkerClassMember));
    }

    private buildCommandErrorMessage(): void {
        let errorFormMessage: Array<string> = [];
        const workerInput: AbstractControl | null = this.componentFormGroup.get('worker');

        if(workerInput?.errors) {
            if (workerInput.errors.required) {
                errorFormMessage.push('- Set the worker index.');
            }
        }

        this.formErrorMessage = errorFormMessage.join('\n\n');
    }
}
