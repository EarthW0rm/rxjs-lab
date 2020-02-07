/*
Author: https://github.com/mrzzcn/swapi-typescript/tree/master/src/models
*/

import { Resource, ResourceUrl } from './base';

export interface Film extends Resource {
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: ResourceUrl[];
	planets: ResourceUrl[];
	starships: ResourceUrl[];
	vehicles: ResourceUrl[];
	species: ResourceUrl[];
} // eslint-disable-line
