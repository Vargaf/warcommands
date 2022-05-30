import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GameClassMemberOptionsListComponent} from './game-class-member-options-list.component';
import {FormBuilder} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";
import {of} from "rxjs";

describe('GameClassMemberOptionsListComponent', () => {
    let component: GameClassMemberOptionsListComponent;
    let fixture: ComponentFixture<GameClassMemberOptionsListComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = {
            valueChanges: of(null),
            statusChanges: of(null),
            get: () => {}
        }
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError'])
        TestBed.configureTestingModule({
            declarations: [GameClassMemberOptionsListComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy}
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameClassMemberOptionsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
