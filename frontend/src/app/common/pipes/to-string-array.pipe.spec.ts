import { ToStringArrayPipe } from './to-string-array.pipe';

describe('ToStringArrayPipe', () => {
	it('create an instance', () => {
		const pipe = new ToStringArrayPipe();
		expect(pipe).toBeTruthy();
	});
});
