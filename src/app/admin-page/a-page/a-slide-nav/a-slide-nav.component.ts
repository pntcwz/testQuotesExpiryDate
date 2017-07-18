import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-a-slide-nav',
  templateUrl: './a-slide-nav.component.html',
  styleUrls: ['./a-slide-nav.component.css']
})
export class ASlideNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
