import { Box, Typography, Divider, Stack, Chip, Toolbar} from "@mui/material"
import { LoadingButton } from "@mui/lab";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import { toast } from "react-toastify";

const  TicketBooking = () => {

  const { mediaType, mediaId } = useParams();
  const [media, setMedia] = useState();

  
  const dispatch = useDispatch();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId })
      
      if (response) {
        console.log(response);
        setMedia(response)
      }
      
      if (err) toast.error(err.message);
    };
    
    getMedia();
  }, [mediaType, mediaId, dispatch])

  return (
    <>
      <Box sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent
        }}>
          <Toolbar /><Toolbar />
          {/* poster */}
          <Box sx={{
                width: { xs: "50%", sm: "50%", md: "40%" },
                height: { xs: "50%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
              }}>
                <Box sx={{
                  paddingTop: "140%",
                  borderRadius: "15px",
                  ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                }}/>
                <Divider orientation="vertical" />
            </Box>
          {/* poster */}
      </Box>
    </>
  )
}

export default  TicketBooking;