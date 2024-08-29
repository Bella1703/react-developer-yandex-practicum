import { ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getUser } from '../services/actions/user';
import { RootState } from '../services/reducers';

type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>;
interface ProtectedRouteElementProps {
	element: ReactElement;
}

export const ProtectedRouteElement = ({
	element,
}: ProtectedRouteElementProps) => {
	const location = useLocation();
	const dispatch: AppThunkDispatch = useDispatch();
	const accessToken = localStorage.getItem('accessToken');
	const { email } = useSelector((state: RootState) => state.user);
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
