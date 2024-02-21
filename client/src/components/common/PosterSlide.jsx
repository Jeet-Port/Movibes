import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.config";
import AutoSwiper from "./AutoSwiper";

const PosterSlide = ({ posters }) => {
  return (
    <AutoSwiper>
      {[...posters].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index} style={{ margin: "20px"}}>
          <Box sx={{
            paddingTop: "160%",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${tmdbConfigs.posterPath(item.file_path)})`,
            borderRadius: "15px" 
          }} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PosterSlide;