import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

export const Post = () => {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src="https://github.com/reziak.png" />
          <div className={styles.authorInfo}>
            <strong>Bruno Lira</strong>
            <span>Web developer</span>
          </div>
        </div>
        <time title='08 de junho às 11:43h' dateTime='2022-06-08 11:43:22'>
          Publicado há 1h
        </time>
      </header>
      <div className={styles.content}>
        <p>Fala galeraa 👋</p>
        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
        <p><a href='#goto'>jane.design/doctorcare</a></p>
        <p>
          <a href="#np">#novoprojeto</a>{' '}
          <a href="#np">#nlw</a>{' '}
          <a href="#np">#rocketseat</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea placeholder='Deixe um comentário'/>
        <button type="submit">Publicar</button>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
};