//const, styles and Types
import Style from '@/Components/Auth/Cards/CreateUserCards/CreateUserCard.module.css';
import Image from 'next/image';

interface CardDatas {
  illustration: string;
  title: string;
  description: string;
  OnClickFunction: () => void;
}

const CreateUserCard = (datas: CardDatas) => {
  return (
    <div onClick={datas.OnClickFunction} className={`${Style.ContainerCard}`}>
      <div className={`${Style.ContainerIllustration}`}>
        <Image
          width={500}
          height={500}
          alt="Illustratiion"
          src={datas.illustration}
          placeholder="blur"
          blurDataURL="/Wshimer.svg"
          className={`${Style.Illustrationimage}`}
        />
      </div>

      <h1 className={`${Style.Title}`}>{datas.title}</h1>
      <p className={`${Style.description}`}>{datas.description}</p>
    </div>
  );
};

export default CreateUserCard;
