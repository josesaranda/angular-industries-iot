import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Industry } from "./industry.interface";
import { IndustriesDataAccessHttpService } from "./industries-data-access-http.service";
import { DataAccessInterface } from "../data-access.interface";

@Injectable({
  providedIn: "root",
})
export class IndustriesService {
  industriesDataAccessService: DataAccessInterface<Industry>;

  constructor(private readonly httpClient: HttpClient) {
    this.industriesDataAccessService = new IndustriesDataAccessHttpService(
      this.httpClient
    );
  }

  getAll(industry?: Partial<Industry>): Observable<Industry[]> {
    return this.industriesDataAccessService.getAll(industry);
  }

  getOne(id: number): Observable<Industry | undefined> {
    return this.industriesDataAccessService.getOne(id);
  }

  createOne(industry: Omit<Industry, "id">): Observable<Industry> {
    return this.industriesDataAccessService.createOne(industry);
  }

  updateOne(id: number, industry: Partial<Omit<Industry, "id">>): Observable<Industry | undefined> {
    return this.industriesDataAccessService.updateOne(id, industry);
  }

  deleteOne(id: number): Observable<void> {
    return this.industriesDataAccessService.deleteOne(id);
  }
}
