import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) =>
          this.countriesService.searchCountryByAlphaCode(params['id'])
        )
      )
      .subscribe((country) => {
        console.log(country)
        if(!country) {
          return this.router.navigateByUrl('');
        }
        console.log("FOUND COUNTRY")
        return;
      });
  }
}
