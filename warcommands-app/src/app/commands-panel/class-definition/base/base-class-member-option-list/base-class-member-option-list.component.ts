import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { BaseClassOptionsDefinition } from 'src/warcommands/commands-panel/domain/command/model/game-command/base-class-definition/base-class-options-definition';
import { ClassMemberOptionDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member-option.dto';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';

@Component({
    selector: 'app-base-class-member-option-list',
    templateUrl: './base-class-member-option-list.component.html',
    styleUrls: ['./base-class-member-option-list.component.scss']
})
export class BaseClassMemberOptionListComponent implements OnInit, OnDestroy, ClassMemberComponent {

    @Input()
    classMember: ClassMemberDTO;
    baseClassMember: ClassMemberDTO;

    @Input()
    commandId: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    @ViewChild('memberSelectElement', {static: false})
    memberSelectElement: MatSelect;

    baseClassOptionsDefinition = BaseClassOptionsDefinition;

    memberSelected: string;
    componentFormGroup: FormGroup;
    formErrorMessage: string;
    isCommandValid = true;
    areMemberOptionsVisible = false;

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

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.baseClassMember = classMember;
        this.emitSelectedMember();
    }

    private onMemberSelectionChanged(value: string): void {
        if (value === '-1' && this.areMemberOptionsVisible) {
            this.areMemberOptionsVisible = false;
            this.componentFormGroup.get('memberSelected').setValue('');
            this.componentFormGroup.get('memberSelected').disable();
            this.memberSelected = null;
            this.baseClassMember = null;
            this.emitSelectedMember();
        } else {
            this.memberSelected = this.componentFormGroup.get('memberSelected').value;
        }

    }

    private initializeClassMember(): void {
        
        this.baseClassMember = _.cloneDeep(this.classMember);

        if(this.classMember) {
            if (this.isClassMemberAvailable()) {
                this.memberSelected = this.baseClassMember.memberName;
                this.areMemberOptionsVisible = true;
            } else {
                this.baseClassMember = null;
                this.emitSelectedMember();
            }
        } else {
            this.memberSelected = '';
        }
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

    private isClassMemberAvailable(): boolean {
        let isClassMemberAvailable = false;

        this.baseClassOptionsDefinition.methods.forEach((method: ClassMemberOptionDTO) => {
            if (method.value === this.classMember.memberName) {
                isClassMemberAvailable = true;
            }
        });

        this.baseClassOptionsDefinition.properties.forEach((property: ClassMemberOptionDTO) => {
            if (property.value === this.classMember.memberName) {
                isClassMemberAvailable = true;
            }
        });

        return isClassMemberAvailable;
    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(_.cloneDeep(this.baseClassMember));
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
