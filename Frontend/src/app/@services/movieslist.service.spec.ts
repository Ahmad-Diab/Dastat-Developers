import { TestBed, inject } from '@angular/core/testing';

import { MovieslistService } from './movieslist.service';

describe('MovieslistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieslistService]
    });
  });

  it('should be created', inject([MovieslistService], (service: MovieslistService) => {
    expect(service).toBeTruthy();
  }));
});
