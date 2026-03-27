import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSessionPreview } from './game-session-preview';

describe('GameSessionPreview', () => {
  let component: GameSessionPreview;
  let fixture: ComponentFixture<GameSessionPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSessionPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSessionPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
