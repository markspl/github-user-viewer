![Screenshot](img/screenshot.png)

# GitHub User Viewer

Shows (for now) dev's information which is fetched from GitHub API.

![React version](https://img.shields.io/github/package-json/dependency-version/markspl/github-user-viewer/react?logo=react) ![React Route version](https://img.shields.io/github/package-json/dependency-version/markspl/github-user-viewer/react-router-dom?logo=react) ![React Bootstrap version](https://img.shields.io/github/package-json/dependency-version/markspl/github-user-viewer/bootstrap?logo=bootstrap) ![React Bootstrap version](https://img.shields.io/github/package-json/dependency-version/markspl/github-user-viewer/react-bootstrap?logo=bootstrap)

- - -

## How-To

1. Clone repository `git clone https://github.com/markspl/github-user-viewer.git`
2. Install required packages `npm i`
3. Start `npm run start`

### Addresses

- `/` and `/user/` - Homepage
- `/user/:username/` - GitHub User information. For example, `/user/markspl` ([localhost:3000/user/markspl](http://localhost:3000/user/markspl))

### To-Do
- Create a text input to search user
- Show more information about selected repository
- Show different information if selected user is actually a group
- ...

- - -

### Screenshots

![Screenshot while loading](img/loading.png)
*Placeholders while loading information from API*

![GitHub/githubtraining](img/githubtraining.png)
*The look how The GitHub Training Team organization (not a profile) is shown. Max 30 repositories.*