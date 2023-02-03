import React, {FC, PropsWithChildren} from 'react';

import './animation.css';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {useLocation} from 'react-router-dom';

type Props = PropsWithChildren<{ [K: string]: any }>
const AnimationRoutes: FC<Props> = ({children}) => {
  const {pathname} = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={pathname} classNames={'alert'} timeout={400}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimationRoutes;
