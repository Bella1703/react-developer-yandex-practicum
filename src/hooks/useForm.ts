import React, { useState } from 'react';

export function useForm(initialValues = {}) {
	const [values, setValues] = useState({
		email: '',
		name: '',
		password: '',
		code: '',
		...initialValues,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setValues({ ...values, [name]: value });
	};
	return { values, handleChange, setValues };
}
