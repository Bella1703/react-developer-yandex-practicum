import React, { ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/actions/user';
import { TRootState } from '../services/reducers';
import { TAppDispatch } from './app';

type TProtectedRouteElementProps = {
	element: ReactElement;
};

export const ProtectedRouteElement = ({
	element,
}: TProtectedRouteElementProps): React.JSX.Element => {
	const location = useLocation();
	const dispatch: TAppDispatch = useDispatch();
	const accessToken = localStorage.getItem('accessToken');
	const { email } = useSelector((state: TRootState) => state.user);
	const init = async () => {
		if (email) {
			return;
		}
		if (accessToken) {
			await dispatch(getUser(accessToken, () => {}));
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
