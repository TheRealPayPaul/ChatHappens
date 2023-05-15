import {
	ComponentRef,
	Injectable,
	Type,
	ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	private _modalRef: ComponentRef<unknown> | null;
	private _isOpenSubject: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	isOpen$: Observable<boolean> = this._isOpenSubject.asObservable();

	private _modalContentContainer: ViewContainerRef;

	set modalContentContainer(value: ViewContainerRef) {
		this._modalContentContainer = value;
	}

	open(type: Type<any>): void {
		if (this._modalRef) {
			this._modalRef.destroy();
		}

		this._modalRef = this._modalContentContainer.createComponent(type);
		this._isOpenSubject.next(true);
	}

	close(): void {
		this._modalRef?.destroy();
		this._modalRef = null;
		this._isOpenSubject.next(false);
	}
}
