import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { GetBaseByNameClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/methods/get-base-by-name-class-method-member';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { GameClassGetBaseByNameMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/methods/game-class-get-base-by-name-method-option';


@Component({
    selector: 'app-get-base-by-index',
    templateUrl: './get-base-by-index.component.html',
    styleUrls: ['./get-base-by-index.component.scss']
})
export class GetBaseByIndexComponent implements OnInit, OnDestroy {

    @Input()
    classMember: ClassMemberDTO;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    componentFormGroup: FormGroup;

    baseName: string;
    onFormValueChangeSubscription: Subscription;

    baseByNameClassMethodMember: GetBaseByNameClassMethodMember;

    constructor(
        private readonly formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {

        this.initializeClassMember();

        this.componentFormGroup = this.formBuilder.group({
            baseName: [this.baseName, [Validators.required]],
        });
        
        this.onFormValueChangeSubscription = this.componentFormGroup.valueChanges.subscribe((event) => {
            if (this.componentFormGroup.valid) {
                this.onValidFormChangeListener();
            }
        });
    }

    ngOnDestroy() {
        this.onFormValueChangeSubscription.unsubscribe();
    }

    private onValidFormChangeListener(): void {
        this.baseByNameClassMethodMember.args = [this.componentFormGroup.get('baseName').value];
    }

    private initializeClassMember(): void {
        this.baseByNameClassMethodMember = 
            (GetClassMemberByclassMemberOption.getClassMember(GameClassGetBaseByNameMethodOption) as GetBaseByNameClassMethodMember);
        
        if(this.classMember) {
            this.baseName = this.classMember.args[0];
            this.baseByNameClassMethodMember.methodChained = this.classMember.methodChained;
            this.baseByNameClassMethodMember.args[0] = this.baseName;
        } else {
            this.baseName = 'main';
            this.baseByNameClassMethodMember.args[0] = this.baseName;
            this.emitSelectedMember();
        }
    }

    private emitSelectedMember(): void {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.classMemberChange.emit(_.clone(this.baseByNameClassMethodMember));
        }, 0);
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.baseByNameClassMethodMember.methodChained = classMember;
        this.emitSelectedMember();
    }

}
