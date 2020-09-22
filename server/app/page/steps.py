from flask import Blueprint, request,render_template,flash,redirect,url_for
from flask import current_app as current_app

from app.module import dbModule
import json
import datetime

steps=Blueprint('steps',__name__,url_prefix='/steps')

def json_default(value): 
    if isinstance(value, datetime.date): 
        return value.strftime('%Y-%m-%d')

@steps.route('/<rid>/<sid>',methods=['GET'])
def step(rid,sid):
    
    db=dbModule.Database()
    sql="select * from steps where recipe_id=%s and cooking_order=%s"

    row=db.executeAll(sql,[rid,sid])
    print(row)
    response=current_app.response_class(
        response=json.dumps(row,default=json_default),
        status=200,
        mimetype='application/json'
    )
    return response
