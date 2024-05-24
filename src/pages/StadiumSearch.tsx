import {useState} from "react";
import {
    TextField,
    Box,
    Typography,
    Grid,
    Container,
    Slider,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Autocomplete,
    Slide
} from "@mui/material";
import Header from "../components/Header";
import Card from "../components/Stadium/Card";
import {useStadiumCardContext} from "../components/Stadium/StadiumCardContext";
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {SortableContext} from "@dnd-kit/sortable";
import {
    restrictToVerticalAxis,
    restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import {fieldTypeOptions} from "../utils/fieldTypeOptions";
import {useTheme} from "@mui/material/styles";

export const StadiumSearch = () => {
    const theme = useTheme();
    const {cards, dndCard, deletingCardId} = useStadiumCardContext();
    const maxCapacity = Math.max(
        ...cards.map((card) => parseInt(card.capacity, 10))
    );
    const [stadiumQuery, setStadiumQuery] = useState("");
    const [cityQuery, setCityQuery] = useState("");
    const [capacityRange, setCapacityRange] = useState([0, maxCapacity]);
    const [selectedFieldTypes, setSelectedFieldTypes] = useState<string[]>([]);

    const stadiumNameOptions = cards.map((card) => ({label: card.stadiumName}));
    const cityOptions = cards.map((card) => ({label: card.city}));

    const handleCapacityRangeChange = (
        _event: Event,
        newValue: number | number[]
    ) => {
        setCapacityRange(newValue as number[]);
    };
    const handleFieldTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const {value, checked} = event.target;
        setSelectedFieldTypes((prevSelected) =>
            checked
                ? [...prevSelected, value]
                : prevSelected.filter((type) => type !== value)
        );
    };

    const filteredCards = cards.filter(
        (card) =>
            card.stadiumName
                .toLowerCase()
                .includes(stadiumQuery.toLowerCase()) &&
            card.city.toLowerCase().includes(cityQuery.toLowerCase()) &&
            parseInt(card.capacity, 10) >= capacityRange[0] &&
            parseInt(card.capacity, 10) <= capacityRange[1] &&
            (selectedFieldTypes.length === 0 ||
                selectedFieldTypes.includes(card.fieldType))
    );

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
        <>
            <Header />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    flexDirection: {xs: "column", sm: "row"},
                    overflow: "hidden",
                }}
                mt={10}
            ><Slide direction="left" in={true} timeout={1000}>
                <Box sx={{flex: "1", padding: {xs: 1, sm: 4}}}>
                    <Typography variant="h4">Stadium Search</Typography>

                    <Autocomplete
                        disablePortal
                        id="stadium-autocomplete"
                        freeSolo
                        onInputChange={(_event, newInputValue) => {
                            setStadiumQuery(newInputValue);
                        }}
                        options={stadiumNameOptions}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label="Search by stadium name"
                                value={stadiumQuery}
                                onChange={(e) =>
                                    setStadiumQuery(e.target.value)
                                }
                                sx={{mb: 2}}
                            />
                        )}
                    />
                    <Autocomplete
                        disablePortal
                        id="city-autocomplete"
                        freeSolo
                        options={cityOptions}
                        onInputChange={(_event, newInputValue) => {
                            setCityQuery(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label="Search by city"
                                value={cityQuery}
                                onChange={(e) => setCityQuery(e.target.value)}
                            />
                        )}
                    />
                    <Typography>Capacity Range</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            mt: 4,
                        }}
                    >
                        <Slider
                            value={capacityRange}
                            onChange={handleCapacityRangeChange}
                            valueLabelDisplay="on"
                            min={0}
                            max={maxCapacity}
                            sx={{
                                maxWidth: "80%",
                                ml: 2,
                                "& .MuiSlider-valueLabel": {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        />
                    </Box>
                    <Typography gutterBottom>Field Type</Typography>
                    <FormGroup>
                        {fieldTypeOptions.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={
                                    <Checkbox
                                        checked={selectedFieldTypes.includes(
                                            option.value
                                        )}
                                        onChange={handleFieldTypeChange}
                                        value={option.value}
                                        sx={{
                                            color: theme.palette.primary.dark,
                                        }}
                                    />
                                }
                                label={option.label}
                            />
                        ))}
                    </FormGroup>
                </Box>
                </Slide>
                <Slide direction="right" in={true} timeout={1000}>
                <Box sx={{flex: "2", padding: {xs: 0, sm: 4}}}>
                    <Container sx={{padding: 1}}>
                        {filteredCards.length > 0 ? (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={dndCard}
                                modifiers={[
                                    restrictToVerticalAxis,
                                    restrictToFirstScrollableAncestor,
                                ]}
                            >
                                <Grid
                                    container
                                    spacing={1}
                                    columns={{xs: 1, md: 2}}
                                    sx={{
                                        overflowX: {xs: "hidden"},
                                        overflowY: {xs: "hidden", sm: "auto"},
                                        maxHeight: {sm: "80vh"},
                                        "&::-webkit-scrollbar": {
                                            width: "0.4em",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor:
                                                theme.palette.primary.dark,
                                            borderRadius: 1,
                                        },
                                    }}
                                >
                                    <SortableContext items={filteredCards}>
                                        {filteredCards.map((card) => (
                                            <Grid key={card.id} item xs={0.98}
                                                    sx={{
                                                        opacity: deletingCardId === card.id ? 0 : 1,
                                                        transform: deletingCardId === card.id ? 'scale(0.9)' : 'scale(1)',
                                                        transition: 'opacity 0.3s, transform 0.3s',
                                                    }}
                                            >
                                                <Card
                                                    {...card}
                                                    showMatchButton={true}
                                                />
                                            </Grid>
                                        ))}
                                    </SortableContext>
                                </Grid>
                            </DndContext>
                        ) : (
                            <Typography variant="h6">
                                No available stadiums
                            </Typography>
                        )}
                    </Container>
                </Box>
                </Slide>
            </Box>
        </>
    );
};
