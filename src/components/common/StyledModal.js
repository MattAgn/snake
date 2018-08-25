import styled from 'styled-components';
import { Modal } from '../../utilities/components';

const StyledModal = styled(Modal)`
  padding: 3%;
  text-align: center;
  min-width: 34%;
  max-width: 85vh;
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const ModalTitle = styled.h1`
  font-weight: 400;
`;

export { StyledModal, ModalTitle };
