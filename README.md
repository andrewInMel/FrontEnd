# COMP30022 IT Project (Connectd) Frontend

## Introduction

This is the front end repository for the IT Project (COMP30022) subject. This is a personal CRM (customer relationship manager) called Connectd, created with React, Django, and MongoDB.

* Frontend repository is located at: [**Frontend Repository**](https://github.com/Andrew-Liu-mel/COMP30022-FrontEnd)

* Backend repository is located at: [**Backend Repository**](https://github.com/Andrew-Liu-mel/COMP30022)

* Frontend hosted on: [**Heroku - connectd-front**](https://connectd-front.herokuapp.com/)

* Backend hosted on: [**Heroku - connectdcrm**](https://connectdcrm.herokuapp.com/)

* This project is documented at: [**Confluence - Connectd CRM**](https://comp30022-079.atlassian.net/wiki/spaces/CRM/overview)

## About the Front-end App

The front-end application is a single page web application written by ReactJS & material UI framework.
It aims to help the user manage their connections & tasks.

## Table of contents

- [Team Members](#team-members)
- [Local Configuration](#local-configuration)
- [Deploy to Cloud](#deploy-to-cloud)
- [Tool Stack](#tool-stack)
- [Useful Links](#useful-links)

## Team Members

| Name           | Role              | Contact                         |
| :------------  | :------------     | :------------                   |
| Alexander Cain | Scrum Master      | acain1@student.unimelb.edu.au   |
| Han Liu        | Frontend Lead     | liuh8@student.unimelb.edu.au    |
| David Fletcher | Product Owner     | dfletcher@student.unimelb.edu.au |
| Jackson Hu     | Backend Lead      | renweih@student.unimelb.edu.au  |
| Tymara Metcalf | UI / UX Designer  | tmetcalf@student.unimelb.edu.au |


## Local Configuration:

**Pre-requirement:**
1. Node version of at least 10.
2. A package manager, npm or yarn.
3. A code editor (optional).
4. Modern browser.

**Steps:**
1. Pull the backend repository from GitHub
   * You may use command `git clone <repo>` if you haven’t cloned the repository before
   * Or simply run `git pull` to fetch the latest commit
2. Make sure you’ve already installed `yarn`
3. Open a terminal window at the folder root directory
   * Check current path using `pwd` command
   * You should see a directory path like `.../COMP30022-Frontend`
4. Run command `yarn` to install all dependencies required for frontend
5. Run command `yarn start` to run yarn frontend server, 
   * By default, server will run on port `3000`
6. The application will start running, and a web page will be shown in your default browser. 
7. Open the project in code editor, make any changes you want. (Optional)

##  Tech Info
  
**react** 
react is both declarative & component-based library. 
 * `Declarative`: Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes
 * `component-based`: Build encapsulated components that manage their own state, then compose them to make complex UIs

**MaterialUI**

MaterialUI provides a robust, customizable, and accessible library of foundational and advanced components, enabling you to build your own design system and develop React applications faster

**App Structure**

![alt text](https://res.cloudinary.com/andrewstorage/image/upload/v1636078034/yyzzfeplakmvkr8dcaxh.jpg)

**Main Page Structure**
![alt text](https://res.cloudinary.com/andrewstorage/image/upload/v1636078141/jvks0ls3osjejkagbub2.jpg)

## Tool Stack

| Package               | Version  | Notes                                                               |
| :------------         | :------- | :------------                                                       |
| yarn                  | 1.22.17  | Package manager                                                     |
| react                 | 17.0.2   | Web framework for frontend                                          |
| react-dom             | 17.0.2   | Serve as the entry point to the DOM and server renderers for React  |
| react-window          | 1.8.6    | Render part of a large data set, improve performance                |
| react-scripts         | 4.0.3    | Include scripts and configuration used by Create React App          |
| react-router-dom      | 5.3.0    | DOM bindings for React Router                                       |
| material-ui           | 4.12.3   | Enable material UI                                                  |
| axios                 | 0.22.0   | Fetch data from backend APP using AJAX                              |
| kendo-react-scheduler | 4.9.0    | Calendar library      
----------------------------------------------------

## Useful Links

Node official website: https://nodejs.org/en/

VSCode official website: https://code.visualstudio.com/

Heroku official website: https://www.heroku.com/

Git official website: https://git-scm.com/

materialUI official website(V4): https://v4.mui.com/getting-started/usage/
