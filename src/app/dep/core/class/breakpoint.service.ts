import { Injectable } from '@angular/core';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})

export class BreakpointService {
  private clients: any[] = [];
  private orientationWatchClients: any[] = [];

  // private small = '(max-width: 768px)';
  private small = '(max-width: 1024px)';
  // private medium = '(min-width: 769px) and (max-width: 1024px)';
  private large = '(min-width: 1025px)';
  private portrait = '(orientation: portrait)';

  public useDesktopStyle = false;
  public useTabletStyle = false;
  public useMobileStyle = false;

  constructor(private bpo: BreakpointObserver) {
    const channelObserver = this.bpo.observe([
      this.small,
      // this.medium,
      this.large
    ]).subscribe({
      next: (state: BreakpointState) => {
        this.useMobileStyle = state.breakpoints[this.small];
        this.useTabletStyle = state.breakpoints[this.small];
        this.useDesktopStyle = state.breakpoints[this.large];
        
        this.clients.forEach(client => {
          client?.notifyScreenResize();
        });
      }
    });

    const oriendationObserver = this.bpo.observe([
      this.portrait
    ]).subscribe({
      next: (state: BreakpointState) => {
        this.orientationWatchClients.forEach(client => {
          client?.notifyOrientationChange(state.matches);
        });
      }
    });
  }

  public registerChannelChange(client: any): void {
    this.clients.push(client);
    client?.notifyScreenResize();
  }

  public registerOrientationChange(client: any): void {
    this.orientationWatchClients.push(client);
    client?.notifyOrientationChange();
  }

  public unregisterChannelChange(client: any): void {
    const index = this.clients.indexOf(client, 0);

    if (index > -1)
      this.clients.splice(index, 1);
  }
  public unregisterOrientationChange(client: any): void {
    const index = this.orientationWatchClients.indexOf(client, 0);

    if (index > -1)
      this.orientationWatchClients.splice(index, 1);
  }
}