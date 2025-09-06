import { Injectable } from '@angular/core';

export type TravelMode = 'driving' | 'walking' | 'transit' | 'bicycling';


@Injectable({ providedIn: 'root' })
export class MapLinkService {
  private userAgent = navigator.userAgent.toLowerCase();
  private googleInstalledCache: boolean | null = null;

  isApple(): boolean { return /iphone|ipad|macintosh/.test(this.userAgent); }
  isAndroid(): boolean { return /android/.test(this.userAgent); }

  async hasGoogleMapsInstalled(timeout = 500): Promise<boolean> {
    if (!this.isApple()) return false;

    if (this.googleInstalledCache !== null) {
      return this.googleInstalledCache;
    }

    return new Promise<boolean>((resolve) => {
      let resolved = false;
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = 'comgooglemaps://';
      document.body.appendChild(iframe);

      const cleanup = () => {
        if (!resolved) {
          resolved = true;
          document.body.removeChild(iframe);
          this.googleInstalledCache = false;
          resolve(false);
        }
      };

      const timer = setTimeout(cleanup, timeout);

      window.addEventListener('blur', () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          document.body.removeChild(iframe);
          this.googleInstalledCache = true;
          resolve(true);
        }
      }, { once: true });
    });
  }

  async getMapUrl(addressOrCoords: string): Promise<string> {
    const encoded = encodeURIComponent(addressOrCoords);

    if (this.isAndroid()) return `geo:0,0?q=${encoded}`;

    if (this.isApple()) {
      const googleInstalled = await this.hasGoogleMapsInstalled();
      return googleInstalled
        ? `comgooglemaps://?q=${encoded}`
        : `maps://?q=${encoded}`;
    }

    return `https://www.google.com/maps?q=${encoded}`;
  }

  async getDirectionsUrl(from: string | null, to: string, mode: TravelMode = 'driving'): Promise<string> {
    const encodedTo = encodeURIComponent(to);

    if (this.isAndroid()) {
      if (from) {
        const encodedFrom = encodeURIComponent(from);
        return `https://www.google.com/maps/dir/?api=1&origin=${encodedFrom}&destination=${encodedTo}&travelmode=${mode}`;
      }
      return `google.navigation:q=${encodedTo}&mode=${mode.charAt(0)}`;
    }

    if (this.isApple()) {
      const googleInstalled = await this.hasGoogleMapsInstalled();
      if (googleInstalled) {
        if (from) {
          const encodedFrom = encodeURIComponent(from);
          return `comgooglemaps://?saddr=${encodedFrom}&daddr=${encodedTo}&directionsmode=${mode}`;
        }
        return `comgooglemaps://?daddr=${encodedTo}&directionsmode=${mode}`;
      }
      const modeMap: Record<TravelMode, string> = {
        driving: 'd', walking: 'w', transit: 'r', bicycling: 'd'
      };
      if (from) {
        const encodedFrom = encodeURIComponent(from);
        return `maps://?saddr=${encodedFrom}&daddr=${encodedTo}&dirflg=${modeMap[mode]}`;
      }
      return `maps://?daddr=${encodedTo}&dirflg=${modeMap[mode]}`;
    }

    if (from) {
      const encodedFrom = encodeURIComponent(from);
      return `https://www.google.com/maps/dir/?api=1&origin=${encodedFrom}&destination=${encodedTo}&travelmode=${mode}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedTo}&travelmode=${mode}`;
  }
}

