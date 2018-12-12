import { FilteredCharSequence, ICharSequenceFilter } from "../FilteredCharSequence";
import { CharSequence } from "../CharSequence";

describe('FilteredCharSequence Tests', () => {
    const noFilter : ICharSequenceFilter = { 
        nextCharIndex(charSequence : CharSequence, index : number) : number { 
            return index 
        }  
    };

    const removeWhiteCharsFilter : ICharSequenceFilter = { 
        nextCharIndex(charSequence : CharSequence, index : number) : number { 
            while (index < charSequence.length()) {
                const charAtIndex = charSequence.charAt(index);
                if (charAtIndex != ' ' && charAtIndex != '\t' && charAtIndex != '\n') {
                    return index;
                }
                index++;
            }
            return index;
        }  
    };
    describe('toString()', () => {
        it('returns an empty string if the given string is empty', () => {
            expect(new FilteredCharSequence('', removeWhiteCharsFilter).toString()).toBe('');
        });
        it('returns the same string if no filter', () => {
            expect(new FilteredCharSequence('this is a string', noFilter).toString()).toBe('this is a string');
            expect(new FilteredCharSequence(' this is a string ', noFilter).toString()).toBe(' this is a string ');
            expect(new FilteredCharSequence('    this    is  a string   ', noFilter).toString()).toBe('    this    is  a string   ');
        });
        it('returns the filtered chars', () => {
            expect(new FilteredCharSequence('this is a string', removeWhiteCharsFilter).toString()).toBe('thisisastring');
            expect(new FilteredCharSequence(' this is a string ', removeWhiteCharsFilter).toString()).toBe('thisisastring');
            expect(new FilteredCharSequence('    this    is  a string   ', removeWhiteCharsFilter).toString()).toBe('thisisastring');
        });
    });
    describe('getIndex', () => {
        it('returns the index corresponding to the given parent index', () => {
            // Given
            const source = "    this    is  a string   ";

            // When
            const target = new FilteredCharSequence(source, removeWhiteCharsFilter);

            // Then
            for (let  i = 0; i < source.length; i++) {
                if (source.charAt(i) != ' ') {
                    expect(target.charAt(target.getIndex(i)!)).toBe(source.charAt(i));
                }
            }
        });
        it('returns the proper index for filtered chars', () => {
            // Given
            const source = "    this    is  a string   ";

            // When
            const target = new FilteredCharSequence(source, removeWhiteCharsFilter);

            // Then
            expect(target.getIndex(9)).toBe(4);
            expect(target.getIndex(0)).toBe(0);
            expect(target.getIndex(26)).toBe(13);
        });
    });
    describe('getParentIndex', () => {
		// Given
		const source = "    this    is  a string   ";

		// When
		const target = new FilteredCharSequence(source, removeWhiteCharsFilter);

		// Then
		for (let i = 0; i < target.length(); i++) {
            expect(source.charAt(target.getParentIndex(i)!)).toBe(target.charAt(i));
		}
    });
});