import React, { ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { getUser } from '../services/actions/user';

type TProtectedRouteElementProps = {
	element: ReactElement;
};

export const ProtectedRouteElement = ({
	element,
}: TProtectedRouteElementProps): React.JSX.Element => {
	const location = useLocation();
	const dispatch = useDispatch();
	const accessToken = localStorage.getItem('accessToken');
	const { email } = useSelector((state) => state.user);
	const init = async () => {
		if (email) {
			return;
		}
		if (accessToken) {
			await dispatch(getUser(accessToken, () => {
			}));
		}
	};

	useEffect(() => {
		init();
	}, []);

	return email ? (
		element
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};
