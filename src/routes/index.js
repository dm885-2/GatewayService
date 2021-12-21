import wildcard from './wildcard.js';
import login from './login.js';
import setSolverLimit from './setSolverLimit.js';
import userQueueClear from './userQueueClear.js';
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
import jobHistoryGetOutput from './jobHistoryGetOutput.js';
import jobHistoryRemove from './jobHistoryRemove.js';
import jobHistoryAdd from './jobHistoryAdd.js';
import logsGet from './logsGet.js';
import usersGet from './usersGet.js';
import userDelete from './userDelete.js';

export default function (rapidManager) {
  return [
    wildcard(rapidManager),
    userQueueClear(rapidManager),
    setSolverLimit(rapidManager),
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
    jobHistoryRemove(rapidManager),
    jobHistoryGetOutput(rapidManager),
    jobHistoryGet(rapidManager),
    logsGet(rapidManager),
    usersGet(rapidManager),
    userDelete(rapidManager),

  ];
};
