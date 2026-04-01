import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pubs } from './pubs';

describe('Pubs', () => {
  let component: Pubs;
  let fixture: ComponentFixture<Pubs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pubs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pubs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
