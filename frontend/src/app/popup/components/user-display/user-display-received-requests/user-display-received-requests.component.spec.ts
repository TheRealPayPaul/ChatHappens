import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisplayReceivedRequestsComponent } from './user-display-received-requests.component';

describe('UserDisplayReceivedRequestsComponent', () => {
	let component: UserDisplayReceivedRequestsComponent;
	let fixture: ComponentFixture<UserDisplayReceivedRequestsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserDisplayReceivedRequestsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserDisplayReceivedRequestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
