import { TestBed } from '@angular/core/testing';

import { PubTableService } from './pub-table-service';

describe('PubTableService', () => {
  let service: PubTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
