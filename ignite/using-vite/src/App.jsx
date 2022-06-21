import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

import styles from './App.module.css';
import './global.css';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/reziak.png',
      name: 'Bruno Lira',
      role: 'Front end developer'
    },
    publishedAt: new Date('2022-06-08 11:43:22'),
    content: [
      {
        type: 'paragraph',
        content: 'Mussum Ipsum, cacilds vidis litro abertis.', 
      },
      {
        type: 'paragraph',
        content: 'Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.'
      },
      {
        type: 'paragraph',
        content: 'Interagi no mé, cursus quis, vehicula ac nisi. Paisis, filhis, espiritis santis. Aenean aliquam molestie leo, vitae iaculis nisl.'
      },
      {
        type: 'link',
        address: 'https://jane.design/doctorcare',
        text: 'jane.design/doctorcare'
      }
    ],
    tags: [
      'newproject',
      'nlw',
      'ignite',
    ],
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'Developer'
    },
    publishedAt: new Date('2022-06-08 15:15:15'),
    content: [
      {
        type: 'paragraph',
        content: 'Mussum Ipsum, cacilds vidis litro abertis.', 
      },
      {
        type: 'paragraph',
        content: 'Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Copo furadis é disculpa de bebadis, arcu quam euismod magna.'
      },
      {
        type: 'paragraph',
        content: 'Interagi no mé, cursus quis, vehicula ac nisi. Paisis, filhis, espiritis santis. Aenean aliquam molestie leo, vitae iaculis nisl.'
      },
      {
        type: 'link',
        address: 'https://github.com/reziak',
        text: 'Perfil github'
      }
    ],
    tags: [
      'newprofile',
      'ignite',
    ],
  },
  {
    id: 3,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator'
    },
    publishedAt: new Date('2022-06-09 09:30:15'),
    content: [
      {
        type: 'paragraph',
        content: 'Suco de cevadiss deixa as pessoas mais interessantis.', 
      },
      {
        type: 'paragraph',
        content: 'Quem manda na minha terra sou euzis! Quem num gosta di mim que vai caçá sua turmis! Aenean aliquam molestie leo, vitae iaculis nisl.'
      },
      {
        type: 'paragraph',
        content: 'Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Viva Forevis aptent taciti sociosqu ad litora torquent. A ordem dos tratores não altera o pão duris. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.'
      },
      {
        type: 'link',
        address: 'https://github.com/reziak',
        text: 'Perfil github'
      }
    ],
    tags: [
      'newproject',
      'newprofile',
    ],
  },
]

export const App = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => (
            <Post 
              key={post.id}
              author={post.author}
              publishedAt={post.publishedAt}
              content={post.content}
              tags={post.tags}
            />
          ))}
        </main>
      </div>
    </>
  )
}
