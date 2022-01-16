# Todo

## Structural Changes

**Inspired** from [React Project Layout](https://blog.testdouble.com/posts/2021-11-30-tdr-project-layout/).

```bash
.
├── build/                           #
├── docs/                            #
├── lib/                             # 'lib/' is Non-UI Code
│   ├── __tests__/                   # Tests in `__tests__/` dirs
│   │   └──  ...                     #
│   ├── core/                        # 'core/' is bedrock domain code
│   │   ├── __tests__/               #
│   │   │   ├──  invoices.test.js    #
│   │   │   ├──  tasks.test.js       #
│   │   │   └──  ...                 #
│   │   ├── index.js                 #
│   │   ├── invoices.js              # Pure functions of business logic
│   │   ├── tasks.js                 # for 'invoices' domain 'tasks' domain.
│   │   └── (otherDomains).js        #
│   ├── ...                          # Other infrastructural code that isn't
│   ├── httpClient.js                # tied to our domain.
│   ├── moneyFormatter.js            #
│   ├── dateFormatter.js             #
│   ├── websocketHandler.js          #
│   └── ...                          #
├── pages/                           # Next.js pages (routes).
│   ├── authScreen/                  #
│   ├── invoicesScreen/              #
│   ├── dashboardScreen/             #
│   └── ...                          #
├── screens/                         # Entrypoint components for Next.js pages
│   ├── auth/                        #  (routes).
│   │   ├── index.js                 # Each dir could map to a URL prefix.
│   │   ├── Login.js                 #
│   │   ├── ForgotPassword.js        #
│   │   └── Logout.js                #
│   ├── profile/                     #
│   │   ├── index.js                 #
│   │   ├── ..._.ts                  #
│   │   └── ..._.ts                  #
│   ├── blog/                        #
│   │   └── ...                      #
│   ├── blog/                        #
│   │   └── ...                      #
│   └── ...                          #
├── ui/                              # React components, contexts, and hooks
│   ├── login/                       # grouped by domain or category.
│   │   ├── __tests__/               #
│   │   │   ├──  LoginForm.test.js   #
│   │   │   └──  ...                 #
│   │   ├── index.js                 # <- Only public exports for this module
│   │   ├── LoginForm.js             # <- Login related Component
│   │   ├── useAuthStatus.js         # <- Login related hook
│   │   └── AuthProvider.js          # <- Login related context provider
│   ├── forms/                       #
│   │   ├── __tests__/               #
│   │   ├── index.js                 #
│   │   ├── TextInput.js             # <- A lone component
│   │   ├── button/                  #
│   │   │   ├── index.js             #
│   │   │   ├── some_helper.js       #
│   │   │   ├── InnerButton.js       # <- Private, non-exported component
│   │   │   └── FancyButton.js       # <- Primary implementation of component
│   │   ├── checkbox/                #
│   │   │   └── ...                  #
│   │   └── select/                  #
│   │       └── ...                  #
│   ├── avatars/                     #
│   │   └── ...                      #
│   └─── ...                         #
├── LICENSE                          #    (b) mount React tree to the DOM.
└── README.md
```
