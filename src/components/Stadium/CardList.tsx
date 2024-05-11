import Card, {CardProps} from "./Card";
import {
    DndContext,
    DragEndEvent,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {restrictToFirstScrollableAncestor} from "@dnd-kit/modifiers";
import {Grid, Typography, Box, Container} from "@mui/material";
import {theme} from "../../utils/theme";
import {SortableContext, arrayMove} from "@dnd-kit/sortable";

interface CardListProps {
    cards: CardProps[];
    setCards: React.Dispatch<React.SetStateAction<CardProps[]>>;
}

const CardList: React.FC<CardListProps> = ({cards, setCards}) => {
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

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;
        if (over && active.id !== over.id) {
            setCards((items) => {
                const oldIndex = items.findIndex(
                    (item) => item.id === active.id
                );
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <Box mt={1}>
            <Typography variant="h4">Stadium list</Typography>
            <Container>
                {cards.length > 0 ? (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
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
