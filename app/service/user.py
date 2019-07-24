"""
Created by yy on 2019-07-22
"""
from app import db
from app.models.user import User


class UserService:
    """
        User服务层
    """

    @classmethod
    def save_user(cls, user_form):
        """
        用户存储
        :param user_form:
        :return:
        """
        with db.auto_commit():
            user = User()
            user_form.populate_obj(user)
            db.session.add(user)
