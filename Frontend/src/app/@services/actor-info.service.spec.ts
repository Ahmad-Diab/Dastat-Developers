import { TestBed, inject } from '@angular/core/testing';

import { ActorInfoService } from './actor-info.service';

describe('ActorInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActorInfoService]
    });
  });

  it('should be created', inject([ActorInfoService], (service: ActorInfoService) => {
    expect(service).toBeTruthy();
  }));
});
