# GoEuro coding challenge: List Github repos

### Task

Build a simple client-side app that lists GitHub repositories for a given user.

Use the GitHub API documented here: https://developer.github.com/v3/.

The end-user will enter a Github user's name and see a list of repositories for that user including a link to the repos.
App needs to handle the following responses correctly:

  - The Github user does not exist
  - Github user has no repos
  - Github API does not respond

## See It in Production

Visit [https://ingdir.github.io/goeuro](https://ingdir.github.io/goeuro/) to see how the app works.

## Notes on Implementation

I used [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap this app initially.
The app logic was then implemented with React. To stay practical, I didn't introduce any specific state management tools
like [Redux](https://github.com/reactjs/redux) as the main `<App />` only needs to handle several values and one call.

The implementation handles Github API pagination correctly, but uses non-authenticated calls that are severely rate-limited. This may result
in API 403 Forbidden errors if more than 60 requests per hour are sent,
according to the Github API docs.

Tests are written with [Jest](https://facebook.github.io/jest/) and are based on the shallow rendering principle.

As an extra piece, I've added some accessibility features, like support for normal and large text (see the two buttons
at the top right corner) as well as very basic [ARIA attributes](https://www.w3.org/WAI/intro/aria).
 
The CSS code for the project is implemented according to the [BEM methodology](http://getbem.com).

## Available Actions

In the project directory, run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run deploy`

Deploys the app for production to [ingdir.github.io/goeuro](https://ingdir.github.io/goeuro/).
