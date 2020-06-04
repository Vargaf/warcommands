import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameClassMemberOptionsListComponent } from './game-class-member-options-list.component';

describe('GameClassMemberOptionsListComponent', () => {
  let component: GameClassMemberOptionsListComponent;
  let fixture: ComponentFixture<GameClassMemberOptionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameClassMemberOptionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameClassMemberOptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
