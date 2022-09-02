<div align="center">
    <h1>Planit Backend</h1>
</div>

This is a Python backend for Planit that periodically compiles and hosts assignment information. Because some online homework platforms such as Gradescope don't 
have an official API, web scraping is required to retrieve information about assignments. **HTTPs requests** are used alongside `BeautifulSoup` to perform this web scraping,
which is automatically executed many times a day using **GitHub Actions**.

<div align="center">
    <h2>Setup Instructions</h2>
</div>
