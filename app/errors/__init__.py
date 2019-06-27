"""
author songjie
"""
from flask import render_template


def register_error(app):
    @app.errorhandler(404)
    def page_not_found(error):
        return render_template('error/error.html', code='404'), 404

    @app.errorhandler(500)
    def page_error(error):
        return render_template('error/error.html', code='500'), 500
