import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMinionPreviewComponent } from './create-minion-preview.component';

describe('CreateMinionPreviewComponent', () => {
  let component: CreateMinionPreviewComponent;
  let fixture: ComponentFixture<CreateMinionPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMinionPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMinionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
