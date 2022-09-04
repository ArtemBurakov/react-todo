# react-todo

React-todo is react app created as frontend part for todo project. Written using React, Redux toolkit, react-router-dom v6 and Bootstrap.

## Features

- :sparkles: Responsive design with bootstrap.
- :bust_in_silhouette: Login/Signup and save user information in localstorage.
- :closed_lock_with_key: Secure routes with react-router-dom v6.
- :globe_with_meridians: Using the redux toolkit to configure global store of the app and create async thunks and reducers.

## Requirements

1. [php-yii2-todo](https://github.com/ArtemBurakov/php-yii2-todo).

## Getting started

### Installation

- Clone the project

```bash
  git clone https://github.com/ArtemBurakov/react-todo.git
```

- Go to the project directory

```bash
  cd react-todo
```

- Install dependencies

```bash
  npm install
```

- Run app (before starting follow the configuration steps)

```bash
  npm start
```

> Runs the app in the development mode.
> Open http://localhost:3000 to view it in your browser.

## Configuration

### 1. php-yii2-todo installation

To make this application fully functional, you need the backend part of the [php-yii2-todo](https://github.com/ArtemBurakov/php-yii2-todo) project. How to setup php-yii2-todo can be found [here](https://github.com/ArtemBurakov/php-yii2-todo).

Once php-yii2-todo installed, in `react-todo/src/app/axiosClient.js` file change the base url with your server url.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
