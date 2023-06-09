import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorBoxComponent } from './form-error-box.component';

describe('FormErrorBoxComponent', () => {
	let component: FormErrorBoxComponent;
	let fixture: ComponentFixture<FormErrorBoxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FormErrorBoxComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FormErrorBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
