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
        if (resp && resp.token) {
          ret.accessToken = resp.token;
          ret.error = false;
          ret.session = resp.session;
        }

        res.send(ret);
      });
    }
  };
};
