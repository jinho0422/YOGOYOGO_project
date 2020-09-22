from flask import Blueprint, request,render_template,flash,redirect,url_for
from flask import current_app as current_app

from app.module import dbModule
import json
import datetime

search=Blueprint('search',__name__,url_prefix='/search')
def json_default(value): 
    if isinstance(value, datetime.date): 
        return value.strftime('%Y-%m-%d')

def json_default(value): 
    if isinstance(value, datetime.date): 
        return value.strftime('%Y-%m-%d')

@search.route('/',methods=['GET'])
def text():
    txt=request.args.get('text')
    print(txt)
    db=dbModule.Database()
    word='%'+txt+'%'
    print(word)
    # sql="select distinct recipe_name,* from recipes r,ingredients i \
    # where r.recipe_id=i.recipe_id and (ingredients_name LIKE(%s)  and i.type_name='주재료')\
    #      or recipe_name LIKE(%s) order by r.favorites desc"

    sql="select r.*,count(*) steps from recipes r, steps s where r.recipe_id=s.recipe_id and\
        r.recipe_name like(%s) group by r.recipe_id \
        union\
        select r.*,count(*) steps from recipes r, steps s where r.recipe_id=s.recipe_id and\
        r.recipe_id in (select recipe_id from ingredients where ingredients_name LIKE(%s) and type_name='주재료')\
        group by r.recipe_id;"

    row=db.executeAll(sql,[word,word])
    print(row)
    response=current_app.response_class(
        response=json.dumps(row,default=json_default),
        status=200,
        mimetype='application/json'
    )
    return response
