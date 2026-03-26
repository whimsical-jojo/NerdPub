import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSessionsList } from './game-sessions-list';

describe('GameSessionsList', () => {
  let component: GameSessionsList;
  let fixture: ComponentFixture<GameSessionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSessionsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSessionsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
