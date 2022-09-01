from src.modules.interfaces import Module


class Gradescope(Module):
    def login(self):
        # Extrac authentication token from login page
        login_page_html = self.session.get("https://www.gradescope.com/")
        login_page = self.parse_html(login_page_html.text)
        token = None
        for form in login_page.find_all('form'):
            if form.get('action') == '/login':
                for input_element in form.find_all('input'):
                    if input_element.get('name') == 'authenticity_token':
                        token = input_element.get('value')

        if token is not None:
            # Login by imitating JSON payload found by:
            # Inspect -> Network -> Enter info and login -> View 'login' request payload
            login_payload = {
                'utf8': '✓',
                'authenticity_token': token,
                'session[email]': self.user,
                'session[password]': self.password,
                'session[remember_me]': 0,
                'commit': 'Log In',
                'session[remember_me_sso]': 0
            }
            login_response = self.session.post(
                'https://www.gradescope.com/login',
                params=login_payload
            )
            if login_response.status_code == 200:
                self.success()


if __name__ == '__main__':
    test = Gradescope()
    test.login()
