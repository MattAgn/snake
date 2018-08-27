import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line
const SettingRow = ({ children, settingName, indication, className }) => (
  <SettingRowContainer>
    <SettingTitle> {settingName} </SettingTitle>
    <ButtonRow className={className}>{children}</ButtonRow>
    {indication && <Indication>{indication}</Indication>}
  </SettingRowContainer>
);

const SettingRowContainer = styled.div`
  margin: 6% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Indication = styled.p`
  margin-top: 10px;
  max-width: 95%;
`;

export default SettingRow;
