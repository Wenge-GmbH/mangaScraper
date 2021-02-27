import React from 'react';
import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEnvelope, faPhone, faSearch } from '@fortawesome/free-solid-svg-icons';

// import {
//   faChevronRight,
// } from './custom-icons';

library.add(faEnvelope, faPhone, faSearch);

export const AwesomeIcon = ({ ...props }) => {
  return <FontAwesomeIcon {...props} icon={[props.prefix, props.icon]} />;
};

AwesomeIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  prefix: PropTypes.string,
};

AwesomeIcon.defaultProps = {
  prefix: 'fas',
};
