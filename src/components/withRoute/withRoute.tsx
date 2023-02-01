import React, {FC, ReactComponentElement, ReactNode} from "react";
import {NavigateFunction, useLocation, useNavigate, useParams, useRoutes, Location, Params} from "react-router-dom";

export interface RoutedProps {
  location: Location;
  navigate: NavigateFunction;
  params: Params;
}

const withRoute = (Child: FC<any>) => {
  console.log(Child)
  const location = useLocation();
  const navigate = useNavigate()
  const params = useParams();

  return () => {
    return <Child {...{navigate, location, params}}></Child>
  }
}

export default withRoute;
