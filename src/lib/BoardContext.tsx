import React, { createContext, useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import HTTPUtil from "./httputil";

type Collaborator = {
  name: string;
  email: string;
  owner: boolean;
};

type BoardContextType = {
  canEdit: boolean;
  boardID: string;
  boardName: string;
  boardDescription: string;
  ownerName: string;
  ownerEmail: string;
  createdOn: string;
  collaborators: Collaborator[];
  isLoading: boolean;
};

const defaultValue: BoardContextType = {
  canEdit: false,
  boardID: "",
  boardName: "",
  boardDescription: "",
  ownerName: "",
  ownerEmail: "",
  createdOn: "",
  collaborators: [],
  isLoading: true,
};

const BoardContext = createContext<BoardContextType>(defaultValue);

export const useBoardContext = () => useContext(BoardContext);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const boardID = pathSegments[pathSegments.length - 1];

  const [boardData, setBoardData] = useState<BoardContextType>(() => {
    const saved = localStorage.getItem("boardData");
    return saved ? JSON.parse(saved) : defaultValue;
  });

  const fetchBoardData = async (boardID: string) => {
    try {
      const url =
        import.meta.env.VITE_BACKEND_BASE_URL +
        import.meta.env.VITE_LOAD_BOARD_INFO_URL +
        boardID;
      const result = await HTTPUtil.request(url, "GET");

      if (result.status && result.data) {
        const data = result.data;
        const currentUserEmail = localStorage.getItem("email");
        const isEditor = data.collaborators.some(
          (col: Collaborator) => col.email === currentUserEmail && col.owner == true
        );

        const formattedData: BoardContextType = {
          canEdit: isEditor,
          boardID: data.board_id,
          boardName: data.name,
          boardDescription: data.description,
          ownerName: data.owner_name,
          ownerEmail: data.owner_email,
          createdOn: data.created_on,
          collaborators: data.collaborators,
          isLoading: false,
        };

        localStorage.setItem("boardData", JSON.stringify(formattedData));
        setBoardData(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch board data:", error);
    }
  };

  useEffect(() => {
    if (boardID && (!boardData.boardID || boardData.boardID !== boardID)) {
      localStorage.removeItem("boardData");
      setBoardData(defaultValue);
      fetchBoardData(boardID);
    }
  }, [boardID]);
  
  return <BoardContext.Provider value={boardData}>{children}</BoardContext.Provider>;
};
