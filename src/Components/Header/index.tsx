import Head from 'next/head';

interface datasPage {
  title: string;
  description: string;
}
const HeadDatas = (datas: datasPage) => {
  return (
    <Head>
      <title>{datas.title}</title>
      <meta name="description" content={datas.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

export default HeadDatas;
