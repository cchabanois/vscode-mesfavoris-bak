import { BookmarksTree } from "../model/BookmarksTree";
import { BookmarkFolder, Bookmark } from "../model/Bookmark";
import { List } from "immutable";

export class BookmarksTreeSerializer {
	public static NAME_ID = "id";
	public static NAME_VERSION = "version";
	public static VERSION_1_0 = "1.0";
	public static NAME_BOOKMARKS = "bookmarks";
	public static NAME_CHILDREN = "children";
	public static NAME_PROPERTIES = "properties";
    public static NAME_LASTMODIFIED = "lastModified";
    
    public serialize(bookmarksTree : BookmarksTree) : string {
        return JSON.stringify(this.toJS(bookmarksTree), null, 2);
    }
 
    public toJS(bookmarksTree : BookmarksTree) : Object {
        return { 
            [BookmarksTreeSerializer.NAME_VERSION] : BookmarksTreeSerializer.VERSION_1_0 ,
            [BookmarksTreeSerializer.NAME_BOOKMARKS] : this.bookmarkFolderToJSObject(bookmarksTree, bookmarksTree.getBookmarkFolder(bookmarksTree.rootFolderId)!)
        };
    }

    private bookmarkFolderToJSObject(bookmarksTree : BookmarksTree, bookmarkFolder : BookmarkFolder) : Object {
        return {
            [BookmarksTreeSerializer.NAME_ID] : bookmarkFolder.bookmarkId,
            [BookmarksTreeSerializer.NAME_PROPERTIES] : this.bookmarkPropertiesToJSObject(bookmarksTree, bookmarkFolder),
            [BookmarksTreeSerializer.NAME_CHILDREN] : this.bookmarksToJSArray(bookmarksTree, bookmarksTree.getChildren(bookmarkFolder.bookmarkId))
        };
    }

    private bookmarkPropertiesToJSObject(bookmarksTree : BookmarksTree, bookmark : Bookmark) : Object {
        return bookmark.properties.sortBy((value, key) => key).toJS();
    }

    private bookmarksToJSArray(bookmarksTree : BookmarksTree, bookmarks : List<Bookmark>) : Object[] {
        return bookmarks.map(bookmark => {
            if (bookmark instanceof BookmarkFolder) {
                return this.bookmarkFolderToJSObject(bookmarksTree, bookmark);
            } else {
                return this.bookmarkToJSObject(bookmarksTree, bookmark);
            }
        }).toArray();
    }

    private bookmarkToJSObject(bookmarksTree : BookmarksTree, bookmark : Bookmark) : Object {
        return {
            [BookmarksTreeSerializer.NAME_ID] : bookmark.bookmarkId,
            [BookmarksTreeSerializer.NAME_PROPERTIES] : this.bookmarkPropertiesToJSObject(bookmarksTree, bookmark)
        };
    }
}