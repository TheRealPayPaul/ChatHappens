import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisplayRequestsComponent } from './user-display-requests.component';

describe('UserDisplayRequestsComponent', () => {
	let component: UserDisplayRequestsComponent;
	let fixture: ComponentFixture<UserDisplayRequestsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserDisplayRequestsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserDisplayRequestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
