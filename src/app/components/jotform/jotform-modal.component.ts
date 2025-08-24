import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-jotform-modal',
  templateUrl: './jotform-modal.component.html',
  styleUrls: ['./jotform-modal.component.css'],
  imports: [CommonModule]
})
export class JotformModalComponent implements OnChanges {
  @Input() formUrl: string = '';
  @Input() buttonLabel: string = 'Open Jotform'; // default label

  safeUrl: SafeResourceUrl = '';

  showModal = false;
  showContent = false;

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }

  ngOnChanges() {
    console.log(this.formUrl)
    if (this.formUrl) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.formUrl);
    }
  }

  openModal() {
    this.showModal = true;
    setTimeout(() => {
      this.showContent = true;
      this.cdr.detectChanges();
    }, 100);
  }

  closeModal() {
    this.showContent = false;
    setTimeout(() => {
      this.showModal = false;
      this.cdr.detectChanges();
    }, 300);
  }
}
