# Nabu
Nabu was the ancient Babylonian of writing and scribing. Nabu is an application that helps dev team compile the various APIs they use/create and be able to view the various endpoints of these APIs in a swagger UI format, enabling for simple and easy documentation.

## What does Nabu do

* Contains a basic auth setup, so that page views are restricted to those who have team credentials. (The admin will set the username and password)

* Stores the path and token of the API when added to the list, removing the need to repeatedly enter these credentials to access the documentation.

* Provides API documentation in a clear and interactive format.(using SwaggerUi)

## What Nabu needs

* Any API included must have an associated Swagger file.

* A PostgresDB (Installation instructions included.)

## Installation

### App Download
Download the repo and install the node modules using the following command :

```
npm install
```

### Database install

If you do not have postgres installed, you can install it using the following commands :
```
brew update

brew install postgres
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```
Load the nabu database using the following command :

```
createdb nabu
psql -d nabu -f nabu_db.sql
```

### Environment Variables Set Up

Create a .env file using the following command :
```
touch .env
```

In the .env file, post the following environment variables, and adjust the placeholders appropriately

```
DB_NAME=pg://vishwam.sankar:basically@localhost/nabu
COOKIE_SESSION_1=_randomKey1
COOKIE_SESSION_2=_randomKey2

# the answers to these fields must be 'yes' or 'no'
BASIC_AUTH=yes
GITHUB_AUTH=yes

# if the value of BASIC_AUTH is no, set all of the variables below to none
TEAM_USERNAME=_userName
TEAM_PASSWORD=_password

# if the value of GITHUB_AUTH is no, set all the below variables to none
GITHUB_ORG=githubOrg
GITHUB_API_ACCESS_TOKEN=_githubAPIToken
GITHUB_APP_CLIENT_ID=_githubClientId
GITHUB_APP_CLIENT_SECRET=_githubClientSecret
GITHUB_APP_CALLBACK_URL=_githubCallback
```

The placeholders in the above code are :
* **_pgUserName:** The username used to access PostgresDB
* **_pgPassword:** The password used to access PostgresDB
* **_randomkey1:** The first of two random keys that are used to encrypt session key. Choose any value that suits you
* **_userName:** The team username you want to use for the basic auth to access the application.
* **_password:** the team password you want to use for the basic auth to access the application
* **_githubOrg:** The specific github org that you want to restrict github based login to. Currently only supports one org.
* **_githubAPIToken:** The access token to access the github API
* **_githubClientId:** the clientID provided when you register your nabu application with Github.
* **_githubClientSecret:** the secret provided when you register your nabu application with Github.
* **_githubCallback:** the callback URL you specify when you register your nabu application with Github.
