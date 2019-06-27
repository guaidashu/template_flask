"""
author songjie
"""
from flask import Flask
from flask_login import LoginManager
from app.libs.email import mail

from app.errors import register_error

from app.models.base import db

login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object("config.settings")
    app.config.from_object("config.secure")
    # 注册数据库
    db.init_app(app)
    db.create_all(app=app)
    # 注册登录插件
    login_manager.init_app(app)
    # 注册邮件插件
    mail.init_app(app)
    register_blueprint(app)
    register_error(app)
    return app


def register_blueprint(app):
    from app.api import api
    from app.admin import admin
    app.register_blueprint(api)
    app.register_blueprint(admin)
