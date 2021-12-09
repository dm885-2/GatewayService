import wildcard from './wildcard.js';
import login from './login.js';
import register from './register.js';
import accessToken from './accessToken.js';
import getSolvers from './getSolvers.js';

export default function (rapidManager) {
  return [
    wildcard(rapidManager),
    login(rapidManager),
    register(rapidManager),
    accessToken(rapidManager),
    getSolvers(rapidManager)
  ];
};
