import { Box, Grid, Modal } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import userApi from "../api/modules/user.api";
import mediaApi from "../api/modules/media.api";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import QRCode from "react-qr-code";

const MyTicket = () => {
  const [ticket, setTicket] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const dispatch = useDispatch();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        dispatch(setGlobalLoading(true));
        const { response, err } = await userApi.allSeats();
        dispatch(setGlobalLoading(false));
        if (response) {
          setTicket(response);
        } else {
          toast.error(err.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchSeats();
  }, []);

  useEffect(() => {
    const fetchMediaDetails = async () => {

      const promises = ticket.map(async (ticketData) => {
        try {
          const { response, err } = await mediaApi.getDetail({
            mediaType: ticketData.mediaType,
            mediaId: ticketData.mediaId,
          });
          if (response) {
            return { media: response, mediaType: ticketData.mediaType };
          } else {
            toast.error(err.message);
            return null;
          }
        } catch (error) {
          console.error("Error fetching media details:", error);
          return null;
        }
      });

      const mediaDetails = await Promise.all(promises);

      const validMediaDetails = mediaDetails.filter((data) => data !== null);

      setMediaItems(validMediaDetails);
    };

    if (ticket.length > 0) {
      fetchMediaDetails();
    }
  }, [ticket]);

  const toggleQRCode = (ticketData) => {
    setSelectedTicket(ticketData);
    setShowQRCode(!showQRCode);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={"Your Tickets"}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {mediaItems.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <MediaItem media={item.media} mediaType={item.mediaType} />
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ marginTop: 2 }}
                loadingPosition="start"
                onClick={() => toggleQRCode(ticket[index])} 
              >
                Show QR
              </LoadingButton>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Modal to display QR code */}
      <Modal open={showQRCode} onClose={() => setShowQRCode(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedTicket && (
              <QRCode value={JSON.stringify(selectedTicket)} size={300} /> 
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default MyTicket;
