import React, {FC, PropsWithChildren} from 'react';

import './animation.css';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {useLocation} from 'react-router-dom';

type Props = PropsWithChildren<{ [K: string]: any }>
const AnimationRoutes: FC<Props> = (props) => {
  const {key} = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={key} classNames={'alert'} timeout={400}>
        {props.children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimationRoutes;
