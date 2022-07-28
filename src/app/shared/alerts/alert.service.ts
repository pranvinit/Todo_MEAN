import { assertPlatform, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  id: number;
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: Alert[];
  alerts$ = new BehaviorSubject<Alert[]>([]);
  constructor() {
    this.alerts$.subscribe((alerts) => (this.alerts = alerts));
  }

  private generateId() {
    return Date.now();
  }

  addAlert(message: string, type: 'success' | 'error') {
    const id = this.generateId();
    const alert = {
      id,
      message,
      type,
    };

    this.alerts$.next([...this.alerts, alert]);

    setTimeout(() => {
      this.clearAlert(id);
    }, 5000);
  }

  clearAlert(id: number) {
    this.alerts$.next(this.alerts.filter((alert) => alert.id !== id));
  }
}
