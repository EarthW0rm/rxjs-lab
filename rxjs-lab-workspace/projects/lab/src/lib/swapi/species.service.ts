import { Injectable, Inject } from '@angular/core';
import { Specie, PagedResults } from '../models';
import { Observable } from 'rxjs';
import { ResourceService } from './resource.service';

@Injectable()
export class SpeciesService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService) { }

	public GetSpecies(): Observable<PagedResults<Specie>> {
		let methodUri = `${this.swapiUrl}species`;

		const _observable = this.resourceService.GetPagedResults<Specie>(methodUri);
		return _observable;
	}

	public GetSpecie(specieId: number): Observable<Specie> {
		let methodUri = `${this.swapiUrl}species/${specieId}`;

		const _observable = this.resourceService.GetItem<Specie>(methodUri);
		return _observable;
	}
}
