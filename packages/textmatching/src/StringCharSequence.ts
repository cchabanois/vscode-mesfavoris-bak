import { CharSubSequence } from "./CharSubSequence";
import { CharSequence } from "./CharSequence";
import { AbstractCharSequence } from "./AbstractCharSequence";
export class StringCharSequence extends AbstractCharSequence {
    private readonly value: string;
    constructor(value: string) {
        super();
        this.value = value;
    }
    public length(): number {
        return this.value.length;
    }
    public charAt(index: number): string {
        return this.value.charAt(index);
    }
    subSequence(start: number, end: number): CharSequence {
        return new CharSubSequence(this, start, end);
    }
    public toString(): string {
        return this.value;
    }
}
