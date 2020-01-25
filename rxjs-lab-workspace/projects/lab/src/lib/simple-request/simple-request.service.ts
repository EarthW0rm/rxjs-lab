import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResults, Film } from '../models';

@Injectable({
	providedIn: 'root'
})
export class SimpleRequestService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private http: HttpClient ) { }

	public GetFilms(): Observable<PagedResults<Film>> {

		const methodUri = `${this.swapiUrl}films`;

		const _observable = this.http.get<PagedResults<Film>>(methodUri, { headers: {'Content-Type': 'application/json'}});
		return _observable;
	}
}
