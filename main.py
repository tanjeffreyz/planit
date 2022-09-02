import os
from src.common import utils
from src.modules.interfaces import Module
from src.modules import *


# Compile assignments into a list
assignments = []
modules = [
    Gradescope()
]
for module in modules:
    module.run(assignments)

# Update GitHub workflow with environment variables
with open(os.path.join('resources', 'workflow_template.yml'), 'r') as file:
    template = file.read()
    pairs = [x + ': {{ secrets.' + x + ' }}' for x in Module.envs]
    workflow = template.replace(
        '__ENV__',
        ('\n' + ' ' * 8).join(pairs)
    )
with open(os.path.join('.github', 'workflows', 'main.yml'), 'w') as file:
    file.write(workflow)

# Save the list to a JSON file for Planit to access later
utils.save_output(assignments, 'assignments')
