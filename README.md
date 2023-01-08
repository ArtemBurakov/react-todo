# react-todo

React-todo is react app created as frontend part for todo project. Written using React, Redux toolkit, Axios, react-router-dom v6 and Bootstrap.

## Features

- :sparkles: Responsive design with bootstrap.
- :bust_in_silhouette: Login/Signup and save user information in localstorage.
- :closed_lock_with_key: Secure routes with react-router-dom v6.
- :globe_with_meridians: Using the redux toolkit to configure global store of the app and create async thunks and reducers.

## Demo

[Todoify App](https://artemburakov.github.io/react-todo/)

## Screenshots
- Home, Login, Signup pages
![image](https://user-images.githubusercontent.com/59533626/210185592-7ed37e50-8304-4d93-892e-4b5273c08329.png)
![image](https://user-images.githubusercontent.com/59533626/211196634-53d55b7a-352a-45c9-9fb5-2f613eb08a97.png)
![image](https://user-images.githubusercontent.com/59533626/210185417-9c8481e3-bc06-4b13-9b1f-240bedcb84c1.png)
![image](https://user-images.githubusercontent.com/59533626/210185421-c5303661-be67-46dd-bb3b-79eabbdc5318.png)

- Tasks
![image](https://user-images.githubusercontent.com/59533626/210185323-6b8d9791-46a6-45a2-bba4-e309681230d9.png)

- Notes
![image](https://user-images.githubusercontent.com/59533626/210185478-25ce3c0c-c3d8-4367-9b85-8645ce6fdd81.png)
![image](https://user-images.githubusercontent.com/59533626/210185488-abc29bd6-5cbd-487f-84ff-fd45e257c2ef.png)

- Workspaces
![image](https://user-images.githubusercontent.com/59533626/210185371-fe862284-f4c2-489a-9d1e-3fc556438b59.png)
![image](https://user-images.githubusercontent.com/59533626/210185494-c733ac59-9709-4479-942b-c1c74fc0481e.png)

- Search
![image](https://user-images.githubusercontent.com/59533626/210185530-1fe0546c-dcab-4614-ad1a-c43024794e4f.png)

- Fully adaptive app design
<p float="left">
  <img src="https://user-images.githubusercontent.com/59533626/210185699-811c158a-677d-4cf2-9a65-2aabbe401225.png" height="600" width="350">
  <img src="https://user-images.githubusercontent.com/59533626/210185711-beb2e8e3-c6a7-43c7-9750-4d5ce795573b.png" height="600" width="350">
  <img src="https://user-images.githubusercontent.com/59533626/210185727-7169c519-eb9f-4115-a218-ebc3a9eb1000.png" height="600" width="350">
  <img src="https://user-images.githubusercontent.com/59533626/210185738-c1517e28-752a-4a52-8806-6616a681e229.png" height="600" width="350">
</p>

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

### Deployment

To deploy this project run

```bash
  npm run deploy
```

## Configuration

### 1. php-yii2-todo installation

To make this application fully functional, you need the backend part of the [php-yii2-todo](https://github.com/ArtemBurakov/php-yii2-todo) project. How to setup php-yii2-todo can be found [here](https://github.com/ArtemBurakov/php-yii2-todo).

### 2. Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

* Create a new `.env` file in project root folder

```bash
  touch .env
```

#### Configuration Values

* `REACT_APP_PUBLIC_URL` - your public url
* `REACT_APP_API_URL` - your API url

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
