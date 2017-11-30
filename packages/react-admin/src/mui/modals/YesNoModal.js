import React from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from './ConfirmModal';

const YesNoModal = ({ allowEscape = false, type = 'confirm_yes_no' }) => (
    <ConfirmModal
        type={type}
        allowEscape={allowEscape}
        title="ra.modals.confirm.title"
        message="ra.modals.confirm.message"
        actions={[
            {
                label: 'ra.message.yes',
                value: true,
            },
            {
                label: 'ra.message.no',
                value: false,
            },
        ]}
    />
);
YesNoModal.propTypes = {
    allowEscape: PropTypes.bool,
    type: PropTypes.string,
};
export default YesNoModal;
