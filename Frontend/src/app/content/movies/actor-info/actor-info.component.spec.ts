import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ActorInfoComponent } from "./actor-info.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ActorInfoComponent", () => {

  let fixture: ComponentFixture<ActorInfoComponent>;
  let component: ActorInfoComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ActorInfoComponent]
    });

    fixture = TestBed.createComponent(ActorInfoComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
