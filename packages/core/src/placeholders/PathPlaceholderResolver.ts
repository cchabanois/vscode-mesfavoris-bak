import { PathPlaceholder } from "./PathPlaceholder";
import * as Path from 'path';
import { print } from "util";

export class PathPlaceholderResolver {
    private pathPlaceholdersProvider : () => Map<string, PathPlaceholder>;
    constructor(pathPlaceholdersProvider : () => Map<string, PathPlaceholder>) {
        this.pathPlaceholdersProvider = pathPlaceholdersProvider;
    }

    public expand(pathWithPlaceholder : string) : string | undefined {
        const variableName = PathPlaceholderResolver.getPlaceholderName(pathWithPlaceholder);
        if (!variableName) {
            return pathWithPlaceholder;
        }
        const other = pathWithPlaceholder.substring(variableName.length + 4);
		const pathPlaceholder = this.mappings.get(variableName);
		if (!pathPlaceholder) {
			return undefined;
		}
		return Path.join(pathPlaceholder.path,other);
    }

    public collapse(path : string, placeholderNames? : string[]) : string {
        path = Path.normalize(path);
        let bestCollapsedPath : string|undefined;
        let bestScore = Number.MAX_SAFE_INTEGER;
        const pathPlaceholders = this.getPathPlaceholders(placeholderNames);
        pathPlaceholders.forEach((pathPlaceholder) => {
            if (path.startsWith(pathPlaceholder.path)) {
                const relativePath = Path.relative(pathPlaceholder.path, path);
                const score = relativePath.length;
                if (score < bestScore) {
                    bestCollapsedPath = '${'+pathPlaceholder.name+'}/'+relativePath;
                    bestScore = score;
                }
            }
        });
        if (!bestCollapsedPath) {
            bestCollapsedPath = path;
        }
        return bestCollapsedPath;
    }

    private get mappings() : Map<string, PathPlaceholder> {
        return this.pathPlaceholdersProvider()
    }

    private getPathPlaceholders(placeholderNames? : string[]) : Map<string, PathPlaceholder> {
        const mappings = this.mappings;
        let pathPlaceholders : Map<string, PathPlaceholder>;
        if (!placeholderNames) {
            pathPlaceholders = mappings;
        } else {
            pathPlaceholders = new Map();
            for (let placeholderName of placeholderNames) {
                let pathPlaceholder = mappings.get(placeholderName);
                if (pathPlaceholder) {
                    pathPlaceholders.set(placeholderName, pathPlaceholder);
                }
            }
        }
        return pathPlaceholders;
    }

	public static getPlaceholderName(pathWithPlaceholder : string ) : string|undefined {
		const index1 = pathWithPlaceholder.indexOf("${");
		const index2 = pathWithPlaceholder.indexOf("}/");
		if (index1 !== 0 || index2 === -1) {
			return undefined;
		}
		const variableName = pathWithPlaceholder.substring(2, index2);
		return variableName;
	}

}