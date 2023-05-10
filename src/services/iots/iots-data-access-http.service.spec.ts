import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import {
  deepEqual,
  instance,
  mock,
  reset,
  verify,
  when
} from "ts-mockito";
import { IoT } from "./iot.interface";
import { IotsDataAccessHttpService } from "./iots-data-access-http.service";

describe("IndustriesDataAccessHttpService", () => {
  const mockedHttpClient = mock(HttpClient);
  const iotsDataAccessService = new IotsDataAccessHttpService(
    instance(mockedHttpClient)
  );

  afterEach(() => {
    reset(mockedHttpClient);
  });

  it("Should be defined", () => {
    expect(iotsDataAccessService).toBeDefined();
  });

  describe("#getAll", () => {
    it("Should get all iots", (done) => {
      const expectedResult: IoT[] = [
        {
          id: 1,
          name: "IoT 1",
          fee: 1,
          industryId: 1,
          numOfDevices: 1,
          warehouseAdditionTime: "test",
        },
        {
          id: 2,
          name: "IoT 2",
          fee: 1,
          industryId: 2,
          numOfDevices: 2,
          warehouseAdditionTime: "test2",
        },
      ];
      when(mockedHttpClient.get("http://localhost:8080/iots")).thenReturn(
        of(expectedResult)
      );
      iotsDataAccessService.getAll().subscribe((result) => {
        expect(result).toEqual(expectedResult);
        verify(mockedHttpClient.get("http://localhost:8080/iots")).once();
        done();
      });
    });

    it("Should get all iots filtered by name", (done) => {
      const expectedResult = [
        {
          id: 1,
          name: "IoT 1",
          fee: 1,
          industryId: 1,
          numOfDevices: 1,
          warehouseAdditionTime: "test",
        },
        {
          id: 2,
          name: "IoT 2",
          fee: 1,
          industryId: 2,
          numOfDevices: 2,
          warehouseAdditionTime: "test2",
        },
      ];
      when(
        mockedHttpClient.get("http://localhost:8080/iots?name_like=IoT 2")
      ).thenReturn(of(expectedResult as any));
      iotsDataAccessService.getAll({ name: "IoT 2" }).subscribe((result) => {
        expect(result).toEqual(expectedResult);
        verify(
          mockedHttpClient.get("http://localhost:8080/iots?name_like=IoT 2")
        ).once();
        done();
      });
    });
  });

  describe("#getOne", () => {
    it("Should get Industry by id", (done) => {
      const expectedResult = {
        id: 1,
        name: "IoT 1",
        fee: 1,
        industryId: 1,
        numOfDevices: 1,
        warehouseAdditionTime: "test",
      };
      when(mockedHttpClient.get("http://localhost:8080/iots/1")).thenReturn(
        of(expectedResult)
      );
      iotsDataAccessService.getOne(1).subscribe((result) => {
        expect(result).toEqual(expectedResult);
        verify(mockedHttpClient.get("http://localhost:8080/iots/1")).once();
        done();
      });
    });
  });

  describe("#createOne", () => {
    it("Should create a Industry", (done) => {
      const expectedResult = {
        id: 1,
        name: "IoT 1",
        fee: 1,
        industryId: 1,
        numOfDevices: 1,
        warehouseAdditionTime: "test",
      };
      when(
        mockedHttpClient.post(
          "http://localhost:8080/iots",
          deepEqual({
            name: "IoT 1",
            fee: 1,
            industryId: 1,
            numOfDevices: 1,
            warehouseAdditionTime: "test",
          })
        )
      ).thenReturn(of(expectedResult));
      iotsDataAccessService
        .createOne({
          name: "IoT 1",
          fee: 1,
          industryId: 1,
          numOfDevices: 1,
          warehouseAdditionTime: "test",
        })
        .subscribe((result) => {
          expect(result.id).toBeDefined();
          expect(result.name).toEqual("IoT 1");
          expect(result.fee).toEqual(1);
          expect(result.industryId).toEqual(1);
          expect(result.numOfDevices).toEqual(1);
          expect(result.warehouseAdditionTime).toEqual("test");
          verify(
            mockedHttpClient.post(
              "http://localhost:8080/iots",
              deepEqual({
                name: "IoT 1",
                fee: 1,
                industryId: 1,
                numOfDevices: 1,
                warehouseAdditionTime: "test",
              })
            )
          ).once();
          done();
        });
    });
  });

  describe("#updateOne", () => {
    it("Should update a iot", (done) => {
      const expectedResult = {
        id: 1,
        name: "new",
      };
      when(
        mockedHttpClient.put("http://localhost:8080/iots/1", deepEqual({ name: "new" }))
      ).thenReturn(of(expectedResult));
      iotsDataAccessService
        .updateOne(1, { name: "new" })
        .subscribe((result) => {
          expect(result!.id).toBeDefined();
          expect(result!.name).toEqual("new");
          verify(
            mockedHttpClient.put("http://localhost:8080/iots/1", deepEqual({ name: "new" }))
          ).once();
          done();
        });
    });
  });

  describe("#deleteOne", () => {
    it("Should delete a industry", (done) => {
      const expectedResult = { success: true };
      when(mockedHttpClient.delete("http://localhost:8080/iots/1")).thenReturn(
        of(expectedResult)
      );

      iotsDataAccessService.deleteOne(1).subscribe((result) => {
        expect(result).toBeTruthy();
        verify(
          mockedHttpClient.delete(
            "http://localhost:8080/iots/1"
          )
        ).once();
        done();
      });
    });
  });
});
