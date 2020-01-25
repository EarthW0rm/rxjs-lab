import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults, Film } from '../models';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService ) { }

	public GetFilms(): Observable<PagedResults<Film>> {
		let methodUri = `${this.swapiUrl}films`;

		const _observable = this.resourceService.GetPagedResults<Film>(methodUri);
		return _observable;
	}

	public GetFilm(filmId: number): Observable<Film> {
		let methodUri = `${this.swapiUrl}films/${filmId}`;

		const _observable = this.resourceService.GetItem<Film>(methodUri);
		return _observable;
	}
}
