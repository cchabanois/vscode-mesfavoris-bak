export interface CharSequence {
    length() : number;

    charAt(index : number) : string;
}

export class StringCharSequence implements CharSequence {
    private readonly value : string;

    constructor(value : string) {
        this.value = value;
    }

    public length(): number {
        return this.value.length;
    }    
    
    public charAt(index: number): string {
        return this.value.charAt(index);
    }

    public toString() : string {
        return this.value;
    }
}

