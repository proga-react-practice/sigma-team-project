import {  Container, Typography } from "@mui/material";
import Header from "../components/Header";

const NotFound = () => {
    return (
        <>
            <Header />
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h5" align="center" mt={10}>
                    Could not find this page!
                </Typography>
            </Container>
        </>
    );
};

export default NotFound;
