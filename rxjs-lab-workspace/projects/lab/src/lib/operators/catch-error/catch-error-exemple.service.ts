import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PagedResults, Film, JsendEnvelope } from '../../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatchErrorExempleService {
  constructor(@Inject('SWAPI_URL') private swapiUrl: string, private http: HttpClient ) { }

	public GetFilms(): Observable<JsendEnvelope<PagedResults<Film>>> {

		const methodUri = `${this.swapiUrl}films`;

		const _observable = this.http.get<PagedResults<Film>>(methodUri, { headers: {'Content-Type': 'application/json'}}).pipe(
			map((_: PagedResults<Film>) => { return { data: _, status: 'success'} as JsendEnvelope<PagedResults<Film>>})
		); 

		return _observable;
	}
}
