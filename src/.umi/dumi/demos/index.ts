// @ts-nocheck
import React from 'react'
import { dynamic } from 'dumi'

export default {
  'docs-counter': {
    component: React.memo(function DumiDemo() {
      var _interopRequireDefault = require('/Users/ender/learning/github/dobux/node_modules/@babel/runtime/helpers/interopRequireDefault')

      var _react = _interopRequireDefault(require('react'))

      var _index = _interopRequireDefault(
        require('/Users/ender/learning/github/dobux/docs/demos/counter/index.tsx')
      )

      var _default = function _default() {
        return /*#__PURE__*/ _react['default'].createElement(_index['default'], null)
      }

      return _react['default'].createElement(_default)
    }),
    previewerProps: {
      sources: {
        _: {
          tsx:
            "import React from 'react'\nimport { createStore, Models } from 'dobux'\nimport * as models from './model'\n\nimport './index.less'\n\nexport type RootModel = Models<typeof models>\n\n// 创建 store 实例\nconst { withProvider, useModel } = createStore(models)\n\nconst Counter: React.FC = () => {\n  const { state, reducers, effects } = useModel('counter')\n\n  const handleIncrease = () => {\n    reducers.increase()\n  }\n\n  const handleDecrease = () => {\n    reducers.decrease()\n  }\n\n  const handleSetValue = () => {\n    reducers.setValue('count', state.count + 2)\n  }\n\n  const handleSetValues = () => {    \n    reducers.setValues({\n      count: state.count - 2\n    })\n  }\n\n  const handleReset = () => {\n    reducers.reset()\n  }\n\n  const handleAsync = () => {\n    effects.increaseAsync()\n  }\n\n  if (effects.increaseAsync.loading) {\n    return <p className=\"loading\">loading ...</p>\n  }\n\n  return (\n    <div className=\"counter\">\n      <p>The count is: {state.count}</p>\n      <button onClick={handleIncrease}>+</button>\n      <button onClick={handleDecrease}>-</button>\n      <button onClick={handleSetValue}>setValue</button>\n      <button onClick={handleSetValues}>setValues</button>\n      <button onClick={handleAsync}>async</button>\n      <button onClick={handleReset}>reset</button>\n    </div>\n  )\n}\n\nexport default withProvider(Counter)\n",
        },
        'model.ts': {
          import: './model',
          content:
            "import { createModel } from 'dobux'\nimport { RootModel } from './index'\n\nfunction wait(ms: number) {\n  return new Promise(resolve => {\n    setTimeout(resolve, ms)\n  })\n}\n\nexport const counter = createModel<RootModel, 'counter'>()({\n  state: {\n    count: 0,\n  },\n  reducers: {\n    increase(state) {\n      state.count += 1\n    },\n    decrease(state) {\n      state.count -= 1\n    },\n  },\n  effects: (model, rootModel) => ({\n    async increaseAsync() {\n      await wait(1000)\n      model.reducers.increase()\n    },\n  }),\n})\n\n",
        },
        'index.less': {
          import: './index.less',
          content:
            '.counter {\n  p {\n    font-size: 20px;\n    font-weight: bold;\n    margin-bottom: 30px;\n  }\n\n  button {\n    min-width: 42px;\n    outline: none;\n    color: #fff;\n    background-color: #1890ff;\n    border-color: #1890ff;\n    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);\n    display: inline-block;\n    padding: 5px 10px;\n    border: 1px solid #ccc;\n    border-radius: 5px;\n    font-size: 14px;\n    line-height: 1.499;\n    display: inline-block;\n    font-weight: 400;\n    white-space: nowrap;\n    text-align: center;\n    border: 1px solid transparent;\n    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);\n    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);\n    cursor: pointer;\n    height: 32px;\n    padding: 0 15px;\n    font-size: 14px;\n    border-color: #d9d9d9;\n  }\n\n  button + button {\n    margin-left: 10px;\n  }\n}\n\n.loading {\n  display: flex;\n  font-size: 20px;\n  font-weight: bold;\n  margin-bottom: 30px;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(255, 255, 255, 0.3);\n  z-index: 10001;\n}\n',
        },
      },
      dependencies: {
        react: { version: '^16.8.0' },
        'react-dom': { version: '^16.8.0' },
        dobux: { version: '0.0.1' },
      },
      identifier: 'docs-counter',
    },
  },
  'docs-todo-list': {
    component: React.memo(function DumiDemo() {
      var _interopRequireDefault = require('/Users/ender/learning/github/dobux/node_modules/@babel/runtime/helpers/interopRequireDefault')

      var _react = _interopRequireDefault(require('react'))

      var _index = _interopRequireDefault(
        require('/Users/ender/learning/github/dobux/docs/demos/todo-list/index.tsx')
      )

      var _default = function _default() {
        return /*#__PURE__*/ _react['default'].createElement(_index['default'], null)
      }

      return _react['default'].createElement(_default)
    }),
    previewerProps: {
      sources: {
        _: {
          tsx:
            "import React from 'react'\nimport Header from './Header'\nimport UndoList from './UndoList'\nimport { store } from './store'\n\nimport './index.less'\n\nconst { Provider } = store\n\nconst TodoList: React.FC = () => {\n  return (\n    <Provider>\n      <div className=\"todo-list\">\n        <Header />\n        <UndoList />\n      </div>\n    </Provider>\n  )\n}\n\nexport default TodoList\n",
        },
        'Header/index.tsx': {
          import: './Header',
          content:
            "import React, { ChangeEvent, KeyboardEvent } from 'react'\nimport { store } from '../store'\n\nfunction Header() {\n  const { state, reducers, effects } = store.useModel('header')\n\n  const handleChange = (e: ChangeEvent<{ value: string }>) => {\n    reducers.changeValue(e.target.value)\n  }\n\n  const handleKeyUp = (e: KeyboardEvent) => {\n    if (state.value && e.keyCode === 13) {\n      effects.addUndoItem()\n      reducers.changeValue('')\n    }\n  }\n\n  return (\n    <div className=\"header\">\n      <div className=\"content\">\n        TodoList\n        <input\n          onChange={handleChange}\n          onKeyUp={handleKeyUp}\n          value={state.value}\n          placeholder=\"Todo\"\n        />\n      </div>\n    </div>\n  )\n}\n\nexport default Header\n",
        },
        'store.ts': {
          import: '../store',
          content:
            "import { createStore, Models } from 'dobux'\nimport * as models from './models'\n\nexport type RootModel = Models<typeof models>\n\nexport const store = createStore(models)\n",
        },
        'models.ts': {
          import: './models',
          content:
            "export { header } from './Header/model'\nexport { undoList } from './UndoList/model'\n",
        },
        'Header/model.ts': {
          import: './Header/model',
          content:
            "import { createModel } from 'dobux'\nimport { RootModel } from '../store'\n\nexport const header = createModel<RootModel, 'header'>()({\n  state: {\n    value: '',\n  },\n  reducers: {\n    changeValue(state, payload: string) {\n      state.value = payload\n    },\n  },\n  effects: (model, rootModel) => ({\n    addUndoItem() {\n      rootModel.undoList.reducers.addItem({\n        content: model.state.value,\n      })\n    },\n  }),\n})\n",
        },
        'UndoList/model.ts': {
          import: './UndoList/model',
          content:
            "import { createModel } from 'dobux'\nimport { RootModel } from '../store'\n\nfunction fetchList(): Promise<{ data: any[] }> {\n  return new Promise(resolve => {\n    setTimeout(() => {\n      resolve({\n        data: [\n          {\n            content: 'Learn dobux',\n          },\n          {\n            content: 'Learn typescript',\n          },\n        ],\n      })\n    }, 1000)\n  })\n}\n\ninterface Item {\n  done?: boolean\n  content: string\n}\n\nexport const undoList = createModel<RootModel, 'undoList'>()({\n  state: {\n    items: [\n      {\n        content: 'Learn dobux',\n      },\n      {\n        content: 'Learn typescript',\n      },\n    ] as Item[],\n  },\n  reducers: {\n    addItem(state, item: Item) {\n      state.items.push(item)\n    },\n\n    deleteItem(state, index: number) {\n      state.items.splice(index, 1)\n    },\n\n    toggleItem(state, index: number) {\n      state.items[index].done = !state.items[index].done\n    },\n  },\n  effects: (model) => ({\n    async fetchUndoList() {\n      const result = await fetchList()\n      model.reducers.setValue('items', result.data as any)\n    },\n  }),\n})\n",
        },
        'UndoList/index.tsx': {
          import: './UndoList',
          content:
            'import React from \'react\'\nimport { store } from \'../store\'\n\nfunction UndoList() {\n  const { state, reducers, effects } = store.useModel(\'undoList\')\n\n  const handleClick = (index: number) => {\n    reducers.deleteItem(index)\n  }\n\n  const handleToggle = (index: number) => {\n    reducers.toggleItem(index)\n  }\n\n  if (effects.fetchUndoList.loading) {\n    return <div className="loading">loading ...</div>\n  }\n\n  return (\n    <div className="undo-list">\n      <h2 className="title">\n        正在进行 <div className="count">{state.items.filter((item: any) => !item.done).length}</div>\n      </h2>\n      <ul className="content">\n        {state.items.map((item: any, index: number) => {\n          return (\n            !item.done && (\n              <li onClick={() => handleToggle(index)} className="item" key={index}>\n                {item.content}\n                <div\n                  onClick={e => {\n                    e.stopPropagation()\n                    handleClick(index)\n                  }}\n                  className="delete"\n                >\n                  -\n                </div>\n              </li>\n            )\n          )\n        })}\n      </ul>\n      <h2 className="title" style={{ marginTop: 30 }}>\n        已经完成{\' \'}\n        <div className="count" data-test="count">\n          {state.items.filter((item: any) => item.done).length}\n        </div>\n      </h2>\n      <ul className="content">\n        {state.items.map((item: any, index: number) => {\n          return (\n            item.done && (\n              <li onClick={() => handleToggle(index)} className="item" key={index}>\n                {item.content}\n                <div\n                  onClick={e => {\n                    e.stopPropagation()\n                    handleClick(index)\n                  }}\n                  className="delete"\n                >\n                  -\n                </div>\n              </li>\n            )\n          )\n        })}\n      </ul>\n    </div>\n  )\n}\n\nexport default UndoList\n',
        },
        'index.less': {
          import: './index.less',
          content:
            '.todo-list {\n  .header {\n    line-height: 60px;\n    background-color: #333;\n  }\n\n  .header .content {\n    width: 600px;\n    margin: 0 auto;\n    font-size: 24px;\n    color: #fff;\n  }\n\n  .header input {\n    width: 60%;\n    float: right;\n    margin-top: 15px;\n    padding: 0 10px;\n    line-height: 24px;\n    border-radius: 5px;\n    outline: none;\n  }\n\n  .undo-list {\n    width: 600px;\n    margin: 0 auto;\n    text-align: left;\n  }\n\n  .undo-list .title {\n    line-height: 30px;\n    margin: 10px 0;\n    font-size: 24px;\n    font-weight: bold;\n  }\n\n  .undo-list .count {\n    float: right;\n    width: 30px;\n    height: 30px;\n    line-height: 30px;\n    border-radius: 50%;\n    text-align: center;\n    font-size: 12px;\n    background-color: #e6e6e6;\n  }\n\n  .undo-list .content {\n    list-style-type: none;\n  }\n\n  .undo-list .content .item {\n    line-height: 32px;\n    font-size: 16px;\n    margin-bottom: 10px;\n    background-color: #fff;\n    border-left: 3px solid #629a9c;\n    text-indent: 10px;\n    border-radius: 3px;\n  }\n\n  .undo-list .content .delete {\n    float: right;\n    width: 20px;\n    height: 20px;\n    line-height: 20px;\n    margin-top: 6px;\n    margin-right: 6px;\n    font-size: 16px;\n    margin-bottom: 10px;\n    background-color: #e6e6e6;\n    text-indent: 0;\n    border-radius: 50%;\n    text-align: center;\n  }\n}\n',
        },
      },
      dependencies: {
        react: { version: '16.14.0' },
        'react-dom': { version: '^16.8.0' },
        dobux: { version: '0.0.1' },
      },
      identifier: 'docs-todo-list',
    },
  },
}
