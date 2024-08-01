import s from './modal-overlay.module.scss';
import React, { FC } from 'react';

interface ModalOverlayProps {
	onClose: () => void;
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
	return <div className={s.modalOverlay} onClick={onClose}></div>;
};
