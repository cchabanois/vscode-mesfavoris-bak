import { Uri } from "vscode";
import * as fs from "fs";
import * as tmp from "tmp";

export class Base64ToUri {
    private readonly mapping : Map<string, string>;
    private readonly basePath : string;
    constructor(basePath : string) {
        this.mapping = new Map<string, string>();
        this.basePath = basePath;
    }

    async getUri(base64ResourceContent : string) : Promise<Uri> {
        let path = this.mapping.get(base64ResourceContent);
        if (path) {
            if (fs.existsSync(path)) {
                return Promise.resolve(Uri.file(path));
            }
            this.mapping.delete(base64ResourceContent);
        }
        return new Promise<Uri>((resolve, reject)=> {
            tmp.file({ dir : this.basePath }, (err, path, fd) => {
                if (err) {
                    reject(err);
                }
                const buffer = Buffer.from(base64ResourceContent, 'base64');
                fs.write(fd, buffer, 0, buffer.length, err=> {
                    if (err) {
                        fs.closeSync(fd);
                        reject(err);
                    } else {
                        this.mapping.set(base64ResourceContent, path);
                        resolve(Uri.file(path));
                        fs.closeSync(fd);
                    }
                });
            });
        });
    }



}