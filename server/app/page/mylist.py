from flask import Blueprint, request,render_template,flash,redirect,url_for
from flask import current_app as current_app

from app.module import dbModule
import json
import datetime

mylist=Blueprint('mylist',__name__,url_prefix='/mylist')

def json_default(value): 
    if isinstance(value, datetime.date): 
        return value.strftime('%Y-%m-%d')

@mylist.route('<uid>/favorite',methods=['GET','POST','DELETE'])
def favorite_list(uid):
    if request.method=='GET':
        db_class=dbModule.Database()
        #uid=request.args.get('uid')
        sql="select r.*,count(*) steps from favorites f, recipes r,steps s \
            where f.recipe_id=r.recipe_id and r.recipe_id=s.recipe_id\
                 and f.uid=%s group by r.recipe_id order by r.favorites desc"
        row=db_class.executeAll(sql,uid)
        print(row)
        response=current_app.response_class(
            response=json.dumps(row,default=json_default),
            status=200,
            mimetype='application/json'
        )
        return response

@mylist.route('<uid>/favorite/<rid>',methods=['POST','DELETE'])
def add_favorite(uid,rid):
    if request.method=='POST':
        db_class=dbModule.Database()
        # uid=request.args.get('uid')
        # rid=request.args.get('rid')
        sql="insert into favorites value(%s,%s)"
        row=db_class.execute(sql,(uid,rid))
        sql="update recipes set favorites=favorites+1 where recipe_id=%s"
        db_class.execute(sql,rid)


        db_class.commit()
        response=current_app.response_class(
            status=200,
            mimetype='application/json'
        )
        return response
    
    elif request.method=='DELETE':
        db_class=dbModule.Database()
        # uid=request.args.get('uid')
        # rid=request.args.get('rid')
        sql="delete from favorites where uid=%s and recipe_id=%s"
        row=db_class.execute(sql,(uid,rid))
        sql="update recipes set favorites=favorites-1 where recipe_id=%s"
        db_class.execute(sql,rid)
        db_class.commit()

        response=current_app.response_class(
            status=200,
            mimetype='application/json'
        )
        return response
        

@mylist.route('/<uid>/follow',methods=['GET'])
def myfollow_list(uid):
    ###
    if request.method=='GET':
        print(uid)
        db_class=dbModule.Database()
        sql="select * from follows where uid=%s"
        row=db_class.executeAll(sql,uid)
        print(row)
        response=current_app.response_class(
            response=json.dumps(row),
            status=200,
            mimetype='application/json'
        )
        return response
@mylist.route('/<uid>/follow/<fid>',methods=['POST','DELETE'])
def add_myfollower(uid,fid):
    if request.method=='POST':
        print(uid)
        db_class=dbModule.Database()
        sql="select uid from users where id=%s"
        row=db_class.executeOne(sql,fid)
        fid=str(row['uid'])
        row=sql="insert into follows value(%s,%s)"
        
        db_class.execute(sql,(uid,fid))
        db_class.commit()
        response=current_app.response_class(
            status=200,
            mimetype='application/json'
        )
        return response

    elif request.method=='DELETE':
        print(uid)
        db_class=dbModule.Database()
        sql="select uid from users where id=%s"
        row=db_class.executeOne(sql,fid)
        fid=str(row['uid'])
        sql="delete from follows where uid=%s and fid=%s"
        
        db_class.execute(sql,(uid,fid))
        db_class.commit()
        response=current_app.response_class(
            status=200,
            mimetype='application/json'
        )
        return response


@mylist.route('/<uid>/posts',methods=['GET'])
def post_comment(uid):
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

@mylist.route('/<uid>/myrecipe',methods=['GET'])
def myrecipe(uid):
    if request.method=='GET':
        # uid=request.args.get('uid')
        db_class=dbModule.Database()
        sql="select r.*,count(*) steps from recipes r,steps s \
            where r.recipe_id=s.recipe_id and uid=%s\
                group by r.recipe_id order by r.favorites desc"
        row=db_class.executeAll(sql,uid)
        print(row)
        response=current_app.response_class(
            response=json.dumps(row,default=json_default),
            status=200,
            mimetype='application/json'
        )
        return response
