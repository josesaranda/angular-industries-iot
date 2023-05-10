import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IndustriesService } from "@services/industries/industries.service";
import { of } from "rxjs";
import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { IndustriesComponent } from "./industries.component";

describe("IndustriesComponent", () => {
  const mockedSnackBar = mock(MatSnackBar);
  const mockedMatDialog = mock(MatDialog);
  const formBuilder = new FormBuilder();
  const mockedIndustriesService = mock(IndustriesService);
  const component: IndustriesComponent = new IndustriesComponent(
    instance(mockedSnackBar),
    instance(mockedMatDialog),
    formBuilder,
    instance(mockedIndustriesService)
  );

  it("Should be defined and formGroup created", () => {
    expect(component).toBeDefined();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.controls["name"]).toBeDefined();
  });

  describe("#ngOnInit", () => {
    it("Should get industries for first time and get industries matching name", () => {
      const expectedResult = [{ id: 1, name: "Industry 1" }, { id: 2, name: "Industry 2" }]
      when(mockedIndustriesService.getAll()).thenReturn(
        of(expectedResult)
      );
      component.ngOnInit();
      expect(component.datasource.data).toEqual(expectedResult);
      verify(mockedIndustriesService.getAll()).once();

      when(mockedIndustriesService.getAll(deepEqual({name: "Industry 1"}))).thenReturn(of([{ id: 1, name: "Industry 1" }]));
      component.formGroup.controls["name"].setValue("Industry 1");
      expect(component.datasource.data).toEqual([{id: 1, name: "Industry 1"}]);
      verify(mockedIndustriesService.getAll(deepEqual({name: "Industry 1"}))).once();
    });
  });
});
