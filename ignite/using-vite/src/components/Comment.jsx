import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

export const Comment = () => {
  return (
    <div className={styles.comment}>
      <Avatar noBorder src="https://github.com/reziak.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.author}>
              <strong>Bruno Lira</strong>
              <time title='08 de junho às 11:43h' dateTime='2022-06-08 11:43:22'>
                Cerca de 1h atrás
              </time>
            </div>
            <button title='Deletar comentário'><Trash size={24} /></button>
          </header>
          <p>Muito bom Devon, parabéns.</p>
        </div>
        <footer>
          <button>
            <ThumbsUp size={20} />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}