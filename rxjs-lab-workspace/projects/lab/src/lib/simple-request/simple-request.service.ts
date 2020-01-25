import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults, Film } from '../models';
import { FilmsService } from '../swapi/films.service';

@Injectable({
	providedIn: 'root'
})
export class SimpleRequestService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private filmsService: FilmsService ) { }

	public GetFilms(): Observable<PagedResults<Film>> {
		return this.filmsService.GetFilms();
	}
}
