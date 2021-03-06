import { html } from "htm/react";
import { useRecoilValue } from "recoil";

import { teamListState, teamScoreState } from "./state.js";

export const Scores = () => {
  const teamList = useRecoilValue(teamListState);
  const scores = teamList.map((name) => {
    const score = useRecoilValue(teamScoreState(name));
    return html`<span class="score">${name}: $${score} </span>`;
  });
  return html`
    <div
      style=${{
        position: "absolute",
        bottom: 0,
        left: 0,
        fontSize: "2vw",
        color: "white",
        zIndex: 50,
      }}
    >
      ${scores}
    </div>
  `;
};
