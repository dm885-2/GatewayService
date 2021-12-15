export default function (rapidManager) {
    return {
      type: "delete",
      path: "/files/:id",
      auth: true,
      minRequiredRank: 0,
      callback: async (req, res) => {
        await rapidManager.publishAndSubscribe("delete-file", "delete-file-response", res.locals.sessionID, {
          fileId: req.params.id
        }, resp => {
          res.send(resp);
        }, res.locals.userId);
      }
    };
  };

