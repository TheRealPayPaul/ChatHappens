import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFriendsComponent } from './popup-friends.component';

describe('PopupFriendsComponent', () => {
	let component: PopupFriendsComponent;
	let fixture: ComponentFixture<PopupFriendsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PopupFriendsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PopupFriendsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
