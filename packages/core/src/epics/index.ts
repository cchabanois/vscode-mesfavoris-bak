import { combineEpics } from "redux-observable";
import bookmarksEpic from "./BookmarksEpic";

const epics = combineEpics(
    ...bookmarksEpic,
  );
  
export default epics;