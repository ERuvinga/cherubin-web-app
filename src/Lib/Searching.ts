// function manager searching

export const filterKeysWordForSearching = (
  stringKeysWord: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setkeysWordsTab: any
) => {
  let AllkeysWordTabs;
  const SelectedKeysWords: string[] = [];

  if (stringKeysWord.length < 2) {
    return false;
  } else {
    AllkeysWordTabs = stringKeysWord.split(' ');

    // filter keywords and saved keys selected
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AllkeysWordTabs.map((value: any) => {
      if (value.length > 3) {
        SelectedKeysWords.push(value.toLowerCase());
      }
    });

    setkeysWordsTab([...SelectedKeysWords]);
    return true;
  }
};
