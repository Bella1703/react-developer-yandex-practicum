import s from './modal-overlay.module.scss';
import React from 'react';

interface ModalOverlayProps {
	onClose: () => void;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
	return <div className={s.modalOverlay} onClick={onClose}></div>;
};
