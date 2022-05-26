import {REMOVE, UPDATE} from "@/store/const/userConst";
import * as userActions from "@/store/actions/userAction";
import {UserActionType} from "@/store/actions/userAction";

export type StateUser = object | null

const initializationValue: { user: StateUser } = {
    user: null
};

export default (state = initializationValue, action: UserActionType) => {
    switch (action.type) {
        case UPDATE:
            return {user: action.payload};
        case REMOVE:
            return {user: null};
        default:
            return state;
    }
};
