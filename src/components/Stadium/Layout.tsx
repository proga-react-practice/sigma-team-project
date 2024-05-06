import {useState} from "react";
import {Box, Slide, ThemeProvider} from "@mui/material";
import Form from "./Form";
import CardList from "./CardList";
import {CardProps} from "./Card";
import { theme } from "../../utils/theme";

const Layout: React.FC = () => {
    const [cards, setCards] = useState<CardProps[]>([]);

    return (
        <ThemeProvider theme={theme}>
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                flexDirection: {xs: "column", sm: "row"},
            }}
        >
            <Slide direction="left" in={true} timeout={1000}>
                <Box sx={{flex: "1", padding: {xs: 0, sm: 4}}}>
                    <Form setCardInfo={setCards} />
                </Box>
            </Slide>
            <Slide direction="right" in={true} timeout={1000}>
                <Box sx={{flex: "2", padding: {xs: 0, sm: 4}}}>
                    <CardList cards={cards} />
                </Box>
            </Slide>
        </Box>
        </ThemeProvider>
    );
};

export default Layout;
