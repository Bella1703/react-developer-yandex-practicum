import s from './modal.module.scss';
import React, { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

type TModalProps = {
	children: ReactNode;
	onClose: () => void;
};

const modalsNode = document.getElementById('modals') as HTMLDivElement;

export const Modal = ({
	children,
	onClose,
}: TModalProps): React.JSX.Element => {
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
