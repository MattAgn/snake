import React from 'react';
import styled from 'styled-components';
import Portal from './Portal';
import { elevation, absolute, fillParent, flexCenter } from '../styling';

const ModalBackground = styled.div`
  ${absolute({})};
  ${fillParent};
  ${flexCenter};
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  background: white;
  ${elevation[4]};
  z-index: 10;
  border-radius: 5px;
  padding: 1%;
`;

const Modal = ({ children, style }) => (
  <Portal>
    <ModalBackground>
      <ModalContainer style={{ ...style }}>
        { children }
      </ModalContainer>
    </ModalBackground>
  </Portal>
);

export default Modal;
