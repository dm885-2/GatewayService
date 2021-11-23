import wildcard from './wildcard.js';
import login from './login.js';
import register from './register.js';

export default function (rapidManager) {
  return [
    wildcard(rapidManager),
    login(rapidManager),
    register(rapidManager)
  ];
};
