import {Box, Slide} from "@mui/material";
import Form from "./Form";
import CardList from "./CardList";

const Layout: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                flexDirection: {xs: "column", sm: "row"},
                overflow: "hidden",
            }}
            mt={12}
        >
            <Slide direction="left" in={true} timeout={1000}>
                <Box sx={{flex: "1", padding: {xs: 0, sm: 4}}}>
                    <Form />
                </Box>
            </Slide>
            <Slide direction="right" in={true} timeout={1000}>
                <Box sx={{flex: "2", padding: {xs: 0, sm: 4}}}>
                    <CardList />
                </Box>
            </Slide>
        </Box>
    );
};

export default Layout;
