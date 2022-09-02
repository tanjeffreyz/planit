import os
import requests
from bs4 import BeautifulSoup


class Module:
    def __init__(self):
        """Retrieves username and password from environment secrets."""

        self.name = self.__class__.__name__.upper()

        try:
            self.user = os.environ[self.name + '_USER']
            self.password = os.environ[self.name + '_PASSWORD']
            self.valid = True
        except KeyError as e:
            self.valid = False

        self.session = requests.Session()
        self.initialized = False

    def init(self):
        """Sets up the web scraper."""

        raise NotImplementedError

    def run(self, assignments):
        if self.valid and self.initialized:
            self._main(assignments)

    def _main(self, assignments):
        """Parses the webpage for assignments and adds them to ASSIGNMENTS."""

        raise NotImplementedError

    #################################
    #       Helper Functions        #
    #################################
    @staticmethod
    def parse_html(html):
        return BeautifulSoup(html, 'html.parser')
