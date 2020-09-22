from __future__ import absolute_import, division, print_function, unicode_literals, unicode_literals
import numpy as np 
import matplotlib.pyplot as plt
from PIL import Image
import os

# tensorflow와 tf.keras를 임포트합니다
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense,Flatten,Conv2D,Activation,MaxPooling2D,Dropout



def one_hot(i):
    a=np.zeros(110,'uint8')
    a[i]=1
    return a

data_dir='C:/Users/multicampus/Desktop/images/images/'

food_list=[]
for food_name in os.listdir(data_dir):
    food_list.append(food_name)

image=Image.open('./감자9.jpg')
im=image.resize((150,150))
pix=np.array(im)

pix=pix/255.0

model=tf.keras.models.load_model('./model/test.h5')
predict=model.predict(pix)
print(predict*100)

model.load_weights('./model')
predict=model.predict(pix)
print(predict*100)

# checkpoint_path="./model/test.ckpt"
# cp_callback = tf.keras.callbacks.ModelCheckpoint(checkpoint_path,
#                                                #  save_weights_only=True,
#                                                #  verbose=1)


# plt.figure(figsize=(10,10))
# for i in range(0,10):
#     plt.subplot(5,2,i+1)
#     plt.xticks([])
#     plt.yticks([])
#     plt.grid(False)
#     plt.imshow(image_data[i], cmap=plt.cm.binary)
#     plt.xlabel(food_list[label_data[i]])
#     print(food_list[label_data[i]])
# plt.show()
    



