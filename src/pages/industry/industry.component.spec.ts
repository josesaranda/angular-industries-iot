import { FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { IndustriesService } from "@services/industries/industries.service";
import { of } from "rxjs";
import { anything, deepEqual, instance, mock, verify, when } from "ts-mockito";
import { IndustryComponent } from "./industry.component";

describe("IndustryComponent", () => {
  const mockedSnackBar = mock(MatSnackBar);
  const mockedRouter = mock(Router);
  const mockedActivatedRoute = {
    snapshot: { params: { id: "1" } },
  } as unknown as ActivatedRoute;
  const mockedIndustriesService = mock(IndustriesService);
  const component: IndustryComponent = new IndustryComponent(
    instance(mockedSnackBar),
    instance(mockedRouter),
    mockedActivatedRoute,
    new FormBuilder(),
    instance(mockedIndustriesService)
  );

  it("Should be defined", () => {
    expect(component).toBeDefined();
    expect(component.id).toBe(1);
    expect(component.isNew).toBeFalsy();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.controls["name"]).toBeDefined();
  });

  describe("#ngOnInit", () => {
    it("Should get Industry if is not new", () => {
      when(mockedIndustriesService.getOne(1)).thenReturn(
        of({ id: 1, name: "Industry 1" })
      );
      component.ngOnInit();
      expect(component.formGroup.controls["name"].value).toBe("Industry 1");
      verify(mockedIndustriesService.getOne(1)).once();
    });
  });

  describe("#onClickSubmit", () => {
    it("Should create a new Industry", () => {
      when(
        mockedIndustriesService.createOne(deepEqual({ name: "Industry 1" }))
      ).thenReturn(of({ id: 1, name: "Industry 1" }));
      component.formGroup.controls["name"].setValue("Industry 1");
      component.isNew = true;
      component.onClickSubmit();

      verify(
        mockedSnackBar.open(
          "Industry successfully created",
          anything(),
          anything()
        )
      ).once();
      verify(mockedIndustriesService.createOne(deepEqual({ name: "Industry 1" }))).once();
    });

    it("Should update a known Industry", () => {
      component.formGroup.controls["name"].setValue("Industry 1");
      expect(component.formGroup.controls["name"].value).toBe("Industry 1");

      when(
        mockedIndustriesService.updateOne(1, deepEqual({ name: "Industry 2" }))
      ).thenReturn(of({ id: 1, name: "Industry 2" }));

      component.formGroup.controls["name"].setValue("Industry 2");
      component.isNew = false;
      component.onClickSubmit();

      verify(
        mockedSnackBar.open(
          "Industry succesfully saved",
          anything(),
          anything()
        )
      ).once();
      verify(
        mockedIndustriesService.updateOne(1, deepEqual({ name: "Industry 2" }))
      ).once();
    });
  });
});
