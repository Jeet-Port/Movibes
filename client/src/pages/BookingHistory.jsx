import { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Toolbar, useTheme } from '@mui/material';
import { toast } from "react-toastify";
import userApi from '../api/modules/user.api';

const BookingHistory = () => {

    const [ticketList, setTicketList] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        const fetchTicketHistory = async () => {
            try {
                const { response, err } = await userApi.allSeats();
                if (err) {
                    toast.error(err.message);
                } else {
                    setTicketList(response);
                }
            } catch (error) {
                toast.error("Error fetching ticket history");
            }
        };

        fetchTicketHistory();
    }, []);

  return (
    <>
    <Toolbar /><Toolbar />
        <Table sx={{ textAlign: 'center' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center', color: theme.palette.primary.main }}>Number</TableCell>
              <TableCell sx={{ textAlign: 'center', color: theme.palette.primary.main }}>Booking ID</TableCell>
              <TableCell sx={{ textAlign: 'center', color: theme.palette.primary.main }}>User Name</TableCell>
              <TableCell sx={{ textAlign: 'center', color: theme.palette.primary.main }}>Movie Name</TableCell>
              <TableCell sx={{ textAlign: 'center', color: theme.palette.primary.main }}>Total Seats</TableCell>
              <TableCell sx={{ textAlign: 'center', color: theme.palette.primary.main, maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>Seat Number</TableCell>
              <TableCell sx={{ textAlign: 'center', color: theme.palette.primary.main }}>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketList.map((ticket, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: 'center' }}>{index + 1}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{ticket._id}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{ticket.username}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{ticket.mediaName}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{ticket.seats.length}</TableCell>
                  <TableCell style={{ textAlign: 'center', maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis"  }}>{ticket.seats.join(', ')}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{ticket.total}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
    </>
  )
}

export default BookingHistory;
