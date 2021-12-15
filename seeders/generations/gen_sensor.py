import random
import string
import os


lst = ['id','name','data_desc','createdAt','updatedAt']
names = ['max30102' , 'mpu3040', 'ir1353']#, 'Ahmad', 'Aijaz', 'Ajmal', 'Akbar' , 'Akmal', 'Ali']
data_desc = ['Pulse oximeter', 'Heart rate sensor', 'ECG sensor']

id = 0

# os.makedirs('generated', exist_ok=True)
with open('sensors.txt', 'w') as f:
    f.write("return queryInterface.bulkInsert('Sensors', [")
    for i in range(len(names)):
        f.write("{"+"""
      id: {},
      name: '{}',
      data_desc: '{}',
      createdAt: new Date(),
      updatedAt: new Date()
    """.format(id, names[i], data_desc[i])+'}, ')
        id+=1

with open('sensors.txt', 'rb+') as f:
    f.seek(-2, 2)
    f.truncate()

with open('sensors.txt', 'a') as f:
    f.write(']);')