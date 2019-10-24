import { TestBed } from '@angular/core/testing';

import { CountrycodesService } from './countrycodes.service';

describe('CountrycodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountrycodesService = TestBed.get(CountrycodesService);
    expect(service).toBeTruthy();
  });
});
