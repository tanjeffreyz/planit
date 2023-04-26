import os
import json
import dateparser


DATA_DIR = 'data'
TEMPLATES_DIR = os.path.join('src', 'resources', 'templates')


def get_assignment_dict(title, course, due_date, link, submitted):
    return {
        'title': title,
        'course': course,
        'dueDate': dateparser.parse(due_date).isoformat(),
        'link': link,
        'submitted': submitted
    }


def load_template(name):
    with open(os.path.join(TEMPLATES_DIR, name), 'r') as file:
        return file.read()


def save_data(var_name, obj):
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    target = os.path.join(DATA_DIR, var_name + '.js')
    with open(target, 'w') as file:
        file.write(f'{var_name} = {json.dumps(obj, indent=2)};\n')
    save_ical(obj)

def save_ical(var_name, obj):
    target = os.path.join(DATA_DIR, var_name + '.ics')
    with open(target, 'w') as file:
        # print icalendar header info
        file.write('BEGIN:VCALENDAR\n')
        file.write('VERSION:2.0\n')
        file.write('PRODID:-//Gradescope//NONSGML Assignments//EN\n')

        # loop through assignments in each class
        for course in list.values():
            for assignment in course:
                # create event entry
                file.write('BEGIN:VEVENT\n')
                file.write('SUMMARY:' + assignment['title'] + '\n')
                file.write('DTSTART:' + assignment['dueDate'].replace('-','').replace(':','') + '\n')
                file.write('LOCATION:' + assignment['course'] + '\n')
                file.write('URL:' + assignment['link'] + '\n')
                file.write('END:VEVENT\n')
        file.write('END:VCALENDAR')
