import { Component, Input, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnInit {
  @Input()
  public countries: Country[] = [];

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
    this.countries = this.countriesService.cacheStore.byRegion.countries;
  }

  searchByRegion(region: Region): void {
    this.selectedRegion = region;

    this.countriesService.searchRegion(region).subscribe((regionCountries) => {
      this.countries = regionCountries;
    });
  }
}
