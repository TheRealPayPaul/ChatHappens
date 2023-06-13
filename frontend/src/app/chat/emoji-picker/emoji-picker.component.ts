import {
	Component,
	ElementRef,
	HostListener,
	Output,
	ViewChild,
} from '@angular/core';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-emoji-picker',
	templateUrl: './emoji-picker.component.html',
	styleUrls: ['./emoji-picker.component.scss'],
})
export class EmojiPickerComponent {
	@Output() emojiSelected: Subject<string> = new Subject<string>();

	@ViewChild('openPickerButton', { read: ElementRef })
	openPickerButtonElem: ElementRef;

	showEmojiPicker = false;

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: Event): void {
		if (event.target === this.openPickerButtonElem.nativeElement) {
			return;
		}

		this.closeEmojiPicker();
	}

	toggleEmojiPicker(): void {
		this.showEmojiPicker = !this.showEmojiPicker;
	}

	closeEmojiPicker(): void {
		this.showEmojiPicker = false;
	}

	onEmojiSelected(event: EmojiEvent): void {
		const selectedEmoji = event?.emoji?.native;
		if (!selectedEmoji) {
			return;
		}

		this.emojiSelected.next(selectedEmoji);
	}
}
