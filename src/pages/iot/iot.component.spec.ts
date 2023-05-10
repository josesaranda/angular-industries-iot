import { FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { IotsService } from "@services/iots/iots.service";
import { of } from "rxjs";
import { anything, deepEqual, instance, mock, verify, when } from "ts-mockito";
import { IotComponent } from "./iot.component";
import { IndustriesService } from "@services/industries/industries.service";
import { IoT } from "@services/iots/iot.interface";

describe("IotComponent", () => {
  const mockedSnackBar = mock(MatSnackBar);
  const mockedRouter = mock(Router);
  const mockedActivatedRoute = {
    snapshot: { params: { id: "1" } },
  } as unknown as ActivatedRoute;
  const mockedIotsService = mock(IotsService);
  const mockedIndustriesService = mock(IndustriesService);
  const component: IotComponent = new IotComponent(
    instance(mockedSnackBar),
    instance(mockedRouter),
    mockedActivatedRoute,
    new FormBuilder(),
    instance(mockedIotsService),
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
    it("Should get IoT if is not new", () => {
      const expectedResult: IoT = {
        id: 1,
        name: "IoT 1",
        fee: 1,
        industryId: 1,
        numOfDevices: 1,
        warehouseAdditionTime: "test",
      };
      when(mockedIotsService.getOne(1)).thenReturn(of(expectedResult));
      component.ngOnInit();
      expect(component.formGroup.controls["name"].value).toBe(
        expectedResult.name
      );
      expect(component.formGroup.controls["fee"].value).toBe(
        expectedResult.fee
      );
      expect(component.formGroup.controls["industryId"].value).toBe(
        expectedResult.industryId
      );
      expect(component.formGroup.controls["numOfDevices"].value).toBe(
        expectedResult.numOfDevices
      );
      expect(component.formGroup.controls["warehouseAdditionTime"].value).toBe(
        expectedResult.warehouseAdditionTime
      );
      verify(mockedIotsService.getOne(1)).once();
    });
  });

  describe("#onClickSubmit", () => {
    it("Should create a new IoT", () => {
      const expectedResult = {
        id: 1,
        name: "test",
        fee: 1,
        industryId: 1,
        numOfDevices: 1,
        warehouseAdditionTime: "test",
      };
      when(
        mockedIotsService.createOne(
          deepEqual({
            name: "test",
            fee: 1,
            industryId: 1,
            numOfDevices: 1,
            warehouseAdditionTime: "test",
          })
        )
      ).thenReturn(of(expectedResult));
      component.formGroup.controls["name"].setValue(expectedResult.name);
      component.formGroup.controls["fee"].setValue(expectedResult.fee);
      component.formGroup.controls["industryId"].setValue(
        expectedResult.industryId
      );
      component.formGroup.controls["numOfDevices"].setValue(
        expectedResult.numOfDevices
      );
      component.formGroup.controls["warehouseAdditionTime"].setValue(
        expectedResult.warehouseAdditionTime
      );
      component.isNew = true;
      component.onClickSubmit();

      verify(
        mockedSnackBar.open("IoT successfully created", anything(), anything())
      ).once();
      verify(
        mockedIotsService.createOne(
          deepEqual({
            name: "test",
            fee: 1,
            industryId: 1,
            numOfDevices: 1,
            warehouseAdditionTime: "test",
          })
        )
      ).once();
    });

    it("Should update a known IoT", () => {
      component.formGroup.controls["name"].setValue("IoT 1");
      expect(component.formGroup.controls["name"].value).toBe("IoT 1");

      when(
        mockedIotsService.updateOne(
          1,
          deepEqual({
            name: "IoT 2",
            fee: 1,
            industryId: 1,
            numOfDevices: 1,
            warehouseAdditionTime: "test",
          })
        )
      ).thenReturn(
        of({
          id: 1,
          name: "IoT 2",
          fee: 1,
          industryId: 1,
          numOfDevices: 1,
          warehouseAdditionTime: "test",
        })
      );

      component.formGroup.controls["name"].setValue("IoT 2");
      component.formGroup.controls["fee"].setValue(1);
      component.formGroup.controls["industryId"].setValue(1);
      component.formGroup.controls["numOfDevices"].setValue(1);
      component.formGroup.controls["warehouseAdditionTime"].setValue("test");
      component.isNew = false;
      component.onClickSubmit();

      verify(
        mockedSnackBar.open("IoT succesfully saved", anything(), anything())
      ).once();
      verify(
        mockedIotsService.updateOne(
          1,
          deepEqual({
            name: "IoT 2",
            fee: 1,
            industryId: 1,
            numOfDevices: 1,
            warehouseAdditionTime: "test",
          })
        )
      ).once();
    });
  });
});
