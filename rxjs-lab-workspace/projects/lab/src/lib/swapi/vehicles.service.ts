import { Injectable, Inject } from '@angular/core';
import { Vehicle, PagedResults } from '../models';
import { Observable } from 'rxjs';
import { ResourceService } from './resource.service';

@Injectable()
export class VehiclesService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService) { }

	public GetVehicles(): Observable<PagedResults<Vehicle>> {
		const methodUri = `${this.swapiUrl}vehicles`;

		const observable = this.resourceService.GetPagedResults<Vehicle>(methodUri);
		return observable;
	}

	public GetVehicle(vehicleId: number): Observable<Vehicle> {
		const methodUri = `${this.swapiUrl}vehicles/${vehicleId}`;

		const observable = this.resourceService.GetItem<Vehicle>(methodUri);
		return observable;
	}
}
