import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './UXAlertBox.scss';

const UXAlertBox = (props) => {
    return (
        <div className={`alertBox ${props.alertType && props.alertType}`}>
            <span>{props.alertMessage && props.alertMessage}</span>
        </div>
    );
};
UXAlertBox.propTypes = {
    alertMessage: PropTypes.string,
    alertType: PropTypes.string
};

export default memo(UXAlertBox);