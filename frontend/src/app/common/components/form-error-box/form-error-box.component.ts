import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-form-error-box',
	templateUrl: './form-error-box.component.html',
	styleUrls: ['./form-error-box.component.scss'],
})
export class FormErrorBoxComponent {
	@Input() form: FormGroup;
}
