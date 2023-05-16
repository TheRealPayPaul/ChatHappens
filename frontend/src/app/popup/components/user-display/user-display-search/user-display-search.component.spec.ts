import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisplaySearchComponent } from './user-display-search.component';

describe('UserDisplaySearchComponent', () => {
	let component: UserDisplaySearchComponent;
	let fixture: ComponentFixture<UserDisplaySearchComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserDisplaySearchComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserDisplaySearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
