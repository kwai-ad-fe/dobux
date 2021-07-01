import React from 'react'
import { render } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import { createStore } from '../src/index'
import { counter, counter2 } from './helper/model'
import { createHook } from './helper/createHook'
import { Counter } from './helper/CountClassComponent'
import {
  CounterWithContextName,
  CounterWithDefault,
  CounterWithSameContextName,
} from './helper/MultiCountClassComponent'

describe('Provider test', () => {
  it('should render correct when use provider in component', () => {
    const store = createStore({
      counter,
    })
    const { Provider, withProvider } = store

    const Component: React.FC = () => <div></div>

    expect(() => {
      render(
        <Provider>
          <Component />
        </Provider>
      )
    }).not.toThrow()

    const WithProvider = withProvider(Component)

    expect(() => {
      render(<WithProvider />)
    }).not.toThrow()
  })

  it('should throw error when call useModel without Provider wrapper', () => {
    const originalError = console.error
    console.error = jest.fn()

    const store = createStore({
      counter,
    })
    const { useModel } = store

    const ErrorCounter: React.FC = () => {
      const { state } = useModel('counter')
      return <div>{state.count}</div>
    }

    expect(() => render(<ErrorCounter />)).toThrow()

    console.error = originalError
  })

  it('should add the store to function component context', () => {
    const store = createStore({
      counter,
    })
    const { Provider, useModel } = store

    const {
      result: { current },
    } = createHook(Provider, useModel, 'counter')

    expect(current.state.count).toBe(0)
    expect(current.reducers).toBeDefined()
    expect(current.effects).toBeDefined()
  })

  it('should add the store to class component context', () => {
    const store = createStore({
      counter,
    })
    const { Provider, withModel } = store

    const Component = withModel('counter')(Counter)

    const wrapper = render(
      <Provider>
        <Component />
      </Provider>
    )

    expect(wrapper.getByTestId('count').innerHTML).toBe('0')
  })

  it('should add specific stores to class component context', () => {
    const store = createStore({
      counter,
      counter2,
    })
    const { Provider, withModels } = store

    const Component2 = withModels(['counter', 'counter2'])(CounterWithDefault)

    const wrapper2 = render(
      <Provider>
        <Component2 />
      </Provider>
    )
    expect(wrapper2.getByTestId('count-1').innerHTML).toBe('0')
    expect(wrapper2.getByTestId('count-2').innerHTML).toBe('0')
  })

  it('should add specific stores to class component context with custom property', () => {
    const originalWarn = console.warn
    console.warn = jest.fn()
    
    const store = createStore({
      counter,
      counter2,
    })
    const { Provider, withModels } = store

    const Component = withModels(['counter', 'counter2'], {
      counter: state => ({
        count: state.count
      })
    }, 'forDobux')(CounterWithContextName)

    const wrapper = render(
      <Provider>
        <Component />
      </Provider>
    )
    expect(wrapper.getByTestId('count-1').innerHTML).toBe('0')
    expect(wrapper.getByTestId('count-2').innerHTML).toBe('0')

    const Component2 = withModels(['counter', 'counter2'])(CounterWithSameContextName)

    const wrapper2 = render(
      <Provider>
        {/* @ts-ignore */}
        <Component2 dobuxModels="correct answer" />
      </Provider>
    )
    
    expect(console.warn).toHaveBeenCalledWith('IMPORT MODELS FAILED: The component wrapped by [withModels] already has "dobuxModels" in its props!')
    expect(wrapper2.getByTestId('show-dobuxModels').innerHTML).toBe('correct answer')

    console.warn = originalWarn
  })

  it('should not reset store when component unmount', async () => {
    const store = createStore({
      counter,
    })
    const { Provider, useModel } = store
    const { result, unmount } = createHook(Provider, useModel, 'counter')

    act(() => {
      expect(result.current.state.count).toBe(0)
      result.current.reducers.increase()
    })

    expect(result.current.state.count).toBe(1)

    unmount()

    const {
      result: { current },
    } = createHook(Provider, useModel, 'counter')

    expect(current.state.count).toBe(1)
  })

  it('setting autoReset to true, model should be reset when the component unmount', async () => {
    const store = createStore({
      counter,
    }, {
      autoReset: true
    })
    const { Provider, useModel } = store
    const { result, unmount } = createHook(Provider, useModel, 'counter')

    act(() => {
      expect(result.current.state.count).toBe(0)
      result.current.reducers.increase()
    })

    expect(result.current.state.count).toBe(1)

    unmount()

    const {
      result: { current },
    } = createHook(Provider, useModel, 'counter')

    expect(current.state.count).toBe(0)
  })

  it('setting autoReset to specify model, should be reset when the component unmount', async () => {
    const store = createStore({
      counter,
    }, {
      autoReset: ['counter']
    })
    const { Provider, useModel } = store
    const { result, unmount } = createHook(Provider, useModel, 'counter')

    act(() => {
      expect(result.current.state.count).toBe(0)
      result.current.reducers.increase()
    })

    expect(result.current.state.count).toBe(1)

    unmount()

    const {
      result: { current },
    } = createHook(Provider, useModel, 'counter')

    expect(current.state.count).toBe(0)
  })
})
