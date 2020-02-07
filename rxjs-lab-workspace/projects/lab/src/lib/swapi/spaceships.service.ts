import { Injectable, Inject } from '@angular/core';
import { ResourceService } from './resource.service';
import { Spaceship, PagedResults } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class SpaceshipsService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService) { }

	public GetSpaceships(): Observable<PagedResults<Spaceship>> {
		const methodUri = `${this.swapiUrl}starships`;

		const observable = this.resourceService.GetPagedResults<Spaceship>(methodUri);
		return observable;
	}

	public GetSpaceship(spaceshipId: number): Observable<Spaceship> {
		const methodUri = `${this.swapiUrl}starships/${spaceshipId}`;

		const observable = this.resourceService.GetItem<Spaceship>(methodUri);
		return observable;
	}
}
