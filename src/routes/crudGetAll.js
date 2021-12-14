export default function (rapidManager) {
    return {
      type: "get",
      path: "/files/all/:type",
      auth: false,
      minRequiredRank: 0,
      callback: async (req, res) => {
        await rapidManager.publishAndSubscribe("get-all-files", "get-all-files-response", res.locals.sessionID, {
          userId: res.locals.userId,
          filetype: req.params.type
        }, resp => {
          res.send(resp);
        }, res.locals.userId);
      }
    };
  };

