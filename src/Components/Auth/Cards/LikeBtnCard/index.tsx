//const, styles and Types
import Style from '@/Components/Auth/Cards/LikeBtnCard/LikeBtnCard.module.css';
import { HandThumbUpIcon as OutlineLikeIcone } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as SolidLikeIcone } from '@heroicons/react/24/solid';

interface CardDatas {
  NumbersOfLikes: number;
  isLiked: boolean;
  smallVersion: boolean;
  OnClickFunction: () => void;
}

const LikeBtnCard = (datas: CardDatas) => {
  return (
    <span className={Style.LikeContainer} onClick={datas.OnClickFunction}>
      <>
        {datas.isLiked ? (
          <SolidLikeIcone
            color={'#00277f'}
            width={datas.smallVersion ? 20 : 30}
          />
        ) : (
          <OutlineLikeIcone
            color={'#00153d'}
            width={datas.smallVersion ? 20 : 30}
          />
        )}
      </>

      <>
        {datas.NumbersOfLikes > 0 && (
          <span
            className={
              datas.smallVersion ? Style.smallNumberLike : Style.NumberLike
            }
          >
            {datas.NumbersOfLikes}
          </span>
        )}
      </>
    </span>
  );
};

export default LikeBtnCard;
