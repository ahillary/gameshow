import { atom, atomFamily, selector, selectorFamily } from "recoil";

// import localTestConfig from "./playtestConfig.json";
import localTestConfig from "./testConfig.json";

export const configState = atom({
  key: "config",
  default: selector({
    key: "configDefault",
    get: async () => {
      const configUrl = window?.hashData?.configUrl;
      return configUrl ? (await fetch(configUrl)).json() : localTestConfig;
    },
  }),
});

export const showingPopupState = atom({
  key: "showingPopup",
  default: false,
});

export const baseClueValueState = atom({
  key: "baseClueValue",
  default: selector({
    key: "baseClueValueDefault",
    get: ({ get }) => get(configState).baseClueValue,
  }),
});

export const gameStageState = atom({
  key: "gameStage",
  default: "jeopardy",
});

export const stageInfoState = atom({
  key: "stageInfo",
  default: selector({
    key: "stageInfoDefault",
    get: ({ get }) => get(configState)[get(gameStageState)],
  }),
});

export const boardDataState = atom({
  key: "boardData",
  default: selector({
    key: "boardDataDefault",
    get: ({ get }) => get(stageInfoState).board,
  }),
});

export const categoryCountValue = selector({
  key: "categoryCount",
  get: ({ get }) => get(boardDataState).length,
});

export const cluesPerCategoryValue = selector({
  key: "cluesPerCategory",
  get: ({ get }) => get(boardDataState)[0].clues.length,
});

export const categoriesState = atomFamily({
  key: "categories",
  default: selectorFamily({
    key: "categoriesDefault",
    get: (col) => ({ get }) => get(boardDataState)[col].category,
  }),
});

export const clueInfoState = atomFamily({
  key: "clueInfo",
  default: selectorFamily({
    key: "clueInfoDefault",
    get: ([col, row]) => ({ get }) => get(boardDataState)[col].clues[row - 1],
  }),
});

export const clueStatusState = atomFamily({
  key: "clueStatus",
  default: ([col, row]) => ({
    flipped: false,
    used: false,
  }),
});

export const selectedClueState = atom({ key: "selectedClue" });

export const selectedClueDataValue = selector({
  key: "selectedClueData",
  get: ({ get }) => {
    const selectedClue = get(selectedClueState);
    if (!selectedClue) return null;
    const baseClueValue = get(baseClueValueState);
    const { row, col } = selectedClue;
    return {
      ...selectedClue,
      ...get(clueInfoState([col, row])),
      value: baseClueValue * row,
      ...get(clueStatusState([col, row])),
      selected: true,
    };
  },
  set: (p) => ({ set }, { used }) =>
    set(clueStatusState(p), (x) => ({ ...x, used })),
});

export const teamListState = atom({
  key: "teamList",
  default: ["Red", "Green", "Blue"],
});

export const selectedTeamState = atom({ key: "selectedTeam" });

export const teamScoreState = atomFamily({
  key: "teamScore",
  default: (name) => 0,
});
