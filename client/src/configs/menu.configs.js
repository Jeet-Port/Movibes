import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import React from "react";

const main = [
    {
        display: "home",
        path: "/",
        icon: React.createElement(HomeOutlinedIcon),
        state: "home"
    },
    {
        display: "movies",
        path: "/movie",
        icon: React.createElement(SlideshowOutlinedIcon),
        state: "movie"
    },
    {
        display: "tv Series",
        path: "/tv",
        icon: React.createElement(LiveTvOutlinedIcon),
        state: "tv"
    },
    {
        display: "search",
        path: "/search",
        icon: React.createElement(SearchOffOutlinedIcon),
        state: "search"
    },
];

const user = [
    {
        display: "favorites",
        path: "/favorites",
        icon: React.createElement(FavoriteOutlinedIcon),
        state: "favorite"
    },
    {
        display: "reviews",
        path: "/reviews",
        icon: React.createElement(RateReviewOutlinedIcon),
        state: "reviews"
    },
    {
        display: "password update",
        path: "/password-update",
        icon: React.createElement(LockResetOutlinedIcon),
        state: "password.update"
    },
];

const admin = [
    {
        display: "admin",
        path: "/admin",
        icon: React.createElement(AdminPanelSettingsIcon),
        state: "admin"
    }
]

const menuConfigs = { main, user, admin };

export default menuConfigs;