import s from './modal-overlay.module.scss';
import React from 'react';

type ModalOverlayProps = {
	onClose: () => void;
};

export const ModalOverlay = ({
	onClose,
}: ModalOverlayProps): React.JSX.Element => {
	return <div className={s.modalOverlay} onClick={onClose}></div>;
};
