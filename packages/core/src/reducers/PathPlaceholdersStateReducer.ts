import * as pathPlaceholdersActions from "../actions/PathPlaceholdersActions";
import { ActionType, getType } from "typesafe-actions";
import { PathPlaceholder } from "../placeholders/PathPlaceholder";
import { Map } from 'immutable';
import * as os from 'os';
export type PathPlaceholdersAction = ActionType<typeof pathPlaceholdersActions>;

const createInitialPathPlaceholderMaps = () => {
    let map: Map<string, PathPlaceholder> = Map();
    const homePathPlaceholder = new PathPlaceholder(PathPlaceholder.HOME_NAME, os.homedir());
    map = map.set(homePathPlaceholder.name, homePathPlaceholder);
    return map;
}

const createPathPlaceholderMap = (pathPlaceholders:Iterable<PathPlaceholder>) => {
    let map: Map<string, PathPlaceholder> = Map();
    for(const pathPlaceholder of pathPlaceholders) {
        map = map.set(pathPlaceholder.name, pathPlaceholder);
    }
    return map;
}

const pathPlaceholdersStateReducer = (state : Map<string, PathPlaceholder>  = createInitialPathPlaceholderMaps(), action : PathPlaceholdersAction) : Map<string, PathPlaceholder> => {
    switch(action.type) {
        case getType(pathPlaceholdersActions.setPathPlaceholders) :
            return createPathPlaceholderMap(action.payload.pathPlaceholders);
        break;
        default:
            return state;
    }
};