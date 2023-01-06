import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { homelink, link } from '../data/linkdata'
import home from '../styles/home.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={home.content}>
      <Head>
        <title>ProjectTodo</title>
        <meta name="description" content="共同開発のTODOアプリです" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>TODO</h1>
      <ul className={home.ul}>
        {homelink.map((item:link,index:number)=>(
          <li key={index} className={home.li}>
            <Link href={item.link} target={item.target} className={home.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
