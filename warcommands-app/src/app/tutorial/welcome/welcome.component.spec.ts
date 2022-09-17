import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WelcomeComponent} from './welcome.component';
import {EventBusInterface} from "../../../warcommands/shared/domain/event-bus/event-bus-interface";
import {ModalPanelService} from "../../modal-panel/modal-panel.service";
import {MaterialModule} from "../../share/material/material.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {GameTutorialService} from "../../../warcommands/tutorial/domain/tutorial/services/game-tutorial.service";

describe('WelcomeComponent', () => {
    let component: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;

    let eventBusSpy: EventBusInterface;
    let modalPanelServiceSpy: ModalPanelService;
    let gameTutorialServiceSpy: GameTutorialService;

    beforeEach(waitForAsync(() => {
        eventBusSpy = jasmine.createSpyObj('EventBusInterface', ['cast']);
        modalPanelServiceSpy = jasmine.createSpyObj('ModalPanelService', ['remove']);
        gameTutorialServiceSpy = jasmine.createSpyObj('GameTutorialService', ['finishWelcomeStep'])
        TestBed.configureTestingModule({
            declarations: [WelcomeComponent],
            imports: [MaterialModule, NoopAnimationsModule],
            providers: [
                {provide: 'EventBusInterface', useValue: eventBusSpy},
                {provide: ModalPanelService, useValue: modalPanelServiceSpy},
                {provide: GameTutorialService, useValue: gameTutorialServiceSpy},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
