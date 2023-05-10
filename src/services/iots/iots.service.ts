import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IoT } from "./iot.interface";
import { IotsDataAccessHttpService } from "./iots-data-access-http.service";
import { DataAccessInterface } from "../data-access.interface";

@Injectable({
  providedIn: "root",
})
export class IotsService {
  iotsDataAccessService: IotsDataAccessHttpService;

  constructor(private readonly httpClient: HttpClient) {
    this.iotsDataAccessService = new IotsDataAccessHttpService(this.httpClient);
  }

  getAll(iot?: Partial<IoT>): Observable<IoT[]> {
    return this.iotsDataAccessService.getAll(iot);
  }

  getOne(id: number): Observable<IoT | undefined> {
    return this.iotsDataAccessService.getOne(id);
  }

  createOne(iot: Omit<IoT, "id">): Observable<IoT> {
    return this.iotsDataAccessService.createOne(iot);
  }

  updateOne(
    id: number,
    iot: Partial<Omit<IoT, "id">>
  ): Observable<IoT | undefined> {
    return this.iotsDataAccessService.updateOne(id, iot);
  }

  deleteOne(id: number): Observable<void> {
    return this.iotsDataAccessService.deleteOne(id);
  }
}
