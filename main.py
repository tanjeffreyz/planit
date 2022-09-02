from src.common import utils
from src.modules import *


# Compile assignments into list
assignments = []
modules = [
    Gradescope()
]
for module in modules:
    module.run(assignments)

utils.save_output(assignments, 'assignments')
