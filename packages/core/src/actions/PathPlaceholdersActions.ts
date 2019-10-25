import { createAction } from 'typesafe-actions';
import { PathPlaceholder } from '../placeholders/PathPlaceholder';

export const setPathPlaceholders = createAction('setPathPlaceholders', resolve => {
    return (pathPlaceholders : Iterable<PathPlaceholder>) => resolve({pathPlaceholders});
});