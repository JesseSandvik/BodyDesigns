import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [HeaderComponent, RouterOutlet]
})
export class LayoutComponent {}
