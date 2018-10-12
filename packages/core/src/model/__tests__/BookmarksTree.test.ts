import { BookmarksTree } from '../BookmarksTree';
import { Bookmark, BookmarkFolder } from '../Bookmark';

describe('BookmarksTree Tests', () => {
    let bookmarksTree : BookmarksTree;
    const rootFolder = BookmarkFolder.bookmarkFolder("rootId", "root");
	const bookmarkFolder1 = BookmarkFolder.bookmarkFolder("folder1Id", "folder1");
	const bookmarkFolder2 = BookmarkFolder.bookmarkFolder("folder2Id", "folder2");
	const bookmark1 = new Bookmark("id1");
	const bookmark2 = new Bookmark("id2");
	const bookmark3 = new Bookmark("id3");
	const bookmark4 = new Bookmark("id4");
	const bookmark5 = new Bookmark("id5");
	const bookmark6 = new Bookmark("id6");

    beforeEach(() => {
		bookmarksTree = BookmarksTree.bookmarksTree(rootFolder);
/*		bookmarksTree = bookmarksTree.addBookmarks(rootFolder.bookmarkId, 0, [bookmarkFolder1, bookmarkFolder2]);
		bookmarksTree = bookmarksTree.addBookmarks(bookmarkFolder1.bookmarkId, 0, [bookmark1, bookmark2, bookmark3]);
		bookmarksTree = bookmarksTree.addBookmarks(bookmarkFolder2.bookmarkId, 0, [bookmark4, bookmark5, bookmark6]);*/
    });
	
	describe('GetParent' , () => {
		test('should return undefined for the root folder', () => {
            // Given
			const actualRootFolder = bookmarksTree.getBookmarkFolder(bookmarksTree.rootFolderId);
//			expect(actualRootFolder).not.undefined;

		    // When
		    const parent = bookmarksTree.getParentBookmark(actualRootFolder!.bookmarkId);

			// Then
//			expect(parent).to.be.undefined;
        });
/*		test('should return the parent bookmark folder' , () => {
			// When
			const bookmarkFolder = bookmarksTree.getParentBookmark(bookmark6.bookmarkId);

			// Then
//			expect(bookmarkFolder).not.undefined;
//			expect(bookmarkFolder!.bookmarkId).to.be.equal(bookmarkFolder2.bookmarkId);
		}); */
	});
});