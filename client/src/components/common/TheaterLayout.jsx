import { useState, useEffect } from 'react';
import { Grid, Button, Typography, useTheme } from '@mui/material';
import uiConfigs from '../../configs/ui.configs';
import userApi from "../../api/modules/user.api";
import { toast } from "react-toastify";

const TheaterLayout = ({ setSelectedSeats }) => {
    const [buttonStatus, setButtonStatus] = useState({});
    const [seats, setSeats] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const { response, err } = await userApi.allSeats();
                if (err) {
                    toast.error(err.message);
                } else {
                    const allSeats = response.reduce((all, current) => {
                        return all.concat(current.seats);
                    }, []);
                    setSeats(allSeats);
                }
            } catch (error) {
                console.error("Error fetching seats:", error);
                toast.error("Error fetching seats");
            }
        };

        fetchSeats();
    }, []);

    useEffect(() => {
        const updatedButtons = document.querySelectorAll('.seat-button');
        updatedButtons.forEach((btn) => {
            const buttonNumber = btn.textContent;
            btn.style.backgroundColor = buttonStatus[buttonNumber] ? 'lightblue' : uiConfigs.style.gradientBgImage.light.backgroundImage;
        });
        setSelectedSeats(Object.keys(buttonStatus).filter(key => buttonStatus[key]));
    }, [buttonStatus, setSelectedSeats]);

    const handleButtonClick = (button) => {
        setButtonStatus(prevStatus => ({
            ...prevStatus,
            [button]: !prevStatus[button]
        }));
    };

    const isSeatBooked = (seat) => seats.includes(seat);

    const rowStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px' // Fixed height for each row
    };

    const rows = [
        ["Premium"],
        ['1-premium', '2-premium', '3-premium', '4-premium', '5-premium'],
        [],
        ["Executive"],
        [],
        ['6-executive', '7-executive', '8-executive', '9-executive', '10-executive', '11-executive'],
        ['12-executive', '13-executive', '14-executive', '15-executive', '16-executive', '17-executive'],
        [],
        ["Normal"],
        [],
        ['18-normal', '19-normal', '20-normal', '21-normal', '22-normal', '23-normal', '24-normal'],
        ['25-normal', '26-normal', '27-normal', '28-normal', '29-normal', '30-normal', '31-normal'],
    ];

    return (
        <Grid container spacing={1} sx={{ backgroundColor: uiConfigs.style.gradientBgImage.light.backgroundImage }}>
            {rows.map((row, rowIndex) => (
                <Grid item xs={12} key={rowIndex} sx={rowStyle}>
                    {row.map((button, buttonIndex) => (
                        (button === '') ? (
                            <div key={buttonIndex} style={{ width: '40px' }}></div>
                        ) : (
                            <>
                                {["Premium", "Executive", "Normal"].includes(button) ? (
                                    <Typography
                                        key={buttonIndex}
                                        variant="button"
                                        sx={{ color: theme.palette.primary.main }}
                                    >
                                        {button}
                                    </Typography>
                                ) : (
                                    <Button
                                        key={buttonIndex}
                                        variant="contained"
                                        onClick={() => handleButtonClick(button)}
                                        className="seat-button"
                                        disabled={isSeatBooked(button)}
                                        style={{
                                            backgroundColor: buttonStatus[button] ? 'lightblue' : 'inherit',
                                        }}
                                    >
                                        {button.split("-")[0]}
                                    </Button>
                                )}
                            </>
                        )
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

export default TheaterLayout;
