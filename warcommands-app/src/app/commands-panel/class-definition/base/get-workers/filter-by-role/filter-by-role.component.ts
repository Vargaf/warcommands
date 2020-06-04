import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { WorkerFilterByRoleClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/worker-filter-by-role-class-method-member';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { WorkerListClassFilterByRoleMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/methods/worker-list-class-filter-by-role-method-option';
import * as _ from 'lodash';
import { workerRoleSelectOptions } from 'src/warcommands/commands-panel/domain/command/model/game-command/worker-class-definition/worker-role-select-options';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { ArrayClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/array-class-definition/array-class-options-definition';

@Component({
    selector: 'app-filter-by-role',
    templateUrl: './filter-by-role.component.html',
    styleUrls: ['./filter-by-role.component.scss']
})
export class FilterByRoleComponent implements OnInit, OnDestroy {

    @Input()
    classMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement: MatSelect;

    componentFormGroup: FormGroup;

    workerRoleOptions = workerRoleSelectOptions;
    arrayClassOptionsDefinition = ArrayClassOptionsDefinition;

    memberSelected: string;
    roleSelected: string;
    areMemberOptionsVisible = false;
    onFormValueChangeSubscription: Subscription;
    onMememberOptionChangeSubscription: Subscription;

    filterByRoleClassMethodMember: WorkerFilterByRoleClassMethodMember;

    constructor(
        private readonly formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {

        this.initializeClassMember();

        this.componentFormGroup = this.formBuilder.group({
            role: [this.roleSelected, [Validators.required]],
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
        }

        this.filterByRoleClassMethodMember.methodChained = null;
    }

    private onValidFormChangeListener(): void {
        this.filterByRoleClassMethodMember.args = [this.componentFormGroup.get('role').value];
        this.memberSelected = this.componentFormGroup.get('memberSelected').value;
        this.emitSelectedMember();
    }

    private initializeClassMember(): void {
        this.filterByRoleClassMethodMember = 
            (GetClassMemberByclassMemberOption.getClassMember(WorkerListClassFilterByRoleMethodOption) as WorkerFilterByRoleClassMethodMember);
        
        if(this.classMember) {
            this.memberSelected = this.classMember.methodChained?.memberName || '';
            this.roleSelected = this.classMember.args[0] || '';
            this.filterByRoleClassMethodMember.args[0] = this.classMember.args[0] || [];
            this.filterByRoleClassMethodMember.methodChained = this.classMember.methodChained;

            if (this.memberSelected) {
                this.areMemberOptionsVisible = true;
            }
        } else {
            this.memberSelected = '';
            this.emitSelectedMember();
        }
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.filterByRoleClassMethodMember.methodChained = classMember;
        this.emitSelectedMember();
    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(_.clone(this.filterByRoleClassMethodMember));
        }, 0);
    }

}
