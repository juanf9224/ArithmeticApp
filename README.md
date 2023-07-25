# LoanPro App

LoanPro is an arithmetic calculator app that allows you to perform simple mathematical operations as well as generate random strings in a simple but intuitive ui

# Stack

- RTK Query to handle all api communications with the server
- Redux toolkit slices to handle state management globally
- React Hook Form to handle forms
- Material UI for styling of the app
- Jest for unit testing


# How to install

1. (Optional) Use nvm to [install](https://github.com/nvm-sh/nvm#usage) and use the Node version on the project
    
    ```bash
    nvm install x.x.x
    nvm use x.x.x
    ```
    
2. Copy .env.example to .env
    
    ```bash
    cp .env.example .env
    ```
    
3. Install packages
    
    ```bash
    yarn install

4. start the project:

    for dev:
    ```bash
    yarn dev
    ```
    prod:

    ```bash
    yarn start
    ```