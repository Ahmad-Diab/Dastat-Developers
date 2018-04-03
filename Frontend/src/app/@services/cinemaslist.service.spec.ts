import { TestBed, inject } from '@angular/core/testing';

import { CinemaslistService } from './cinemaslist.service';

describe('CinemaslistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CinemaslistService]
    });
  });

  it('should be created', inject([CinemaslistService], (service: CinemaslistService) => {
    expect(service).toBeTruthy();
  }));
});
