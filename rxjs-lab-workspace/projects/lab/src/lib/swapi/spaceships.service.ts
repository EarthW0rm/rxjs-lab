import { Injectable, Inject } from '@angular/core';
import { ResourceService } from './resource.service';
import { Spaceship, PagedResults } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class SpaceshipsService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService) { }

	public GetSpaceships(): Observable<PagedResults<Spaceship>> {
		let methodUri = `${this.swapiUrl}spaceships`;

		const _observable = this.resourceService.GetPagedResults<Spaceship>(methodUri);
		return _observable;
	}

	public GetSpaceship(spaceshipId: number): Observable<Spaceship> {
		let methodUri = `${this.swapiUrl}spaceships/${spaceshipId}`;

		const _observable = this.resourceService.GetItem<Spaceship>(methodUri);
		return _observable;
	}
}
