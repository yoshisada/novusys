import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './Header.module.scss'
import ButtonOutline from '../Buttons/ButtonOutline/ButtonOutline'
import DarkMode from '@material-design-icons/svg/outlined/dark_mode.svg'



export default function Header() {
  return (
    <div className={styles['out__container']}>
      <div className={styles['left__container']}>
        <div className={styles['logo__container']}>
          <img src='./logos/novusys-logo.png' />
        </div>
        <div className={styles['pages__container']}>
          <div>
            About
          </div>
          <div>
            Docs
          </div>
        </div>
      </div>
      <div className={styles['middle__container']}>
        <div>
          Tip The Project
        </div>
      </div>
      <div className={styles['right__container']}>
        <div>
          Login
        </div>
        <div className={styles['signup__container']}>
          <ButtonOutline text='SignUp' />
          <div className={styles['icon__container']}>
            <DarkMode viewBox="0 0 25 25" />
          </div>
        </div>

      </div>

    </div>
  )
}
