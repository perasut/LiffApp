import { useEffect } from 'react';
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

function MyApp({ Component, pageProps }) {
  useEffect(async () => {
    const liff = (await import('@line/liff')).default
    try {
      await liff.init({ liffId });
    } catch (error) {
      console.error('liff init error', error.message)
    }
    if (!liff.isLoggedIn()) {
      liff.login({
        scope: 'profile,profile%20openid,profile%20openid%20email,openid,openid%20email',
        prompt: 'consent'
      });
    }
  })

  return <Component {...pageProps} />
}

export default MyApp
