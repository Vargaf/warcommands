import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { WorkerGetWorkersClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/worker-get-workers-class-method-member';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { BaseClassGetWorkersMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/methods/base-class-get-workers-method-option';
import * as _ from 'lodash';
import { WorkerListClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/worker-list-class-options-definition';
import { MatSelect } from '@angular/material/select';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArrayClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/array-class-definition/array-class-options-definition';

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

    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement: MatSelect;

    componentFormGroup: FormGroup;
    workerListClassOptionsDefinition = WorkerListClassOptionsDefinition;


    arrayClassOptionsDefinition = ArrayClassOptionsDefinition;

    memberSelected: string;
    areMemberOptionsVisible = false;
    onMememberOptionChangeSubscription: Subscription;
    onFormValueChangeSubscription: Subscription;

    getWorkersClassMethodMember: WorkerGetWorkersClassMethodMember;

    constructor(
        private readonly formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.initializeClassMember();

        this.componentFormGroup = this.formBuilder.group({
            memberSelected: [this.memberSelected, [Validators.required]]
        });

        if (!this.memberSelected) {
            this.componentFormGroup.get('memberSelected').disable();
        }

        this.setMemberOptionOnChangeListener();

        this.onFormValueChangeSubscription = this.componentFormGroup.valueChanges.subscribe((event) => {
            if (this.componentFormGroup.valid) {
                this.onValidFormChangeListener();
            }
        });
    }

    ngOnDestroy() {
        this.onMememberOptionChangeSubscription.unsubscribe();
        this.onFormValueChangeSubscription.unsubscribe();
    }

    showMemberOptions(): void {
        this.areMemberOptionsVisible = true;
        this.componentFormGroup.get('memberSelected').enable();
        this.changeDetectorRef.detectChanges();
        this.memberSelectElement.open();
    }

    private onValidFormChangeListener(): void {
        this.memberSelected = this.componentFormGroup.get('memberSelected').value;
        this.emitSelectedMember();
    }

    private onMemberSelectionChanged(value: string): void {
        if (value === '-1' && this.areMemberOptionsVisible) {
            this.areMemberOptionsVisible = false;
            this.componentFormGroup.get('memberSelected').setValue('');
            this.componentFormGroup.get('memberSelected').disable();
        }

        this.getWorkersClassMethodMember.methodChained = null;
    }

    private setMemberOptionOnChangeListener(): void {
        this.onMememberOptionChangeSubscription = this.componentFormGroup.get('memberSelected').valueChanges.subscribe((event) => {
            this.onMemberSelectionChanged(event);
        });
    }

    private initializeClassMember(): void {
        this.getWorkersClassMethodMember =
            (GetClassMemberByclassMemberOption.getClassMember(BaseClassGetWorkersMethodOption) as WorkerGetWorkersClassMethodMember);

        if (this.classMember) {
            this.memberSelected = this.classMember.methodChained?.memberName || '';
            this.getWorkersClassMethodMember.methodChained = this.classMember.methodChained;
        } else {
            this.memberSelected = '';
            this.emitSelectedMember();
        }

        if (this.memberSelected) {
            this.areMemberOptionsVisible = true;
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
