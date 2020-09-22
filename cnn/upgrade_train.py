import tensorflow as tf 
import numpy as np 
import matplotlib
matplotlib.use('TkAgg')

import matplotlib.pyplot as plt 
import time
import random
import os

train_food = np.load('./train.npy')
test_food=np.load('./test.npy')
data_dir='C:/Users/multicampus/Desktop/images/images/'
food_list=[]
for food_name in os.listdir(data_dir):
    food_list.append(food_name)


train_num=train_food.shape[0]
test_num=test_food.shape[0]
print(train_num)

x_train=train_food[:train_num,:12288]
x_test=test_food[:test_num,:12288]

y_train=train_food[:train_num,12288:]
y_test=test_food[:test_num,12288:]

learning_rate=0.001
batch_size=40
training_epochs=100

X=tf.compat.v1.placeholder(tf.float32,[None,12288],name='input')
x_img=tf.reshape(X,[-1,64,64,3])
Y=tf.compat.v1.placeholder(tf.float32,[None,110],name='output')

W1=tf.Variable(tf.random.truncated_normal(shape=[5,5,3,64],stddev=5e-2))
b1=tf.Variable(tf.constant(0.1,shape=[64]))
L1=tf.nn.relu(tf.nn.conv2d(input=tf.reshape(X,[-1,64,64,3]),filters=W1,strides=[1,1,1,1],padding='SAME')+b1)
L1=tf.nn.max_pool2d(input=L1,ksize=[1,2,2,1],strides=[1,2,2,1],padding='SAME')
L1=tf.nn.dropout(L1,rate=1 - (0.5))

W2=tf.Variable(tf.random.truncated_normal(shape=[3,3,64,64],stddev=5e-2))
b2=tf.Variable(tf.constant(0.1,shape=[64]))
L2=tf.nn.relu(tf.nn.conv2d(input=L1,filters=W2,strides=[1,1,1,1],padding='SAME')+b2)
L2=tf.nn.max_pool2d(input=L2,ksize=[1,2,2,1],strides=[1,2,2,1],padding='SAME')
L2=tf.nn.dropout(L2,rate=1 - (0.5))

W3=tf.Variable(tf.random.truncated_normal(shape=[3,3,64,128],stddev=5e-2))
b3=tf.Variable(tf.constant(0.1,shape=[128]))
L3=tf.nn.relu(tf.nn.conv2d(input=L2,filters=W3,strides=[1,1,1,1],padding='SAME')+b3)
L3=tf.nn.dropout(L3,rate=1 - (0.5))

W4=tf.Variable(tf.random.truncated_normal(shape=[3,3,128,128],stddev=5e-2))
b4=tf.Variable(tf.constant(0.1,shape=[128]))
L4=tf.nn.relu(tf.nn.conv2d(input=L3,filters=W4,strides=[1,1,1,1],padding='SAME')+b4)
L4=tf.nn.dropout(L4,rate=1 - (0.5))

W5=tf.Variable(tf.random.truncated_normal(shape=[3,3,128,128],stddev=5e-2))
b5=tf.Variable(tf.constant(0.1,shape=[128]))
L5=tf.nn.relu(tf.nn.conv2d(input=L4,filters=W5,strides=[1,1,1,1],padding='SAME')+b5)
L5=tf.nn.dropout(L3,rate=1 - (0.5))
L5=tf.nn.max_pool2d(input=L5,ksize=[1,2,2,1],strides=[1,2,2,1],padding='SAME')

L5_flat=tf.reshape(L5,[-1,128*8*8])

fc_W1=tf.compat.v1.get_variable("W4",shape=[128*8*8,384],initializer=tf.compat.v1.keras.initializers.VarianceScaling(scale=1.0, mode="fan_avg", distribution="uniform"))
fc_b1=tf.Variable(tf.random.normal([384]))
fc_L1=tf.nn.relu(tf.matmul(L5_flat,fc_W1)+fc_b1)
fc_L1=tf.nn.dropout(fc_L1,rate=1 - (0.5))

fc_W2=tf.compat.v1.get_variable("W5",shape=[384,110],initializer=tf.compat.v1.keras.initializers.VarianceScaling(scale=1.0, mode="fan_avg", distribution="uniform"))
fc_b2=tf.Variable(tf.random.normal([110]))

logits=tf.matmul(fc_L1,fc_W2)+fc_b2
y_pred=tf.nn.softmax(logits)

cost=tf.reduce_mean(input_tensor=tf.nn.softmax_cross_entropy_with_logits(logits=logits,labels=tf.stop_gradient(Y)))
optimizer=tf.compat.v1.train.AdamOptimizer(learning_rate=learning_rate).minimize(cost)

correct_prediction=tf.equal(tf.argmax(input=y_pred,axis=1),tf.argmax(input=Y,axis=1))
accuracy=tf.reduce_mean(input_tensor=tf.cast(correct_prediction,tf.float32))

count=int(train_num/batch_size)
print('count : ',count)
if(train_num%batch_size!=0):
    count+=1

testing_epoch=1

with tf.compat.v1.Session(tf.compat.v1.get_default_graph()) as sess:
    saver=tf.compat.v1.train.Saver(tf.compat.v1.global_variables())

    #checkpoint
    ckpt=tf.train.get_checkpoint_state('./checkpoint')
    if ckpt and tf.compat.v1.train.checkpoint_exists(ckpt.model_checkpoint_path):
        saver.restore(sess,ckpt.model_checkpoint_path)
        print('restore')
    else:
        sess.run(tf.compat.v1.global_variables_initializer())
        print('make new data')

    print('Learning started. It takes sometime.')

    learning_start=time.time()
    learning_start_time=time.strftime("%X",time.localtime())

    # for i in range(training_epochs):
    #     for b in range(count):
    #         b_count=b*batch_size
    #         # batch=next_batch(b_count,b_count+batch_size,,y_train)
    #         x=x_train[b_count:b_count+batch_size,:]
    #         y=y_train[b_count:b_count+batch_size,:]
    #         #print('b    ',b)

    #         if b==count-1:
    #             x=x_train[b_count:,:]
    #             y=y_train[b_count:,:]

    #         feed_dict={X:x, Y:y}
    #         a,c,_=sess.run([accuracy,cost,optimizer],feed_dict=feed_dict)

    #     print('Epoch:','%04d'% (i),'cost=','{:.9f}'.format(c),'accuracy=','{:.9f}'.format(a))
    #     # saver.save(sess,'')
    
    save_path=saver.save(sess,'./checkpoint/ckpt_food')
    tf.compat.v1.saved_model.simple_save(sess,'./model',
    inputs={"input":X},outputs={"output":Y})
    print('Learning Finished!')

    learning_end=time.time()
    learning_end_time=time.strftime("%X",time.localtime())
    min=(learning_end-learning_start)/60
    print('%s~%s,time : %smin'%(learning_start_time,learning_end_time,'{:.1f}'.format(min)))


    x_show=0
    y_show=0

    for i in range(testing_epoch):
        for b in range(count):
            b_count=b*batch_size
            x=x_train[b_count:b_count+batch_size,:]
            y=y_train[b_count:b_count+batch_size,:]

            if b==count-1:
                x_show=x_train[b_count:,:]
                y_show=y_train[b_count:,:]
                break

            acc=sess.run(accuracy,feed_dict={X:x,Y:y})
            print('Accuracy:','{:.2f}'.format(acc*100),'%')

    labels=sess.run(logits,feed_dict={X:x_show})

    random.shuffle(test_food)
    random_idxs=random.sample(range(len(test_food)),20)
    print(random_idxs)
    fig=plt.figure()
    for i,r in enumerate(random_idxs):
        subplot=fig.add_subplot(4,5,i+1)
        subplot.set_xticks([])
        subplot.set_yticks([])

        subplot.set_title(food_list[np.argmax(y_test[r])])
        print(food_list[np.argmax(y_test[r])])
        
        subplot.imshow(np.float64((x_test[r].reshape(64,64,3))/255.0))

    plt.show()