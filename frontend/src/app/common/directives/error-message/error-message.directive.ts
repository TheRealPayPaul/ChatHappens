import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ErrorMessageService } from '../../services/error-message.service';

@Directive({
	selector: '[appErrorMessage]',
})
export class ErrorMessageDirective implements OnInit {
	@Input() key: string;
	@Input() params?: string[];

	constructor(
		private elementRef: ElementRef,
		private errorMessageService: ErrorMessageService
	) {}

	ngOnInit(): void {
		this.elementRef.nativeElement.textContent =
			this.errorMessageService.getMessage(this.key, this.params);
	}
}
