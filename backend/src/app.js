import dva from 'dva';
const createBrowserHistory = require("history").createBrowserHistory;

export const app = dva({
    history: createBrowserHistory(),
});