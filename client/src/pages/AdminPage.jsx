import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

let timer;
const timeout = 500;

const AdminPage = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState("movie");
  const [mediasSearch, setMediasSearch] = useState([]);
  const [page, setPage] = useState(1);

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);

  const dispatch = useDispatch();

  const search = useCallback(
    async () => {
      setOnSearch(true);

      const { response, err } = await mediaApi.search({
        mediaType,
        query,
        page
      });

      setOnSearch(false);

      if (err) toast.error(err.message);
      if (response) {
        if (page > 1) setMediasSearch(m => [...m, ...response.results]);
        else setMediasSearch([...response.results]);
      }
    },
    [mediaType, query, page],
  );

  useEffect(() => {
    if (query.trim().length === 0) {
      setMediasSearch([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMediasSearch([]);
    setPage(1);
  }, [mediaType]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: "popular",
        page: currPage
      });

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        if (currPage !== 1) setMedias(m => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    };

    getMedias();
  }, []);


  const onLoadMore = () => setCurrPage(currPage + 1);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Toolbar />
        <Stack spacing={2}>
          <TextField
            color="success"
            placeholder="Search MoviBes"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />

          <MediaGrid medias={mediasSearch} mediaType={mediaType} />

          {mediasSearch.length > 0 && (
            <LoadingButton
              loading={onSearch}
              onClick={() => setPage(page + 1)}
            >
              load more
            </LoadingButton>
          )}

        <Box sx={{ ...uiConfigs.style.mainContent }}>
        <MediaGrid
          medias={medias}
          mediaType={mediaType}
        />
        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          load more
        </LoadingButton>
      </Box>
          
        </Stack>
      </Box>
    </>
  );
};

export default AdminPage;