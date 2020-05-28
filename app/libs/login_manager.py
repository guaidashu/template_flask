"""
Create by yy on 2020/5/28
"""
from flask_login import LoginManager

from app.libs.reply import Reply
from app.models.user import User

login_manager = LoginManager()

__all__ = ['unauthorized_handler', 'get_user']


@login_manager.unauthorized_handler
def unauthorized_handler():
    return Reply.error("请先登录")


@login_manager.user_loader
def get_user(uid):
    return User.query.get(int(uid))
