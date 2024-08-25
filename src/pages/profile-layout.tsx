import styles from './form-page.module.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { CabinetNav } from '../components/cabinet-nav/cabinet-nav';

export function ProfileLayout() {
	return (
		<div className={styles.container}>
			<div className={styles.cabinetContainer}>
				<CabinetNav />
				<Outlet />
			</div>
		</div>
	);
}
