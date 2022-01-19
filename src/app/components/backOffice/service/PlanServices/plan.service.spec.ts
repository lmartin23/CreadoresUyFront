import { TestBed } from '@angular/core/testing';

import { PlanService } from './plan.service';

describe('BackOfficeService', () => {
  let service: PlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
