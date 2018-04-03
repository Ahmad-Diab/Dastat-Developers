import { TestBed, inject } from '@angular/core/testing';

import { CinemaInfoService } from './cinema-info.service';

describe('CinemaInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CinemaInfoService]
    });
  });

  it('should be created', inject([CinemaInfoService], (service: CinemaInfoService) => {
    expect(service).toBeTruthy();
  }));
});
