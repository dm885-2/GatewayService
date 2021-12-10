export default function (rapidManager) {
    return {
      type: "get",
      path: "/files/getall",
      auth: false,
      callback: async (req, res) => {
        await rapidManager.publishAndSubscribe("get-all-files", "get-all-files-response", res.locals.sessionID, {
          userId: res.locals.userId,
          filetype: req.body.filetype
        }, resp => {
          res.send(resp);
        }, res.locals.userId);
      }
    };
  };
  