import { create } from 'zustand';

interface Board {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  goals?: { [key: string]: string };
  warehouse?: { id: string; text: string; categories: string[] }[];
}

interface BoardStore {
  boards: Board[];
  addBoard: (name: string, description: string, id: string) => void;
  updateBoardName: (id: string, name: string) => void;
  updateBoardDescription: (id: string, description: string) => void;
  saveGoals: (boardId: string, goals: { [key: string]: string }) => void;
  saveWarehouseItem: (boardId: string, item: { id: string; text: string; categories: string[] }) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [],
  addBoard: (name: string, description: string, id: string) => 
    set((state) => ({
      boards: [
        ...state.boards,
        { id, name, description, createdAt: new Date(), goals: {}, warehouse: [] }
      ]
    })),
  updateBoardName: (id: string, name: string) =>
    set((state) => ({
      boards: state.boards.map(board => 
        board.id === id ? { ...board, name } : board
      )
    })),
  updateBoardDescription: (id: string, description: string) =>
    set((state) => ({
      boards: state.boards.map(board => 
        board.id === id ? { ...board, description } : board
      )
    })),
  saveGoals: (boardId: string, goals: { [key: string]: string }) =>
    set((state) => ({
      boards: state.boards.map(board =>
        board.id === boardId ? { ...board, goals } : board
      )
    })),
  saveWarehouseItem: (boardId: string, item: { id: string; text: string; categories: string[] }) =>
    set((state) => ({
      boards: state.boards.map(board =>
        board.id === boardId ? {
          ...board,
          warehouse: [...(board.warehouse || []), item]
        } : board
      )
    }))
}));