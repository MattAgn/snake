import React from 'react';
import styled from 'styled-components';
import { animated, Transition } from 'react-spring';
import { elevation, absolute, fillParent, flexCenter } from '../styling';

import Portal from './Portal';

const Modal = ({ children, className }) => (
  <Portal>
    <Transition
      native
      from={{ opacity: 0.5, bgOpacity: 0, y: '-100px' }}
      enter={{ opacity: 1, bgOpacity: 0.6, y: '0px' }}
      leave={{ opacity: 0.5, bgOpacity: 0, y: '100px' }}
    >
      {styles => (
        <ModalWrapper>
          <ModalContainer
            className={className}
            style={{
              opacity: styles.opacity.interpolate(opacity => opacity),
              transform: styles.y.interpolate(y => `translate3d(0, ${y},0)`)
            }}
          >
            {children}
          </ModalContainer>
          <Background
            style={{
              opacity: styles.bgOpacity.interpolate(bgOpacity => bgOpacity)
            }}
          />
        </ModalWrapper>
      )}
    </Transition>
  </Portal>
);

const ModalWrapper = styled.div`
  ${absolute({})};
  ${fillParent};
  ${flexCenter};
`;

const ModalContainer = styled(animated.div)`
  position: relative;
  background: white;
  ${elevation[4]};
  z-index: 10;
  border-radius: 5px;
  padding: 1%;
`;

const Background = styled(animated.div)`
  ${absolute({})};
  ${fillParent};
  background-color: #000;
  z-index: 3;
  opacity: 0.5;
`;

export default Modal;
