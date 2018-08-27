import styled from 'styled-components';
import { Modal } from '../../utilities/components';

const StyledModal = styled(Modal)`
  padding: 30px;
  text-align: center;
  min-width: 40vw;
  max-width: 85vw;
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const ModalTitle = styled.h1`
  font-weight: 400;
`;

export { StyledModal, ModalTitle };
