# Archiprod

Archiprod is an online shopping platform for home products. It offers a variety of products including furniture, bathroom essentials, kitchen appliances, lighting and decor items. The platform is built on **Angular 15.2.1** and **NodeJS 16.13.0**.

## Installation frontend part

1. Clone the repository from [GitHub Archiprod](https://github.com/atsa21/archiprod-shop).
2. Install the required dependencies using `npm install`.
3. Start the frontend app using `ng serve`.
5. Navigate to http://localhost:4200/ in your web browser to use the application.

## Installation backend part

1. Clone the repository from [GitHub Archiprod NodeJS](https://github.com/atsa21/archiprod-backend).
2. Install the required dependencies using `npm install`.
3. Start the frontend app using `nodemon server.js`.
5. Navigate to http://localhost:3000/ in your web browser to use the application.

## Check version

Run `ng version` and `npm -v` to see your versions of Angular and Node. 
You need versions:
Angular CLI: 15.2.1
Node: 16.13.0 to work.

To switch in right node version, I recommend to download Node Version Manager.
Steps to change Node version by Node Version Manager:
1. Open Terminal as administrator.
2. To install Node version 16.10.0 run `nvm install 16.13.0`.
3. To see all available Node versions run `nvm list`.
4. To set needed Node version run `nvm use 16.13.0`.

In other case, you need to uninstall your Node and install Node 16.10.0.

To install Angular run `npm install -g @angular/cli@15.2.1`
If you have other installed Angular version you need to unistall it:
1. To uninstall Angular run `npm unistall -g @angular/cli`.
2. Run `npm cache clean --force`.
3. To install needed Angular version run `npm install -g @angular/cli@15.2.1`.

## Project Structure

The project consists of two main parts: the website for shopping and the admin page for management. The frontend code is located in the `src` folder, while the backend code is located in the `archiprod-backend` repo.

### Frontend
The frontend code is structured as follows:

* `src/app/components/admin` - contains the components for the admin page.
* `src/app/components/main` - contains the components for the main shopping website.
* `src/app/components/shared` - contains the components that are shared between the admin and main pages.

### Backend
The backend code is structured as follows:

* `controllers` - contains the controllers for the API endpoints.
* `image` - contains all images for shopping platform.
* `middleware` - contains the middleware functions used by the routes.
* `models` - contains the database models.
* `routes` - contains the API routes.

## Deployed site

Navigate [Heroku Archiprod](https://archiprod.herokuapp.com/api) to see deployed server.

* Main page:
![image](https://user-images.githubusercontent.com/104850911/235160968-f0247766-af3f-455c-9e27-fcecc9fedea2.png)

* Admin page:
![image](https://user-images.githubusercontent.com/104850911/235161156-5acc25d4-4370-4a00-b20e-beb94d62b6fe.png)

## Features

* Admins can manage products, categories and brands through the admin page.
* Admin can see all registered users on Admin - Users page.
* Authentication and authorization is implemented.

## Inprogress

- [x] Deploy frontend to Firebase.
- [ ] Users can browse products by category and add them to their cart.
- [ ] Users can checkout their cart and pay for their order using a payment gateway.
- [ ] Admins can view and update the status of orders.

## Code scaffolding

Run `ng g c component-name` to generate a new component. You can also use `ng g directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
