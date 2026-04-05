import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import styles from './app.module.css';
import {
  getIngredientsSelector,
  selectLoading,
  selectError,
  getIngredients
} from '../../services/slices/ingredientsSlice';
import { getUser } from '../../services/slices/userSlice';
import {
  AppHeader,
  IngredientDetails,
  Modal,
  ModalOrderWrapper,
  ProtectedRoute
} from '@components';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(selectLoading);
  const ingredients = useSelector(getIngredientsSelector);
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const location = useLocation();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length > 0 ? (
        <>
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={'Детали ингредиента'} onClose={onClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route path='/feed' element={<Feed />}>
              <Route path=':number' element={<ModalOrderWrapper />} />
            </Route>
            <Route
              path='/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route path='/profile'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='orders'
                element={
                  <ProtectedRoute>
                    <ProfileOrders />
                  </ProtectedRoute>
                }
              >
                <Route
                  path=':number'
                  element={
                    <ProtectedRoute>
                      <ModalOrderWrapper />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title={'Детали ингредиента'} onClose={onClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route path='/feed/:number' element={<ModalOrderWrapper />} />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute>
                    <ModalOrderWrapper />
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )}
    </div>
  );
};

export default App;
