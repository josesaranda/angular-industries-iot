import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { DataAccessInterface } from "../data-access.interface";
import { Industry } from "./industry.interface";
import { createQuery } from "@utils/utils";

export class IndustriesDataAccessHttpService
  implements DataAccessInterface<Industry>
{
  private readonly baseURL = environment.baseURL + "/industries"; //json-server base url

  constructor(private readonly httpClient: HttpClient) {}

  getAll(industry?: Partial<Industry>): Observable<Industry[]> {
    let query = createQuery(industry);
    return this.httpClient.get<Industry[]>(this.baseURL + query);
  }

  getOne(id: number): Observable<Industry | undefined> {
    return this.httpClient.get<Industry>(this.baseURL + `/${id}`);
  }

  createOne(industry: Omit<Industry, "id">): Observable<Industry> {
    return this.httpClient.post<Industry>(this.baseURL, industry);
  }

  updateOne(
    id: number,
    industry: Partial<Omit<Industry, "id">>
  ): Observable<Industry | undefined> {
    return this.httpClient.put<Industry>(this.baseURL + `/${id}`, industry);
  }

  deleteOne(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseURL + `/${id}`);
  }
}
