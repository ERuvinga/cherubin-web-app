// file content states for Searching page
import { atom, selector } from 'recoil';

const Hastags = atom({
  key: 'Hastags',
  default: ['#Politique', '#Sport', '#Music', '#Santé', '#Guerre'],
});

const HastagSelected = atom({
  // Tab content Tags selected on tags filter
  key: 'HastagSelected',
  default: [''],
});

const keysWordsforSearching = atom({
  // content key words used in searching datas
  key: 'keysWordsforSearching',
  default: [],
});

const DatesFilterSearching = atom({
  // content Selection option of Dates filter
  key: 'DatesFilterSearching',
  default: 'all',
});

// state manager App
const LoadingState = atom({
  // state of loading Component
  key: 'LoadingState',
  default: false,
});

const RefreshDatasState = atom({
  // Refresh button State
  key: 'RefreshDatasState',
  default: false,
});

const SearchDatas = atom({
  // Searching page result display
  key: 'SearchDatas',
  default: false,
});

// Results of Searching (atoms and )

const ResultsOfSearching = atom({
  key: 'ResultsOfSearching',
  default: [],
});

const TagsDisplay = selector({
  // tags tout selected
  key: 'TagsDisplay',
  get: ({ get }) => {
    //const TimeFilter = get(DatesFilterSearching);
    const tagsFilters = get(HastagSelected);
    if (tagsFilters.length < 1 || tagsFilters[0] === '') {
      return true;
    } else {
      return false;
    }
  },
});

const DisplayMobilesFilters = atom({
  key: 'DisplayMobilesFilters',
  default: false,
});

const DisplayMobilesMenu = atom({
  key: 'DisplayMobilesMenu',
  default: false,
});

const DataFilteredByTagsAndDay = selector({
  key: 'DataFilteredByTagsAndDay',
  get: ({ get }) => {
    //const TimeFilter = get(DatesFilterSearching);
    const tagsFilters = get(HastagSelected);
    const TabOfPubs = get(ResultsOfSearching);
    const AllTags = get(TagsDisplay);

    const dataFiltered: object[] = [];
    const tabOfIndexAdded: number[] = [];
    // if tabOfTags is void return all datas

    if (TabOfPubs.length) {
      if (AllTags) {
        return TabOfPubs;
      } else {
        tagsFilters.some((element) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          TabOfPubs.map((value: any, index) => {
            if (!tabOfIndexAdded.includes(index)) {
              if (value.tags.includes(element)) {
                dataFiltered.push(value);
                tabOfIndexAdded.push(index);
              }
            }
          });
        });
      }

      // sort() datas by score
      dataFiltered.sort(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (first: any, second: any) => second.score - first.score
      );
      return dataFiltered;
    } else {
      return null;
    }
  },
});

export {
  Hastags,
  HastagSelected,
  RefreshDatasState,
  SearchDatas,
  keysWordsforSearching,
  DatesFilterSearching,
  DisplayMobilesFilters,
  LoadingState,
  ResultsOfSearching,
  DataFilteredByTagsAndDay,
  TagsDisplay,
  DisplayMobilesMenu,
};
