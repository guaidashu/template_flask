"""
author songjie
"""
from wtforms import Form, StringField
from wtforms.validators import Length, DataRequired, Email, ValidationError

from app.models.user import User


class RegisterForm(Form):
    nickname = StringField(
        validators=[DataRequired(message="用户名不能为空"), Length(min=2, max=16, message="昵称至少2个字符，最多16个字符")])
    phone_number = StringField(validators=[DataRequired(message="请输入正确的电话号码"), Length(min=11, max=11)])
    password = StringField(validators=[DataRequired(message="密码不能为空"), Length(6, 32, message="密码应该大于等于6位小于等于32位")])
    email = StringField(validators=[DataRequired(), Length(8, 64), Email(message="电子邮箱不符合规范")])

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError("电子邮箱已被注册")

    def validate_phone_number(self, field):
        if User.query.filter_by(phone_number=field.data).first():
            raise ValidationError("手机号码已被注册")


class LoginForm(Form):
    email = StringField(validators=[DataRequired(), Length(8, 64), Email(message="电子邮箱不符合规范")])
    password = StringField(validators=[DataRequired(message="账号或密码不能为空"), Length(6, 32, message="密码应该大于等于6位小于等于32位")])
