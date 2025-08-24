import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { JotformModalComponent } from '../../components/jotform/jotform-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, JotformModalComponent]
})
export class HomeComponent {}
