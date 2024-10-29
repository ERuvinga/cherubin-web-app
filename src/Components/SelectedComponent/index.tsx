//Atoms an Recoil Functions
import { CompleteRegisterDataStore } from '@/state/SignInUpDatas';
import { useSetRecoilState } from 'recoil';

interface inputDatasDefinition {
  placehold: string;
  label: string;
  Options: { label: string; value: string }[];
  id: number;
}

const SelectInputField = (datas: inputDatasDefinition) => {
  // states & atoms
  const SetSelectedDatasOfUser = useSetRecoilState(CompleteRegisterDataStore);

  const selectedValueHandle = (NewValue: string) => {
    console.log(NewValue);
    switch (datas.id) {
      case 0: {
        SetSelectedDatasOfUser((lastValue) => ({
          ...lastValue,
          Province: NewValue,
        }));
        break;
      }
      case 1: {
        SetSelectedDatasOfUser((lastValue) => ({
          ...lastValue,
          Ville: NewValue,
        }));
        break;
      }
      case 2: {
        SetSelectedDatasOfUser((lastValue) => ({
          ...lastValue,
          Sexe: NewValue,
        }));
        break;
      }
      case 3: {
        SetSelectedDatasOfUser((lastValue) => ({
          ...lastValue,
          AccountType: NewValue,
        }));
        break;
      }
    }
  };

  return (
    <div className="FieldsContainer">
      <label className="InputLabel" htmlFor={datas.label}>
        {datas.label}
      </label>
      <div className="inputContainer border">
        <select
          defaultChecked
          id={datas.label}
          className=""
          placeholder={datas.placehold}
          onChange={(event) => {
            const CaptionValue = event.target.value;
            selectedValueHandle(CaptionValue);
          }}
        >
          {datas.Options.map((value, id) => (
            <option key={`${id}_${value.label}`} value={value.value}>
              {value.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default SelectInputField;
