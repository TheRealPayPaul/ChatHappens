import { AppComponent } from './app.component';
import { createHostFactory, Spectator } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('AppComponent', () => {
	let spectator: Spectator<AppComponent>;

	const createHost = createHostFactory({
		component: AppComponent,
		imports: [RouterTestingModule],
	});

	beforeEach(() => {
		spectator = createHost('<app-root></app-root>');
	});

	it('should create the app', () => {
		expect(spectator.component).toBeTruthy();
	});
});
