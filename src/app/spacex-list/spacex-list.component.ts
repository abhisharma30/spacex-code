import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SpacexService } from '../spacex.service';

@Component({
  selector: 'app-spacex-list',
  templateUrl: './spacex-list.component.html',
  styleUrls: ['./spacex-list.component.css']
})

export class SpacexListComponent implements OnInit {

  spacexPrograms: any = [];
  launchYears: any = [];
  showSpinner = true;
  page = 1;
  filters = {
    launch_success: '',
    land_success: '',
    launch_year: '',
    limit: 100
  };

  constructor(private spacexService: SpacexService, private router: Router, private route: ActivatedRoute) {
    for(const key in this.route.snapshot.queryParams) {
      this.filters[key] = this.route.snapshot.queryParams[key];
    }
   }

  ngOnInit() {
    this.getPrograms();
    for (let i = 2006; i <= 2020; i++) {
      this.launchYears.push(i);
    }
  }

  getPrograms(): void {
    this.showSpinner = true;
    const queryParams = { ...this.filters };

    this.router.navigate([],  {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    if (!this.spacexService.spacexPrograms) {
      this.spacexService.getPrograms(this.filters).subscribe(
        data => {
          this.spacexPrograms = data;
          this.showSpinner = false;
        },
        err => {
          this.showSpinner = false;
          console.log(err);
        }
      );
    } else {
      this.showSpinner = false;
      this.spacexPrograms = this.spacexService.spacexPrograms;
    }
  }

  applyFilter(type, value): void {
    if (this.filters[type] === value) {
      this.filters[type] = '';
    } else {
      this.filters[type] = value;
    }
    this.getPrograms();
  }
}
