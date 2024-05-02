import Card, {CardProps} from "./Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {theme} from "../../utils/theme";

const CardList: React.FC<{cards: CardProps[]}> = ({cards}) => {
    return (
        <Box mt={1}>
            <Typography variant="h4">Stadium list</Typography>
            <Container>
                {cards.length > 0 ? (
                    <Grid
                        container
                        spacing={1}
                        columns={{xs: 1, md: 2}}
                        sx={{
                            overflowY: {sm: "auto"},
                            maxHeight: "80vh",
                            "&::-webkit-scrollbar": {width: "0.4em"},
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: theme.palette.primary.dark,
                                borderRadius: 1,
                            },
                        }}
                    >
                        {cards.map((card, index) => (
                            <Grid key={index} item xs={0.98}>
                                <Card {...card} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h6">No cards available</Typography>
                )}
            </Container>
        </Box>
    );
};

export default CardList;
