import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() size: string;
  constructor() {}

  ngOnInit(): void {}
}
