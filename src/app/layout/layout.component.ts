import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class LayoutComponent {}
