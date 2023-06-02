import { notLoggedIn } from './not-logged-in.guard';

describe('LoggedInGuard', () => {
	let guard: unknown;

	beforeEach(() => {
		guard = notLoggedIn;
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
