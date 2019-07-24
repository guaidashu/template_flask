"""
Create by yy on 2019-07-24
"""
from flask import request

from app.api import api
from app.forms.user import LoginForm, RegisterForm
from app.libs.reply import Reply
from app.models.user import User
from app.service.user import UserService


@api.route("/user/login", methods=['POST'])
def login():
    """
    登录控制器
    :return:
    """
    form = LoginForm(request.values)
    if not form.validate():
        return Reply.error(form.errors)
    username = form.username.data.strip()
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(form.password.data.strip()):
        return Reply.error("用户名或密码错误")
    return Reply.success({
        "token": "star"
    })


@api.route("/user/register", methods=['GET'])
def register():
    """
    注册控制器
    :return:
    """
    form = RegisterForm(request.values)
    if not form.validate():
        return Reply.error(form.errors)
    UserService.save_user(form)
    return Reply.success("注册成功")
