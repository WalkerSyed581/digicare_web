import random
import string
import os

characters = list(string.ascii_letters + string.digits)

def get_password(length=5, characters=characters):

	random.shuffle(characters)
	
	password = []
	for i in range(length):
		password.append(random.choice(characters))

	random.shuffle(password)

	return "".join(password)

NUM_PATIENTS = 3
# id = 0
ids = random.sample(range(4), NUM_PATIENTS)
print(list(string.digits).remove('0'))
# os.makedirs('generated', exist_ok=True)
with open('patients.txt', 'w') as f:
    f.write("return queryInterface.bulkInsert('Patients', [")
    for i in range(NUM_PATIENTS):
        f.write("{"+"""
      id: {},
      emergency_contact: '{}',
      createdAt: new Date(),
      updatedAt: new Date()
    """.format(ids[i], get_password(11, list(string.digits)))+'}, ')

with open('patients.txt', 'rb+') as f:
    f.seek(-2, 2)
    f.truncate()
with open('patients.txt', 'a') as f:
    f.write(']);')