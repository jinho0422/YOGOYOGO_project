#-*- coding:utf-8 -*-
import numpy as np 
import matplotlib.pyplot as plt
from PIL import Image
import os
import tensorflow as tf
# tensorflow와 tf.keras를 임포트합니다

food_list=[]
with open("./food_list.txt",'r',encoding='utf-8') as f:
    food_list=f.readlines()


image=Image.open('./potato.jpg')
im=image.resize((150,150))
pix=np.array(im)

test_image=[]
test_image.append(pix/255.0)
model=tf.keras.models.load_model('./saved_models2/model.h5')
model.summary()

model.load_weights('./checkpoint/cp-0100.ckpt')

predict=model.predict(np.array(test_image))
print(food_list[np.argmax(predict)])




