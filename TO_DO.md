# Todo

## Structural Changes

```bash
.
│                                    #
├── _api/                            # Entrypoint components for Next.js pages
│   ├── controllers/                 #  (routes).
│   │   ├── index.ts                 # Each dir could map to a URL prefix.
│   │   ├── auth.ts                  #
│   │   ├── news.ts                  #
│   │   ├── users.ts                 #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── db/                          #
│   │   ├── dummy_data/              #
│   │   │   ├── users.ts             #
│   │   │   ├── ...                  #
│   │   │   └── ...                  #
│   │   ├── models/                  #
│   │   │   ├── users.ts             #
│   │   │   ├── ...                  #
│   │   │   └── ...                  #
│   │   ├── seeder.ts                #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── middleware/                  #
│   │   ├── index.ts                 #
│   │   ├── auth.ts                  #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── routes/                      #
│   │   ├── users.ts                 #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── ...                          #
│   └── ...                          #
├── build/                           #
├── lib/                             # 'lib/' is Non-UI Code
│   ├── __tests__/                   # Tests in `__tests__/` dirs
│   │   └──  ...                     #
│   ├── core/                        # 'core/' is bedrock domain code.
│   │   ├── __tests__/               #
│   │   │   ├── ...                  # examples:
│   │   │   └── ...                  #  (invoices.test.ts tasks.test.ts).
│   ├── storage/                     #
│   │   ├── constants                 # Pure functions of business logic.
│   │   │   ├── index.ts             #
│   │   │   ├── ...                  #
│   │   │   └── ...                  #
│   │   ├── index.ts                 # Pure functions of business logic.
│   │   ├── pgDB/                    # examples:
│   │   │   ├── config.ts            #  for handling the database, constants, etc.
│   │   │   ├── index.ts             #
│   │   │   ├── news.ts              #
│   │   │   ├── users.ts             #
│   │   │   ├── ...                  #
│   │   │   └── ...                  #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── network/                     #
│   │   ├── index.ts                 # examples:
│   │   ├── ...                      #  (httpClient.ts, websocketHandler.ts).
│   │   └── ...                      #
│   ├── storage/                     #
│   │   ├── index.ts                 #
│   │   ├── cookie.ts                #
│   │   ├── localStorage.ts          #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── date/                        #
│   │   ├── index.ts                 #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── array/                       #
│   │   ├── index.ts                 #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── formatters/                  #
│   │   ├── index.ts                 #
│   │   ├── className.ts             #
│   │   ├── money.ts                 #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── testUtils/                   #
│   │   ├── index.js                 # examples:
│   │   ├── ...                      # (dataFactories.ts)
│   │   └── ...                      #
│   ├── ...                          #
│   └── ...                          #
├── pages/                           # Next.js pages (routes)
│   ├── api/                         #  That could be handling
│   ├── blogs/                        #  (SSR, SSG, ISG, static pages)
│   │   └── [slug].ts                #  and pass data to screens.
│   ├── posts/                        #
│   │   └── [id].ts                  #
│   ├── users/                     #
│   │   └── [user_name_id].ts        #
│   ├── _app.ts                      #
│   ├── _document.ts                 #
│   ├── auth.ts                      #
│   ├── index.ts                     #
│   ├── sitemap.xml.ts               #
│   ├── ...                          #
│   └── ...                          #
├── screens/                         # Entrypoint components for Next.js pages
│   ├── _app/                        #  (routes) that take passed data (if any)
│   │   ├── index.ts                 #  and handle them.
│   │   ├── Layout/                  # Each dir could map to a URL prefix.
│   │   ├── ForgotPassword.ts        #
│   │   ├── Logout.ts                #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── auth/                        #
│   │   ├── index.ts                 #
│   │   ├── Login.ts                 #
│   │   ├── ForgotPassword.ts        #
│   │   ├── Logout.ts                #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── blogs/                        #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── posts/                        #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── users/                     #
│   │   ├── index.ts                 #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── ...                          #
│   └── ...                          #
├── ui/                              # React components, contexts, and hooks
│   ├── login/                       # grouped by domain or category.
│   │   ├── __tests__/               #
│   │   │   ├──  LoginForm.test.ts   #
│   │   │   └──  ...                 #
│   │   ├── index.ts                 # <- Only public exports for this module
│   │   ├── LoginForm.ts             # <- Login related Component
│   │   ├── useAuthStatus.ts         # <- Login related hook
│   │   ├── AuthProvider.ts          # <- Login related context provider
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── forms/                       #
│   │   ├── __tests__/               #
│   │   ├── index.ts                 #
│   │   ├── TextInput.ts             # <- A lone component
│   │   ├── Button/                  #
│   │   │   ├── index.ts             #
│   │   │   ├── some_helper.ts       #
│   │   │   ├── InnerButton.ts       # <- Private, non-exported component
│   │   │   └── FancyButton.ts       # <- Primary implementation of component
│   │   ├── checkbox/                #
│   │   │   └── ...                  #
│   │   ├── select/                  #
│   │   │   └── ...                  #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├──- ...                         #
│   └─── ...                         #
├── LICENSE                          #
├── README.md                        #
├── ...                              #
└── ...                              #
```

## hooks

### Fetch

Credit to [5 React Architecture Best Practices](https://www.sitepoint.com/react-architecture-best-practices/)

```jsx
import { useEffect, useState } from 'react';

const Fetch = ({
	render,
	onFetch = {
		succuss: (json) => json,
		error: (prev, error = new Error('Something went wrong!')) => ({
			error: error.message,
			//  data: undefined,
		}),
	},
	url,
	initData,
}) => {
	const [state, setState] = useState({
		status: '',
		data: initData,
		isLoading: false,
		// error: {}
	});

	useEffect(() => {
		setState((prev) => ({ ...prev, status: 'pending', isLoading: true }));

		const _fetch = async () => {
			try {
				const res = await fetch(url);
				const json = await res.json();

				setState({
					status: 'succuss',
					data: onFetch.succuss(json),
					isLoading: false,
				});
			} catch (error) {
				setState((prev) => ({
					status: 'error',
					...onFetch.error(prev, error instanceof Error && error),
					isLoading: false,
				}));
			}
		};

		_fetch();
	}, url);

	return render(state);
};

const Example = () => {
	return (
		<Fetch
			url='https://api.github.com/users/imgly/repos'
			onFetch={{
				succuss: (json) => json,
				error: (prev) => prev,
			}}
			render={({ status, data, isLoading, error }) => (
				<div>
					<h2>img.ly repos</h2>
					{isLoading && status === 'pending' && <h2>Loading...</h2>}

					{data?.length > 0 && (
						<ul>
							{data.map((repo) => (
								<li key={repo.id}>{repo.full_name}</li>
							))}
						</ul>
					)}
				</div>
			)}
		/>
	);
};

export default Example;
```

### Imperative Set Timeout

Credit to [Thanks React, I'm fine with an imperative setInterval](https://thoughtspile.github.io/2021/10/13/really-declarative/)

```jsx
const useImperativeTimeout(callback, delay) => {
 const timeoutId = useRef(null);
 const savedCallback = useRef();

 // Remember the latest callback.
 useEffect(() => {
  savedCallback.current = callback;
 }, [callback]);

 // this handle clears the timeout
 const clear = useCallback(() => {
  clearTimeout(timeoutId.current);
 }, []);
 // this handle sets our timeout
 const set = useCallback(() => {
  // but clears the old one first
  clear();
  timeoutId.current = setTimeout(() => {
   savedCallback.current();
  }, delay);
 }, [delay]);

 // also, clear the timeout on unmount
 useEffect(() => clear, []);

 return { set, clear };
}
```

## Inspired from

- [React Project Layout](https://blog.testdouble.com/posts/2021-11-30-tdr-project-layout/)

- [A Model View Controller Pattern for React](https://blog.testdouble.com/posts/2019-11-04-react-mvc/)

- [5 React Architecture Best Practices](https://www.sitepoint.com/react-architecture-best-practices/)

## Optimization

### From [How to write performant React code: rules, patterns, do's and don'ts](https://www.developerway.com/posts/how-to-write-performant-react-code?ck_subscriber_id=1022195629)

Rule #1. If the only reason you want to extract your inline functions in props into useCallback is to avoid re-renders of children components: don't. It doesn't work.

Rule #2. If your component manages state, find parts of the render tree that don't depend on the changed state and memoise them to minimize their re-renders.

Rule #3. Never create new components inside the render function of another component.

Rule #4: When using context, make sure that value property is always memoised if it's not a number, string or boolean.

## Books for desgin

### from [Top 15 Graphic Design Skills to Get You Hired](https://dribbble.com/resources/graphic-designer-skills?utm_campaign=2022-01-25&utm_medium=email&utm_source=opportunities)

Read graphic design books
Reading graphic design books is an inexpensive way to learn specific skills, refine your design process, or get a better idea of what it's like to be a professional designer. Check out these books the next time you need some inspiration or want to learn a new skill:

Thinking with Type: In Thinking with Type, Ellen Lupton explains the principles of typography, focusing on spacing, alignment, shape, and order. You'll learn more about using style sheets, captions, ornaments, font licensing, and enlarged capitals, among other typography topics.

Designing Brand Identity: In some cases, it's not enough to be a great designer. You also need to know how to use your design skills to build cohesive brands. In Designing Brand Identity, Alina Wheeler explains how to develop and implement effective brand identities. The book includes 30 case studies to show you how well-established companies have used graphic design to build consistent brand images.

100 Ideas That Changed Graphic Design: Steven Heller and Veronique Vienne provide an overview of how graphic design has changed throughout history, commenting on how new ideas led to technological and stylistic advancements in the field.

The Non-Designer's Design Book: If you're just starting out in the graphic design field, you might benefit from Robin Williams' guide to the fundamental principles of design. Williams explains how to design with color and type, work with multiple typefaces and think from a design perspective. The book also includes tips for completing specific types of design projects, including newsletters and brochures.

How Do I Do That in InDesign? Once you understand the fundamentals of design, you'll need to be able to use industry tools to work on projects. In How Do I Do That in InDesign, Dave Clayton and Scott Kelby explain how to complete specific actions in Adobe's design software. You'll learn how to add grids to each document, drag out ruler guides, check for errors, change the pasteboard size, and much more.
