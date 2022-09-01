from src.modules.interfaces import Module


class Gradescope(Module):
    pass


if __name__ == '__main__':
    test = Gradescope()
    print(test.name, test.user, test.password)
    print('a')
