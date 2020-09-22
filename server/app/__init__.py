# export FLASK_ENV=development


from flask import Flask,jsonify,redirect,url_for,request
from app.page.home import home
from app.page.search import search
from app.page.user import user
from app.page.mylist import mylist
from app.page.comments import comments
from app.page.posts import posts
from app.page.steps import steps
from app.page.community import community
import json
import tensorflow as tf
import numpy as np
from PIL import Image
import os
import io,base64
import requests
import re
from binascii import a2b_base64
import sys
import requests
import binascii
# from flask_restful import Resource, Api
from flask import current_app as current_app

app=Flask(__name__)

app.register_blueprint(home)
app.register_blueprint(search)
app.register_blueprint(user)
app.register_blueprint(mylist)
app.register_blueprint(comments)
app.register_blueprint(posts)
app.register_blueprint(steps)
app.register_blueprint(community)
# api=Api(app)
# mysql=pymysql.connect(host='k02a2031.p.ssafy.io',
#         user='yogo',password='recipe',db='yogo',charset='utf8')
# mysql.cursor=mysql.db.cursor(pymysql.cursors.DictCursor)
food_list=[]
with open("app/food_list.txt",'r',encoding='utf-8') as f:
    food_list=f.readlines()

@app.route('/',methods=['GET'])
def HOME():
    return "Hi"


@app.route('/predict',methods=['POST'])
def predict():
    #ata_dir='C:/Users/multicampus/Desktop/images/images/'
    
    #image=Image.open('app/감자9.jpg')
    #uri=request.args.get('url')

    #uri='data:image/jpeg;base64,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'

    #print(uri.decode('utf-16'))
    # img=re.sub('^data:image/.+;base64,', '', uri)
    # byte_data=base64.b64decode(img)
    # image=Image.open(io.BytesIO(byte_data))
        
    # img=io.BytesIO(base64.b64decode(uri))
    # img.save('temp.png','PNG')
    # image=Image.open('temp.png')

    data=request.get_json()
    #print(data['forms']['_parts'][0][0]['data'])
    # uri=request.files
    # print(uri[0])
    data=data['forms']['_parts'][0][0]['data']
    #img=re.sub('^data:image/.+;base64,', '', uri)
    #print(data)
    img=base64.b64decode(data)
    #uri.save(uri['filename'])
    image=Image.open(io.BytesIO(img))
    im=image.resize((150,150))
    pix=np.array(im)
    test_image=[]
    test_image.append(pix/255.0)
    model=tf.keras.models.load_model('saved_models/model.h5')

    model.load_weights('checkpoint/cp-0200.ckpt')
    predict=model.predict(np.array(test_image))
    #return (food_list[np.argmax(predict)])
    word=food_list[np.argmax(predict)]
    return redirect(url_for('search.text',text=word[0:len(word)-1]))
    

@app.route('/audio',methods=['POST'])
def audio():
    data=request.get_json()
    #print(data['forms']['_parts'][0][0]['data'])
    # uri=request.files
    # print(uri[0])
    
    #img=re.sub('^data:image/.+;base64,', '', uri)
    #print(data)
    # print(data)
    audio=base64.b64decode(data["res"])
    #uri.save(uri['filename'])
    f=open('audio.wav','wb')
    f.write(audio)
    f.close()

    client_id = "wr1zlt7xqc"
    client_secret = "jh6QlMdowR4MvWgPHT3mxpWdixtJ6kG53wCiNKSq"
    lang = "Kor" # 언어 코드 ( Kor, Jpn, Eng, Chn )
    url = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=" + lang
    data = open('audio.wav', 'rb')
    headers = {
        "X-NCP-APIGW-API-KEY-ID": client_id,
        "X-NCP-APIGW-API-KEY": client_secret,
        "Content-Type": "application/octet-stream"
    }
    response = requests.post(url,  data=data, headers=headers)
    rescode = response.status_code
    if(rescode == 200):
        print (response.text)
        return redirect(url_for('search.text',text="감자"))

    else:
        print("Error : " + response.text)
    
    


@app.route('/read',methods=['GET'])
def reading():
    client_id = "wr1zlt7xqc"
    client_secret = "jh6QlMdowR4MvWgPHT3mxpWdixtJ6kG53wCiNKSq"

    encText="합쳐줘어ㅓㅓㅓ"
    data = "speaker=jinho&speed=0&text=" + encText
    url = "https://naveropenapi.apigw.ntruss.com/voice/v1/tts"

    headers = {
        "X-NCP-APIGW-API-KEY-ID": client_id,
        "X-NCP-APIGW-API-KEY": client_secret,
        "Content-Type":"application/x-www-form-urlencoded"
    }

    res=requests.post(url,headers=headers,data=data.encode('utf-8'))
    print(res.status_code)
    rescode=res.status_code
    if(rescode==200):
        res_body=res.content
        with open('1111.mp3', 'wb') as f:
            # mp=base64.b64decode(res_body)
            # print(mp)
            f.write(res_body)
            response=current_app.response_class(
            response=res_body,
            status=200,
        )
        return response
    else:
        print("Error Code:" + rescode)
    return "OK"

if __name__=='__main__':
    app.run(debug=True)
