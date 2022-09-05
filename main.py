import os
from src.common import utils
from src.modules.interfaces import Module
from src.modules import *


# Compile assignments into a list
assignments = {}
modules = [
    Gradescope()
]
for module in modules:
    module.run(assignments)

# Update GitHub workflow with all environment variables
workflow_template = utils.load_template('workflow_template.yml')
envs = [x + ': ${{ secrets.' + x + ' }}' for x in Module.envs]
workflow = workflow_template.replace(
    '__ENV__',
    ('\n' + ' ' * 8).join(envs)
)
with open(os.path.join('.github', 'workflows', 'main.yml'), 'w') as file:
    file.write(workflow)

# Update README.md with valid secret names
readme_template = utils.load_template('readme_template.md')
table_rows = []
for i in range(len(Module.envs) // 2):
    username = f'<td>{Module.envs[2*i]}</td>'
    password = f'<td>{Module.envs[2*i+1]}</td>'
    table_rows.append(f'<tr align="center">{username}{password}</tr>')
readme = readme_template.replace(
    '__SECRET_NAMES__',
    ('\n' + ' ' * 4).join(table_rows)
)
with open('README.md', 'w') as file:
    file.write(readme)

# Save the list to a JavaScript file for Planit to import later
utils.save_data('assignments', assignments)
