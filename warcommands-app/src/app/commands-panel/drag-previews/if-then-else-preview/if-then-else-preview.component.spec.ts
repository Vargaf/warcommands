import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfThenElsePreviewComponent } from './if-then-else-preview.component';

describe('IfThenElsePreviewComponent', () => {
  let component: IfThenElsePreviewComponent;
  let fixture: ComponentFixture<IfThenElsePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfThenElsePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfThenElsePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
