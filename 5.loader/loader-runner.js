const fs = require("fs");

/**
 * 把loader转成loader对象
 * @param {*} loader loader的绝对路径
 */
function createLoaderObject(loader) {
  let normal = require(loader);
  let pitch = normal.pitch;
  let raw = normal.raw; //决定loader的参数是字符串还是Buffer
  return {
    path: loader, // loader的绝对路径
    normal: null, // loader的normal函数
    pitch,
    raw, // 是否要转成Buffer
    data: {}, //每个loader都可以携带一个自定义data对象
    pitchExecuted: false, // 此loader的pitch方法是否已经执行过
    normalExecuted: false, // 此loader的normal方法是否已经执行过
  };
}

function convertArgs(args, raw) {
  if (raw && !Buffer.isBuffer(args[0])) {
    args[0] = Buffer.from(args[0]);
  } else if (!raw && Buffer.isBuffer(args[0])) {
    args[0] = args[0].toString("utf8");
  }
}

function iterateNormalLoaders(
  processOptions,
  loaderContext,
  args,
  pitchingCallback
) {
  if (loaderContext.loaderIndex < 0) {
    return pitchingCallback(null, args);
  }
  console.log("+++index", loaderContext.loaderIndex);
  let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
  if (currentLoader.normalExecuted) {
    loaderContext.loaderIndex--;
    return iterateNormalLoaders(
      processOptions,
      loaderContext,
      args,
      pitchingCallback
    );
  }
  console.log("currentLoader", currentLoader);
  let fn = currentLoader.normal;
  currentLoader.normalExecuted = true;
  convertArgs(args, currentLoader.raw);
  runSyncOrAsync(fn, loaderContext, args, (err, ...returnArgs) => {
    if (err) return pitchingCallback(err);
    return iterateNormalLoaders(
      processOptions,
      loaderContext,
      returnArgs,
      pitchingCallback
    );
  });
}

function processResource(processOptions, loaderContext, pitchingCallback) {
  processOptions.readResource(loaderContext.resource, (err, resourceBuffer) => {
    processOptions.resourceBuffer = resourceBuffer;
    loaderContext.loaderIndex--; //定位到最后一个loader
    iterateNormalLoaders(
      processOptions,
      loaderContext,
      [resourceBuffer],
      pitchingCallback
    );
  });
}

function iteratePitchingLoaders(
  processOptions,
  loaderContext,
  pitchingCallback
) {
  //说所有的loader的pitch都已经执行完成
  if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
    return processResource(processOptions, loaderContext, pitchingCallback);
  }
  let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
  if (currentLoader.pitchExecuted) {
    loaderContext.loaderIndex++; //如果当前的pitch已经执行过了，就可以让当前的索引加1
    return iteratePitchingLoaders(
      processOptions,
      loaderContext,
      pitchingCallback
    );
  }
  let fn = currentLoader.pitch;
  currentLoader.pitchExecuted = true; //表示当前的loader的pitch已经处理过
  if (!fn) {
    return iteratePitchingLoaders(
      processOptions,
      loaderContext,
      pitchingCallback
    );
  }
  console.log("~~~~~~~~~~~~", fn);
  //以同步或者异步的方式执行fn
  runSyncOrAsync(
    fn,
    loaderContext,
    [
      loaderContext.remainingRequest,
      loaderContext.previousRequest,
      loaderContext.data,
    ],
    (err, ...args) => {
      console.log(000000000000000000000)
      //如果有返回值，索引减少1，并执行前一个loader的normal
      if (args.length > 0 && args.some((item) => item)) {
        loaderContext.loaderIndex--; //索引减少1
        iterateNormalLoaders(
          processOptions,
          loaderContext,
          args,
          pitchingCallback
        );
      } else {
        return iteratePitchingLoaders(
          processOptions,
          loaderContext,
          pitchingCallback
        );
      }
    }
  );
}

function runSyncOrAsync(fn, loaderContext, args, runCallback) {
  let isSync = true; //这个是个标志 符，用来标志fn的执行是同步还是异步，默认是同步
  loaderContext.callback = (...args) => {
    runCallback(null, ...args);
  };
  loaderContext.async = () => {
    isSync = false; //从同步改为异步
    return loaderContext.callback;
  };
  //在执行pitch方法的时候 ，this指向loaderContext
  console.log("++++");
  console.log(fn);
  let result = fn.apply(loaderContext, args);
  if (isSync) {
    //如果是同步的执行的话，会立刻向下执行下一个loader
    runCallback(null, result);
  } //如果是异步的话，那就什么都不要做
}

function runLoaders(options, finalCallback) {
  let {
    resource,
    loaders = [],
    context = {}, // loader函数执行时上下文对象
    readResource = fs.readFile,
  } = options; //src\index.js
  let loaderObjects = loaders.map(createLoaderObject);
  let loaderContext = context;
  loaderContext.resource = resource; //要加载的资源
  loaderContext.readResource = readResource; //读取资源的方法
  loaderContext.loaders = loaderObjects; //所有的loader对象
  loaderContext.loaderIndex = 0; //当前正在执行的loader索引
  loaderContext.callback = null; //回调
  loaderContext.async = null; //把loader的执行从同步变成异步

  //所有的loader加上resouce
  Object.defineProperty(loaderContext, "request", {
    get() {
      //loader1!loader2!loader3!index.js
      return loaderContext.loaders
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join("!");
    },
  });
  //从当前的loader下一个开始一直到结束 ，加上要加载的资源
  Object.defineProperty(loaderContext, "remainingRequest", {
    get() {
      //loader1!loader2!loader3!index.js
      return loaderContext.loaders
        .slice(loaderContext.loaderIndex + 1)
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join("!");
    },
  });
  //从当前的loader开始一直到结束 ，加上要加载的资源
  Object.defineProperty(loaderContext, "currentRequest", {
    get() {
      //loader1!loader2!loader3!index.js
      return loaderContext.loaders
        .slice(loaderContext.loaderIndex)
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join("!");
    },
  });
  //从第一个到当前的loader的前一个
  Object.defineProperty(loaderContext, "previousRequest", {
    get() {
      //loader1!loader2!loader3!index.js
      return loaderContext.loaders
        .slice(0, loaderContext.loaderIndex)
        .map((loader) => loader.path)
        .join("!");
    },
  });
  Object.defineProperty(loaderContext, "data", {
    get() {
      //loader1!loader2!loader3!index.js
      return loaderContext.loaders[loaderContext.loaderIndex].data;
    },
  });
  let processOptions = {
    resourceBuffer: null, //将要存放读到的原始文件的原始文件 index.js的内容 Buffer
    readResource,
  };
  iteratePitchingLoaders(processOptions, loaderContext, (err, result) => {
    finalCallback(err, {
      result,
      resourceBuffer: processOptions.resourceBuffer,
    });
  });
}

exports.runLoaders = runLoaders;
