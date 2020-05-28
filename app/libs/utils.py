"""
Create by yy on 2020/5/28
"""

from flask import current_app

__all__ = "Utils"


class Utils(object):
    def __init__(self):
        pass

    def __del__(self):
        pass

    @staticmethod
    def get_title(title):
        """
        获取页面标题(会根据配置文件的前缀添加一个前缀)
        :param title:
        :return:
        """
        return title + " - " + current_app.config['WEB_TITLE_PREFIX']

    @staticmethod
    def get_offset_pos(page, size):
        """
        根据传入的page 计算返回一个 offset的值，用于分页 开始取数据 位置
        :return:
        """
        return (int(page) - 1) * int(size)

    @staticmethod
    def get_page_json(data, num, page):
        return {
            "total": num,
            "data": data,
            "page": page
        }

    @staticmethod
    def pagination(page, size, func):
        """
        分页函数
        :param page: 要取得页码
        :param size: 每页的数据条数
        :param func: 回调函数，此函数应返回一个模型对象，会给此函数 传回一个 offset 用于
        :return:
        """
        offset = Utils.get_offset_pos(page, size)
        model = func(None)
        num = model.count()
        category_list = model.offset(offset).limit(size).all()
        return Utils.get_page_json(category_list, num, page)
