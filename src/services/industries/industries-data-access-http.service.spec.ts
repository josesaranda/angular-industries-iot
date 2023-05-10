import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { deepEqual, instance, mock, reset, verify, when } from "ts-mockito";
import { IndustriesDataAccessHttpService } from "./industries-data-access-http.service";

describe("IndustriesDataAccessHttpService", () => {
  const mockedHttpClient = mock(HttpClient);
  const industriesDataAccessService = new IndustriesDataAccessHttpService(
    instance(mockedHttpClient)
  );

  afterEach(() => {
    reset(mockedHttpClient);
  });

  it("Should be defined", () => {
    expect(industriesDataAccessService).toBeDefined();
  });

  describe("#getAll", () => {
    it("Should get all industries", (done) => {
      const expectedResult = [{ id: 1, name: "Industry" }];
      when(mockedHttpClient.get("http://localhost:8080/industries")).thenReturn(
        of(expectedResult)
      );
      industriesDataAccessService.getAll().subscribe((result) => {
        expect(result).toEqual(expectedResult);
        verify(mockedHttpClient.get("http://localhost:8080/industries")).once();
        done();
      });
    });

    it("Should get all industries filtered by name", (done) => {
      const expectedResult = [{ id: 1, name: "Industry 1" }];
      when(
        mockedHttpClient.get(
          "http://localhost:8080/industries?name_like=Industry 1"
        )
      ).thenReturn(of(expectedResult as any));
      industriesDataAccessService
        .getAll({ name: "Industry 1" })
        .subscribe((result) => {
          expect(result).toEqual(expectedResult);
          verify(
            mockedHttpClient.get(
              "http://localhost:8080/industries?name_like=Industry 1"
            )
          ).once();
          done();
        });
    });
  });

  describe("#getOne", () => {
    it("Should get Industry by id", (done) => {
      const expectedResult = {
        id: 1,
        name: "Industry 1",
      };
      when(
        mockedHttpClient.get("http://localhost:8080/industries/1")
      ).thenReturn(of(expectedResult));
      industriesDataAccessService.getOne(1).subscribe((result) => {
        expect(result).toEqual(expectedResult);
        verify(
          mockedHttpClient.get("http://localhost:8080/industries/1")
        ).once();
        done();
      });
    });
  });

  describe("#createOne", () => {
    it("Should create a Industry", (done) => {
      const expectedResult = {
        id: 1,
        name: "new Industry",
      };
      when(
        mockedHttpClient.post(
          "http://localhost:8080/industries",
          deepEqual({ name: "new Industry" })
        )
      ).thenReturn(of(expectedResult));
      industriesDataAccessService
        .createOne({ name: "new Industry" })
        .subscribe((result) => {
          expect(result.id).toBeDefined();
          expect(result.name).toEqual("new Industry");
          verify(
            mockedHttpClient.post(
              "http://localhost:8080/industries",
              deepEqual({ name: "new Industry" })
            )
          ).once();
          done();
        });
    });
  });

  describe("#updateOne", () => {
    it("Should update a Industry", (done) => {
      const expectedResult = {
        id: 1,
        name: "new name",
      };
      when(
        mockedHttpClient.put(
          "http://localhost:8080/industries/1",
          deepEqual({ name: "new name" })
        )
      ).thenReturn(of(expectedResult));
      industriesDataAccessService
        .updateOne(1, { name: "new name" })
        .subscribe((result) => {
          expect(result!.id).toBeDefined();
          expect(result!.name).toEqual("new name");
          verify(
            mockedHttpClient.put(
              "http://localhost:8080/industries/1",
              deepEqual({ name: "new name" })
            )
          ).once();
          done();
        });
    });
  });

  describe("#deleteOne", () => {
    it("Should delete a Industry", (done) => {
      const expectedResult = { success: true };
      when(
        mockedHttpClient.delete("http://localhost:8080/industries/1")
      ).thenReturn(of(expectedResult));

      industriesDataAccessService.deleteOne(1).subscribe((result) => {
        expect(result).toBeTruthy();
        verify(
          mockedHttpClient.delete("http://localhost:8080/industries/1")
        ).once();
        done();
      });
    });
  });
});
