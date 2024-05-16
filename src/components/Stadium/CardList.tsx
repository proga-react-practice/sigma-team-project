import Card from "./Card";
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {restrictToFirstScrollableAncestor} from "@dnd-kit/modifiers";
import {Grid, Typography, Box, Container} from "@mui/material";
import {theme} from "../../utils/theme";
import {SortableContext} from "@dnd-kit/sortable";
import {useStadiumCardContext} from "./StadiumCardContext";

const CardList: React.FC = () => {
    const {cards, dndCard} = useStadiumCardContext();
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );

    return (
        <Box mt={1}>
            <Typography variant="h4">Stadium list</Typography>
            <Container>
                {cards.length > 0 ? (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={dndCard}
                        modifiers={[restrictToFirstScrollableAncestor]}
                    >
                        <Grid
                            container
                            spacing={1}
                            columns={{xs: 1, md: 2}}
                            sx={{
                                overflowX: {xs: "hidden"},
                                overflowY: {xs: "hidden", sm: "auto"},
                                maxHeight: {sm: "80vh"},
                                "&::-webkit-scrollbar": {width: "0.4em"},
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: theme.palette.primary.dark,
                                    borderRadius: 1,
                                },
                            }}
                        >
                            <SortableContext items={cards}>
                                {cards.map((card) => (
                                    <Grid key={card.id} item xs={0.98}>
                                        <Card {...card} />
                                    </Grid>
                                ))}
                            </SortableContext>
                        </Grid>
                    </DndContext>
                ) : (
                    <Typography variant="h6">No cards available</Typography>
                )}
            </Container>
        </Box>
    );
};

export default CardList;
