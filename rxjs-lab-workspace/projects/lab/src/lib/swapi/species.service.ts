import { Injectable, Inject } from '@angular/core';
import { Specie, PagedResults } from '../models';
import { Observable } from 'rxjs';
import { ResourceService } from './resource.service';

@Injectable()
export class SpeciesService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService) { }

	public GetSpecies(): Observable<PagedResults<Specie>> {
		const methodUri = `${this.swapiUrl}species`;

		const observable = this.resourceService.GetPagedResults<Specie>(methodUri);
		return observable;
	}

	public GetSpecie(specieId: number): Observable<Specie> {
		const methodUri = `${this.swapiUrl}species/${specieId}`;

		const observable = this.resourceService.GetItem<Specie>(methodUri);
		return observable;
	}
}
