const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

  const parseHrtimeToSeconds = (hrtime) => (hrtime[0] + hrtime[1] / 1e9).toFixed(3);

  const handleAsync = (asyncFn) => async (req, res) => {
    const StartTime = process.hrtime();
    
  
    try {
      const result = await asyncFn(req);
      return resSuccess({
        data: result,res
      });
    } catch (err) {
      return resError({err,res,req, stackTrace : err.stack.split('\n')[1],
        timeTaken: parseHrtimeToSeconds(process.hrtime(StartTime)),
        route: req.url,
        statusCode: 200
      });
    }
  };



const resSuccess = async (resSuccessBody) => {
  let { data,res } = resSuccessBody;
  data.success = true;
  return res.json(data);
};


const resError = (resErrorBody) => {
  let { err, stackTrace, req, res, statusCode = 200, timeTaken } = resErrorBody;

  if (err.statusCode) statusCode = err.statusCode % 1000; // 3 digit status Code;

  res.status(statusCode);

  res.setHeader('Content-Type', 'application/json');

  let message = err && err.message ? err.message : 'Something went wrong';

  if (typeof err == 'string') message = err;
  // restrict stackTrace with IP
  let response = { success: false, error: message, stackTrace: stackTrace };
  // logError(err, req, stackTrace, timeTaken, route,response,errorList[stackTrace]);
  return res.send(JSON.stringify(response));
};



  
module.exports = handleAsync;