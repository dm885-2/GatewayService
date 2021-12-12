export default function (rapidManager) {
  return {
    type: 'post',
    path: '/auth/accessToken',
    auth: false,
    callback: async (req, res) => {
      let ret = {
        error: true,
      };
      await rapidManager.publishAndSubscribe('accessToken', 'accessToken-response', res.locals.sessionID, {
        token: req.body.refreshToken ?? ''
      }, resp => {
        if (resp && resp.refreshToken) {
          ret.accessToken = resp.refreshToken;
          ret.error = false;
        }

        res.send(ret);
      }, res.locals.userId);
    }
  };
};
