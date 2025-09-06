import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapLinkComponent } from "../components/map-link/map-link.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule, MapLinkComponent]
})
export class FooterComponent {
  currentYear: Number = new Date().getFullYear()
}
