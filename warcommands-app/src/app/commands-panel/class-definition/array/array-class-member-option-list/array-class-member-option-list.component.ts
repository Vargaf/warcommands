import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { MatSelect } from '@angular/material/select';
import * as _ from 'lodash';
import { ArrayClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/array-class-definition/array-class-options-definition';
import { ClassMemberOptionDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member-option.dto';
import { Subscription } from 'rxjs';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';

@Component({
    selector: 'app-array-class-member-option-list',
    templateUrl: './array-class-member-option-list.component.html',
    styleUrls: ['./array-class-member-option-list.component.scss']
})
export class ArrayClassMemberOptionListComponent implements OnInit, OnDestroy, ClassMemberComponent {

    @Input()
    classMember: ClassMemberDTO;
    arrayClassMember: ClassMemberDTO;

    @Input()
    commandId: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement: MatSelect;

    componentFormGroup: FormGroup;
    formErrorMessage: string;
    isCommandValid = true;

    arrayClassOptionsDefinition = ArrayClassOptionsDefinition;
    
    areMemberOptionsVisible = false;
    memberSelected: string;

    private subscriptionManager: Subscription = new Subscription();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly commandPathErrorManagerService: CommandPathErrorManagerService
    ) { }

    ngOnInit(): void {

        this.initializeClassMember();
        this.initializeForm();
    }

    ngOnDestroy() {
        this.subscriptionManager.unsubscribe();
    }

    showMemberOptions(): void {
        this.areMemberOptionsVisible = true;
        this.componentFormGroup.get('memberSelected').enable();
        this.changeDetectorRef.detectChanges();
        this.memberSelectElement.open();
    }

    private initializeForm(): void {
        this.componentFormGroup = this.formBuilder.group({
            memberSelected: [this.memberSelected, [Validators.required]]
        });

        const valueChangesSubscription = this.componentFormGroup.valueChanges.subscribe(() => {
            const memberSelected = this.componentFormGroup.get('memberSelected').value;
            this.onMemberSelectionChanged(memberSelected);
        });

        const statusChangesSubscription = this.componentFormGroup.statusChanges.subscribe(() => {
            const previousFormStatus = this.isCommandValid;

            if (!this.areMemberOptionsVisible) {
                this.isCommandValid = true;
            } else {
                if (this.componentFormGroup.valid) {
                    this.isCommandValid = true;
                } else {
                    this.isCommandValid = false;
                    this.buildCommandErrorMessage();
                }
            }

            this.commandPathErrorManagerService.buildCommandPathError(this.commandId, previousFormStatus, this.isCommandValid);
        });

        this.subscriptionManager.add(valueChangesSubscription);
        this.subscriptionManager.add(statusChangesSubscription);
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

    private buildCommandErrorMessage(): void {
        let errorFormMessage: Array<string> = [];
        const memberSelectedInput: AbstractControl = this.componentFormGroup.get('memberSelected');

        if(memberSelectedInput.errors) {
            if (memberSelectedInput.errors.required) {
                errorFormMessage.push('- Select a method or property.');
            }
        }

        this.formErrorMessage = errorFormMessage.join('\n\n');
    }

}
