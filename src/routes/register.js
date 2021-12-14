export default function (rapidManager) {
  return {
    type: "post",
    path: "/auth/register",
    auth: false,
    minRequiredRank: 0,
    callback: async (req, res) => {
      let ret = {
        error: true,
      };
      await rapidManager.publishAndSubscribe("signUp", "signUp-response", res.locals.sessionID, {
        username: req.body.username,
        password: req.body.password,
        passwordRepeat: req.body.passwordRepeat,
        rank: req.body.rank ?? 0
      }, resp => {
        if (resp) {
          ret.error = resp.error;
          ret.session = resp.session;
        }

        res.send(ret);
      }, res.locals.userId);
    }
  };
};
