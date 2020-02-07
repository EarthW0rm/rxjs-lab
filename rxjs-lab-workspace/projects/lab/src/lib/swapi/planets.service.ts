import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceService } from './resource.service';
import { PagedResults, People, Planet } from '../models';

@Injectable()
export class PlanetsService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService) { }

	public GetPlanets(): Observable<PagedResults<Planet>> {
		const methodUri = `${this.swapiUrl}planets`;

		const observable = this.resourceService.GetPagedResults<Planet>(methodUri);
		return observable;
	}

	public GetPlanet(planetId: number): Observable<Planet> {
		const methodUri = `${this.swapiUrl}planets/${planetId}`;

		const observable = this.resourceService.GetItem<Planet>(methodUri);
		return observable;
	}
}
