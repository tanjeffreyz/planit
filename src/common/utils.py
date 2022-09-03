import os
import json


DATA_DIR = 'data'


def get_assignment_dict(title, course, due_date, link, submitted=False):
    return {
        'title': title,
        'course': course,
        'dueDate': due_date,
        'link': link,
        'submitted': submitted
    }


def save_data(var_name, obj):
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    target = os.path.join(DATA_DIR, var_name + '.js')
    with open(target, 'w') as file:
        file.write(f'{var_name} = {json.dumps(obj, indent=2)};')
