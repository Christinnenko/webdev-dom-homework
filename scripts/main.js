"use strict";

import { getFetchAndRender } from './api.js';

// рендер имеющихся на сервере комментариев 
export let comments = [];
export const setComments = (newComments) => {
    comments = newComments;
}

getFetchAndRender();

