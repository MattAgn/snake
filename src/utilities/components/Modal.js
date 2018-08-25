import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { animated, Transition } from 'react-spring';
import { elevation, absolute, fillParent, flexCenter } from '../styling';

import Portal from './Portal';

const Modal = ({
 children, className, isOpen, config 
}) => (
  <Portal>
    <Transition
      native
      config={config}
      from={{ opacity: 0.2, bgOpacity: 0, y: '-50vh' }}
      enter={{ opacity: 1, bgOpacity: 0.6, y: '0px' }}
      leave={{ opacity: 0.2, bgOpacity: 0, y: '50vh' }}
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

Modal.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  config: PropTypes.object
};

Modal.defaultProps = {
  config: null
};

export default Modal;
