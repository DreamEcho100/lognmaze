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
│   ├── blog/                        #  (SSR, SSG, ISG, static pages)
│   │   └── [slug].ts                #  and pass data to screens.
│   ├── post/                        #
│   │   └── [id].ts                  #
│   ├── profile/                     #
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
│   ├── blog/                        #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── post/                        #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── profile/                     #
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
