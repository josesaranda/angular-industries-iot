import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IndustriesService } from "@services/industries/industries.service";
import { IotsService } from "@services/iots/iots.service";
import { of } from "rxjs";
import { instance, mock, verify, when } from "ts-mockito";
import { IotsComponent } from "./iots.component";

describe("IotsComponent", () => {
  const mockedSnackBar = mock(MatSnackBar);
  const mockedMatDialog = mock(MatDialog);
  const formBuilder = new FormBuilder();
  const mockedIotsService = mock(IotsService);
  const mockedIndustriesService = mock(IndustriesService);
  const component: IotsComponent = new IotsComponent(
    instance(mockedSnackBar),
    instance(mockedMatDialog),
    formBuilder,
    instance(mockedIotsService),
    instance(mockedIndustriesService)
  );

  it("Should be defined and formGroup created", () => {
    expect(component).toBeDefined();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.controls["name"]).toBeDefined();
  });

  describe("#ngOnInit", () => {
    it("Should get iots for first time", () => {
      const expectedResult = [
        {
          id: 1,
          fee: 1,
          industryId: 1,
          name: "test",
          numOfDevices: 1,
          warehouseAdditionTime: "test",
        },
        {
          id: 2,
          fee: 2,
          industryId: 2,
          name: "test2",
          numOfDevices: 2,
          warehouseAdditionTime: "test2",
        },
      ];
      when(mockedIotsService.getAll()).thenReturn(of(expectedResult));
      component.ngOnInit();
      expect(component.datasource.data).toEqual(expectedResult);
      verify(mockedIotsService.getAll()).once();
    });
  });
});
