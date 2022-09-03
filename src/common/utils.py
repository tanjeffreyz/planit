import os
import json


DATA_DIR = 'data'
JSON_EXT = '.json'


def get_assignment_dict(title, course, due_date, link, submitted=False):
    return {
        'title': title,
        'course': course,
        'dueDate': due_date,
        'link': link,
        'submitted': submitted
    }


def save_output(obj, path: str):
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    if not path.endswith(JSON_EXT):
        path += JSON_EXT
    target = os.path.join(DATA_DIR, path)
    with open(target, 'w') as file:
        json.dump(obj, file, indent=2)
