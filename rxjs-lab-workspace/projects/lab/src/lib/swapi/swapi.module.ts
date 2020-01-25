import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FilmsService } from './films.service';
import { PeoplesService } from './peoples.service';
import { PlanetsService } from './planets.service';
import { ResourceService } from './resource.service';
import { SpaceshipsService } from './spaceships.service';
import { SpeciesService } from './species.service';
import { VehiclesService } from './vehicles.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule
	],
	providers: [
		FilmsService,
		PeoplesService,
		PlanetsService,
		ResourceService,
		SpaceshipsService,
		SpeciesService,
		VehiclesService
	]
})
export class SwapiModule {
	static forRoot(swapiUrl?: string): ModuleWithProviders {
		return {
			ngModule: SwapiModule,
			providers: [
				{ provide: 'SWAPI_URL', useValue: swapiUrl ? swapiUrl : 'https://swapi.co/api/' }
			]
		};
	}
}
