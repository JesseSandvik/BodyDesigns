import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelMode, MapLinkService } from '../../services/map-link.service';

@Component({
    selector: 'app-map-link',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './map-link.component.html',
    styleUrls: ['./map-link.component.css']
})
export class MapLinkComponent implements OnInit {
    @Input() displayText!: string;
    @Input() to!: string;
    @Input() from: string | null = null;
    @Input() mode: 'location' | 'directions' = 'location';
    @Input() travelMode?: TravelMode;

    mapUrl: string = '#';

    constructor(
        private mapLinkService: MapLinkService,
        private cdr: ChangeDetectorRef
    ) { }

    async ngOnInit() {
        if (!this.travelMode) this.travelMode = 'driving';

        const ua = navigator.userAgent.toLowerCase();
        const isAndroid = /android/.test(ua);
        const isApple = /iphone|ipad|macintosh/.test(ua);
        this.cdr.detectChanges();

        try {
            let fromLocation = this.from;
            this.mapUrl = await this.generateMapUrl(fromLocation);
            this.cdr.detectChanges();

            if (!fromLocation && this.mode === 'directions') {
                const location = await this.getCurrentLocation();
                if (location) {
                    this.mapUrl = await this.generateMapUrl(location);
                    this.cdr.detectChanges();
                }
            }

            if (isApple) {
                const googleInstalled = await this.mapLinkService.hasGoogleMapsInstalled();
                if (googleInstalled) {
                    const fromLoc = this.from ?? await this.getCurrentLocation();
                    this.mapUrl = await this.generateMapUrl(fromLoc);
                    this.cdr.detectChanges();
                }
            }
        } catch (err) {
            console.error('Map link init error:', err);
        }
    }

    private async generateMapUrl(from: string | null): Promise<string> {
        if (this.mode === 'directions') {
            return this.mapLinkService.getDirectionsUrl(from, this.to, this.travelMode!);
        } else {
            return this.mapLinkService.getMapUrl(this.to);
        }
    }

    private async getCurrentLocation(): Promise<string | null> {
        if (!navigator.geolocation) return null;

        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve(`${pos.coords.latitude},${pos.coords.longitude}`),
                (err) => {
                    console.warn('Geolocation error:', err);
                    resolve(null);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        });
    }
}
