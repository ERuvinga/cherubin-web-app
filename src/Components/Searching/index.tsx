// react and Libs
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { filterKeysWordForSearching } from '@/Lib/Searching';

// recoil
import { useRecoilState, useSetRecoilState } from 'recoil';

//atoms and selectors
import {
  RefreshDatasState,
  SearchDatas,
  keysWordsforSearching,
} from '@/state/SearchingDatas';
import { PlatformInfo } from '@/state/user';

const SearchField = () => {
  //states
  const [RefreshDatas, setRefreshDatas] = useRecoilState(RefreshDatasState);
  const [SetupSearchingPage, setSetupSearchingPage] =
    useRecoilState(SearchDatas);
  const setWordsOfSearching = useSetRecoilState(keysWordsforSearching);
  const [textInSearchField, setTextInSearchField] = useState('');
  const [legnthString, setlegnthString] = useState(0);
  const [platformInfos, setPlatformInfos] = useRecoilState(PlatformInfo);

  const searchRefresh = () => {
    if (filterKeysWordForSearching(textInSearchField, setWordsOfSearching)) {
      setRefreshDatas(!RefreshDatas);

      //if searching page is a default view
      if (!SetupSearchingPage) {
        // change it and view Results
        setSetupSearchingPage(true);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const catchTypingDatas = (env: any) => {
    setTextInSearchField(env.target.value);
  };

  const ActivateFetching = () => {
    if (textInSearchField.length >= legnthString) {
      if (textInSearchField.length - legnthString > 6) {
        setlegnthString(textInSearchField.length);

        if (
          filterKeysWordForSearching(textInSearchField, setWordsOfSearching)
        ) {
          // checking if keys words is valids
          setRefreshDatas(!RefreshDatas);

          //if searching page is a default view
          if (!SetupSearchingPage) {
            // change it and view Results
            setSetupSearchingPage(true);
          }
        }
      }
    } else {
      if (legnthString - textInSearchField.length > 6) {
        setlegnthString(textInSearchField.length);

        if (
          filterKeysWordForSearching(textInSearchField, setWordsOfSearching)
        ) {
          // checking if keys words is valids

          setRefreshDatas(!RefreshDatas);

          //if searching page is a default view
          if (!SetupSearchingPage) {
            // change it and view Results
            setSetupSearchingPage(true);
          }
        }
      }
    }
  };

  useEffect(() => {
    ActivateFetching(); // cheking length of keys word of searching
  }, [textInSearchField]);

  useEffect(() => {
    setPlatformInfos(navigator.userAgent);
  }, []);

  return (
    <section className="FieldContainer">
      <input
        type="text"
        placeholder="Tapez ..."
        className={
          platformInfos.match(/iPhone/)
            ? 'AppleAdjust SeachingField'
            : 'SeachingField'
        }
        onChange={() => catchTypingDatas(event)}
      />
      <button onClick={searchRefresh}>
        <ArrowPathIcon className="icone" />
      </button>
    </section>
  );
};
export default SearchField;
