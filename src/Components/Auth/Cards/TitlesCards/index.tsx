//const, styles and Types
import Style from '@/Components/Auth/Cards/TitlesCards/TitleCard.module.css';

interface CardDatas {
  content: string;
}

const TitlesPosts = (datas: CardDatas) => {
  return (
    <div className={Style.ContentTitle}>
      <span>{datas.content}</span>
    </div>
  );
};

export default TitlesPosts;
