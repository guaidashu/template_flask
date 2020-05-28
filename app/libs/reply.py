"""
author songjie
"""
import json

from flask import Response

__all__ = ['Reply']


class Reply(object):
    _result = None
    _code = None
    _msg = None
    _data_type = 1

    def __init__(self, **kwargs):
        pass

    def __call__(self, *args, **kwargs):
        self._result = kwargs.setdefault("result", "")
        self._code = kwargs.setdefault("code", 0)
        self._msg = kwargs.setdefault("msg", "")
        return self.json()

    @property
    def result(self):
        return self._result

    @result.setter
    def result(self, value):
        self._result = value

    @property
    def code(self):
        return self._code

    @code.setter
    def code(self, value):
        self._code = value

    @property
    def msg(self):
        return self._msg

    @msg.setter
    def msg(self, value):
        self._msg = value

    @property
    def data_type(self):
        return self._data_type

    @data_type.setter
    def data_type(self, value):
        self._data_type = value

    @classmethod
    def json(cls):
        """
        :return:
        """
        data = {
            "result": cls._result,
            "code": cls._code,
            "msg": cls._msg
        }
        data = json.dumps(data, default=cls.object_to_dict)
        cls.init()
        return Response(data, mimetype="application/json;charset=utf-8")

    @classmethod
    def response(cls, data):
        data = json.dumps(data, default=cls.object_to_dict)
        return Response(data, mimetype="application/json;charset=utf-8")

    @classmethod
    def object_to_dict(cls, value):
        data = {}
        if Reply._data_type == 1:
            return value.__dict__
        if Reply._data_type == 3:
            return value.dict
        try:
            for column in value.__table__.columns:
                data[column.name] = getattr(value, column.name)
        except AttributeError:
            data = value.__dict__
        return data

    @classmethod
    def success(cls, result="", code=0, data_type=1):
        """
        :param data_type:
        :param code:
        :param result:
        :return:
        """
        cls._data_type = data_type
        if not result:
            result = cls._result
        cls._code = code
        cls._result = result
        cls._msg = ""
        return cls.json()

    @classmethod
    def error(cls, msg="", code=1, data_type=1):
        """
        :param data_type:
        :param code:
        :param msg:
        :return:
        """
        cls._data_type = data_type
        cls._code = code
        cls._msg = msg
        cls._result = ""
        return cls.json()

    @classmethod
    def init(cls):
        cls._code = 0
        cls._result = ""
        cls._msg = ""
        cls._data_type = 1
