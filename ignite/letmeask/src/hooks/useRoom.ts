import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likes: Record<string, {
    authorId: string
  }>
}>

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export const useRoom = (roomId: string | undefined) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [roomTitle, setRoomTitle] = useState('');

  useEffect(() => {
    const dbRef = ref(database, `rooms/${roomId}`);
    
    onValue(dbRef, room => {
      const databaseRoom = room.val();
      const roomQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(roomQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([_key, like]) => like.authorId === user?.id)?.[0],
        }
      });

      setRoomTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    }, {
      // onlyOnce: true, // enablind this block will require a onChildChanged in another component
    });

    return () => {
      off(dbRef);
    }
  }, [roomId, user?.id]);

  return { questions, roomTitle };
}