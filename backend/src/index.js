import dva from 'dva';
import App from '@/containers/App';
import login from '@/store/login';

const createBrowserHistory = require("history").createBrowserHistory;
const app = dva({
    history: createBrowserHistory(),
});

app.model(login)
app.router(App);
app.start('#root');