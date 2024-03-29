import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice.js"

const PageWrapper = ({ state, children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    
    useEffect(() => {
        window.scrollTo(0,0);
        dispatch(setAppState(state))
    }, [dispatch, state]);

    return (
        children
    )
};

export default PageWrapper;