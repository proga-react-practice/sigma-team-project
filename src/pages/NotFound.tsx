import {Box, Typography, Button} from "@mui/material";
import {Link} from "react-router-dom";
import Header from "../components/Header";
import MissShotAnimation from "../components/missShotAnimation";
import {HOME} from "../router/pathConstants";

const NotFound = () => {
    return (
        <>
            <Header />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    mt: 10,
                }}
            >
                <Typography variant="h5" align="center">
                    Could not find this page!
                </Typography>
                <Typography variant="h5" align="center">
                    You missed a shot and are looking for a page that doesn't
                    exist!
                </Typography>
                <Button
                    sx={{mt: 3}}
                    component={Link}
                    to={HOME}
                    variant="contained"
                    color="secondary"
                >
                    Back to home{" "}
                </Button>
                <MissShotAnimation />
            </Box>
        </>
    );
};

export default NotFound;
