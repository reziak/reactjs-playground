import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

export const Post = ({author, content, publishedAt, tags}) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      id: comments.length + 1,
      content: comment,
      createdAt: new Date(),
    }

    setComments([...comments, newComment]);

    setComment('');
  }

  const handleDeleteComment = (id) => {
    const currentComments = comments;
    const newComments = currentComments.filter(c => {
      return c.id !== id;
    });
    setComments(newComments);
  }

  const handleNewCommentChange = (event) => {
    event.target.setCustomValidity('');
    setComment(event.target.value);
  }

  const handleNewCommentInvalid = (event) => {
    event.target.setCustomValidity('Esse campo é obrigatório.');
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p>{line.content}</p>;
          } else if (line.type === 'link') {
            return (
              <p>
                <a href={line.address}>{line.text}</a>
              </p>
            );
          }
        })}
        { tags ? (
          <p className={styles.tags}>
            {tags.map(tag => (
              <a href="#">#{tag}</a>
            ))}
          </p>
        ) : null}
      </div>

      <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          onChange={event => handleNewCommentChange(event)}
          onInvalid={event => handleNewCommentInvalid(event)}
          value={comment}
          placeholder='Deixe um comentário'
          required
        />
        <button
          type="submit"
          disabled={comment.length <= 0}
        >
          Publicar
        </button>
      </form>

      <div className={styles.commentList}>
        {comments.map(c => (
          <Comment 
            key={c.id}
            content={c.content}
            createdAt={c.createdAt}
            onDeleteComment={() => handleDeleteComment(c.id)}
          />
        ))}
      </div>
    </article>
  )
};