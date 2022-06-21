import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

export const Comment = ({
  content,
  createdAt,
  onDeleteComment
}) => {
  const [likeCount, setLikeCount] = useState(0);

  const createdAtDateFormatted = format(createdAt, "dd 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const createdAtDateRelativeToNow = formatDistanceToNow(createdAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleLikeComment = () => {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar noBorder src="https://github.com/reziak.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.author}>
              <strong>Bruno Lira</strong>
              <time title={createdAtDateFormatted} dateTime={createdAt.toISOString()}>
                {createdAtDateRelativeToNow}
              </time>
            </div>
            <button
              title='Deletar comentário'
              onClick={onDeleteComment}
            >
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}