import { HttpClient } from "@angular/common/http";
import { instance, mock, verify, when } from "ts-mockito";
import { IotsService } from "./iots.service";
import { IotsDataAccessHttpService } from "./iots-data-access-http.service";
import { of } from "rxjs";
import { IoT } from "./iot.interface";

describe("IotsService", () => {
  const mockedIotsDataAccessService = mock(IotsDataAccessHttpService);
  const iotsService: IotsService = new IotsService(instance(mock(HttpClient)));
  iotsService.iotsDataAccessService = instance(mockedIotsDataAccessService);

  it("Should be defined", () => {
    expect(iotsService).toBeDefined();
    expect(iotsService.iotsDataAccessService).toBeDefined();
  });

  describe("#getAll", () => {
    it("Should call to iots data access get all", (done) => {
      when(mockedIotsDataAccessService.getAll(undefined)).thenReturn(of([]));
      iotsService.getAll().subscribe(() => {
        verify(mockedIotsDataAccessService.getAll(undefined)).once();
        done();
      });
    });
  });

  describe("#getOne", () => {
    it("Should call to iots data access get one", (done) => {
      when(mockedIotsDataAccessService.getOne(1)).thenReturn(of({} as IoT));
      iotsService.getOne(1).subscribe(() => {
        verify(mockedIotsDataAccessService.getOne(1)).once();
        done();
      });
    });
  });

  describe("#createOne", () => {
    it("Should call to iots data access create one", (done) => {
      const expectedResult = {
        name: "test",
        fee: 1,
        industryId: 1,
        numOfDevices: 1,
        warehouseAdditionTime: "test",
      };
      when(mockedIotsDataAccessService.createOne(expectedResult)).thenReturn(
        of({} as IoT)
      );
      iotsService.createOne(expectedResult).subscribe(() => {
        verify(mockedIotsDataAccessService.createOne(expectedResult)).once();
        done();
      });
    });
  });

  describe("#updateOne", () => {
    it("Should call to iots data access update one", (done) => {
      const expectedResult = {
        name: "test",
      };
      when(mockedIotsDataAccessService.updateOne(1, expectedResult)).thenReturn(
        of({} as IoT)
      );
      iotsService.updateOne(1, expectedResult).subscribe(() => {
        verify(mockedIotsDataAccessService.updateOne(1, expectedResult)).once();
        done();
      });
    });
  });

  describe("#deleteOne", () => {
    it("Should call to iots data access delete one", (done) => {
      when(mockedIotsDataAccessService.deleteOne(1)).thenReturn(of({} as any));
      iotsService.deleteOne(1).subscribe(() => {
        verify(mockedIotsDataAccessService.deleteOne(1)).once();
        done();
      });
    });
  });
});
