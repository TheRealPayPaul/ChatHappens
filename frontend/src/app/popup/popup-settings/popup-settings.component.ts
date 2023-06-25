import { Component, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/common/services/modal-service/modal.service';
import { SettingViewAccountComponent } from '../components/setting-view-account/setting-view-account.component';
import { SettingViewProfileComponent } from '../components/setting-view-profile/setting-view-profile.component';

export interface SettingCategoryEntry {
	name: string;
	component: Type<any>;
}

@Component({
	selector: 'app-popup-settings',
	templateUrl: './popup-settings.component.html',
	styleUrls: ['./popup-settings.component.scss'],
})
export class PopupSettingsComponent {
	constructor(private modalService: ModalService) {}

	@ViewChild('settingContent', { read: ViewContainerRef })
	settingContent: ViewContainerRef;
	selectedCategory: string;
	categories: SettingCategoryEntry[] = [
		{ name: 'Account', component: SettingViewAccountComponent },
		{ name: 'Profile', component: SettingViewProfileComponent },
	];

	changeCategory(categoryName: string): void {
		if (categoryName == this.selectedCategory) return;

		this.selectedCategory = categoryName;
		this.displayCurrentCategory();
	}

	displayCurrentCategory(): void {
		const category = this.categories.find(
			(element) => element.name === this.selectedCategory
		);

		this.settingContent.clear();
		if (category) {
			this.settingContent.createComponent(category.component);
		}
	}

	closePopup(): void {
		this.modalService.close();
	}
}
