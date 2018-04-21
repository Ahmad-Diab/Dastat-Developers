"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var admin_ticket_service_1 = require("./admin-ticket.service");
describe('AdminTicketService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [admin_ticket_service_1.AdminTicketService]
        });
    });
    it('should be created', testing_1.inject([admin_ticket_service_1.AdminTicketService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=admin-ticket.service.spec.js.map