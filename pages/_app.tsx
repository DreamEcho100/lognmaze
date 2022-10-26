import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
// import { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { YMInitializer } from 'react-yandex-metrika';
// import LogRocket from 'logrocket';

import '@styles/colors.css'
import '@styles/globals.css'
import '@styles/customNProgressStyles.css'

import { UserContextSharedProvider } from '@store/UserContext'
import SEODefaults from '../next-seo.config'

import MainLayoutComponent from '@coreComponents/Layout/Main'
import ExtraScripts from '@coreComponents/_app/ExtraScripts'
const DynamicTopProgressBar = dynamic(
  () => import('@coreComponents/_app/ExtraScripts/TopProgressBar'),
  {
    ssr: false,
  },
)

function MyApp({ Component, pageProps }: AppProps) {
  const [isPlayingScripts, setIsPlayingScripts] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return

    setTimeout(() => {
      setIsPlayingScripts(true)
    }, 5000)
  }, [])

  return (
    <>
      <DefaultSeo {...SEODefaults} />
      <UserContextSharedProvider>
        <MainLayoutComponent>
          <DynamicTopProgressBar />
          <Component {...pageProps} />
        </MainLayoutComponent>
      </UserContextSharedProvider>
      {isPlayingScripts && <ExtraScripts />}
    </>
  )
}

export default MyApp
