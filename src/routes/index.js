import wildcard from './wildcard.js';
import login from './login.js';
import register from './register.js';
import accessToken from './accessToken.js';
import getSolvers from './getSolvers.js';
import postSolvers from './postSolvers.js';
import deleteSolver from './deleteSolver.js';
import putSolver from './putSolver.js';
import crudCreate from './crudCreate.js';
import crudRead from './crudRead.js';
import crudUpdate from './crudUpdate.js';
import crudDelete from './crudDelete.js';
import crudGetAll from './crudGetAll.js';
import jobHistoryGet from './jobHistoryGet.js';
import jobHistoryAdd from './jobHistoryAdd.js';
import logsGet from './logsGet.js';
import userGet from './userGet.js';

export default function (rapidManager) {
  return [
    wildcard(rapidManager),
    login(rapidManager),
    register(rapidManager),
    accessToken(rapidManager),
    getSolvers(rapidManager),
    postSolvers(rapidManager),
    deleteSolver(rapidManager),
    putSolver(rapidManager),
    crudCreate(rapidManager),
    crudRead(rapidManager),
    crudUpdate(rapidManager),
    crudDelete(rapidManager),
    crudGetAll(rapidManager),
    jobHistoryAdd(rapidManager),
    jobHistoryGet(rapidManager),
    logsGet(rapidManager),
    userGet(rapidManager),
  ];
};
