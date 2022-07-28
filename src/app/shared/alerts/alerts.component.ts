import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from './alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  alerts: Alert[];
  constructor(private alertService: AlertService) {
    this.alertService.alerts$.subscribe((alerts) => {
      this.alerts = alerts;
    });
  }

  handleClose(id: number) {
    this.alertService.clearAlert(id);
  }

  ngOnInit(): void {}
}
