import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private document: Document ) { }

  ngOnInit(): void {
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('togglesidebar');
  }

}
