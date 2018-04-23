import { TestBed, inject } from '@angular/core/testing';

import { AdminTicketService } from './admin-ticket.service';

describe('AdminTicketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminTicketService]
    });
  });

  it('should be created', inject([AdminTicketService], (service: AdminTicketService) => {
    expect(service).toBeTruthy();
  }));
});
