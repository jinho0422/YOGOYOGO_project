from flask import Blueprint, request,render_template,flash,redirect,url_for
from flask import current_app as current_app

from app.module import dbModule
import json
import datetime

home=Blueprint('home',__name__,url_prefix='/')
def json_default(value): 
    if isinstance(value, datetime.date): 
        return value.strftime('%Y-%m-%d')


@home.route('/home',methods=['GET'])
def load_image():
    db_class=dbModule.Database()

    sql="select r.*,count(*) steps from recipes r,steps s \
        where r.recipe_id=s.recipe_id group by r.recipe_id \
            order by favorites desc limit 0,7"
    row=db_class.executeAll(sql)
    print(row)
    response=current_app.response_class(
        response=json.dumps(row,default=json_default),
        status=200,
        mimetype='application/json'
    )
    return response

@home.route('/category',methods=['GET'])
def search():
    category=request.args.get('category')
    print(category)
    db_class=dbModule.Database()
    sql="select r.*,count(*) steps from recipes r,steps s \
        where nation_name=%s and r.recipe_id=s.recipe_id\
            group by r.recipe_id order by r.favorites desc"
    row=db_class.executeAll(sql,category)
    print(row)
    response=current_app.response_class(
        response=json.dumps(row,default=json_default),
        status=200,
        mimetype='application/json'
    )
    return response

# @home.route('/category/<category>',methods=['GET'])
# def search(category):
#     #category=request.args.get('category')
#     print(category)
#     db_class=dbModule.Database()
#     sql="select r.*,count(*) steps from recipes r,steps s \
#         where nation_name=%s and r.recipe_id=s.recipe_id\
#             group by r.recipe_id order by r.favorites desc"
#     row=db_class.executeAll(sql,category)
#     print(row)
#     response=current_app.response_class(
#         response=json.dumps(row,default=json_default),
#         status=200,
#         mimetype='application/json'
#     )
#     return response