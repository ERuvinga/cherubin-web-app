//Style
import Style from '@/Components/Auth/TypeContentButton/TypeBtn.module.css';

interface datasOfLine {
  label: string;
  value: string;
  action: () => void;
  Selected: string;
}
const BtnTypePost = (datas: datasOfLine) => {
  const isSelected = datas.value == datas.Selected;

  return (
    <button
      onClick={datas.action}
      className={`${Style.ContainerBtn} ${isSelected ? Style.SelectedBtn : Style.UnselectedBtn}`}
    >
      <span className={`${Style.Content}`}>{datas.label}</span>
    </button>
  );
};
export default BtnTypePost;
