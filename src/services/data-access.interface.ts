import { Observable } from "rxjs";

export interface DataAccessInterface<T> {
  getAll(object?: Partial<T>): Observable<T[]>;
  getOne(id: number): Observable<T | undefined>;
  createOne(object: Omit<T, "id">): Observable<T>;
  updateOne(
    id: number,
    name: Partial<Omit<T, "id">>
  ): Observable<T | undefined>;
  deleteOne(id: number): Observable<void>;
}
