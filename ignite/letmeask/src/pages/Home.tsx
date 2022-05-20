import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from 'firebase/database';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export const Home = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoom = () => {
    if (!user) {
      signInWithGoogle();
    }
    navigate('/rooms/new');
  }

  const handleEnterRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef =ref(database);
    const room = await get(child(roomRef, `rooms/${roomCode}`));

    if (!room.exists()) {
      return alert('Room does not exists');
    }

    if (room.val().endedAt) {
      return alert('Room no longer available');
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Questions and answers illustration" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiênca em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Letmeask logo" />
          <button className='create-room' onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Google icon" />
            Crie a sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleEnterRoom}>
            <input
              type="text"
              placeholder='Digite o código da sala'
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}