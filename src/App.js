import { html } from "htm/react";
import { Helmet } from "react-helmet";
import { RecoilRoot, useRecoilState } from "recoil";
import { Button } from "@material-ui/core";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import { ThreeStrikes } from "./threestrikes/index.js";
import { Jeopardy } from "./jeopardy/index.js";

const GAMES = [
  [ThreeStrikes, "3 Strikes", "threestrikes"],
  [Jeopardy, "Jeopardy", "jeopardy"],
].map(([Component, name, subdir]) => ({ Component, name, subdir }));

const GameList = () => {
  const { url } = useRouteMatch();
  const list = GAMES.map(
    ({ name, subdir }) => html`
      <li key=${name}>
        <${Link} to="${url}/${subdir}">${name}<//>
      </li>
    `
  );
  return html`<ul style=${{ listStyleType: "none" }}>
    ${list}
  </ul>`;
};

export const App = () => {
  const path = "/gameshow";
  const gameRoutes = GAMES.map(
    ({ Component, name, subdir }) => html`
      <${Route} key=${subdir} path="${path}/${subdir}">
        <${Helmet}><title>${name}</title><//>
        <${Component} />
      <//>
    `
  );

  return html`
    <${Helmet}><title>HTML5 Gameshows!</title><//>
    <${Switch}>
      <${Route} exact path=${path}>
        <${GameList} />
      <//>
      ${gameRoutes}
      <${Route} path="*">
        <${Redirect} to="/gameshow" />
      <//>
    <//>
  `;
};
