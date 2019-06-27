"""
author songjie
"""
from flask import Blueprint

admin = Blueprint('admin', __name__, url_prefix='/admin', static_folder="../../static",
                  template_folder="../../templates")

from app.admin import user
from app.admin import login
