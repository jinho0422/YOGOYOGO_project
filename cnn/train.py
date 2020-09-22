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
training_epochs=5

graph=tf.Graph()
with graph.as_default():
    X=tf.placeholder(tf.float32,[None,12288],name='input')
    #x_img=tf.reshape(X,[-1,64,64,3])
    Y=tf.placeholder(tf.float32,[None,110],name='output')

    W1=tf.Variable(tf.truncated_normal(shape=[5,5,3,64],stddev=5e-2),name='W1')
    b1=tf.Variable(tf.constant(0.1,shape=[64]),name='b1')
    L1=tf.nn.relu(tf.nn.conv2d(tf.reshape(X,[-1,64,64,3]),W1,strides=[1,1,1,1],padding='SAME')+b1)
    L1=tf.nn.max_pool(L1,ksize=[1,2,2,1],strides=[1,2,2,1],padding='SAME')
    L1=tf.nn.dropout(L1,keep_prob=0.5)

    W2=tf.Variable(tf.truncated_normal(shape=[3,3,64,64],stddev=5e-2),name='W2')
    b2=tf.Variable(tf.constant(0.1,shape=[64]),name='b2')
    L2=tf.nn.relu(tf.nn.conv2d(L1,W2,strides=[1,1,1,1],padding='SAME')+b2)
    L2=tf.nn.max_pool(L2,ksize=[1,2,2,1],strides=[1,2,2,1],padding='SAME')
    L2=tf.nn.dropout(L2,keep_prob=0.5)

    W3=tf.Variable(tf.truncated_normal(shape=[3,3,64,128],stddev=5e-2),name='W3')
    b3=tf.Variable(tf.constant(0.1,shape=[128]),name='b3')
    L3=tf.nn.relu(tf.nn.conv2d(L2,W3,strides=[1,1,1,1],padding='SAME')+b3)
    L3=tf.nn.dropout(L3,keep_prob=0.5)

    W4=tf.Variable(tf.truncated_normal(shape=[3,3,128,128],stddev=5e-2),name='W4')
    b4=tf.Variable(tf.constant(0.1,shape=[128]),name='b4')
    L4=tf.nn.relu(tf.nn.conv2d(L3,W4,strides=[1,1,1,1],padding='SAME')+b4)
    L4=tf.nn.dropout(L4,keep_prob=0.5)

    W5=tf.Variable(tf.truncated_normal(shape=[3,3,128,128],stddev=5e-2),name='W5')
    b5=tf.Variable(tf.constant(0.1,shape=[128]),name='b5')
    L5=tf.nn.relu(tf.nn.conv2d(L4,W5,strides=[1,1,1,1],padding='SAME')+b5)
    L5=tf.nn.dropout(L3,keep_prob=0.5)
    L5=tf.nn.max_pool(L5,ksize=[1,2,2,1],strides=[1,2,2,1],padding='SAME')

    L5_flat=tf.reshape(L5,[-1,128*8*8])

    fc_W1=tf.get_variable("W4",shape=[128*8*8,384],initializer=tf.contrib.layers.xavier_initializer())
    fc_b1=tf.Variable(tf.random.normal([384]),name="fc_b1")
    fc_L1=tf.nn.relu(tf.matmul(L5_flat,fc_W1)+fc_b1)
    fc_L1=tf.nn.dropout(fc_L1,keep_prob=0.5)

    fc_W2=tf.get_variable("W5",shape=[384,110],initializer=tf.contrib.layers.xavier_initializer())
    fc_b2=tf.Variable(tf.random_normal([110]),name='fc_b2')
    
    logits=tf.matmul(fc_L1,fc_W2)+fc_b2
    y_pred=tf.nn.softmax(logits)

    cost=tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=logits,labels=Y))
    optimizer=tf.train.AdamOptimizer(learning_rate=learning_rate).minimize(cost)

    correct_prediction=tf.equal(tf.argmax(y_pred,1),tf.argmax(Y,1))
    accuracy=tf.reduce_mean(tf.cast(correct_prediction,tf.float32))

    saver=tf.train.Saver()


count=int(train_num/batch_size)
print('count : ',count)
if(train_num%batch_size!=0):
    count+=1

testing_epoch=1
builder=tf.saved_model.Builder('./model')

with tf.Session(graph=graph) as sess:
    #saver=tf.train.Saver(tf.global_variables())

    #checkpoint
    ckpt=tf.train.get_checkpoint_state('./checkpoint')
    if ckpt and tf.train.checkpoint_exists(ckpt.model_checkpoint_path):
        saver.restore(sess,ckpt.model_checkpoint_path)
        print('restore')
    else:
        sess.run(tf.global_variables_initializer())
        print('make new data')

    print('Learning started. It takes sometime.')

    learning_start=time.time()
    learning_start_time=time.strftime("%X",time.localtime())

    for i in range(training_epochs):
        for b in range(count):
            b_count=b*batch_size
            # batch=next_batch(b_count,b_count+batch_size,,y_train)
            x=x_train[b_count:b_count+batch_size,:]
            y=y_train[b_count:b_count+batch_size,:]
            #print('b    ',b)

            if b==count-1:
                x=x_train[b_count:,:]
                y=y_train[b_count:,:]

            feed_dict={X:x, Y:y}
            a,c,_=sess.run([accuracy,cost,optimizer],feed_dict=feed_dict)

        print('Epoch:','%04d'% (i),'cost=','{:.9f}'.format(c),'accuracy=','{:.9f}'.format(a))
        # saver.save(sess,'')
    
    save_path=saver.save(sess,'./checkpoint/ckpt_food')
    

    tensor_info_x=tf.saved_model.utils.build_tensor_info(X)
    tensor_into_prediction=tf.saved_model.utils.build_tensor_info(y_pred)

    prediction_signature=(
        tf.saved_model.signature_def_utils.build_signature_def(
            inputs={'input':tensor_info_x},
            outputs={'output':tensor_into_prediction},
            method_name=tf.saved_model.signature_constants.PREDICT_METHOD_NAME
        )
    )

    builder.add_meta_graph_and_variables(
        sess,[tf.saved_model.tag_constants.SERVING],
        signature_def_map={
            tf.saved_model.signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY:
            prediction_signature,
        },
        main_op=tf.tables_initializer()
    )
    builder.save()
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
