"""
author songjie
"""
from app.admin import admin


@admin.route('/login/index')
def test():
    return 'admin/login/index'
