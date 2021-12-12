export default function (rapidManager) {
    return {
      type: "delete",
      path: "/files",
      auth: false,
      callback: async (req, res) => {
        await rapidManager.publishAndSubscribe("delete-file", "delete-file-response", res.locals.sessionID, {
          filename: req.body.filename,
          userId: res.locals.userId,
          filetype: req.body.filetype
        }, resp => {
          res.send(resp);
        }, res.locals.userId);
      }
    };
  };
  
