import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapLinkComponent } from '../../components/map-link/map-link.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [CommonModule, MapLinkComponent]
})
export class ContactComponent {}
