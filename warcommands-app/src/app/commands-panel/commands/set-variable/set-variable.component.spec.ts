import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetVariableComponent } from './set-variable.component';

describe('SetVariableComponent', () => {
  let component: SetVariableComponent;
  let fixture: ComponentFixture<SetVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
