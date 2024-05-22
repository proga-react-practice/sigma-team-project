import React, {createContext, useContext, useState} from "react";
import {CardProps} from "./Card";
import {DragEndEvent} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";

export interface StadiumCardContextType {
    cards: CardProps[];
    addCard: (card: CardProps) => void;
    removeCard: (id: string) => void;
    updateCard: (updatedCard: CardProps) => void;
    dndCard: (event: DragEndEvent) => void;
}

const StadiumCardContext = createContext<StadiumCardContextType>({
    cards: [],
    addCard: () => {},
    removeCard: () => {},
    updateCard: () => {},
    dndCard: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useStadiumCardContext = () => useContext(StadiumCardContext);

export const StadiumCardProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const [cards, setCards] = useState<CardProps[]>([]);

    const addCard = (card: CardProps) => {
        setCards((prevCards) => [card, ...prevCards]);
    };

    const removeCard = (id: string) => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    };
    const updateCard = (updatedCard: CardProps) => {
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.id === updatedCard.id ? updatedCard : card
            )
        );
    };
    function dndCard(event: DragEndEvent) {
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
        <StadiumCardContext.Provider
            value={{cards, addCard, removeCard, updateCard, dndCard}}
        >
            {children}
        </StadiumCardContext.Provider>
    );
};
