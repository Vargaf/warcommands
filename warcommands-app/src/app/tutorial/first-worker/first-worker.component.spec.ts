import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstWorkerComponent } from './first-worker.component';
import {MaterialModule} from "../../share/material/material.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('FirstWorkerComponent', () => {
  let component: FirstWorkerComponent;
  let fixture: ComponentFixture<FirstWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstWorkerComponent ],
        imports: [
            MaterialModule, NoopAnimationsModule
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
