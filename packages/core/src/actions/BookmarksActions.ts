import { createAction, createAsyncAction } from 'typesafe-actions';
import { BookmarkId, Bookmark } from '../model/Bookmark';
import { BookmarksTree } from '../model/BookmarksTree';

export const addBookmarks = createAction('addBookmarks', resolve => {
    return (parentId : BookmarkId, bookmarks : Iterable<Bookmark>, index? : number) => resolve({parentId, bookmarks, index});
});

export const loadBookmarks = createAsyncAction(
    'loadBookmarks_request', 'loadBookmarks_success', 'loadBookmarks_failure')<string, { bookmarksTree : BookmarksTree, filePath : string }, Error>();
export const saveBookmarks = createAsyncAction(
    'saveBookmarks_request', 'saveBookmarks_success', 'saveBookmarks_failure')<void, void, Error>();
    
