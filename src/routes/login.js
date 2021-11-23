export default function (rapidManager) {
  return {
    type: 'post',
    path: '/auth/login',
    auth: false,
    callback: async (req, res) => {
      let ret = {
        error: true,
      };
      rapidManager.publishAndSubscribe('signIn', 'signIn-response', res.locals.sessionID, {
        username: req.body.username ?? '',
        password: req.body.password ?? '',
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
