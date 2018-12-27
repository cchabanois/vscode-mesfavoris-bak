import { StringCharSequence } from "../StringCharSequence";
import { CharSequence } from "../CharSequence";

describe('StringCharSequence Tests', () => {
    it('is iterable', () => {
        const charSequence = new StringCharSequence('this is a string');
        let str : string = '';
        for (let char of charSequence) {
            str += char;
        }
        expect(str).toBe('this is a string')
    });
});