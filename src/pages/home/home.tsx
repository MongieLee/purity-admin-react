import React, {FC} from 'react';
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {RootState} from "@/store";
import {Button} from "antd";
import * as  userActions from "@/store/actions/userAction";

type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

const Home: FC<Props> = ({user, updateUser, remove}) => {
    return <div> home
        <Button onClick={() => updateUser({a: 1121231})}>测试 redux</Button>
        {JSON.stringify(user)}
        <Button onClick={remove}>测试 redux</Button>
    </div>;
};

export function mapStateToProps(state: RootState) {
    return {
        user: state.auth.user
    };
};

// 最终简化ActionCreators
function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(userActions, dispatch);
};

// 使用bindActionCreators
// function mapDispatchToProps(dispatch: Dispatch) {
//     return bindActionCreators({
//         updateUser(user: object) {
//             return ({type: UPDATE, payload: user});
//         },
//         remove() {
//             return ({type: REMOVE});
//         }
//     }, dispatch);
// };

// 最基础的用法
// function mapDispatchToProps(dispatch: Dispatch) {
//     return {
//         updateUser(user: object) {
//             dispatch({type: UPDATE, payload: user});
//         },
//         remove() {
//             dispatch({type: REMOVE});
//         }
//     };
// };


export default connect(mapStateToProps, mapDispatchToProps)(Home);
