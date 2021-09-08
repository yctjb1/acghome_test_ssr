// 用户自定义 store，用法查看文档 http://doc.ssr-fc.com/docs/features$communication#React%20%E5%9C%BA%E6%99%AF
import { state as layoutState, reducer as layoutReducer } from "./layout";

const state = {
  ...layoutState
}

function reducer (state: any, action: any) {
  switch (action.payload?.contextName) {
      case "layout":
          return layoutReducer(state, action);
  }
}

export {
  state,
  reducer
}
