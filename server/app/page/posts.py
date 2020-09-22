from flask import Blueprint, request,render_template,flash,redirect,url_for
from flask import current_app as current_app

from app.module import dbModule
import json
import datetime
from app.page.mylist import post_comment

posts=Blueprint('posts',__name__,url_prefix='/posts')
def json_default(value): 
    if isinstance(value, datetime.date): 
        return value.strftime('%Y-%m-%d')

@posts.route('/',methods=['GET','POST'])
def allpost():
    if request.method=='GET':
        db=dbModule.Database()
        sql='select * from posts order by created_at desc'
        row=db.executeAll(sql)
        response=current_app.response_class(
        response=json.dumps(row,default=json_default),
        status=200,
        mimetype='application/json'
        )
        return response

@posts.route('/<uid>',methods=['POST'])
def mypost(uid):
    # if request.method=='GET':
    #     return post_comment(uid)
    #     #return redirect(url_for('mylist.post_comments'))

    db=dbModule.Database()
    title=request.args.get('title')
    contents=request.args.get('contents')
    sql='insert into posts(title,contents,uid) value(%s,%s,%s)'
    row=db.execute(sql,(title,contents,uid))
    db.commit()
    response=current_app.response_class(
    status=200,
    mimetype='application/json'
    )
    return response

@posts.route('/<pid>',methods=['GET'])
def show_posts(pid):
    db=dbModule.Database()
    sql='select * from posts where post_id=%s order by created_at desc'
    row=db.executeAll(sql,pid)

    response=current_app.response_class(
    response=json.dumps(row,default=json_default),
    status=200,
    mimetype='application/json'
    )
    return response
