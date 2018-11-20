# Harvard Crime App
The Harvard Crime App is a data driven web application that leverages predictive models
and charts to visualize Chicago, Illinois crime data. Within the Harvard Crime App, users will
be able to create a profile and save custom reports to create specific datasets to visualize.
In addition, users will be able to report a crime by filling out a simple form and and monitor
the progress and status of the crime. Given that we don't want to send fake crime reports off
to the Chicago Police Department, this form will simply create the crime reported in the database
and not actually inform any authorities.

## Pages and Routes

#### Signup (/signup)
The Sign Up route will serve as our main user onboarding page. The signup route will allow
users to create an account which will enable them to save custom reports to their profile.
A user will consist of an **email**, **username**, and **pasword**.

#### Login (/login)
A login page will be provided for users to login and authenticate with the server. The SHA256
Cryptographic Hash Algorithm will be used to authenticate the user input with credentials stored
in the database.

#### Logout (/logout)
Functionality to logout from the application will be provided. Once logged out, the session
will be cleared of all user-specific data.

#### Main/Home (/home)
The home page will act as the main focal point of the Crime App. Within the landing page, users
will be able to analyze data by providing filters to narrow down the data in order to find what
they are looking for. Users will have the option to save these filters into a custom report for
use later. This will enable users to easily compile reports they are interested in and be able
to view those reports without having to re-enter filters every time.

Aside from viewing visualized data, users will also be able to download the dataset in its raw
form for usage outside of the application. Supported formats will be JSON and csv.

Additional features to complement the user experience will be the ability to view a live twitter
feed of the Chicago Police Department as well as report a crime directly (faked, as described above).

The data in which we will provide visualizations on will be for Crime Type, Crimes by Area, and
Crime Frequency.


#### Forecasting (/forecasting)
Within the Crime App, a user may want to see a more predictive visualization based on crime trends.
A page will be provided to show what crime types are predicted to happen within the immediate future
and be able to apply filters if desired.

#### Profile (/profile)
During the lifespan of a user visit to the application, there will be an available page for a user
to manage their profile which includes saved reports and crimes that were reported by the user. This
page will be secure, meaning that access to the page is restricted to the users data and not others.


## Members and Contributors
The creators and owners of the application are Kristen, Clair and Marc. The division of labor for 
the development cycle is as follows:

* **Claire**: Responsible for the front end development. This includes creating HTML templates, styles,
design and the creation of D3 charts.
* **Kristen**: Responsible for the predictive modeling (forecasting). The scope of the predictive modeling
will cover the creation of the ipython notebook, cleansing of data and generating the pickle file
for importing the data into the database
* **Marc**: Responsible for creating the database and models. The database scope includes creating the
python scripts to import data into the database, creating the database, creating models, building the
database relationships and building out database queries

Essentially, we have broken down the tasks to create the application in a manner where we can work in
parallel covering data science, front end and backend areas. We have full expectations that we will
all be helping each other out and working together as a team to reach our final goal of projection
completion.

## Data Sources / References

- [Main Data Set: Chicago Crimes - 2001 to Present](https://catalog.data.gov/dataset/crimes-2001-to-present-398a4)
- [Chicago IUCR Codes](https://data.cityofchicago.org/widgets/c7ck-438e)


## High Level Task Estimates

| Task                          | Description                                                                     | Estimate |
|-------------------------------|---------------------------------------------------------------------------------|----------|
| Create DB                     | Create the database in Heroku (PostgreSQL)                                      | 1        |
| Create cases table            | Create the main table which will hold the raw data of Chicago crimes            | 1        |
| Create users table            | Create the users table to store users                                           | 1        |
| Create saved reports table    | Create the table which will store saved reports                                 | 1        |
| Create models for tables      | Create models for User, Case, Report                                            | 2        |
| Connect Database to Flask     | Create the connectivity between the flask app and the heroku db                 | 1        |
| Create db queries             | Create the necessary database queries for the app                               | 3        |
| Create project                | Create the project structure and repository for the app.(GitHub/Heroku)         | 2        |
| Create the Python Notebook    | Create python notebook used for predictive modeling                             | null     |
| Sign up route                 | Create sign up route                                                            | 1        |
| Sign up page                  | Create the html template, style and design for login page                       | 2        |
| Logout route                  | Create the logout route                                                         | 1        |
| Login route                   | Create the login route                                                          | 1        |
| Login Page                    | Create login form/page                                                          | 2        |
| Main route                    | Create the main route (/home)                                                   | 2        |
| Crime Type JSON endpoint      | Create endpoint to return crime types in json format (for visualization)        | 3        |
| Crime by Area JSON endpoint   | Create endpoint to return crimes by area in json format (for visualization)     | 4        |
| Crime frequency JSON endpoint | Create endpoint to return frequency of crime in json format (for visualization) | 4        |
| Crime Type D3 Viz             | Create d3 visualization of crime types                                          | 5        |
| Crime by Area D3 Viz          | Create d3 visualization of crime by area                                        | 10       |
| Crime Frequency D3 Viz        | Create d3 visualization of frequency of crime                                   | 10       |
| Create filters for dashboard  | Create filters for the visualizations in the main route                         | 10       |
| Create Forecasting route      | Create the route for forecasting                                                | 1        |
| Create Forecasting page       | Create the html, css, and js for forecasting page                               | 5        |
| Create Profile route          | Create the route for the profile page                                           | 3        |
| Create Profile page           | Create the html, css and js for the profile page                                | 5        |
| Create profile json endpoints | Create the json endpoint needed to execute CRUD operations on saved reports     | 5        |