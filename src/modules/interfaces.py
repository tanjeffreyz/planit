import os


class Module:
    def __init__(self):
        """Retrieves username and password from environment secrets."""

        self.name = self.__class__.__name__.upper()
        self.user = os.environ[self.name + '_USER']
        self.password = os.environ[self.name + '_PASSWORD']

