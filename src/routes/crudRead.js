export default function (rapidManager) {
    return {
      type: "get",
      path: "/files/:id",
      auth: true,
      minRequiredRank: 0,
      callback: async (req, res) => {
        await rapidManager.publishAndSubscribe("read-file", "read-file-response", res.locals.sessionID, {
          fileId: req.params.id,
          userId: res.locals.userId,
          filetype: req.body.filetype
        }, resp => {
          res.send(resp);
        }, res.locals.userId);
      }
    };
  };

