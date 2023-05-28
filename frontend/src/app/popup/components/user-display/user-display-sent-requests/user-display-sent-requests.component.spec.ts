import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisplaySentRequestsComponent } from './user-display-sent-requests.component';

describe('UserDisplaySentRequestsComponent', () => {
	let component: UserDisplaySentRequestsComponent;
	let fixture: ComponentFixture<UserDisplaySentRequestsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserDisplaySentRequestsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserDisplaySentRequestsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
