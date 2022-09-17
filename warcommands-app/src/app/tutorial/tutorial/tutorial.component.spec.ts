import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TutorialComponent} from './tutorial.component';
import {
    TutorialComponentToggleServiceInterface
} from "../../../warcommands/tutorial/domain/tutorial/services/tutorial-component-toggle-service.interface";
import {IntroductionComponent} from "../introduction/introduction.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../../share/material/material.module";
import {FirstWorkerComponent} from "../first-worker/first-worker.component";

describe('TutorialComponent', () => {
    let component: TutorialComponent;
    let fixture: ComponentFixture<TutorialComponent>;

    let tutorialComponentToggleServiceInterfaceSpy;

    beforeEach(waitForAsync(() => {
        tutorialComponentToggleServiceInterfaceSpy = jasmine.createSpyObj('TutorialComponentToggleServiceInterface', ['close'])
        TestBed.configureTestingModule({
            declarations: [TutorialComponent, IntroductionComponent, FirstWorkerComponent],
            imports: [MaterialModule, BrowserAnimationsModule],
            providers: [
                {provide: TutorialComponentToggleServiceInterface, useValue: tutorialComponentToggleServiceInterfaceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TutorialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
