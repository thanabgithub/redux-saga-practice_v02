# Development environment setup

## package.json

move typescript and testing thing to devDependencies
use ~ instead of ^ to manage version

## tsconfig.json

add

```
"baseUrl": "src"
```

## don't generate a lockfile and fail if an update is needed

```
RUN yarn --frozen-lockfile
```

## create boilderplate

type this in the editor

```
rafce
```

note that the extension id is
dsznajder.es7-react-js-snippets

## solve digital envelope routines::unsupported issue

```
  "scripts": {
    "start": "react-scripts --openssl-legacy-provider start",
    "build": "react-scripts --openssl-legacy-provider build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "serve": "serve -s build"
  },
```

## react router v5 -> v6 migration

```
Action
history = useHistory()
navigate = useNavigate()

Navigate
history.push(url)
navigate(url)

Redirect
history.replace(url)
navigate(url, { replace: true })

Navigate w/state
history.push(url, params)
navigate(url, { state: params })

Redirect w/state
history.replace(url, params)	navigate(url, { replace: true, state: params })
```

accodring to https://stackoverflow.com/questions/72474436/how-to-migrate-usehistory-replacex-y-with-usenavigate-in-react-router-v6

## kill process in a specfific port

```
fuser -k <port>/tcp
```
