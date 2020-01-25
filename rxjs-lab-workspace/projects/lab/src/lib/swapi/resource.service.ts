import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResults } from '../models';

@Injectable()
export class ResourceService {
	constructor(private http: HttpClient ) { }

	public GetPagedResults<T>(methodUri: string): Observable<PagedResults<T>> {
		const _observable = this.http.get<PagedResults<T>>(methodUri, { headers: {'Content-Type': 'application/json'}});
		return _observable;
	}

	public GetItem<T>(methodUri: string): Observable<T> {
		const _observable = this.http.get<T>(methodUri, { headers: {'Content-Type': 'application/json'}});
		return _observable;
	}
}
