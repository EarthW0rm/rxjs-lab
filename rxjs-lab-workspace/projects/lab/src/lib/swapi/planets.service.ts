import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceService } from './resource.service';
import { PagedResults, People, Planet } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService) { }

	public GetPlanets(): Observable<PagedResults<Planet>> {
		let methodUri = `${this.swapiUrl}planets`;

		const _observable = this.resourceService.GetPagedResults<Planet>(methodUri);
		return _observable;
	}

	public GetPlanet(planetId: number): Observable<Planet> {
		let methodUri = `${this.swapiUrl}planets/${planetId}`;

		const _observable = this.resourceService.GetItem<Planet>(methodUri);
		return _observable;
	}
}
