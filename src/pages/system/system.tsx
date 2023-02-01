import React, {FC, useEffect} from "react";

const System: FC = () => {
  useEffect(() => {
    console.log('子路由useEffect执行了')
  }, [])
  return (<div id={'aaa'} style={{background: `red`}}> this is system page</div>);
};

export default System;
