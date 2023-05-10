import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { DataAccessInterface } from "../data-access.interface";
import { IoT } from "./iot.interface";
import { createQuery } from "@utils/utils";

export class IotsDataAccessHttpService implements DataAccessInterface<IoT> {
  private readonly baseURL = environment.baseURL + "/iots"; //json-server base url

  constructor(private readonly httpClient: HttpClient) {}

  getAll(iot?: Partial<IoT>): Observable<IoT[]> {
    let query = createQuery(iot);
    return this.httpClient.get<IoT[]>(this.baseURL + query);
  }

  getOne(id: number): Observable<IoT | undefined> {
    return this.httpClient.get<IoT>(this.baseURL + `/${id}`);
  }

  createOne(iot: Omit<IoT, "id">): Observable<IoT> {
    return this.httpClient.post<IoT>(this.baseURL, iot);
  }

  updateOne(
    id: number,
    iot: Partial<Omit<IoT, "id">>
  ): Observable<IoT | undefined> {
    return this.httpClient.put<IoT>(this.baseURL + `/${id}`, iot);
  }

  deleteOne(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseURL + `/${id}`);
  }
}
