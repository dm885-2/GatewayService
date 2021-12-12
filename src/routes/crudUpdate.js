export default function (rapidManager) {
    return {
      type: "put",
      path: "/files/:id",
      auth: false,
      callback: async (req, res) => {
        await rapidManager.publishAndSubscribe("update-file", "update-file-response", res.locals.sessionID, {
          fileId: req.params.id,
          data: req.body.data
        }, resp => {
          res.send(resp);
        }, res.locals.userId);
      }
    };
  };
  
