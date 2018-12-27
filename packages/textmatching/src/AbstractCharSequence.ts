import { CharSequence } from "./CharSequence";
export abstract class AbstractCharSequence implements CharSequence {
    abstract length(): number;
    abstract charAt(index: number): string;
    abstract subSequence(start: number, end: number): CharSequence
    [Symbol.iterator]() {
        let self = this;
        let i = 0;
        return {
            next() : IteratorResult<string> {
                if (i < self.length()) {
                    return { done: false, value : self.charAt(i++) };
                } else {
                    return { done: true, value : '' };
                }
            }
        };
    }

    public toString() : string {
        let result : string = '';
        for (let i = 0; i < this.length(); i++) {
            result += this.charAt(i);
        }
        return result;
    }
}
