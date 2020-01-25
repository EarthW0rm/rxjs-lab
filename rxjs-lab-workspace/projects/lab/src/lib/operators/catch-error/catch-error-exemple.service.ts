import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PagedResults, Film, JsendEnvelope } from '../../models';
import { map } from 'rxjs/operators';
import { FilmsService } from '../../swapi/films.service';

@Injectable({
  providedIn: 'root'
})
export class CatchErrorExempleService {
  constructor(@Inject('SWAPI_URL') private swapiUrl: string, private filmsService: FilmsService ) { }

	public GetFilms(): Observable<JsendEnvelope<PagedResults<Film>>> {

		const methodUri = `${this.swapiUrl}films`;

		const _observable = this.filmsService.GetFilms()
			.pipe(
				map((_: PagedResults<Film>) => { return { data: _, status: 'success'} as JsendEnvelope<PagedResults<Film>>})
			); 
			
		return _observable;
	}
}
