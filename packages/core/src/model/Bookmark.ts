import { Map } from 'immutable';
import { v4 as uuid } from 'uuid';

export type BookmarkId = string;

export function getBookmarkId(id?: string): BookmarkId {
    if (!id) {
        return uuid();
    } else {
        return id;
    }
}

export class Bookmark {
    public static PROPERTY_NAME = "name";
    public static PROPERTY_COMMENT = "comment";
    public static PROPERTY_CREATED = "created";

    readonly bookmarkId: BookmarkId;
    readonly properties: Map<string, string>;

    constructor(bookmarkId: BookmarkId, properties?: Map<string, string>) {
        this.bookmarkId = bookmarkId;
        if (!properties) {
            this.properties = Map();
        } else {
            this.properties = properties;
        }
    }
}

export class BookmarkFolder extends Bookmark {

    public static bookmarkFolder(bookmarkId: BookmarkId, name: string) {
        return new BookmarkFolder(bookmarkId, Map({ [Bookmark.PROPERTY_NAME]: name }));
    }

}