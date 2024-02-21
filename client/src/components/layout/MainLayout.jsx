import { Box } from '@mui/material';
import { Outlet } from "react-router-dom"
import GlobalLoading from '../common/GlobalLoading';
import Footer from '../common/Footer';
import Topbar from '../common/Topbar';
import AuthModal from '../common/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import userApi from '../../api/modules/user.api';
import favoriteApi from "../../api/modules/favorite.api"
import { setListFavorites, setUser } from '../../redux/features/userSlice';

const MainLayout = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      // Fetch user information
      const { response: userResponse, err: userError } = await userApi.getInfo();
  
      if (userResponse) {
        dispatch(setUser(userResponse));
  
        // Fetch favorites if there is a user
        const { response: favoritesResponse, err: favoritesError } = await favoriteApi.getList();
  
        if (favoritesResponse) {
          dispatch(setListFavorites(favoritesResponse));
        }
  
        if (favoritesError) {
          toast.error(favoritesError.message);
        }
      }
  
      if (userError) {
        dispatch(setUser(null));
      }
    };
  
    fetchData();
  }, [dispatch]);
  

  return (
    <>
        {/* global loading */}
        <GlobalLoading />
        {/* global loading */}

        {/* login model */}
        <AuthModal />
        {/* login model */}

        <Box display="flex" minHeight="100vh">
            {/* header */}
            <Topbar />
            {/* header */}

            {/* main */}
            <Box
                component="main"
                flexGrow={1}
                overflow="hidden"
                minHeight="100vh"
            >
                <Outlet />
            </Box>
            {/* main */}
        </Box>

        {/* footer */}
        <Footer />
        {/* footer */}
    </>
  );
};

export default MainLayout;