import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exporter-profile',
  templateUrl: './exporter-profile.component.html',
  styleUrls: ['./exporter-profile.component.scss']
})
export class ExporterProfileComponent implements OnInit {

  constructor(
    private router: Router,
  ) {

    alert(this.router.getCurrentNavigation().extras.state.example);

  }

  ngOnInit(): void {
  }

}
