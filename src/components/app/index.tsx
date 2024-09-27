import {
	Routes,
	Route,
	useLocation,
	useNavigate,
	Navigate,
} from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { ProtectedRouteElement } from '../protected-route';
import { Home } from '../../pages/home';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { Orders } from '../../pages/orders';
import { NotFound404 } from '../../pages/not-found';
import { ProfileLayout } from '../../pages/profile-layout';
import React, { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients';
import { Feed } from '../../pages/feed';
import { useDispatch } from '../../services/hooks';
import { OrderInfo } from '../order-info/order-info';

export const App = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const forgotPassword = location.state && location.state.forgotPassword;

	const handleModalClose = () => {
		navigate(-1);
	};

	useEffect(() => {
		dispatch(getIngredients());
	}, []);

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<Home />} />
				<Route
					path='/ingredients/:ingredientId'
					element={<IngredientDetails />}
				/>
				<Route path='/feed' element={<Feed />} />
				<Route path='/feed/:orderId' element={<OrderInfo />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route
					path='/reset-password'
					element={
						forgotPassword ? <ResetPassword /> : <Navigate to='/' replace />
					}
				/>
				<Route
					path='/profile'
					element={<ProtectedRouteElement element={<ProfileLayout />} />}>
					<Route index element={<Profile />} />
					<Route path='orders' element={<Orders />} />
				</Route>
				<Route path='*' element={<NotFound404 />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<Modal onClose={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path='/feed/:orderId'
						element={
							<Modal onClose={handleModalClose}>
								<OrderInfo />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};
