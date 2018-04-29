import { ActorInfoService } from "./actor-info.service";
import { TestBed } from "@angular/core/testing";

describe("ActorInfoService", () => {

  let service: ActorInfoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActorInfoService
      ]
    });
    service = TestBed.get(ActorInfoService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
