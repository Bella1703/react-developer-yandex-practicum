import s from './modal.module.scss';
import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay/modal-overlay';

interface ModalProps {
	children: ReactNode;
	onClose: () => void;
	title: string;
}

const modalsNode = document.getElementById('modals') as HTMLDivElement;

export const Modal: React.FC<ModalProps> = ({ children, onClose, title }) => {
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
				<header className={s.header}>
					<p className={'text text_type_main-large'}>{title}</p>
					<div className={s.closeIconWrapper}>
						<CloseIcon type='primary' onClick={onClose} />
					</div>
				</header>
				{children}
			</div>
			<ModalOverlay onClose={onClose} />
		</>,
		modalsNode
	);
};
