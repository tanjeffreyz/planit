<div align="center">
    <img src="src/resources/planit_logo.png" height="50px" />
    <h1>Planit</h1>
</div>

Planit is an assignment tracker for students that compiles due dates into an interactive, minimalist calendar. Because some online homework platforms such as Gradescope don't have an API for students, web scraping is required to retrieve information about assignments. **HTTPs requests** are used alongside `BeautifulSoup` to perform this web scraping, which is automatically executed many times a day using **GitHub Actions**.

<div align="center">
    <h2>Setup Instructions</h2>
</div>

<ol>
    <li>
        Log into GitHub or <a href="https://github.com/join"><b>create a new GitHub account</b></a>.
    </li>
    <li>
        Click <a href="#"><img src="docs/use_this_template.png" height="20px" /></a> at the top of this page, which should open a prompt in a new page.
    </li>
    <li>
        Enter a name for the new repository. Keep in mind that this name will be used in the URL for your personal <b>Planit</b> webpage, so it's best to keep it short and memorable, like "planit". Then, click <a href="#"><img src="docs/create_repo_from_template.png" height="20px" /></a>.
    </li>
    <li>
        Visit the link below by filling in your GitHub username and the new repository's name:
        <pre>https://github.com/{your_username}/{repository_name}/settings/secrets/actions</pre>
    </li>
    <li>
        For each homework platform you use, create two new GitHub secrets: one for your username, one for your password. 
        A new secret can be created by clicking <a href="#"><img src="docs/new_repo_secret.png" height="20px" /></a>. 
        For the secrets' names, you may only use the ones listed below. 
        <a href="https://docs.github.com/en/actions/security-guides/encrypted-secrets"><b>Click here to learn more about GitHub secrets</b></a>.
        <br><br>
        <table align="center">
            <tr><th align="center">Username</th><th align="center">Password</th></tr>
            <tr align="center"><td>GRADESCOPE_USER</td><td>GRADESCOPE_PASSWORD</td></tr>
        </table>
    </li>
</ol>
