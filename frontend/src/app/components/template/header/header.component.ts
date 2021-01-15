import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _headerService: HeaderService,
  ) { }

  ngOnInit(): void {
  }

  public get title(): string {
   return this._headerService.headerData.title;
  }

  public get icon(): string {
    return this._headerService.headerData.icon;
   }

  public get routeUrl(): string {
    return this._headerService.headerData.routeUrl;
   }
  

}
