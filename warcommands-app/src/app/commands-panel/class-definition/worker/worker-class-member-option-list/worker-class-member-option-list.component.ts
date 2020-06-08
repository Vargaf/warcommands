import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { WorkerClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-class-options-definition';
import { MatSelect } from '@angular/material/select';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ClassMemberOptionDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member-option.dto';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-worker-class-member-option-list',
    templateUrl: './worker-class-member-option-list.component.html',
    styleUrls: ['./worker-class-member-option-list.component.scss']
})
export class WorkerClassMemberOptionListComponent implements OnInit, OnDestroy, ClassMemberComponent {

    @Input()
    classMember: ClassMemberDTO;
    workerClassMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement: MatSelect;

    componentFormGroup: FormGroup;

    workerClassOptionsDefinition = WorkerClassOptionsDefinition;
    areMemberOptionsVisible = false;
    memberSelected: string;
    onMememberOptionChangeSubscription: Subscription;

    constructor(
        private readonly formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {

        this.initializeClassMember();

        this.componentFormGroup = this.formBuilder.group({
            memberSelected: [this.memberSelected, [Validators.required]]
        });

        this.setMemberOptionOnChangeListener();

    }

    ngOnDestroy() {
        this.onMememberOptionChangeSubscription?.unsubscribe();
    }

    showMemberOptions(): void {
        this.areMemberOptionsVisible = true;
        this.componentFormGroup.get('memberSelected').enable();
        this.setMemberOptionOnChangeListener();
        this.changeDetectorRef.detectChanges();
        this.memberSelectElement.open();
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.workerClassMember = classMember;
        this.emitSelectedMember();
    }

    private initializeClassMember(): void {
        
        this.workerClassMember = _.cloneDeep(this.classMember);

        if(this.classMember) {
            if (this.isClassMemberAvailable()) {
                this.memberSelected = this.workerClassMember.memberName;
                this.areMemberOptionsVisible = true;
            } else {
                this.workerClassMember = null;
                this.emitSelectedMember();
            }
        } else {
            this.memberSelected = '';
        }
    }

    private isClassMemberAvailable(): boolean {
        let isClassMemberAvailable = false;

        this.workerClassOptionsDefinition.methods.forEach((method: ClassMemberOptionDTO) => {
            if (method.value === this.classMember.memberName) {
                isClassMemberAvailable = true;
            }
        });

        return isClassMemberAvailable;
    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(_.cloneDeep(this.workerClassMember));
        }, 0);
    }

    private setMemberOptionOnChangeListener(): void {
        this.onMememberOptionChangeSubscription = this.componentFormGroup.get('memberSelected').valueChanges.subscribe((event) => {
            this.onMemberSelectionChanged(event);
        });
    }

    private onMemberSelectionChanged(value: string): void {
        if (value === '-1' && this.areMemberOptionsVisible) {
            this.areMemberOptionsVisible = false;
            this.componentFormGroup.get('memberSelected').setValue('');
            this.componentFormGroup.get('memberSelected').disable();
            this.memberSelected = null;
            this.workerClassMember = null;
            this.emitSelectedMember();
        } else {
            this.memberSelected = this.componentFormGroup.get('memberSelected').value;
        }

    }

}
