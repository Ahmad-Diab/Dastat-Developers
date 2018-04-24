import { TestBed, inject } from '@angular/core/testing';

import { EditCinemaService } from './edit-cinema.service';

describe('EditCinemaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditCinemaService]
    });
  });

  it('should be created', inject([EditCinemaService], (service: EditCinemaService) => {
    expect(service).toBeTruthy();
  }));
});
