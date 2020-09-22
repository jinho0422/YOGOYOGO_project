from flask import Blueprint, request,render_template,flash,redirect,url_for
from flask import current_app as current_app

from app.module import dbModule
import json
import datetime

community=Blueprint('community',__name__,url_prefix='/community')
def json_default(value): 
    if isinstance(value, datetime.date): 
        return value.strftime('%Y-%m-%d')


@community.route('/recipe',methods=['GET'])
def recipe():

    db_class=dbModule.Database()

    sql="select r.* from recipes r,steps s where r.recipe_id=s.recipe_id\
        group by r.recipe_id order by r.created_at desc"
    row=db_class.executeAll(sql)
    print(row)
    response=current_app.response_class(
        response=json.dumps(row,default=json_default),
        status=200,
        mimetype='application/json'
    )
    return response

