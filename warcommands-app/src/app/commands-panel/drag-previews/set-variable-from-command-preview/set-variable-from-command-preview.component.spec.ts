import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetVariableFromCommandPreviewComponent } from './set-variable-from-command-preview.component';

describe('SetVariableFromCommandPreviewComponent', () => {
  let component: SetVariableFromCommandPreviewComponent;
  let fixture: ComponentFixture<SetVariableFromCommandPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetVariableFromCommandPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetVariableFromCommandPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
