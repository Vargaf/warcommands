import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArrayClassMemberOptionListComponent} from './array-class-member-option-list.component';
import {of} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {
    CommandPathErrorManagerService
} from "../../../../../warcommands/commands-panel/domain/commands-panel/services/command-path-error-manager.service";

describe('ArrayClassMemberOptionListComponent', () => {
    let component: ArrayClassMemberOptionListComponent;
    let fixture: ComponentFixture<ArrayClassMemberOptionListComponent>;

    let formBuilderSpy;
    let commandPathErrorManagerServiceSpy;

    beforeEach(waitForAsync(() => {
        formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
        const controlsConfigMock = {
            statusChanges: of(null),
            valueChanges: of(null),
            get: () => {},
        };
        formBuilderSpy.group.and.returnValue(controlsConfigMock);
        commandPathErrorManagerServiceSpy = jasmine.createSpyObj('CommandPathErrorManagerService', ['buildCommandPathError']);
        TestBed.configureTestingModule({
            declarations: [ArrayClassMemberOptionListComponent],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: CommandPathErrorManagerService, useValue: commandPathErrorManagerServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArrayClassMemberOptionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
