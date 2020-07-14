import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';
import { GetBaseByNameClassMethodMember } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/methods/get-base-by-name-class-method-member';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { GetClassMemberByclassMemberOption } from 'src/warcommands/commands-panel/domain/command/services/class-definition/get-class-member-by-class-member-option';
import { GameClassGetBaseByNameMethodOption } from 'src/warcommands/commands-panel/domain/command/model/game-command/game-command-class-definition/methods/game-class-get-base-by-name-method-option';
import { ClassMemberComponent } from 'src/warcommands/commands-panel/domain/command/model/class-member-component';
import { CommandPathErrorManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service';
import { BuildingsNgrxRepositoryService } from 'src/warcommands/basic-mode/infrastructure/ngrx/buildings/buildings-ngrx-repository.service';
import { BuildingsRepositoryService } from 'src/warcommands/basic-mode/domain/building/services/buildings-repository.service';
import { QueryFilterDTO } from 'src/warcommands/basic-mode/domain/share/model/query-filter.dto';
import { BuildingTypeEnum } from 'src/warcommands/basic-mode/domain/building/model/building-type.enum';
import { CurrentPlayerManagerService } from 'src/warcommands/commands-panel/domain/current-player/current-player-manager-service';
import { BaseEntityInterface } from 'src/warcommands/basic-mode/domain/building/base/base-entity-interface';


@Component({
    selector: 'app-get-base-by-index',
    templateUrl: './get-base-by-index.component.html',
    styleUrls: ['./get-base-by-index.component.scss']
})
export class GetBaseByIndexComponent implements OnInit, OnDestroy, ClassMemberComponent {

    @Input()
    classMember: ClassMemberDTO;

    @Input()
    commandId: string;

    @Output()
    classMemberChange = new EventEmitter<ClassMemberDTO>();

    componentFormGroup: FormGroup;
    isCommandValid = true;
    formErrorMessage: string;
    playerBaseList: String[];
    private subscriptionManager: Subscription = new Subscription();

    baseName: string;

    baseByNameClassMethodMember: GetBaseByNameClassMethodMember;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly commandPathErrorManagerService: CommandPathErrorManagerService,
        private readonly buildingsNgrxRepositoryService: BuildingsNgrxRepositoryService,
        private readonly buildingsRepositoryService: BuildingsRepositoryService,
        private readonly currentPlayerManager: CurrentPlayerManagerService,
    ) { }

    ngOnInit(): void {

        this.initializeClassMember();
        this.initializeForm();
        this.setBuildingsListWatcher();
    }

    ngOnDestroy() {
        this.subscriptionManager.unsubscribe();
    }

    onClassMemberSelected(classMember: ClassMemberDTO): void {
        this.baseByNameClassMethodMember.methodChained = classMember;
        this.emitSelectedMember();
    }

    private setBuildingsListWatcher() {
        const subscription = this.buildingsNgrxRepositoryService.watchBuildingList().subscribe(() => {
            this.getPlayerBases();
        });
    }

    private getPlayerBases(): void {
        const filter: QueryFilterDTO = {
            playerId: this.currentPlayerManager.getCurrentPlayer().id,
            type: BuildingTypeEnum.Base
        }
        const baseList = this.buildingsRepositoryService.findBy(filter);

        this.playerBaseList = [];
        baseList.forEach((base: BaseEntityInterface) => {
            this.playerBaseList.push(base.name);
        });
        
    }

    private initializeForm(): void {
        this.componentFormGroup = this.formBuilder.group({
            baseName: [this.baseName, [Validators.required]],
        });
        
        const valueChangesSubscription = this.componentFormGroup.valueChanges.subscribe((event) => {
            if (this.componentFormGroup.valid) {
                this.onValidFormChangeListener();
            }
        });

        const statusChangesSubscription = this.componentFormGroup.statusChanges.subscribe((event) => {
            const previousFormStatus = this.isCommandValid;

            if (this.componentFormGroup.valid) {
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

    private buildCommandErrorMessage(): void {
        let errorFormMessage: Array<string> = [];
        const baseNameInput: AbstractControl = this.componentFormGroup.get('baseName');

        if (baseNameInput.errors) {
            if (baseNameInput.errors.required) {
                errorFormMessage.push('- A base name is required.');
            }
        }

        this.formErrorMessage = errorFormMessage.join('\n\n');
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

    

}
