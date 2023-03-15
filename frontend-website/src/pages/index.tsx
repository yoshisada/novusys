import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import LandingBanner from '@/components/index/LandingBanner/LandingBanner'
import BasicContainer from '@/layouts/Containers/BasicContainer/BasicContainer'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'
import Features from '@/components/index/Features/Features'
import BluredContainer from '@/layouts/Containers/BluredContainer/BluredContainer'
import Description from '@/components/index/Description/Description'
import LargeGap from '@/components/gaps/large/LargeGap'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Novusys Smart Wallets</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <LandingBanner />
        <Features />
        <LargeGap/>
        <Description/>
        

      </PageLayout>

    </>
  )
}
