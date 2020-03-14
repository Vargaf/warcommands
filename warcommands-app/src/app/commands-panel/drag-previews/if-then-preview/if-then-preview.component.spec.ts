import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfThenPreviewComponent } from './if-then-preview.component';

describe('IfThenPreviewComponent', () => {
  let component: IfThenPreviewComponent;
  let fixture: ComponentFixture<IfThenPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfThenPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfThenPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
