import { loggedIn } from './logged-in.guard';

describe('LoggedInGuard', () => {
	let guard: unknown;

	beforeEach(() => {
		guard = loggedIn;
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
