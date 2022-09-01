import os
import requests
from bs4 import BeautifulSoup


class Module:
    def __init__(self):
        """Retrieves username and password from environment secrets."""

        self.name = self.__class__.__name__.upper()
        self.user = os.environ[self.name + '_USER']
        self.password = os.environ[self.name + '_PASSWORD']
        self.session = requests.Session()
        self.successful = False

    def start(self):
        """Logs into the online classroom webpage."""

        raise NotImplementedError

    def main(self, catalog):
        """Parses the webpage for assignments and adds them to CATALOG."""

        raise NotImplementedError

    def finish(self):
        """Any final clean up steps."""

        pass

    #################################
    #       Helper Functions        #
    #################################
    def parse_html(self, html):
        return BeautifulSoup(html, 'html.parser')

    def success(self):
        self.successful = True
