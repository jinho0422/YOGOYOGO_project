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

image_data=[]
label_data=[]

for cls,food_name in enumerate(os.listdir(data_dir)):
    image_dir=data_dir+food_name+'/'
    file_list=os.listdir(image_dir)
    size=(150,150)
    

    for idx,f in enumerate(file_list):
        im=Image.open(image_dir+f)
        im=im.resize(size)
        pix=np.array(im)

        image_data.append(pix/255.0)
        label_data.append(one_hot(cls))

image_data=np.array(image_data)
label_data=np.array(label_data)

train_images,test_images,train_labels,test_labels=train_test_split(image_data,label_data,test_size=0.2)
print(len(train_labels),len(train_images))
print(test_images[0].shape)


model = Sequential()
model.add(Conv2D(32, (3, 3), input_shape=(150, 150,3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Conv2D(32, (3, 3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Conv2D(64, (3, 3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Flatten())  # 이전 CNN 레이어에서 나온 3차원 배열은 1차원으로 뽑아줍니다
model.add(Dense(220))
model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(110))
model.add(Activation('sigmoid'))


model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# model.compile(loss='binary_crossentropy',
#               optimizer='adam',
#               metrics=['accuracy'])

model.summary()


checkpoint_path="./checkpoint2/cp-{epoch:04d}.ckpt"
cp_callback = tf.keras.callbacks.ModelCheckpoint(checkpoint_path,
                                                 save_weights_only=True,
                                                 verbose=1,period=50)

model.save_weights(checkpoint_path.format(epoch=0))
model.fit(train_images, train_labels, epochs=150,
callbacks=[cp_callback])

loss,acc=model.evaluate(test_images,test_labels,verbose=2)
print("Accuracy :",100*acc)


model.save('./saved_models2/model.h5')
#latest = tf.train.latest_checkpoint(checkpoint_dir)

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
    



