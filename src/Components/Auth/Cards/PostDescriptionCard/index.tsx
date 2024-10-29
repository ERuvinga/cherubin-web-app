//const, styles and Types
import Style from '@/Components/Auth/Cards/PostDescriptionCard/DescriptionCard.module.css';

interface CardDatas {
  content: string;
}

const DescriptionPosts = (datas: CardDatas) => {
  return (
    <div className={Style.Description}>
      <span>{datas.content}</span>
    </div>
  );
};

export default DescriptionPosts;
