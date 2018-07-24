import React from 'react';
import styled from 'styled-components';
import { primaryColor } from '../../../utilities/styling';

const SettingRowContainer = styled.div`
  margin: 6% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:last-of-type {
    margin-bottom: 12%;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 3% 0;
  width: fit-content;
  min-width: 40%;
`;

const SettingTitle = styled.h3`
  display: block;
  margin-bottom: 1%;
`;

// eslint-disable-next-line
const SettingRow = ({ children, settingName, indication, className }) => (
  <SettingRowContainer>
    <SettingTitle> {settingName} </SettingTitle>
    <ButtonRow className={className}>{children}</ButtonRow>
    {indication && <p>{indication}</p>}
  </SettingRowContainer>
);

export default SettingRow;
