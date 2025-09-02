import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from "@angular/common";
import { filter } from "rxjs";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [CommonModule, HeaderComponent, RouterOutlet, FooterComponent]
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          if (this.scrollContainer) {
            this.scrollContainer.nativeElement.scrollTo({ top: 0 });
          }
        })
  }
}
