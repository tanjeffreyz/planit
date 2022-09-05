<div align="center">
    <img src="src/resources/planit_logo.png" height="50px" />
    <h1>Planit</h1>
</div>

Planit is an assignment tracker for students that compiles due dates into an interactive, minimalist calendar. Because 
some online homework platforms such as Gradescope don't have an API for students, web scraping is required to retrieve 
information about assignments. **HTTPs requests** are used alongside `BeautifulSoup` to perform this web scraping, 
which is automatically executed many times a day using **GitHub Actions**.

<div align="center">
    <h2>Setup Instructions</h2>
</div>

1. Log into GitHub or <a href="https://github.com/join"><b>create a new GitHub account</b></a>.

2. Click <a href="#"><img src="docs/use_this_template.png" height="20px" /></a> at the top of this page, 
which should open a prompt in a new page.

3. Enter a name for the new repository. Keep in mind that this name will be used in the URL for your personal 
<b>Planit</b> webpage, so it's best to keep it short and memorable, like "planit". 
Then, click <a href="#"><img src="docs/create_repo_from_template.png" height="20px" /></a>.

4. Visit your new repository's secrets at the following link:
```
https://github.com/YOUR_USERNAME/REPOSITORY_NAME/settings/secrets/actions
```

5. For each homework platform you use, create two new GitHub secrets: one for your username, one for your password. 
A new secret can be created by clicking <a href="#"><img src="docs/new_repo_secret.png" height="20px" /></a>. 
For the secrets' names, you may only use the ones listed below. 
<a href="https://docs.github.com/en/actions/security-guides/encrypted-secrets"><b>Click here to learn more about GitHub secrets</b></a>.

<table align="center">
    <tr><th align="center">Username</th><th align="center">Password</th></tr>
    __SECRET_NAMES__
</table>

6. That's it! <b>Planit</b> will start retrieving assignment information roughly once every hour and update your 
personal planner at the link below, which you can visit on any of your devices.

```
https://YOUR_USERNAME.github.io/REPOSITORY_NAME
```
