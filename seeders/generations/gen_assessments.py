import random
import string
import os


characters = list(string.ascii_letters + string.digits)
relationships = ['Nurse', 'Companion']

def get_password(length=5, characters=characters):

	random.shuffle(characters)
	
	password = []
	for i in range(length):
		password.append(random.choice(characters))

	random.shuffle(password)

	return "".join(password)

NUM_ASSESSMENTS = 5
id = 0
# ids = random.sample(range(4), NUM_ASSESSMENTS)
lst = ['id', 'doctor_id', 'patient_id', 'condition', 'recommendations', 'cgInstr', 'createdAt', 'updatedAt']

doctors = ['1', '2']
patients = ['3', '2', '0']
conditions = ['Good', 'Average', 'Poor', 'Critical']
recommendations = ['Exercise more', 'Eat healthy', 'Do not engage in strenuous activity']
cgInstrs = ['Be present round-the-clock', 'Visit once daily', 'Visit twice daily', 'Ensure medicine dose is taken']

# os.makedirs('generated', exist_ok=True)
with open('assessments.txt', 'w') as f:
    f.write("return queryInterface.bulkInsert('Assessments', [")
    for i in range(NUM_ASSESSMENTS):
        f.write("{"+"""
      id: {},
      doctor_id: {},
      patient_id: {},
      condition: '{}',
      recommendations: '{}',
      cgInstr: '{}',
      createdAt: new Date(),
      updatedAt: new Date()
    """.format(id, doctors[random.randint(0,len(doctors)-1)], patients[random.randint(0,len(patients)-1)],
        conditions[random.randint(0,len(conditions)-1)], recommendations[random.randint(0,len(recommendations)-1)],
        cgInstrs[random.randint(0,len(cgInstrs)-1)])+'}, ')
        id+=1

with open('assessments.txt', 'rb+') as f:
    f.seek(-2, 2)
    f.truncate()
with open('assessments.txt', 'a') as f:
    f.write(']);')