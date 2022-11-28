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
![image](https://user-images.githubusercontent.com/59533626/204166726-81d7295c-3809-44db-a9ed-09ba4ee8909f.png)
![image](https://user-images.githubusercontent.com/59533626/204166736-2142cff2-7b62-414c-8e60-162f21054dae.png)
![image](https://user-images.githubusercontent.com/59533626/204166741-585c69c6-3d39-4a61-bc7f-1d387542a5d0.png)

- Tasks
![image](https://user-images.githubusercontent.com/59533626/204166546-976b249d-ddff-4fab-b690-0ed68a0218ea.png)

- Notes
![image](https://user-images.githubusercontent.com/59533626/204166552-c9cd8de4-60fa-4b69-9e40-085c84616837.png)
![image](https://user-images.githubusercontent.com/59533626/204166562-03267289-1ab6-4ed1-a4b1-034d53e3a978.png)

- Workspaces
![image](https://user-images.githubusercontent.com/59533626/204166695-0e2152b4-f290-4cfb-b7ed-74a5c147bcd1.png)
![image](https://user-images.githubusercontent.com/59533626/204166595-1a6721f6-6ab3-4aa4-9b2c-93703367c0e6.png)

- Search
![image](https://user-images.githubusercontent.com/59533626/204166519-cd2aed36-95d7-46a7-ab28-7681eb510838.png)

- Fully adaptive app design
<p float="left">
  <img src="https://user-images.githubusercontent.com/59533626/204166881-74a7e2fd-aaec-4404-ab44-22579324ce09.png" height="600" width="350">
  <img src="https://user-images.githubusercontent.com/59533626/204166901-bfccbe4e-d735-45db-9ea7-300e790c51d6.png" height="600" width="350">
  <img src="https://user-images.githubusercontent.com/59533626/204166956-798f82a6-2d1d-4c6b-92f1-a9fa1a1cf69a.png" height="600" width="350">
  <img src="https://user-images.githubusercontent.com/59533626/204166976-225f79b4-073e-41ce-807b-5ab94b02dc48.png" height="600" width="350">
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
