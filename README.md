# Beat Saber Local Leaderboards

View leaderboards for Beat Saber.

## Usage:

### Prerequisites

I use `npm`, but `yarn` should also work. Make sure you've installed the required packages.

```
npm install
```

### React App

#### Pointing to your own scores
In the `.env` file, set `REACT_APP_BACKEND_URL=` to a url which resolves to a JSON file holding the scores.

To point to your local scores you can install a node http server (`npm install -g http-server`) and run it with the command `http-server --cors` in the dirctory `C:\Users\<YourUserName>\AppData\LocalLow\Hyperbolic Magnetism\Beat Saber\`. Then set the value to `REACT_APP_BACKEND_URL=http://localhost:8080/LocalLeaderboards.dat`.


Otherwise, you can leave the url blank and use the bundled json file with sample scores and statistics.

#### Running the app

```
npm start
```

### Storybook
Storybook is being used to develop components in isolation. View current components with:

```
npm run storybook
```

## Contributing Guide

### index.tsx
This serves as a thin wrapper around the main application, providing it with environment related information such as environment variables, data providers, etc. For example, test or development environments may use different providers, endpoints, etc. which should be passed in to the application via `index.tsx`.

### app.tsx
The entry point to the main application. It receives external configuration information as props and uses that to power the actual application.

### src/pages/
These are the "application level" components. They should not introduce new UI components but should instead provide data and coordination for existing components.

### src/components/
These are entirely presentational and should be able to be replaced with a component that takes the same data without affecting the behavior of the application. These components should also be able to be copied and used in an unrelated react application without much effort, if any. Ideally all new components here should have a corresponding entry in `stories/` demonstrating their use and appearance.

### stories/
This directory contains "stories" which demonstrate uses and appearance for different components. Related components should be added to the same story. [Learn more](http://storybook.js.org) about Storybook.js

## Backlog

See these [open issues](https://github.com/hoovercj/beatsaber-leaderboard-react/issues) on GitHub.


## Acknowledgements
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).