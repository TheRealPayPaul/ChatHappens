import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingViewProfileComponent } from './setting-view-profile.component';

describe('SettingViewProfileComponent', () => {
	let component: SettingViewProfileComponent;
	let fixture: ComponentFixture<SettingViewProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SettingViewProfileComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SettingViewProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
