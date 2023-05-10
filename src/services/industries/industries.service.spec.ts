import { HttpClient } from "@angular/common/http";
import { instance, mock, verify, when } from "ts-mockito";
import { IndustriesService } from "./industries.service";
import { IndustriesDataAccessHttpService } from "./industries-data-access-http.service";
import { of } from "rxjs";
import { Industry } from "./industry.interface";

describe("IndustriesService", () => {
  const mockedIndustriesDataAccessService = mock(
    IndustriesDataAccessHttpService
  );
  const industriesService = new IndustriesService(instance(mock(HttpClient)));
  industriesService.industriesDataAccessService = instance(
    mockedIndustriesDataAccessService
  );

  it("Should be defined", () => {
    expect(industriesService).toBeDefined();
    expect(industriesService.industriesDataAccessService).toBeDefined();
  });

  describe("#getAll", () => {
    it("Should call to industries data access get all", (done) => {
      when(mockedIndustriesDataAccessService.getAll(undefined)).thenReturn(of([]));
      industriesService.getAll().subscribe(() => {
        verify(mockedIndustriesDataAccessService.getAll(undefined)).once();
        done();
      });
    });
  });

  describe("#getOne", () => {
    it("Should call to industries data access get one", (done) => {
      when(mockedIndustriesDataAccessService.getOne(1)).thenReturn(of({} as Industry));
      industriesService.getOne(1).subscribe(() => {
        verify(mockedIndustriesDataAccessService.getOne(1)).once();
        done();
      });
    });
  });

  describe("#createOne", () => {
    it("Should call to industries data access create one", (done) => {
      const expectedResult = {
        name: "test",
        fee: 1,
        industryId: 1,
        numOfDevices: 1,
        warehouseAdditionTime: "test",
      };
      when(mockedIndustriesDataAccessService.createOne(expectedResult)).thenReturn(
        of({} as Industry)
      );
      industriesService.createOne(expectedResult).subscribe(() => {
        verify(mockedIndustriesDataAccessService.createOne(expectedResult)).once();
        done();
      });
    });
  });

  describe("#updateOne", () => {
    it("Should call to industries data access update one", (done) => {
      const expectedResult = {
        name: "test",
      };
      when(mockedIndustriesDataAccessService.updateOne(1, expectedResult)).thenReturn(
        of({} as Industry)
      );
      industriesService.updateOne(1, expectedResult).subscribe(() => {
        verify(mockedIndustriesDataAccessService.updateOne(1, expectedResult)).once();
        done();
      });
    });
  });

  describe("#deleteOne", () => {
    it("Should call to industries data access delete one", (done) => {
      when(mockedIndustriesDataAccessService.deleteOne(1)).thenReturn(of({} as any));
      industriesService.deleteOne(1).subscribe(() => {
        verify(mockedIndustriesDataAccessService.deleteOne(1)).once();
        done();
      });
    });
  });
});
