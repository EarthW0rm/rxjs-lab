import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults, Film } from '../models';
import { ResourceService } from './resource.service';

@Injectable()
export class FilmsService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService ) { }

	public GetFilms(): Observable<PagedResults<Film>> {
		const methodUri = `${this.swapiUrl}films`;

		const observable = this.resourceService.GetPagedResults<Film>(methodUri);
		return observable;
	}

	public GetFilm(filmId: number): Observable<Film> {
		const methodUri = `${this.swapiUrl}films/${filmId}`;

		const observable = this.resourceService.GetItem<Film>(methodUri);
		return observable;
	}
}
