import { Injectable, Inject } from '@angular/core';
import { Vehicle, PagedResults } from '../models';
import { Observable } from 'rxjs';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
	constructor(@Inject('SWAPI_URL') private swapiUrl: string, private resourceService: ResourceService) { }

	public GetVehicles(): Observable<PagedResults<Vehicle>> {
		let methodUri = `${this.swapiUrl}vehicles`;

		const _observable = this.resourceService.GetPagedResults<Vehicle>(methodUri);
		return _observable;
	}

	public GetVehicle(vehicleId: number): Observable<Vehicle> {
		let methodUri = `${this.swapiUrl}vehicles/${vehicleId}`;

		const _observable = this.resourceService.GetItem<Vehicle>(methodUri);
		return _observable;
	}
}
