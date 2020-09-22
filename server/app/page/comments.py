from flask import Blueprint, request,render_template,flash,redirect,url_for
from flask import current_app as current_app

from app.module import dbModule
import json
import datetime

comments=Blueprint('comments',__name__,url_prefix='/comments')

def json_default(value): 
    if isinstance(value, datetime.date): 
        return value.strftime('%Y-%m-%d')

@comments.route('/<uid>/recipe',methods=['GET','POST','DELETE'])
def myrecipe_comment(uid):
    db_class=dbModule.Database()
    sql="select * from recipe_comments where uid=%s order by created_at desc"
    recipe_row=db_class.executeAll(sql,uid)
    #print(recipe_row)
    response=current_app.response_class(
    response=json.dumps(recipe_row,default=json_default),
    status=200,
    mimetype='application/json'
    )
    return response


@comments.route('/<uid>/posts',methods=['GET','POST','DELETE'])
def mypost_comment(uid):
    db_class=dbModule.Database()
    sql="select * from post_comments where uid=%s order by created_at desc"
    post_row=db_class.executeAll(sql,uid)
    #print(post_row)
    response=current_app.response_class(
    response=json.dumps(post_row,default=json_default),
    status=200,
    mimetype='application/json'
    )
    return response


@comments.route('/<uid>',methods=['GET'])
def allcomments(uid):
    print(uid)
    db_class=dbModule.Database()
    #post_row=redirect(url_for('comments.post_comment',uid=uid))
    post_row=mypost_comment(uid)
    post=post_row.response[0].decode('utf-8')
    print(post_row.response[0].decode('utf-8'))
    #recipe_row=redirect(url_for('comments.recipe_comment',uid=uid))
    recipe_row=myrecipe_comment(uid)
    recipe=recipe_row.response[0].decode('utf-8')
    data={"posts":json.loads(post),"recipe":json.loads(recipe)}
    response=current_app.response_class(
        response=json.dumps(data,default=json_default),
        status=200,
        mimetype='application/json'
    )
    return response

@comments.route('recipe/<rid>',methods=['GET','POST','DELETE'])
def recipe_comment(rid):
    if request.method=='GET':
        db_class=dbModule.Database()
        sql="select * from recipe_comments where recipe_id=%s order by created_at desc"
        post_row=db_class.executeAll(sql,rid)
        #print(post_row)
        response=current_app.response_class(
        response=json.dumps(post_row,default=json_default),
        status=200,
        mimetype='application/json'
        )
        return response

@comments.route('<uid>/recipe/<cid>',methods=['DELETE'])
def delete_myrecipe(uid,cid):
    if request.method=='DELETE':
            db_class=dbModule.Database()
            sql="delete from recipe_comments where id=%s and uid=%s"
            post_row=db_class.execute(sql,(cid,uid))
            db_class.commit()
            #print(post_row)
            response=current_app.response_class(
            response=json.dumps(post_row,default=json_default),
            status=200,
            mimetype='application/json'
            )
            return response

@comments.route('<uid>/recipe/<rid>',methods=['POST'])
def add_myrecipe(uid,rid):
    if request.method=='POST':
        #comment=request.args.get('comment')
        comment=request.data
        # 바디/ params

        print(comment)
        db_class=dbModule.Database()
        sql="insert into recipe_comments(recipe_id,uid,comments) value(%s,%s,%s);"
        row=db_class.execute(sql,(rid,uid,comment))
        print(row)
        db_class.commit()
        response=current_app.response_class(
        status=200,
        mimetype='application/json'
        )
        return response

    
        

@comments.route('posts/<pid>',methods=['GET'])
def post_comment(pid):
    db_class=dbModule.Database()
    sql="select * from post_comments where post_id=%s order by created_at desc"
    post_row=db_class.executeAll(sql,pid)
    #print(post_row)
    response=current_app.response_class(
    response=json.dumps(post_row,default=json_default),
    status=200,
    mimetype='application/json'
    )
    return response


@comments.route('<uid>/posts/<cid>',methods=['DELETE'])
def delete_mypost(uid,cid):
    if request.method=='DELETE':
            db_class=dbModule.Database()
            sql="delete from post_comments where id=%s and uid=%s"
            post_row=db_class.execute(sql,(cid,uid))
            db_class.commit()
            #print(post_row)
            response=current_app.response_class(
            response=json.dumps(post_row,default=json_default),
            status=200,
            mimetype='application/json'
            )
            return response

@comments.route('<uid>/posts/<pid>',methods=['POST'])
def add_mypost(uid,pid):
    if request.method=='POST':
        #comment=request.args.get('comment')
        comment=request.data
        # 바디/ params

        print(comment)
        db_class=dbModule.Database()
        sql="insert into post_comments(post_id,uid,comments) value(%s,%s,%s);"
        row=db_class.execute(sql,(pid,uid,comment))
        print(row)
        db_class.commit()
        response=current_app.response_class(
        status=200,
        mimetype='application/json'
        )
        return response
