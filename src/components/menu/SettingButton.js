import React from 'react';
import { RaisedButton } from 'material-ui';
import PropTypes from 'prop-types';

import { primaryColor } from '../../utilities/styling';

const SettingButton = ({ isSelected, ...otherProps }) => (
  <RaisedButton
    {...otherProps}
    style={{ margin: '0 5%' }}
    backgroundColor={isSelected ? primaryColor : '#FFF'}
  />
);

SettingButton.propTypes = {
  isSelected: PropTypes.bool.isRequired
};

export default SettingButton;
