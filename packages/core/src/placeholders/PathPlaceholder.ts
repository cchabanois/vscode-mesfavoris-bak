import { resolve } from 'path';
export class PathPlaceholder {
    public static HOME_NAME = "HOME";
    readonly name : string;
    readonly path : string;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = resolve(path);
    }

}