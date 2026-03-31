import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSessionSearchAccordion } from './advanced-session-search-accordion';

describe('AdvancedSessionSearchAccordion', () => {
  let component: AdvancedSessionSearchAccordion;
  let fixture: ComponentFixture<AdvancedSessionSearchAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedSessionSearchAccordion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedSessionSearchAccordion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
