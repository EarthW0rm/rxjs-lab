import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceService } from './resource.service';
import { PagedResults, People } from '../models';

@Injectable()
export class PeoplesService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService) { }

	public GetPeoples(): Observable<PagedResults<People>> {
		const methodUri = `${this.swapiUrl}people`;

		const observable = this.resourceService.GetPagedResults<People>(methodUri);
		return observable;
	}

	public GetPeople(peopleId: number): Observable<People> {
		const methodUri = `${this.swapiUrl}people/${peopleId}`;

		const observable = this.resourceService.GetItem<People>(methodUri);
		return observable;
	}
}
