import { createSelector } from 'reselect';
import { State } from '../state/State';

export const getBookmarksTree = (state : State) => state.bookmarksTreeState.bookmarksTree;