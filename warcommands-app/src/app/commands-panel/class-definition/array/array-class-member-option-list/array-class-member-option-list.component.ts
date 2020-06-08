import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { MatSelect } from '@angular/material/select';
import * as _ from 'lodash';
import { ArrayClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/array-class-definition/array-class-options-definition';
import { ClassMemberOptionDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member-option.dto';
import { Subscription } from 'rxjs';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';

@Component({
    selector: 'app-array-class-member-option-list',
    templateUrl: './array-class-member-option-list.component.html',
    styleUrls: ['./array-class-member-option-list.component.scss']
})
export class ArrayClassMemberOptionListComponent implements OnInit, OnDestroy, ClassMemberComponent {

    @Input()
    classMember: ClassMemberDTO;
    arrayClassMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement: MatSelect;

    componentFormGroup: FormGroup;

    arrayClassOptionsDefinition = ArrayClassOptionsDefinition;
    
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
        this.onMememberOptionChangeSubscription.unsubscribe();
    }

    showMemberOptions(): void {
        this.areMemberOptionsVisible = true;
        this.componentFormGroup.get('memberSelected').enable();
        this.setMemberOptionOnChangeListener();
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
            this.memberSelected = null;
            this.arrayClassMember = null;
            this.emitSelectedMember();
        } else {
            this.memberSelected = this.componentFormGroup.get('memberSelected').value;
        }

    }

    private initializeClassMember(): void {
        
        this.arrayClassMember = _.cloneDeep(this.classMember);

        if(this.classMember) {
            if (this.isClassMemberAvailable()) {
                this.memberSelected = this.arrayClassMember.memberName;
                this.areMemberOptionsVisible = true;
            } else {
                this.arrayClassMember = null;
                this.emitSelectedMember();
            }
        } else {
            this.memberSelected = '';
        }
    }

    private isClassMemberAvailable(): boolean {
        let isClassMemberAvailable = false;

        this.arrayClassOptionsDefinition.methods.forEach((method: ClassMemberOptionDTO) => {
            if (method.value === this.classMember.memberName) {
                isClassMemberAvailable = true;
            }
        });

        return isClassMemberAvailable;
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.arrayClassMember = classMember;
        this.emitSelectedMember();
    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(_.cloneDeep(this.arrayClassMember));
        }, 0);
    }

}
