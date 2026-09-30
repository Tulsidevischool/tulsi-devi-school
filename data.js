const classes = ['PP3','PP4','PP5','1','2','3','4','5','6','7','8'];
const subjects = ['Hindi','English','Mathematics','Environmental Studies','Science','Social Science','General Knowledge','Computer'];
const firstNames = ['Aarav','Ananya','Rohan','Kavya','Mohit','Priya','Aditya','Vihaan','Ishita','Arjun','Meera','Dev','Nisha','Rahul','Saanvi','Yash','Pooja','Kunal','Aditi','Manav','Riya','Harsh','Neha','Vansh','Tanya','Mohan','Simran','Krish','Muskan','Ravi','Diya','Sahil','Avni','Nikhil','Kiran','Lakshya','Sneha','Varun','Palak','Abhay','Mahi','Raj','Anjali','Dhruv','Komal','Aman','Sakshi','Ritesh','Navya','Gaurav','Isha','Anmol','Payal','Devansh','Tanvi','Raghav','Preeti','Akash','Aarohi','Mukul','Ritika','Shivam','Jiya','Naveen','Khushi','Lokesh','Manya','Vivek','Anushka','Rajat','Shreya','Parth','Sonam','Deepak','Vanshika','Manish','Ayesha','Tushar','Bhavna','Suresh','Riddhi','Kartik','Pallavi','Abhishek','Nandini','Sameer','Kajal','Rohit','Payal','Naman','Ira'];
const surnames=['Sharma','Verma','Meena','Kumari','Gurjar','Singh','Choudhary','Joshi','Yadav','Khan','Saini','Jain','Solanki','Rathore'];
const students=[]; let index=0;
for(const className of classes){
  for(let n=0;n<7;n++){
    const username=`student${1001+index}`;
    const name=`${firstNames[index]} ${surnames[index%surnames.length]}`;
    const marks={};
    subjects.forEach((s,j)=>{marks[s]=34+((index*7+j*5)%17)});
    const testHistory={};
    ['Unit Test 1','Unit Test 2','Half-Yearly Examination','Unit Test 3','Final Examination'].forEach((test,t)=>{
      testHistory[test]={}; subjects.forEach((s,j)=>{testHistory[test][s]=Math.min(50,30+((index*5+j*3+t*4)%21));});
    });
    const totalFee=7000+((index%4)*500);
    const vehicleFee=index%3===0?1500:0;
    const lastYearDue=index%5===0?800:0;
    const paid= index%4===0 ? 3500 : index%4===1 ? 5000 : index%4===2 ? 2500 : 1500;
    students.push({
      username, password:'1234', name, className, rollNo:n+1,
      fatherName:['Rajesh','Mahendra','Suresh','Dinesh','Rakesh','Mohan','Vijay'][n]+' '+surnames[(index+3)%surnames.length],
      motherName:['Sunita','Rekha','Pooja','Kavita','Neha','Anita','Meena'][n]+' '+surnames[(index+5)%surnames.length],
      attendance:76+((index*7)%23),
      marks,testHistory,
      fees:{
        lastYearDue, thisYearFee:totalFee, vehicleFee, paid,
        installments:[
          {amount:Math.round(totalFee/4),status:paid>=Math.round(totalFee/4)?'Paid':'Due'},
          {amount:Math.round(totalFee/4),status:paid>=Math.round(totalFee/2)?'Paid':'Due'},
          {amount:Math.round(totalFee/4),status:paid>=Math.round(totalFee*0.75)?'Paid':'Due'},
          {amount:totalFee-3*Math.round(totalFee/4),status:paid>=totalFee?'Paid':'Due'}
        ]
      }
    });
    index++;
  }
}
const teachers=[
  {id:'T001',name:'Sunita Sharma',subject:'Hindi',className:'5'},
  {id:'T002',name:'Amit Verma',subject:'Mathematics',className:'6'},
  {id:'T003',name:'Pankaj Meena',subject:'Science',className:'7'},
  {id:'T004',name:'Kavita Kumari',subject:'English',className:'4'},
  {id:'T005',name:'Rakesh Gurjar',subject:'Social Science',className:'8'},
  {id:'T006',name:'Neelam Joshi',subject:'Primary',className:'3'},
  {id:'T007',name:'Vikas Singh',subject:'Computer',className:'2'},
  {id:'T008',name:'Seema Choudhary',subject:'Activities',className:'PP5'}
];
const notices=[
  {id:'N001',category:'Weekly',date:'2026-10-05',title:'Monday Assembly',message:'A fictional weekly assembly notice for demonstration.'},
  {id:'N002',category:'Weekly',date:'2026-10-07',title:'Weekly Test Schedule',message:'A demo reminder about this week’s fictional test schedule.'},
  {id:'N003',category:'Weekly',date:'2026-10-09',title:'Homework Reminder',message:'A demo homework reminder for students.'},
  {id:'N004',category:'General',date:'2026-10-12',title:'Activity Day',message:'A fictional activity day notice.'},
  {id:'N005',category:'Admission',date:'2026-10-15',title:'Parent Meeting',message:'A fictional demo parent meeting notice.'},
  {id:'N006',category:'Exam',date:'2026-10-20',title:'Unit Test',message:'A fictional demo examination notice.'},
  {id:'N007',category:'Holiday',date:'2026-10-02',title:'Gandhi Jayanti',message:'Demo holiday dates only; not an actual school calendar.'}
];
const activities=[
  ['Sports Day','2026-11-10','⚽','Fictional sports activities for demonstration.'],
  ['Drawing Competition','2026-11-15','🎨','Fictional drawing competition.'],
  ['Science Activity','2026-11-20','🧪','Fictional hands-on science activity.'],
  ['Independence Day','2026-08-15','🇮🇳','Fictional school celebration example.'],
  ['Republic Day','2027-01-26','🇮🇳','Fictional school celebration example.'],
  ['Cultural Program','2027-02-10','🎭','Fictional cultural program.']
];
const demoMessages=[];
const demoMaterials=[];
const siteSettings={
  heroTitle:'Welcome to Tulsi Devi School',
  heroSubtitle:'शिक्षा • संस्कार • विकास',
  aboutText:'A fictional demonstration of a modern Hindi-medium upper-primary school website.',
  contactPhone:'+91 90000 00000',
  contactEmail:'demo@tulsdevischool.example'
};
