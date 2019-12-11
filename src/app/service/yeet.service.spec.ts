import { TestBed } from '@angular/core/testing';

import { YeetService } from './yeet.service';

describe('YeetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YeetService = TestBed.get(YeetService);
    expect(service).toBeTruthy();
  });
});
