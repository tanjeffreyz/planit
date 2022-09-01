def get_assignment_dict(name, course, due_date, done=False):
    return {
        'name': name,
        'course': course,
        'dueDate': due_date,
        'done': done
    }
