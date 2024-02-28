import HomePage from "../pages/HomePage";
import PersonDetail from "../pages/PersonDetail";
import FavoriteList from "../pages/FavoriteList";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch"
import PasswordUpdate from "../pages/PasswordUpdate";
import ReviewList from "../pages/ReviewList";
import ProtectedPage from "../components/common/ProtectedPage"
import AdminPage from "../pages/AdminPage";
import TicketBooking from "../pages/ TicketBooking";
import MyTicket from "../pages/MyTicket";

export const routesGen ={
    home: "/",
    mediaList: (type) => `/${type}`,
    mediaDetail: (type, id) => `/${type}/${id}`,
    ticketBooking: (type, id) => `/${type}/${id}/ticket-seat-selection`,
    mediaSearch: "/search",
    person: (id) => `/person/${id}`,
    favoriteList: "/favorites",
    reviewList: "/reviews",
    passwordUpdate: "password-update"
}

const routes = [
    {
        index: true,
        element: <HomePage />,
        state: "home"
    },
    {
        path: "/person/:personId",
        element: <PersonDetail />,
        state: "person.detail"
    },
    {
        path : "/search",
        element: <MediaSearch />,
        state: "search"
    },
    {
        path: "/password-update",
        element: (
            <ProtectedPage>
                <PasswordUpdate />
            </ProtectedPage>
        ),
        state: "password.update"
    },
    {
        path: "/favorites",
        element: (
            <ProtectedPage>
                <FavoriteList />
            </ProtectedPage>
        ),
        state: "favorites"
    },
    {
        path: "/reviews",
        element: (
            <ProtectedPage>
                <ReviewList />
            </ProtectedPage>
        ),
        state: "reviews"
    },
    {
        path: "/:mediaType",
        element: <MediaList />
    },
    {
        path: "/:mediaType/:mediaId",
        element: <MediaDetail />
    },
    {
        path: "/:mediaType/:mediaId/ticket-seat-selection",
        element: (
            <ProtectedPage>
                <TicketBooking />
            </ProtectedPage>
        )
    },
    {
        path: "/my-tickets",
        element: (
            <ProtectedPage>
                <MyTicket />
            </ProtectedPage>
        )
    },
    {
        path: "/admin",
        element: (
            <ProtectedPage>
                <AdminPage />
            </ProtectedPage>
        ),
        state: "admin"
    }
];

export default routes;