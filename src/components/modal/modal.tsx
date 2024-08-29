import s from './modal.module.scss';
import React, { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

interface ModalProps {
	children: ReactNode;
	onClose: () => void;
}

const modalsNode = document.getElementById('modals') as HTMLDivElement;

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
	useEffect(() => {
		const handleDocumentKeyDown = (event: KeyboardEvent) =>
			event.key === 'Escape' && onClose();
		document.addEventListener('keydown', handleDocumentKeyDown);
		return () => {
			document.removeEventListener('keydown', handleDocumentKeyDown);
		};
	});

	return ReactDOM.createPortal(
		<>
			<div className={s.container}>
				<div className={s.closeIconWrapper}>
					<CloseIcon type='primary' onClick={onClose} />
				</div>
				{children}
			</div>
			<ModalOverlay onClose={onClose} />
		</>,
		modalsNode
	);
};
