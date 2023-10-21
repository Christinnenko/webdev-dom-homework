"use strict";

import { getFetchAndRender } from "./api.js";
import { showLoadingIndicator } from "./helpers.js";
import { addLoadingIndicator } from "../components/render-component.js";

// рендер имеющихся на сервере комментариев
export let comments = [];
export const setComments = (newComments) => {
  comments = newComments;
};

addLoadingIndicator();
showLoadingIndicator();
getFetchAndRender(localStorage.token);
