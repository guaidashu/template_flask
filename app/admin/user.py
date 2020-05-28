"""
author songjie
"""
from app.admin import admin


@admin.route('/user/index/<uuid>')
def index(uuid):
    return uuid
