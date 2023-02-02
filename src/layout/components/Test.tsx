import React, {useEffect} from 'react';

import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "@/store/hooks";

const Test = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  console.log(auth)
  console.log(dispatch);
  return (<div>test component</div>)
}

export default Test;
