import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceService } from './resource.service';
import { PagedResults, People } from '../models';

@Injectable()
export class PeoplesService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService) { }

	public GetPeoples(): Observable<PagedResults<People>> {
		let methodUri = `${this.swapiUrl}people`;

		const _observable = this.resourceService.GetPagedResults<People>(methodUri);
		return _observable;
	}

	public GetPeople(peopleId: number): Observable<People> {
		let methodUri = `${this.swapiUrl}people/${peopleId}`;

		const _observable = this.resourceService.GetItem<People>(methodUri);
		return _observable;
	}
}
