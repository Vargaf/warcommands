import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IntroductionComponent} from './introduction.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../../share/material/material.module";
import {FirstWorkerComponent} from "../first-worker/first-worker.component";

describe('IntroductionComponent', () => {
    let component: IntroductionComponent;
    let fixture: ComponentFixture<IntroductionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IntroductionComponent, FirstWorkerComponent],
            imports: [MaterialModule, NoopAnimationsModule],

        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IntroductionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
