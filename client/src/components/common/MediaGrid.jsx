import { Box, Grid, Button, Modal } from "@mui/material";
import MediaItem from "./MediaItem";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setBookingModalOpen, selectBookingModalOpen } from "../../redux/features/bookingModalSlice";
import SetTicketBooking from "../common/SetTicketBooking"; 
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import userApi from "../../api/modules/user.api";

const MediaGrid = ({ medias, mediaType }) => {
    const { user } = useSelector((state) => state.user);
    const bookingModalOpen = useSelector(selectBookingModalOpen)
    const dispatch = useDispatch();
    const location = useLocation();
    const [movieId, setMovieId] = useState([])

    const handleOpenBookingModal = (mediaId) => {
        dispatch(setBookingModalOpen({ open: true, mediaId }));
    };

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const { response, err } = await userApi.allSeats();
                console.log(response); // Log the response
                if (err) {
                    toast.error(err.message);
                } else {
                    const movieIds = response.map(item => item.mediaId);
                    setMovieId(movieIds);
                }
            } catch (error) {
                console.error("Error fetching seats:", error);
                toast.error("Error fetching seats");
            }
        };

        fetchSeats();
    }, []);

    useEffect(() => {
        console.log(movieId);
        console.log(typeof(movieId))
    })

    return (
        <>
            <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
                {medias.map((media, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <MediaItem media={media} mediaType={mediaType} />
                        {user.isAdmin && location.pathname.startsWith("/admin")&& (
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                <Button variant="contained" color="primary" onClick={() => handleOpenBookingModal(media.id)}>
                                {movieId.includes(String(media.id)) ? "Available": "Not Available" }
                                </Button>
                            </Box>
                        )}
                    </Grid>
                ))}
            </Grid>
            <Modal open={bookingModalOpen} onClose={() => dispatch(setBookingModalOpen(false))}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxWidth: "600px",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                }}>
                    <SetTicketBooking mediaId={bookingModalOpen.mediaId}/>
                </Box>
            </Modal>
        </>
    );
};

export default MediaGrid;
