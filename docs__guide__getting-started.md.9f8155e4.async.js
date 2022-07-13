(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"M/Q6":function(e,n,t){"use strict";var a=t("q1tI"),r=t.n(a);t("x8cr");function c(){return c=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},c.apply(this,arguments)}n["a"]=function(e){return r.a.createElement("div",c({className:"__dumi-default-alert"},e))}},oJYU:function(e,n,t){"use strict";t.r(n);var a=t("q1tI"),r=t.n(a),c=t("dEAq"),o=t("M/Q6"),s=t("H1Ra"),l=r.a.memo((e=>{e.demos;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"markdown"},r.a.createElement("h1",{id:"\u5feb\u901f\u4e0a\u624b"},r.a.createElement(c["AnchorLink"],{to:"#\u5feb\u901f\u4e0a\u624b","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:"icon icon-link"})),"\u5feb\u901f\u4e0a\u624b"),r.a.createElement("p",null,r.a.createElement(o["a"],null,"Tips: \u8bf7\u786e\u4fdd\u4f60\u7684 React \u7248\u672c >= ",r.a.createElement("strong",null,"16.8.0"))),r.a.createElement("h2",{id:"\u5b89\u88c5"},r.a.createElement(c["AnchorLink"],{to:"#\u5b89\u88c5","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:"icon icon-link"})),"\u5b89\u88c5"),r.a.createElement(s["a"],{code:"// \u4f7f\u7528 npm\n$ npm i dobux --save\n\n// \u4f7f\u7528 yarn\n$ yarn add dobux",lang:"bash"}),r.a.createElement("h2",{id:"\u57fa\u672c\u4f7f\u7528"},r.a.createElement(c["AnchorLink"],{to:"#\u57fa\u672c\u4f7f\u7528","aria-hidden":"true",tabIndex:-1},r.a.createElement("span",{className:"icon icon-link"})),"\u57fa\u672c\u4f7f\u7528"),r.a.createElement(s["a"],{code:"import { createModel, createStore } from 'dobux'\n\n// 1. \u521b\u5efa Model\nexport const counter = createModel()({\n  state: {\n    count: 0,\n  },\n  reducers: {\n    increase(state) {\n      state.count += 1\n    },\n    decrease(state) {\n      state.count -= 1\n    },\n  },\n  effects: (model, rootModel) => ({\n    async increaseAsync() {\n      await wait(2000)\n      model.reducers.increase()\n    },\n  }),\n})\n\n// 2. \u521b\u5efa Store\nconst store = createStore({\n  counter,\n})\n\n// 3. \u6302\u8f7d\u6a21\u578b\nconst { Provider, useModel } = store\n\nfunction App() {\n  return (\n    <Provider>\n      <Counter />\n    </Provider>\n  )\n}\n\n// 4. \u6d88\u8d39\u6a21\u578b\nfunction Counter() {\n  const { state, reducers, effects } = useModel('counter')\n\n  const handelIncrease = () => {\n    reducers.increase()\n  }\n\n  const handelDecrease = () => {\n    reducers.decrease()\n  }\n\n  const handelIncreaseAsync = () => {\n    effects.increaseAsync()\n  }\n\n  // \u5f53\u5f02\u6b65\u8bf7\u6c42 `increaseAsync` \u6267\u884c\u65f6 `loading` \u4f1a\u8bbe\u7f6e\u4e3a true\uff0c\u663e\u793a loading\n  if (effects.increaseAsync.loading) {\n    return <p className=\"loading\">loading ...</p>\n  }\n\n  return (\n    <div>\n      <div>The count is\uff1a{state.count}</div>\n      <button onClick={handelIncrease}>+</button>\n      <button onClick={handelDecrease}>-</button>\n      <button onClick={handelIncreaseAsync}>async</button>\n    </div>\n  )\n}",lang:"jsx"}),r.a.createElement("p",null,r.a.createElement(c["AnchorLink"],{to:"/guide/examples#%E7%AE%80%E5%8D%95%E7%9A%84%E8%AE%A1%E6%95%B0%E5%99%A8"},"\u70b9\u51fb\u67e5\u770b Typescript \u793a\u4f8b"))))}));n["default"]=e=>{var n=r.a.useContext(c["context"]),t=n.demos;return r.a.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&c["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),r.a.createElement(l,{demos:t})}},x8cr:function(e,n,t){}}]);