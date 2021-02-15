import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetVariablePreviewComponent } from './set-variable-preview.component';

describe('SetVariablePreviewComponent', () => {
  let component: SetVariablePreviewComponent;
  let fixture: ComponentFixture<SetVariablePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetVariablePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetVariablePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
