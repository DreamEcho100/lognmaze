import {
	useRef,
	useEffect,
	useDebugValue,
	useReducer,
	useCallback,
	useMemo,
	useLayoutEffect,
	useContext,
	createContext as createContext$1,
	createElement,
	forwardRef,
	memo as memo$1,
} from 'react';

// import { useContextSelector, useContextUpdate, createContext } from 'use-context-selector';
import * as pkg from 'use-context-selector';
const { useContextSelector, useContextUpdate, createContext } = pkg;

import {
	affectedToPathList,
	isChanged,
	createProxy,
	trackMemo,
} from 'proxy-compare';
export { getUntracked as getUntrackedObject } from 'proxy-compare';

const useAffectedDebugValue = (state, affected) => {
	const pathList = useRef();
	useEffect(() => {
		pathList.current = affectedToPathList(state, affected);
	});
	useDebugValue(state);
};

const isSSR =
	typeof window === 'undefined' ||
	!window.navigator ||
	/ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;
const createTrackedSelector = (useSelector) => {
	const useTrackedSelector = () => {
		const [, forceUpdate] = useReducer((c) => c + 1, 0);
		const affected = new WeakMap();
		const lastAffected = useRef();
		const prevState = useRef();
		const lastState = useRef();
		useIsomorphicLayoutEffect(() => {
			lastAffected.current = affected;

			if (
				prevState.current !== lastState.current &&
				isChanged(prevState.current, lastState.current, affected, new WeakMap())
			) {
				prevState.current = lastState.current;
				forceUpdate();
			}
		});
		const selector = useCallback((nextState) => {
			lastState.current = nextState;

			if (
				prevState.current &&
				prevState.current !== nextState &&
				lastAffected.current &&
				!isChanged(
					prevState.current,
					nextState,
					lastAffected.current,
					new WeakMap()
				)
			) {
				// not changed
				return prevState.current;
			}

			prevState.current = nextState;
			return nextState;
		}, []);
		const state = useSelector(selector);

		if (typeof process === 'object' && process.env.NODE_ENV !== 'production') {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useAffectedDebugValue(state, affected);
		}

		const proxyCache = useMemo(() => new WeakMap(), []); // per-hook proxyCache

		return createProxy(state, affected, proxyCache);
	};

	return useTrackedSelector;
};

const useTrackedState = (StateContext) => {
	const useTrackedSelector = useMemo(() => {
		const useSelector = (selector) =>
			useContextSelector(StateContext, selector);

		return createTrackedSelector(useSelector);
	}, [StateContext]);
	return useTrackedSelector();
};

const useSelector = (StateContext, selector) => {
	const selected = useContextSelector(StateContext, selector);
	useDebugValue(selected);
	return selected;
};

const useUpdate = (StateContext, UpdateContext) => {
	const contextUpdate = useContextUpdate(StateContext);
	const update = useContext(UpdateContext);
	return useCallback(
		(...args) => {
			let result;
			contextUpdate(() => {
				result = update(...args);
			});
			return result;
		},
		[contextUpdate, update]
	);
};

/* eslint react/destructuring-assignment: off */
const warningObject = new Proxy(
	{},
	{
		get() {
			throw new Error('Please use <Provider>');
		},

		apply() {
			throw new Error('Please use <Provider>');
		},
	}
);
const createContainer = (useValue, concurrentMode = false) => {
	const StateContext = createContext(warningObject);
	const UpdateContext = createContext$1(warningObject);

	const Provider = (props) => {
		const [state, update] = useValue(props);
		return createElement(
			UpdateContext.Provider,
			{
				value: update,
			},
			createElement(
				StateContext.Provider,
				{
					value: state,
				},
				props.children
			)
		);
	};

	const useTrackedState$1 = () => useTrackedState(StateContext);

	const useUpdate$1 = concurrentMode
		? () => useUpdate(StateContext, UpdateContext)
		: () => useContext(UpdateContext);

	const useTracked = () => [useTrackedState$1(), useUpdate$1()];

	const useSelector$1 = (selector) => useSelector(StateContext, selector);

	return {
		Provider,
		useTrackedState: useTrackedState$1,
		useTracked,
		useUpdate: useUpdate$1,
		useSelector: useSelector$1,
	};
};

function _extends() {
	_extends =
		Object.assign ||
		function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];

				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}

			return target;
		};

	return _extends.apply(this, arguments);
}

function memo(Component, propsAreEqual) {
	const WrappedComponent = forwardRef((props, ref) => {
		Object.values(props).forEach(trackMemo);
		return createElement(
			Component,
			_extends({}, props, {
				ref,
			})
		);
	});
	return memo$1(WrappedComponent, propsAreEqual);
}

export { createContainer, createTrackedSelector, memo };
//# sourceMappingURL=index.modern.mjs.map
