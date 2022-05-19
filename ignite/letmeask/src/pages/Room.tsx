import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ref, push, onValue } from "firebase/database";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
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
}

type RoomParams = {
  id: string | undefined;
}

export const Room = () => {
  const { user, signInWithGoogle } = useAuth();
  const { id } = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [roomTitle, setRoomTitle] = useState('');

  useEffect(() => {
    const dbRef = ref(database, `rooms/${id}`);
    
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
        }
      });

      setRoomTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    }, {
      onlyOnce: true,
    });
  }, [id]);

  const handleCreateQuestion = async (event: FormEvent) => {
    event.preventDefault();

    if (newQuestion.trim() === '') return;
    if (!user) throw new Error('You must be logged in');

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    const questionRef = ref(database, `rooms/${id}/questions`);
    await push(questionRef, question);

    setNewQuestion('');
  }
  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />
          <RoomCode code={id} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {roomTitle}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleCreateQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button onClick={signInWithGoogle}>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        <div>{JSON.stringify(questions)}</div>
      </main>
    </div>
  )
}