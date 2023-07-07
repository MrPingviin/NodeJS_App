import createArticle from './createArticle.js';
import createToken from './createToken.js';
import getArticle from './getArticle.js';
import tokenChecker from './tokenChecker.js';
import useToken from './useToken.js';
import lengthChecker from './lengthChecker.js';
import platformValidator from './platformValidator.js';
import resetRemaining from './resetRemaining.js';
import getList from './getList.js';

const Controller = {
    createArticle: createArticle,
    createToken: createToken,
    getArticle: getArticle,
    tokenChecker: tokenChecker,
    useToken: useToken,
    lengthChecker: lengthChecker,
    platformValidator: platformValidator,
    resetRemaining: resetRemaining,
    getList: getList
}

export default Controller;