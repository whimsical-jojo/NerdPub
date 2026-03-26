import { TestBed } from '@angular/core/testing';

import { GameSessionBookingService } from './game-session-booking-service';

describe('GameSessionBookingService', () => {
  let service: GameSessionBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSessionBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
