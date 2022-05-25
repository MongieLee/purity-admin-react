import {REMOVE, UPDATE} from "@/store/const/userConst";

const initializationValue: { user: object | null } = {
    user: null
};

export default (state = initializationValue, action: { type: string, payload: object | null }) => {
    switch (action.type) {
        case UPDATE:
            return {user: action.payload};
        case REMOVE:
            return {user: null};
        default:
            return state;
    }
};
