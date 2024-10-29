import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ScaleIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/solid';

//Types
import { IconeTypes as Icone } from '@/Constants/Type';

interface datasInCard {
  NameTool: string;
  DescriptionTool: string;
  Icone: string;
  linkToTool: string;
}
const ActionsCard = (datas: datasInCard) => {
  const SelectIcone = (IconeValue: string) => {
    switch (IconeValue) {
      case Icone.FORUM:
        return (
          <ChatBubbleLeftRightIcon color="#64748b" width={45} height={45} />
        );

      case Icone.DEBATS:
        return <UserGroupIcon color="#64748b" width={45} height={45} />;

      case Icone.POLLS:
        return <ScaleIcon color="#64748b" width={45} height={45} />;

      case Icone.MEETINGS:
        return <MegaphoneIcon color="#64748b" width={45} height={45} />;
    }
  };

  return (
    <div className="ToolCard">
      <div className="pictureContainer">{SelectIcone(datas.Icone)}</div>
      <div className="MoreTool">
        <span className="ToolName">{datas.NameTool}</span>
        <span className="ToolDescription">{datas.DescriptionTool}</span>
      </div>
    </div>
  );
};

export default ActionsCard;
