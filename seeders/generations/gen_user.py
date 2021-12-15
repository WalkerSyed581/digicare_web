import random
import string
import os


lst = ['firstName,' 'lastName,' 'email,' 'phone_no',  'dob',  'gender',  'address',  'age']

fnames = ['Adnan' , 'Afzal']#, 'Ahmad', 'Aijaz', 'Ajmal', 'Akbar' , 'Akmal', 'Ali']
lnames = ['Habib', 'Hakim']# , 'Hamid', 'Hamza' , 'Harib', 'Hasib' , 'Hassan' , 'Iftikhar' ]
domains = ['seecs.edu.pk', 'gmail.com', 'outlook.com', 'yahoo.com']
cities = ['Islamabad', 'Lahore', 'Karachi']
streets = ['15', '85', '37', '2', '18']
houses = ['1', '34', '96', '23', '21']


print(len(fnames), len(lnames))
characters = list(string.ascii_letters + string.digits)

def get_password(length=5, characters=characters):

	random.shuffle(characters)
	
	password = []
	for i in range(length):
		password.append(random.choice(characters))

	random.shuffle(password)

	return "".join(password)

def format_email(fname, lname):
    return (fnames[i]+lnames[j]).lower()+'@'+domains[random.randint(0,len(domains)-1)]

def format_address():
    return 'House '+houses[random.randint(0,len(houses)-1)]+', Street '+streets[random.randint(0,len(streets)-1)]+', '+cities[random.randint(0,len(cities)-1)]

id = 0

# os.makedirs('generated', exist_ok=True)
with open('users.txt', 'w') as f:
    for i in random.sample(range(len(fnames)), len(fnames)):
        for j in random.sample(range(len(lnames)), len(lnames)):
            f.write('{'+"""
      id: {},
      firstName: '{}',
      lastName: '{}',
      email: '{}',
      password: '{}',
      phone_no: '{}',
      dob: new Date(),
      gender: '{}',
      address: '{}',
      cnic: {},
      age: {},
      createdAt: new Date(),
      updatedAt: new Date()
    """.format(id, fnames[i], lnames[j], format_email(fnames[i], lnames[j]),
                    get_password(), get_password(11, list(string.digits)), 
                    random.sample(['F', 'M', 'Other'], 1)[0], format_address(), 
                    get_password(13, list(string.digits)), random.randint(18,85))
         +'}, ',)
            id+=1

with open('users.txt', 'rb+') as f:
    f.seek(-2, 2)
    f.truncate()
print()