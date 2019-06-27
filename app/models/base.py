"""
author songjie
"""
from datetime import datetime
from contextlib import contextmanager
from sqlalchemy import Column, Integer, SmallInteger
from flask import current_app
from flask_sqlalchemy import SQLAlchemy as _SQLAlchemy, BaseQuery

__all__ = ['db', 'Base']


class SQLAlchemy(_SQLAlchemy):
    @contextmanager
    def auto_commit(self, throw=True):
        """
        根据 上下文管理器 contextmanager 装饰器定义一个上下文自动提交方法，
        节省掉 try except操作和commit操作
        :param throw:
        :return:
        """
        try:
            yield
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            current_app.logger.exception('%r' % e)
            if throw:
                raise e


class Query(BaseQuery):
    def filter_by(self, **kwargs):
        if 'status' not in kwargs.keys():
            kwargs['status'] = 1
        return super(Query, self).filter_by(**kwargs)


db = SQLAlchemy(query_class=Query)


# class BaseMixin(object):
#     def __getitem__(self, key):
#         return getattr(self, key)


class Base(db.Model):
    # 加上 __abstract__ 为True之后， sqlalchemy将不会创建base表， 否则会认为我们想要创建一个交base的表
    __abstract__ = True
    create_time = Column('create_time', Integer)
    # status 属性代表是否被删除， (软删除规律)默认为1，表示没有被删除
    status = Column(SmallInteger, default=1)

    def __init__(self):
        self.create_time = int(datetime.now().timestamp())

    @property
    def create_datetime(self):
        if self.create_time:
            return datetime.fromtimestamp(self.create_time)
        else:
            return None

    def delete(self):
        self.status = 0

    def set_attrs(self, attrs):
        for key, value in attrs.items():
            if hasattr(self, key) and key != 'id':
                setattr(self, key, value)


class BaseNoCreateTime(db.Model):
    __abstract__ = True
    status = Column(SmallInteger, default=1)
