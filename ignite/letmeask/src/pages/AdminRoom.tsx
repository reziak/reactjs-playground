import { useNavigate, useParams } from "react-router-dom"
import { ref, remove, update } from "firebase/database";

import { database } from "../services/firebase";
import { useRoom } from "../hooks/useRoom";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string | undefined;
}

export const AdminRoom = () => {
  const { id } = useParams<RoomParams>();
  const { questions, roomTitle } = useRoom(id);
  const navigate = useNavigate()

  const handleCloseRoom = async () => {
    if (window.confirm('Tem certeza que deseja encerrar essa sala?')) {
      const roomRef = ref(database, `rooms/${id}`);
      await update(roomRef, {
        endedAt: new Date(),
      });

      navigate('/')
    }
  }

  const handleAnswerQuestion = async (questionId: string) => {    
    const questionRef = ref(database, `rooms/${id}/questions/${questionId}`);
    await update(questionRef, {
      isAnswered: true,
    });
    
  }
  
  const handleHighlightQuestion = async (questionId: string) => {
    const questionRef = ref(database, `rooms/${id}/questions/${questionId}`);
    await update(questionRef, {
      isHighlighted: true,
    });
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      const removeLike = ref(database, `rooms/${id}/questions/${questionId}`);
      await remove(removeLike);
    }
  }
   
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />
          <div>
            <RoomCode code={id} />
            <Button isOutlined onClick={handleCloseRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {roomTitle}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
       
        <div className="question-list">
          {questions.length > 0 && questions.map(question => (
            <Question 
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button type="button" onClick={() => handleAnswerQuestion(question.id)}>
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                    <img src={answerImg} alt="Marcar pergunta como destaque" />
                  </button>
                </>
              )}
              <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Delete a pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  )
}