import { TestBed } from '@angular/core/testing';

import { CreatorServiceService } from './creator-service.service';

describe('CreatorServiceService', () => {
  let service: CreatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
