export default function (rapidManager) {
    return {
      type: "post",
      path: "/files",
      auth: false,
      callback: async (req, res) => {
        await rapidManager.publishAndSubscribe("create-file", "create-file-response", res.locals.sessionID, {
          filename: req.body.filename,
          data: req.body.data,
          userId: res.locals.userId,
          filetype: req.body.filetype
        }, resp => {
          res.send(resp);
        }, res.locals.userId);
      }
    };
  };
  
