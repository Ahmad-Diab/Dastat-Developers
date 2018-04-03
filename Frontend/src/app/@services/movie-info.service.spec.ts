import { TestBed, inject } from '@angular/core/testing';

import { MovieInfoService } from './movie-info.service';

describe('MovieInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieInfoService]
    });
  });

  it('should be created', inject([MovieInfoService], (service: MovieInfoService) => {
    expect(service).toBeTruthy();
  }));
});
