import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TheatersIcon from '@mui/icons-material/Theaters';

import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";
import CastSlide from "../components/common/CastSlide";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";
import adminApi from "../api/modules/admin.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModelSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";
import MediaVideosSlide from "../components/common/MediaVideosSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";

const MediaDetail = () => {
  const {  mediaType, mediaId } = useParams();
  const {user, listFavorites} = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([])
  const [isAvailable, setIsAvailable] = useState(false)

  const dispatch = useDispatch();

  const videoRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId })
      dispatch(setGlobalLoading(false))

      if (response) {
        setMedia(response)
        setIsFavorite(response.isFavorite)
        setGenres(response.genres.splice(0, 2))
      }

      if (err) toast.error(err.message);
    };

    const getMovie = async () => {
      const { response, err } = await adminApi.getMovie({ mediaId })

      if (response) {
        setIsAvailable(true);
      }
      if (err) console.clear()
    }

    getMedia();
    getMovie();
  }, [mediaType, mediaId, dispatch])

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true))

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average
    }

    const { response, err } = await favoriteApi.add(body)

    setOnRequest(false)

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Add favorite success");
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return
    setOnRequest(true)

    const favorite = listFavorites.find(e => e.mediaId.toString() === media.id.toString())

    const { response, err } = await favoriteApi.remove({ favoriteId: favorite._id })

    setOnRequest(false)

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite(favorite))
      setIsFavorite(false)
      toast.success("Remove favorite success")
    }
  }

  return (
    media ? (
      <>
        <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} />
        <Box sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent
        }}>
          {/* media content */}
          <Box sx={{
            marginTop: { xs: "-10rem", md: ""}
          }}>
            <Box sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column"}
            }}>
              {/* poster */}
              <Box sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
              }}>
                <Box sx={{
                  paddingTop: "140%",
                  borderRadius: "15px",
                  ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                }}/>
              </Box>
              {/* poster */}

              {/* media info */}
              <Box sx={{
                width: {xs: "100%", md: "60%"},
                color: "text.primary"
              }}>
                <Stack spacing={5}>
                  {/* title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                    fontWeight="700"
                    sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                  >
                    {`${media.title || media. name } ${mediaType === tmdbConfigs.mediaType.movie ? media.release_date.split("-")[0] : media.first_air_date.split("-")[0]}`}
                  </Typography>
                  {/* title */}

                  {/* rate and genres */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rate */}
                    <CircularRate value={media.vote_average} />
                    {/* rate */}
                    <Divider orientation="vertical" />
                    {/* genres */}
                    {genres.map((genre, index) => (
                      <Chip 
                        label={genre.name}
                        variant="filled"
                        color="primary"
                        key={index}
                      />
                    ))}
                    {/* genres */}
                  </Stack>
                  {/* rate and genres */}

                  {/* overview */}
                  <Typography
                    variant="body1"
                    sx={{ ...uiConfigs.style.typoLines(5) }}  
                  >
                    {media.overview}
                  </Typography>
                  {/* overview */}

                  {/* button */}
                  <Stack direction="row" spacing={1}>
                    <LoadingButton
                      variant="text"
                      sx={{
                        width: "max-content",
                        "& .MuiButton-starIcon": { marginRight: "0" }
                      }}
                      size="large"
                      startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                      loadingPosition="start"
                      loading={onRequest}
                      onClick={onFavoriteClick}
                    />
                    <Button
                      variant="contained"
                      sx={{ width: "max-content" }}
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      onClick={() => videoRef.current.scrollIntoView()}
                    >
                      watch trailer
                    </Button>
                    {isAvailable && (
                      <Button
                        variant="contained"
                        sx={{ width: "max-content"}}
                        size="large"
                        startIcon={<TheatersIcon />}
                        component={Link}
                        to={`/movie/${mediaId}/ticket-seat-selection`}
                      >
                        Book Ticket
                      </Button>
                    )}
                  </Stack>
                  {/* button */}

                  {/* cast */}
                  <Container header="Cast">
                    <CastSlide casts={media.credits.cast} />
                  </Container>
                  {/* cast */}
                </Stack>
              </Box>
              {/* media info */}
            </Box>
          </Box>
          {/* media content */}

          {/* media video */}
          <div ref={videoRef} style={{paddingTop: "2rem"}}>
            <Container header="Videos">
              <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
            </Container>
          </div>
          {/* media video */}

          {/* media backdrop */}
          {media.images.backdrops.length > 0 && (
            <Container header="backdrops">
              <BackdropSlide backdrops={media.images.backdrops} />
            </Container>
          )}
          {/* media backdrop */}

          {/* media poster */}
          {media.images.posters.length > 0 && (
            <Container header="poster">
              <PosterSlide posters={media.images.posters }/>
            </Container>
          )}
          {/* media poster */}

          {/* media reviews */}
          <MediaReview reviews={media.reviews} media={media} mediaType={mediaType}/>
          {/* media reviews */}

          {/* media recommendation */}
          <Container header="You may also like">
            {media.recommend.length > 0 && (
              <RecommendSlide medias={media.recommend} mediaType={mediaType} />
            )}
            {media.recommend.length === 0 && (
              <MediaSlide 
                mediaType={mediaType}
                mediaCategory={tmdbConfigs.mediaCategory.top_rated}
              />
            )}
          </Container>
          {/* media recommendation */}
        </Box>
      </>
    ) : null
  );
}

export default MediaDetail;