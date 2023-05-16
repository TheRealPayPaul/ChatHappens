import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisplayFriendsComponent } from './user-display-friends.component';

describe('UserDisplayFriendsComponent', () => {
	let component: UserDisplayFriendsComponent;
	let fixture: ComponentFixture<UserDisplayFriendsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserDisplayFriendsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserDisplayFriendsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
