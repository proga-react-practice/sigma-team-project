import { createContext, useContext, useState, ReactNode } from 'react';

interface Block {
  id: number;
  firstTeam: string;
  secondTeam: string;
  tickets: string;
  stadium: string;
  stadiumId: string | null;
}

interface FormContextProps {
  blocks: Block[];
  addBlock: (block: Block) => void;
  removeBlock: (id: number) => void;
  updateBlock: (id: number, updatedBlock: Partial<Block>) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = (block: Block) => {
    setBlocks((prevBlocks) => [...prevBlocks, block]);
  };

  const removeBlock = (id: number) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  const updateBlock = (id: number, updatedBlock: Partial<Block>) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, ...updatedBlock } : block
      )
    );
  };

  return (
    <FormContext.Provider value={{ blocks, addBlock, removeBlock, updateBlock }}>
      {children}
    </FormContext.Provider>
  );
};
