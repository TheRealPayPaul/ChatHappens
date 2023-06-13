import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingViewAccountComponent } from './setting-view-account.component';

describe('SettingViewAccountComponent', () => {
	let component: SettingViewAccountComponent;
	let fixture: ComponentFixture<SettingViewAccountComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SettingViewAccountComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SettingViewAccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
