"""
author songjie
"""
from flask import Blueprint

__all__ = ['api']

api = Blueprint('api', __name__, url_prefix="/api")
