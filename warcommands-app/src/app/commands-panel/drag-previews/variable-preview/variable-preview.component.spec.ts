import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablePreviewComponent } from './variable-preview.component';

describe('VariablePreviewComponent', () => {
  let component: VariablePreviewComponent;
  let fixture: ComponentFixture<VariablePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariablePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
