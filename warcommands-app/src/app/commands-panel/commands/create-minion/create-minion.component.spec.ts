import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMinionComponent } from './create-minion.component';

describe('CreateMinionComponent', () => {
  let component: CreateMinionComponent;
  let fixture: ComponentFixture<CreateMinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
