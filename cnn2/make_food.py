import os

data_dir='C:/Users/multicampus/Desktop/images/images/'

food_list=[]
for food_name in os.listdir(data_dir):
    food_list.append(food_name)

with open('./food_list.txt','w',encoding='utf-8') as f:
        f.write('\n'.join(food_list))