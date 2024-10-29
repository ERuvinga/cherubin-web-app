import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ReactQueryProvider from '@/utils/ReactQueryProvider';

//Recoil
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ReactQueryProvider>
        <Component {...pageProps} />
      </ReactQueryProvider>
    </RecoilRoot>
  );
}
