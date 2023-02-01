import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {mapStateToProps} from "@/pages/home/home";
import {Button} from "antd";
import * as UserActions from "@/store/actions/userAction";
import {RootState} from "@/store";

const User: FC = () => {
  const userState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (<div style={{background: `yellow`}}> this is user page
    {JSON.stringify(userState)}
    <Button onClick={() => dispatch(UserActions.remove())}>测试 redux</Button>
  </div>);
};

export default User;
