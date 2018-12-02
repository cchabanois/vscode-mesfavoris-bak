import { RemoveExtraWhitespacesSequenceFilter } from "../RemoveExtraWhitespacesSequenceFilter";
import { FilteredCharSequence } from "../FilteredCharSequence";
import * as fs from 'fs';

describe('RemoveExtraWhitespaceFilter', () => {
    const filterString = (str:string) => new FilteredCharSequence(str, new RemoveExtraWhitespacesSequenceFilter()).toString()
    it('removes leading and trailing whitespaces', () => {
        expect(filterString(" this is a string ")).toBe('this is a string');
    });
    it('removes all extra horizontal whitespaces', () => {
        expect(filterString("    this    is  a string   ")).toBe('this is a string');
    })
    it('correctly removes all whitespace filters for from a java method', () => {
        const sourceText = fs.readFileSync(__dirname + '/method.java.txt', 'utf8');
        const expectedText = fs.readFileSync(__dirname + '/method-filtered.java.txt', 'utf8');
        expect(filterString(sourceText)).toBe(expectedText);
    });
});