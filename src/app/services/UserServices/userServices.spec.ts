import { TestBed } from '@angular/core/testing';

import { userServices } from './userServices';

describe('userServices', () => {
  let service: userServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(userServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
