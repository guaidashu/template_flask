"""
author songjie
"""

from threading import Thread
from flask import current_app, render_template
from flask_mail import Message, Mail

mail = Mail()


def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
        except Exception as e:
            pass


def send_email(to, subject, template, **kwargs):
    app = current_app._get_current_object()
    msg = Message('[邮箱测试]' + ' ' + subject,
                  sender=current_app.config['MAIL_USERNAME'], recipients=[to])
    # msg.body = render_template(template + '.txt', **kwargs)
    msg.html = render_template(template + '.html', **kwargs)
    thr = Thread(target=send_async_email, args=[app, msg])
    thr.start()
    return thr


def send_test(message):
    msg = Message('测试邮件', sender=current_app.config['MAIL_USERNAME'], body=message, recipients=['1023767856@qq.com'])
    mail.send(msg)
