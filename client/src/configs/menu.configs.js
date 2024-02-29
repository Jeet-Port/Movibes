import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import React from "react";

const main = [
    {
        display: "Home",
        path: "/",
        icon: React.createElement(HomeOutlinedIcon),
        state: "home"
    },
    {
        display: "Movies",
        path: "/movie",
        icon: React.createElement(SlideshowOutlinedIcon),
        state: "movie"
    },
    {
        display: "Tv Series",
        path: "/tv",
        icon: React.createElement(LiveTvOutlinedIcon),
        state: "tv"
    },
    {
        display: "Search",
        path: "/search",
        icon: React.createElement(SearchOffOutlinedIcon),
        state: "search"
    },
];

const user = [
    {
        display: "My Tickets",
        path: "/my-tickets",
        icon: React.createElement(ConfirmationNumberIcon)
    },
    {
        display:"Favorites",
        path: "/favorites",
        icon: React.createElement(FavoriteOutlinedIcon),
        state: "favorite"
    },
    {
        display: "Reviews",
        path: "/reviews",
        icon: React.createElement(RateReviewOutlinedIcon),
        state: "reviews"
    },
    {
        display: "Password Update",
        path: "/password-update",
        icon: React.createElement(LockResetOutlinedIcon),
        state: "password.update"
    },
];

const admin = [
    {
        display: "Admin",
        path: "/admin",
        icon: React.createElement(AdminPanelSettingsIcon),
        state: "admin"
    },
    {
        display: "Booking History",
        path: "booking-history",
        icon: React.createElement(ManageHistoryIcon),
        state: "booking.history"
    }
]

const menuConfigs = { main, user, admin };

export default menuConfigs;