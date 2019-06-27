"""
author songjie
"""
from flask_login import UserMixin
from app import login_manager
from sqlalchemy import Column, Integer, String

from werkzeug.security import generate_password_hash, check_password_hash

from app.models.base import Base


class User(UserMixin, Base):
    """
    id:
    nickname: 昵称、用户名
    phone_number: 电话号码
    email: 邮箱
    """
    # __tablename__ 用以指定表名
    __tablename__ = 'user'
    # __bind_key__ = 'fisher'

    id = Column(Integer, primary_key=True)
    nickname = Column(String(24), nullable=False)
    phone_number = Column(String(11), unique=True)
    email = Column(String(50), unique=True, nullable=False)

    _password = Column('password', String(255))

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        self._password = generate_password_hash(value)

    def check_password(self, raw):
        if not self._password:
            return False
        return check_password_hash(self._password, raw)


@login_manager.user_loader
def get_user(uid):
    return User.query.get(int(uid))
