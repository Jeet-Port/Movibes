import { Box, Typography, Divider, Stack, Toolbar, useMediaQuery, useTheme, Button } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import adminApi from "../api/modules/admin.api";
import userApi from "../api/modules/user.api";
import { toast } from "react-toastify";
import TheaterLayout from "../components/common/TheaterLayout";

const TicketBooking = () => {
  const { mediaType, mediaId } = useParams();
  const [media, setMedia] = useState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [moviePrice, setMoviePrice] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); // Total price state

  const dispatch = useDispatch();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId })
      
      if (response) {
        setMedia(response)
      }
      
      if (err) toast.error(err.message);
    };
    
    getMedia();
  }, [mediaType, mediaId, dispatch])

  useEffect(() => {
    const getPrice = async () => {
      const { response, err } = await adminApi.getPrice({ mediaId })

      if (response) {
        setMoviePrice(response);
      }

      if (err) toast.error(err.message)
    };

    getPrice();
  }, [mediaId])

  useEffect(() => {
    const totalPrice = selectedSeats.reduce((total, seat) => {
      if (seat.includes("normal")) {
        return total + moviePrice.normal;
      } else if (seat.includes("executive")) {
        return total + moviePrice.executive;
      } else if (seat.includes("premium")) {
        return total + moviePrice.premium;
      }
      return total;
    }, 0);
    setTotalPrice(totalPrice);
  }, [selectedSeats, moviePrice]);

  const handleBookTicket = useCallback(async () => {
    const seats = selectedSeats;
    const total = totalPrice;
    const mediaName =  media?.title || media?.name;
    const { response, err } = await userApi.bookTicket({ mediaId, mediaName, total, showTime: "9:00", seats});

    if (response) {
      toast.success("Ticket Book SuccessFully");
    }

    if (err) toast.error(err.message);

  }, [media, mediaId, totalPrice, selectedSeats]);

  return (
    <>
      <Toolbar /><Toolbar />
      <Box sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
          display: "flex",
          flexDirection: isMobile ? "column" : "row", // Change direction based on screen size
          alignItems: "flex-start",
          "> *": {
            flexShrink: 0,
          }
        }}>
          {/* poster */}
          {media && (
            <>
              <Box
                sx={{
                  width: isMobile ? "100%" : { xs: "50%", sm: "50%", md: "30%" },
                  height: { xs: "50%", sm: "50%", md: "30%" },
                  margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
                }}
              >
                <Box
                  sx={{
                    paddingTop: "140%",
                    borderRadius: "15px",
                    ...uiConfigs.style.backgroundImage(
                      tmdbConfigs.posterPath(media.poster_path || media.backdrop_path)
                    )
                  }}
                />
              </Box>
              {!isMobile && <Divider orientation="vertical" />} 
            </>     
          )}
          {/* poster */}
          <Box sx={{ width: "70%", textAlign: "center" }}>
            <Typography  variant='h5' fontWeight="700" textTransform="uppercase">
              Select Seats
            </Typography>
            <Toolbar />

            <TheaterLayout setSelectedSeats={setSelectedSeats} />
            <Toolbar />
            
            <Stack>
              <Typography variant="h6" fontWeight="500" sx={{ color: theme.palette.primary.main}}>
                  Normal = {moviePrice.normal} | Executive = {moviePrice.executive} | Premium = {moviePrice.premium}
              </Typography>
              <Toolbar />
              <Typography variant="h5" fontWeight="500" sx={{ color: theme.palette.primary.main}}>
                  Total Price: {totalPrice}
              </Typography>
            </Stack>
            <Toolbar />
            <Button variant="contained" onClick={handleBookTicket}>Book Ticket</Button>
          </Box>
      </Box>
    </>
  )
}

export default TicketBooking;