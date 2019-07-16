# Stocker

This project is a web application that uses IEX api to build a stock portfolio app. The app lets you buy stocks and shows your transactions. I used React-Redux for my front end and my back end used PostgreSQL and Sequelize.

## Get Started

To run this application:

1.  In your terminal type `git clone https://github.com/Ali-Aftab/Stocker` to clone it to your computer.
2.  Then type `cd Stocker` to acces the folder
3.  To install the required modules type `npm i`
4.  Make a new PostgreSQL database by writing `createdb TTP2018`
5.  Register to `https://iexcloud.io/` and obtain your Public Token
6.  Paste your token to the variable `token` in the `./client/store/user.js` on line 6
7.  Type `npm run start-dev` in your terminal and you have your stock portfolio!
