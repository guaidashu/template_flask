"""
author songjie
"""
from flask import request

from app.admin import admin


@admin.route('/user/index/<uuid>')
def index(uuid):
    return uuid
