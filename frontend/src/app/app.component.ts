import {
	AfterViewInit,
	Component,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { ModalService } from './common/services/modal-service/modal.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
	@ViewChild('modalContent', { read: ViewContainerRef })
	modalContent: ViewContainerRef;

	isModalOpen = false;

	constructor(private modalService: ModalService) {}

	ngOnInit(): void {
		this.modalService.isOpen$.subscribe(
			(isOpen: boolean) => (this.isModalOpen = isOpen)
		);
	}

	ngAfterViewInit(): void {
		this.modalService.modalContentContainer = this.modalContent;
	}

	closeModal(): void {
		this.modalService.close();
	}
}
