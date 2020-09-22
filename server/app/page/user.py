from flask import Blueprint, request,render_template,flash,redirect,url_for
from flask import current_app as current_app

from app.module import dbModule
import json
import hashlib

user=Blueprint('user',__name__,url_prefix='/user')
@user.route('/',methods=['POST','GET', 'DELETE'])
def signup():
    if(request.method=='POST'):
        data = request.get_json()
        uid = None
        pwd = data['pwd']
        email = data['email']
        nickname = data['nick']

        print(pwd, email, nickname)

        db = dbModule.Database()
        sql = "select * from users where email=%s or nickname=%s"
        row = db.executeOne(sql, (email,nickname))
        print(row)
        if row is not None:
            response=current_app.response_class(
            status=500,
            response="succes signup!"
            )
            return response

        tmp = hashlib.sha256()
        tmp.update(pwd.encode('UTF-8'))
        pwd = tmp.hexdigest()

        sql = "insert into users(email,pwd,nickname) value(%s,%s,%s)"

        db.execute(sql, (email, pwd, nickname))
        db.commit() 

        response=current_app.response_class(
        status=200,
        response="succes signup!"
        )
        return response
 

    elif(request.method=='GET'):
        # email=request.args.get('id')
        # pwd=request.args.get('pwd')
        data=request.get_json()
        email=data['email']
        pwd=data['pwd']

        tmp = hashlib.sha256()
        tmp.update(pwd.encode('UTF-8'))
        pwd = tmp.hexdigest()

        print(email, pwd)

        db=dbModule.Database()
        sql="select * from users where email=%s and pwd=%s"

        row=db.executeOne(sql,(email,pwd))
        if(row==None):
            response=current_app.response_class(
            status=500,
            response="not exist!"
            )
            return response
        print(row)

        response=current_app.response_class(
            status=200,
            response=json.dumps(row),
            mimetype='application/json'
        )
        return response

    elif(request.method=='DELETE'):
        data = request.get_json()
        uid = data['uid']
        db = dbModule.Database()
        sql = "select * from users where uid=%s"

        row = db.executeOne(sql, (uid))
        if (row == None):
            response = current_app.response_class(
                status=500,
                response="not exist!"
            )
            return response
        print(row)

        sql = "delete from users where uid=%s"

        db.execute(sql, (uid))
        db.commit()

        response = current_app.response_class(
            status=200,
            response="delete success"
        )
        return response

@user.route('/<uid>/<score>',methods=['POST'])
def update_scre(uid,score):
    db=dbModule.Database()
    sql="update users set category=%s where uid=%s"
    db.execute(sql,(uid,score))
    db.commit()
    response = current_app.response_class(
            status=200,
            response="update score"
        )
    return response
