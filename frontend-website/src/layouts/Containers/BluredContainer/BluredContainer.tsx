import React from 'react'
import styles from './BluredContainer.module.scss'
import Head from 'next/head'
import MenuBar from '@/components/menu-bar/MenuBar'
import Sticky from 'react-stickynode'
import Header from '@/components/Header/Header'
import BackgroundLayout from '../BackgroundLayout/BackgroundLayout'
interface PageLayoutProps {
  children?: React.ReactNode
}

const BluredContainer: React.FC<PageLayoutProps> = ({
  children,
}) => {
  return (
    <div className={styles['out__container']}>
      {children}
    </div>

  )
}

export default BluredContainer