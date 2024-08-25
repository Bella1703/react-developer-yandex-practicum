import styles from './form-page.module.scss';
import React from 'react';

export function NotFound404() {
	return (
		<div className={`${styles.container} ${styles.formContainer}`}>
			<h1 className='text text_type_main-medium'>404 - Страница не найдена</h1>
		</div>
	);
}
