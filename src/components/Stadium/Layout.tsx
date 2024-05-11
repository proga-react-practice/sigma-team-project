import {useState} from "react";
import {Box, Slide} from "@mui/material";
import Form from "./Form";
import CardList from "./CardList";
import {CardProps} from "./Card";

const Layout: React.FC = () => {
    const [cards, setCards] = useState<CardProps[]>([]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                flexDirection: {xs: "column", sm: "row"},
            }}
            mt={10}
        >
            <Slide direction="left" in={true} timeout={1000}>
                <Box sx={{flex: "1", padding: {xs: 0, sm: 4}}}>
                    <Form setCardInfo={setCards} />
                </Box>
            </Slide>
            <Slide direction="right" in={true} timeout={1000}>
                <Box sx={{flex: "2", padding: {xs: 0, sm: 4}}}>
                    <CardList cards={cards} setCards={setCards} />
                </Box>
            </Slide>
        </Box>
    );
};

export default Layout;
