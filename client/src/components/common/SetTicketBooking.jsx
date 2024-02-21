import { LoadingButton } from "@mui/lab";
import { Alert, Box, Stack, TextField, RadioGroup, Radio, FormControlLabel, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setBookingModalOpen } from "../../redux/features/bookingModalSlice";
import uiConfigs from "../../configs/ui.configs";
import adminApi from "../../api/modules/admin.api";

const SetTicketBooking = ({ mediaId }) => {
  
  const dispatch = useDispatch();

  const [isSubmitRequest, setIsSubmitRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const TicketBookingFrom = useFormik({
    initialValues: {
      isAvailable: "no",
      normal: "",
      executive: "",
      premium: ""
    },
    onSubmit: async values => {
      console.log(values);
      values["mediaId"] = mediaId;
      setErrorMessage('');
      setIsSubmitRequest(true);
      if (values.isAvailable === "yes") {
        const { response, err } = await adminApi.add(values);
    
        if (response) {
          TicketBookingFrom.resetForm();
          dispatch(setBookingModalOpen(false)); 
          toast.success("Movie added Successfully");
        }
    
        if (err) setErrorMessage(err.message)
      } else {
        const { response, err } = await adminApi.remove(values);
    
        if (response) {
          TicketBookingFrom.resetForm();
          dispatch(setBookingModalOpen(false)); 
          toast.success("Movie Removed Successfully");
        }
    
        if (err) setErrorMessage(err.message)
      }
      setIsSubmitRequest(false);
    }
  });

  return (
    <Box component="form" onSubmit={TicketBookingFrom.handleSubmit}>
      <Stack spacing={3}>
        <Typography
          variant="h6"
          fontSize={{ xs: "1rem", md: "1rem", lg: "1.5rem" }}
          fontWeight="700"
          sx={{
              ...uiConfigs.style.typoLines(2, "center")
          }}
        >
            Movie Availability
        </Typography>
        <RadioGroup
          aria-label="availability"
          name="isAvailable"
          value={TicketBookingFrom.values.isAvailable}
          onChange={TicketBookingFrom.handleChange}
          sx={{ display: "flex", flexDirection: "row", justifyContent: "center"}}
        > 
          <FormControlLabel value="yes" control={<Radio />} label="Available" />
          <FormControlLabel value="no" control={<Radio />} label="Not Available" />
        </RadioGroup>
        {TicketBookingFrom.values.isAvailable === "yes" && (
          <>
            <TextField
              type="number"
              placeholder="Normal Seat Price"
              name="normal"
              fullWidth
              value={TicketBookingFrom.values.normal}
              onChange={TicketBookingFrom.handleChange}
              error={TicketBookingFrom.touched.normal && TicketBookingFrom.errors.normal !== undefined}
              helperText={TicketBookingFrom.touched.normal && TicketBookingFrom.errors.normal}
            />
            <TextField
              type="number"
              placeholder="Executive Seat Price"
              name="executive"
              fullWidth
              value={TicketBookingFrom.values.executive}
              onChange={TicketBookingFrom.handleChange}
              error={TicketBookingFrom.touched.executive && TicketBookingFrom.errors.executive !== undefined}
              helperText={TicketBookingFrom.touched.executive && TicketBookingFrom.errors.executive}
            />
            <TextField
              type="number"
              placeholder="Premium Seat Price"
              name="premium"
              fullWidth
              value={TicketBookingFrom.values.premium}
              onChange={TicketBookingFrom.handleChange}
              error={TicketBookingFrom.touched.premium && TicketBookingFrom.errors.premium !== undefined}
              helperText={TicketBookingFrom.touched.premium && TicketBookingFrom.errors.premium}
            />
          </>
        )}
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isSubmitRequest}
      >
        Submit
      </LoadingButton>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default SetTicketBooking;