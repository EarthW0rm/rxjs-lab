/*
Author: https://github.com/mrzzcn/swapi-typescript/tree/master/src/models
*/

import { Resource, ResourceUrl } from './base';

export interface Spaceship extends Resource {
	name: string;
	model: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	max_atmosphering_speed: string;
	crew: string;
	passengers: string;
	cargo_capacity: string;
	consumables: string;
	hyperdrive_rating: string;
	MGLT: string;
	starship_class: string;
	pilots: ResourceUrl[];
	films: ResourceUrl[];
} // eslint-disable-line
