import styled from 'styled-components';
import { Modal } from '../../utilities/components';

const Dialog = styled(Modal)`
  padding: 2%;
  text-align: center;
  min-width: 36%;
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const DialogTitle = styled.h1`
  font-weight: 400;
`;

export { Dialog, DialogTitle };

