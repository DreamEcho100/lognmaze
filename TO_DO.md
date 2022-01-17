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
│   │   ├── index.ts                 # Pure functions of business logic.
│   │   ├── ...                      # examples:
│   │   └── ...                      #  for 'invoices' domain 'tasks' domain.
│   ├── network/                     #
│   │   ├── index.ts                 # examples:
│   │   ├── ...                      #  (httpClient.ts, websocketHandler.ts).
│   │   └── ...                      #
│   ├── storage/                     #
│   │   ├── index.ts                 #
│   │   ├── cookie.ts                #
│   │   ├── localStorage.ts          #
│   │   ├── pgDB/                    #
│   │   │   ├── connection.ts        #
│   │   │   ├── index.ts             #
│   │   │   ├── news.ts              #
│   │   │   ├── users.ts             #
│   │   │   ├── ...                  #
│   │   │   └── ...                  #
│   │   ├── ...                      #
│   │   └── ...                      #
│   ├── formatters/                  #
│   │   ├── index.ts                 #
│   │   ├── array.ts                 #
│   │   ├── className.ts             #
│   │   ├── date.ts                  #
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

## Inspired from:

-  [React Project Layout](https://blog.testdouble.com/posts/2021-11-30-tdr-project-layout/)

- [A Model View Controller Pattern for React](https://blog.testdouble.com/posts/2019-11-04-react-mvc/)