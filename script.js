
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const STORE='tds_demo_v2';
let language=localStorage.getItem('language')||'en';
let currentRole='student', currentUser=null;

const translations={
 en:{schoolName:'Tulsi Devi School, Beawar',schoolType:'Hindi-Medium Upper Primary School',home:'Home',about:'About',academics:'Academics',students:'Students',teachers:'Teachers',results:'Results',notices:'Notices',gallery:'Gallery',admissions:'Admissions',contact:'Contact',portal:'Portal',studentLogin:'Student Login'},
 hi:{schoolName:'तुलसी देवी स्कूल, ब्यावर',schoolType:'हिंदी माध्यम उच्च प्राथमिक विद्यालय',home:'होम',about:'हमारे बारे में',academics:'शैक्षणिक',students:'विद्यार्थी',teachers:'शिक्षक',results:'परिणाम',notices:'सूचनाएँ',gallery:'गैलरी',admissions:'प्रवेश',contact:'संपर्क',portal:'पोर्टल',studentLogin:'विद्यार्थी लॉगिन'}
};

function setupSlideshow(){
 const slides=$$('.slide'),dots=$('#dots');if(!slides.length||!dots)return;
 let i=0; dots.innerHTML='';
 slides.forEach((_,n)=>{const d=document.createElement('button');d.className='dot'+(n===0?' active':'');d.setAttribute('aria-label','Slide '+(n+1));d.onclick=()=>showSlide(n);dots.append(d)});
 function showSlide(n){i=(n+slides.length)%slides.length;slides.forEach((s,k)=>s.classList.toggle('active',k===i));$$('.dot').forEach((d,k)=>d.classList.toggle('active',k===i))}
 $('#prevSlide')?.addEventListener('click',()=>showSlide(i-1));$('#nextSlide')?.addEventListener('click',()=>showSlide(i+1));
 setInterval(()=>showSlide(i+1),5000);
}

function applyLanguage(){
 document.documentElement.lang=language==='hi'?'hi':'en';
 $$('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(translations[language][k])el.textContent=translations[language][k]});
 const t=$('#langToggle'); if(t)t.textContent=language==='hi'?'EN':'हिं';
 localStorage.setItem('language',language);
}
function applyTheme(){
 const theme=localStorage.getItem('theme')||'dark';
 document.body.classList.toggle('light',theme==='light');
 const t=$('#themeToggle'); if(t)t.textContent=theme==='light'?'🌙':'☀️';
}
function storage(){
 const raw=localStorage.getItem(STORE);
 if(raw) return JSON.parse(raw);
 const state={students,teachers,notices,demoMessages,demoMaterials,siteSettings};
 localStorage.setItem(STORE,JSON.stringify(state)); return structuredClone(state);
}
let state=storage();
function save(){localStorage.setItem(STORE,JSON.stringify(state));}
function resetDemo(){if(confirm('Reset all demo changes to the original demo data?')){localStorage.removeItem(STORE);location.reload();}}

function calcTotal(marks){return Object.values(marks).reduce((a,b)=>a+Number(b),0)}
function calcPercent(marks,maxPer=50){const n=Object.keys(marks).length;return n?Math.round(calcTotal(marks)/(n*maxPer)*100):0}
function grade(p){return p>=90?'A+':p>=80?'A':p>=70?'B+':p>=60?'B':p>=50?'C':p>=40?'D':'Needs Improvement'}
function weakSubjects(marks){return Object.entries(marks).filter(([,v])=>Number(v)/50*100<40).map(([k])=>k)}
function escapeHTML(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function money(v){return '₹'+Number(v||0).toLocaleString('en-IN')}
function toast(msg){const el=$('#toast');if(el){el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2500)}}

function renderClasses(){
 const grid=$('#classGrid'); if(!grid)return; grid.innerHTML='';
 classes.forEach(c=>{const count=state.students.filter(s=>s.className===c).length;const el=document.createElement('article');el.className='glass class-card';el.innerHTML=`<span>🎓</span><h3>${c.startsWith('Class')?c:'Class '+c}</h3><p>${count} demo students</p>`;grid.append(el)});
}
function renderStudentFilters(){
 const grid=$('#studentGrid'); if(!grid)return;
 const q=($('#studentSearch')?.value||'').toLowerCase();
 const cls=$('#classFilter')?.value||'All';
 grid.innerHTML='';
 state.students.filter(s=>(cls==='All'||s.className===cls)&&(`${s.name} ${s.username} ${s.rollNo}`.toLowerCase().includes(q))).slice(0,30).forEach(s=>{
   const el=document.createElement('article');el.className='glass student-card';el.innerHTML=`<span class="avatar">${s.name[0]}</span><h3>${escapeHTML(s.name)}</h3><p>Class ${escapeHTML(s.className)} • Roll ${s.rollNo}</p><small>Marks: ${calcPercent(s.marks)}% • Attendance: ${s.attendance}%</small>`;grid.append(el);
 });
}
function renderTeachers(){
 const grid=$('#teacherGrid'); if(!grid)return; grid.innerHTML='';
 state.teachers.forEach(t=>{const el=document.createElement('article');el.className='glass teacher-card';el.innerHTML=`<span class="avatar">👩‍🏫</span><h3>${escapeHTML(t.name)}</h3><p>${escapeHTML(t.subject)} • Class ${escapeHTML(t.className)}</p>`;grid.append(el)});
}
function renderNotices(){
 const grid=$('#noticeGrid'); if(!grid)return; grid.innerHTML='';
 const q=($('#noticeSearch')?.value||'').toLowerCase();
 const active=$$('.filter-btn.active')[0]?.textContent||'All';
 state.notices.filter(n=>(active==='All'||n.category===active)&&(`${n.title} ${n.message} ${n.category}`.toLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date)).forEach(n=>{
   const el=document.createElement('article');el.className='glass notice-card';el.innerHTML=`<span class="notice-tag">${escapeHTML(n.category)}</span><small>${escapeHTML(n.date)}</small><h3>${escapeHTML(n.title)}</h3><p>${escapeHTML(n.message)}</p>`;grid.append(el);
 });
}
function renderActivities(){
 const grid=$('#activityGrid'); if(!grid)return; grid.innerHTML='';
 activities.forEach(a=>{const el=document.createElement('article');el.className='glass activity-card';el.innerHTML=`<span>${a[2]}</span><h3>${escapeHTML(a[0])}</h3><small>${escapeHTML(a[1])} • DEMO</small><p>${escapeHTML(a[3])}</p>`;grid.append(el)});
}
function setupNoticeFilters(){
 const f=$('#noticeFilters');if(!f)return;f.innerHTML='';
 ['All','Weekly','Holiday','Exam','Admission','General','Emergency'].forEach(c=>{const b=document.createElement('button');b.className='filter-btn'+(c==='All'?' active':'');b.textContent=c;b.onclick=()=>{$$('.filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderNotices()};f.append(b)});
 $('#noticeSearch')?.addEventListener('input',renderNotices);
}

function logoutPortal(){currentUser=null;currentRole='student';$('#portalDashboard').classList.add('hidden');$('#portalLogin').classList.remove('hidden');$('#portalLoginForm').reset();location.hash='portal'}
function loginPortal(role,user,pass){
 if(role==='student')return state.students.find(s=>s.username===user&&s.password===pass);
 if(role==='teacher')return state.teachers.find(t=>t.id.toLowerCase()===user.toLowerCase()&&pass==='teacher123');
 if(role==='admin')return user==='admin'&&pass==='admin123'?{username:'admin',name:'School Administrator'}:null;
}
function roleChanged(role){
 currentRole=role;
 $$('.role-tab').forEach(b=>b.classList.toggle('active',b.dataset.role===role));
 $('#loginUserLabel').firstChild.textContent=role==='student'?'Student Username':role==='teacher'?'Teacher ID':'Administrator Username';
 $('#portalUsername').placeholder=role==='student'?'student1001':role==='teacher'?'T001':'admin';
 $('#portalHint').textContent=role==='student'?'Demo: student1001 / 1234':role==='teacher'?'Demo: T001 / teacher123':'Demo: admin / admin123';
 $('#portalLoginMessage').textContent='';
}
function showPortal(){
 $('#portalLogin').classList.add('hidden'); $('#portalDashboard').classList.remove('hidden');
 if(currentRole==='student')renderStudentDashboard(currentUser);
 if(currentRole==='teacher')renderTeacherDashboard(currentUser);
 if(currentRole==='admin')renderAdminDashboard();
}
function renderStudentDashboard(s){
 const p=calcPercent(s.marks), weak=weakSubjects(s.marks), f=s.fees;
 const rows=Object.entries(s.marks).map(([sub,v])=>`<div class="result-row"><span>${escapeHTML(sub)}</span><b>${v}/50</b><div class="bar"><i style="width:${v*2}%"></i></div></div>`).join('');
 const history=Object.entries(s.testHistory).map(([n,m])=>`<div class="history-row"><span>${escapeHTML(n)}</span><b>${calcPercent(m)}%</b></div>`).join('');
 $('#portalDashboard').innerHTML=`
 <div class="dashboard-head"><div><span class="eyebrow">STUDENT DASHBOARD</span><h2>Welcome, ${escapeHTML(s.name)}</h2><p class="muted">Read-only account. You can pay fees and send a message/complaint.</p></div><button class="btn btn-ghost" id="portalLogout">Logout</button></div>
 <div class="dash-grid"><div class="dash-stat"><span>📚 Class</span><strong>${escapeHTML(s.className)}</strong></div><div class="dash-stat"><span>🎫 Roll No.</span><strong>${s.rollNo}</strong></div><div class="dash-stat"><span>📊 Percentage</span><strong>${p}%</strong></div><div class="dash-stat"><span>📅 Attendance</span><strong>${s.attendance}%</strong></div></div>
 <div class="dashboard-sections">
  <div class="result-card"><h3>📊 My Marks</h3>${rows}<hr><b>Total: ${calcTotal(s.marks)} / ${Object.keys(s.marks).length*50}</b> • Grade: ${grade(p)}<div class="test-history"><h3>Test History</h3>${history}</div></div>
  <div class="weak-card"><h3>📘 Improvement</h3>${weak.length?weak.map(x=>`<p>📘 <b>${escapeHTML(x)}</b><br><small>Keep practicing.</small></p>`).join(''):'<p>🎉 No subject is below the demo threshold.</p>'}</div>
 </div>
 <div class="portal-grid">
  <section class="glass"><h3>💰 Fees</h3><div class="fee-grid">
   <div><small>Last Year Due</small><b>${money(f.lastYearDue)}</b></div><div><small>This Year</small><b>${money(f.thisYearFee)}</b></div><div><small>Vehicle / गाड़ी</small><b>${money(f.vehicleFee)}</b></div><div><small>Paid</small><b>${money(f.paid)}</b></div><div><small>Remaining</small><b>${money(f.lastYearDue+f.thisYearFee+f.vehicleFee-f.paid)}</b></div>
  </div><h4>4 किस्त / Installments</h4><div class="installments">${f.installments.map((i,k)=>`<div><span>${k+1}st किस्त</span><b>${money(i.amount)}</b><em class="${i.status==='Paid'?'paid':'due'}">${i.status}</em></div>`).join('')}</div>
  <div class="payment-box"><b>Demo Online Payment</b><p>UPI: <code>tulsischool@upi</code> • Demo only</p><a class="btn" href="upi://pay?pa=tulsischool@upi&pn=Tulsi%20Devi%20School">Pay via UPI</a><button class="btn btn-ghost" id="paymentSubmitBtn">Submit Payment Reference</button></div></section>
  <section class="glass materials-student-card"><div class="materials-head"><div><h3>📚 Class Notes & Study Materials</h3><p class="muted">See materials online when you have internet, or download them to your mobile for offline study.</p></div><span class="offline-badge">📥 Offline Ready</span></div><div class="student-materials">${state.demoMaterials.filter(m=>m.className===s.className).map(m=>`<article class="student-material"><div class="material-icon">${m.type==='Notes'?'📘':m.type==='Question Paper'?'📝':m.type==='Homework'?'✏️':'📚'}</div><div class="material-main"><b>${escapeHTML(m.title)}</b><small>${escapeHTML(m.type)} • ${escapeHTML(m.date)}${m.fileName?` • ${escapeHTML(m.fileName)}`:''}</small><p>${escapeHTML(m.description||'Teacher uploaded learning material for your class.')}</p><div class="material-actions">${m.fileData?`<a class="small-btn" href="${m.fileData}" target="_blank" rel="noopener">👁️ View Online</a><a class="small-btn download-btn" href="${m.fileData}" download="${escapeHTML(m.fileName||m.title)}">📥 Download Offline</a>`:'<span class="muted">Online description only</span>'}</div></div></article>`).join('')||'<p class="muted">No notes or study materials have been uploaded for your class yet.</p>'}</div></section>
  <section class="glass"><h3>💬 Parent / Student Message & Complaint</h3><p class="muted">Send a question, request or शिकायत. Your class teacher can see class-related messages; the administrator can see all.</p><form id="messageForm"><label>Type<select id="msgType"><option>Question</option><option>Complaint / शिकायत</option><option>Payment Question</option><option>General Message</option></select></label><label>Message<textarea id="msgText" rows="5" required placeholder="Write your message..."></textarea></label><button class="btn" type="submit">Send Message</button><p id="msgStatus" class="form-message"></p></form></section>
 </div>`;
 $('#portalLogout').onclick=logoutPortal;
 $('#messageForm').onsubmit=e=>{e.preventDefault();state.demoMessages.push({id:'M'+Date.now(),studentUsername:s.username,studentName:s.name,className:s.className,type:$('#msgType').value,message:$('#msgText').value.trim(),date:new Date().toISOString(),status:'New'});save();$('#msgStatus').textContent='Message sent to the school.';e.target.reset();};
 $('#paymentSubmitBtn').onclick=()=>submitPayment(s);
}
function submitPayment(s){
 const amount=prompt('Demo payment amount (₹):'); if(!amount)return;
 const ref=prompt('Demo payment reference / UTR:'); if(!ref)return;
 state.demoMessages.push({id:'P'+Date.now(),studentUsername:s.username,studentName:s.name,className:s.className,type:'Payment Reference',message:`Amount ${amount}; Reference ${ref}`,date:new Date().toISOString(),status:'New'});
 save(); toast('Payment reference sent to the school. Demo only.');
}
function renderTeacherDashboard(t){
 const classStudents=state.students.filter(s=>s.className===t.className);
 const msgs=state.demoMessages.filter(m=>m.className===t.className);
 $('#portalDashboard').innerHTML=`
 <div class="dashboard-head"><div><span class="eyebrow">TEACHER DASHBOARD</span><h2>${escapeHTML(t.name)}</h2><p class="muted">${escapeHTML(t.subject)} • Class ${escapeHTML(t.className)}</p></div><button class="btn btn-ghost" id="portalLogout">Logout</button></div>
 <div class="dash-grid"><div class="dash-stat"><span>👩‍🏫 Subject</span><strong>${escapeHTML(t.subject)}</strong></div><div class="dash-stat"><span>🏫 Class</span><strong>${escapeHTML(t.className)}</strong></div><div class="dash-stat"><span>👨‍🎓 Students</span><strong>${classStudents.length}</strong></div><div class="dash-stat"><span>💬 Messages</span><strong>${msgs.length}</strong></div></div>
 <div class="portal-grid">
 <section class="glass"><h3>👨‍🎓 My Class Students</h3><div class="teacher-students">${classStudents.map(s=>`<div class="teacher-student"><b>${escapeHTML(s.name)}</b><span>Roll ${s.rollNo}</span><span>Attendance ${s.attendance}%</span><span>${calcPercent(s.marks)}%</span><button class="small-btn" data-stu="${s.username}">View Marks</button></div>`).join('')}</div></section>
 <section class="glass"><h3>📚 Upload Notes / Questions</h3><form id="materialForm"><label>Title<input id="matTitle" required placeholder="Chapter 3 Notes"></label><label>Type<select id="matType"><option>Notes</option><option>Question Paper</option><option>Homework</option><option>Study Material</option></select></label><label>File<input id="matFile" type="file"></label><label>Description<textarea id="matDesc" rows="3" placeholder="Short description"></textarea></label><button class="btn" type="submit">Upload to My Class</button><p id="matStatus" class="form-message"></p></form><div class="materials-list">${state.demoMaterials.filter(m=>m.className===t.className).map(m=>`<div><b>${escapeHTML(m.title)}</b><small>${escapeHTML(m.type)} • ${escapeHTML(m.date)}</small>${m.fileName?`<small>File: ${escapeHTML(m.fileName)}</small>${m.fileData?`<a class="small-btn" href="${m.fileData}" download="${escapeHTML(m.fileName)}">Download</a>`:''}`:''}</div>`).join('')||'<p class="muted">No materials uploaded yet.</p>'}</div></section>
 <section class="glass"><h3>💬 Class Messages / Complaints</h3>${msgs.length?msgs.slice().reverse().map(m=>`<div class="message-item"><b>${escapeHTML(m.type)} — ${escapeHTML(m.studentName)}</b><small>${escapeHTML(m.date.slice(0,10))}</small><p>${escapeHTML(m.message)}</p></div>`).join(''):'<p class="muted">No messages for this class.</p>'}</section>
 </div>`;
 $('#portalLogout').onclick=logoutPortal;
 $$('.small-btn').forEach(b=>b.onclick=()=>teacherViewStudent(b.dataset.stu,t));
 $('#materialForm').onsubmit=async e=>{
   e.preventDefault(); const file=$('#matFile').files[0];
   let fileData='';
   if(file && file.size<500000){fileData=await new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.readAsDataURL(file)})}
   state.demoMaterials.push({id:'MAT'+Date.now(),teacherId:t.id,className:t.className,title:$('#matTitle').value.trim(),type:$('#matType').value,description:$('#matDesc').value.trim(),fileName:file?.name||'',fileData,date:new Date().toISOString().slice(0,10)});
   save();$('#matStatus').textContent='Material uploaded for your class.';renderTeacherDashboard(t);
 };
}
function teacherViewStudent(username,t){
 const s=state.students.find(x=>x.username===username); if(!s)return;
 $('#portalDashboard').insertAdjacentHTML('beforeend',`<div class="modal-backdrop" id="teacherModal"><div class="glass modal"><button class="modal-close" id="closeTeacherModal">×</button><h3>${escapeHTML(s.name)} — Marks</h3><p>Class ${escapeHTML(s.className)} • Roll ${s.rollNo} • Attendance ${s.attendance}%</p>${Object.entries(s.marks).map(([sub,v])=>`<div class="edit-row"><span>${escapeHTML(sub)}</span><b>${v}/50</b></div>`).join('')}</div></div>`);
 $('#closeTeacherModal').onclick=()=>$('#teacherModal').remove();
}

function renderAdminDashboard(){
 const total=state.students.reduce((a,s)=>a+s.fees.thisYearFee+s.fees.vehicleFee+s.fees.lastYearDue,0);
 const paid=state.students.reduce((a,s)=>a+s.fees.paid,0);
 const due=total-paid;
 $('#portalDashboard').innerHTML=`
 <div class="dashboard-head"><div><span class="eyebrow">ADMINISTRATOR CONTROL CENTER</span><h2>School Administration</h2><p class="muted">Manage demo school content and records without editing code.</p></div><div><button class="btn btn-ghost" id="resetDemoBtn">Reset Demo</button> <button class="btn btn-ghost" id="portalLogout">Logout</button></div></div>
 <div class="dash-grid"><div class="dash-stat"><span>👨‍🎓 Students</span><strong>${state.students.length}</strong></div><div class="dash-stat"><span>💰 Collected</span><strong>${money(paid)}</strong></div><div class="dash-stat"><span>⚠️ Total Due</span><strong>${money(due)}</strong></div><div class="dash-stat"><span>📢 Notices</span><strong>${state.notices.length}</strong></div></div>
 <div class="admin-tabs" id="adminTabs">
  <button class="admin-tab active" data-panel="students">Students & Fees</button><button class="admin-tab" data-panel="notices">Notices</button><button class="admin-tab" data-panel="teachers">Teachers</button><button class="admin-tab" data-panel="messages">Messages & Complaints</button><button class="admin-tab" data-panel="site">Website Content</button>
 </div>
 <div id="adminPanel" class="admin-panel"></div>`;
 $$('.admin-tab').forEach(b=>b.onclick=()=>{$$('.admin-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderAdminPanel(b.dataset.panel)});
 $('#portalLogout').onclick=logoutPortal; $('#resetDemoBtn').onclick=resetDemo;
 renderAdminPanel('students');
}
function renderAdminPanel(panel){
 const p=$('#adminPanel');if(!p)return;
 if(panel==='students'){
  p.innerHTML=`<section class="glass admin-box"><div class="admin-toolbar"><h3>Student Records — ${state.students.length} demo students</h3><input id="adminStudentSearch" placeholder="Search student..."><select id="adminClassFilter"><option>All Classes</option>${classes.map(c=>`<option value="${c}">Class ${c}</option>`).join('')}</select></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Name</th><th>Class</th><th>Roll</th><th>Marks %</th><th>Attendance</th><th>This Year</th><th>Vehicle</th><th>Paid</th><th>Due</th><th>Action</th></tr></thead><tbody id="adminStudentRows"></tbody></table></div></section>`;
  const fill=()=>{
   const q=($('#adminStudentSearch').value||'').toLowerCase(), c=$('#adminClassFilter').value;
   $('#adminStudentRows').innerHTML=state.students.filter(s=>(c==='All Classes'||s.className===c)&&(`${s.name} ${s.username}`.toLowerCase().includes(q))).map(s=>{
    const due=s.fees.lastYearDue+s.fees.thisYearFee+s.fees.vehicleFee-s.fees.paid;
    return `<tr><td><b>${escapeHTML(s.name)}</b><small>${s.username}</small></td><td>${escapeHTML(s.className)}</td><td>${s.rollNo}</td><td>${calcPercent(s.marks)}%</td><td>${s.attendance}%</td><td>${money(s.fees.thisYearFee)}</td><td>${money(s.fees.vehicleFee)}</td><td>${money(s.fees.paid)}</td><td>${money(due)}</td><td><button class="small-btn" data-edit="${s.username}">Edit</button></td></tr>`;
   }).join('');
   $$('[data-edit]').forEach(b=>b.onclick=()=>adminEditStudent(b.dataset.edit));
  };
  $('#adminStudentSearch').oninput=fill;$('#adminClassFilter').onchange=fill;fill();
 }
 if(panel==='notices'){
  p.innerHTML=`<section class="glass admin-box"><h3>📢 Post / Update Notice</h3><form id="noticeForm" class="admin-form"><input type="hidden" id="noticeId"><label>Category<select id="noticeCategory"><option>Emergency</option><option>Weekly</option><option>Holiday</option><option>Exam</option><option>Admission</option><option>General</option></select></label><label>Date<input type="date" id="noticeDate" required></label><label>Title<input id="noticeTitle" required placeholder="Emergency Holiday"></label><label>Message<textarea id="noticeMessage" rows="4" required placeholder="School will remain closed because..."></textarea></label><button class="btn" type="submit">Publish Notice</button><button class="btn btn-ghost" type="button" id="clearNotice">Clear</button></form><hr><div class="admin-list">${state.notices.map(n=>`<div class="admin-list-row"><div><b>${escapeHTML(n.title)}</b><small>${escapeHTML(n.category)} • ${escapeHTML(n.date)}</small><p>${escapeHTML(n.message)}</p></div><button class="small-btn" data-del-notice="${n.id}">Delete</button></div>`).join('')}</div></section>`;
  $('#noticeForm').onsubmit=e=>{e.preventDefault();const id=$('#noticeId').value;if(id){const n=state.notices.find(x=>x.id===id);Object.assign(n,{category:$('#noticeCategory').value,date:$('#noticeDate').value,title:$('#noticeTitle').value,message:$('#noticeMessage').value})}else state.notices.unshift({id:'N'+Date.now(),category:$('#noticeCategory').value,date:$('#noticeDate').value,title:$('#noticeTitle').value,message:$('#noticeMessage').value});save();renderNotices();renderAdminPanel('notices');toast('Notice published.');};
  $('#clearNotice').onclick=()=>$('#noticeForm').reset();
  $$('[data-del-notice]').forEach(b=>b.onclick=()=>{state.notices=state.notices.filter(n=>n.id!==b.dataset.delNotice);save();renderNotices();renderAdminPanel('notices')});
 }
 if(panel==='teachers'){
  p.innerHTML=`<section class="glass admin-box"><h3>👩‍🏫 Manage Teacher Names & Assignments</h3><form id="teacherForm" class="admin-form"><input type="hidden" id="teacherId"><label>Teacher ID<input id="teacherIdInput" placeholder="T009" required></label><label>Name<input id="teacherName" required></label><label>Subject<input id="teacherSubject" required></label><label>Class<select id="teacherClass">${classes.map(c=>`<option>${c}</option>`).join('')}</select></label><button class="btn" type="submit">Save Teacher</button></form><div class="admin-list">${state.teachers.map(t=>`<div class="admin-list-row"><div><b>${escapeHTML(t.name)}</b><small>${escapeHTML(t.id)} • ${escapeHTML(t.subject)} • Class ${escapeHTML(t.className)}</small></div><div><button class="small-btn" data-edit-teacher="${t.id}">Edit</button> <button class="small-btn" data-del-teacher="${t.id}">Delete</button></div></div>`).join('')}</div></section>`;
  $('#teacherForm').onsubmit=e=>{e.preventDefault();const id=$('#teacherId').value;if(id){const t=state.teachers.find(x=>x.id===id);Object.assign(t,{name:$('#teacherName').value,subject:$('#teacherSubject').value,className:$('#teacherClass').value})}else state.teachers.push({id:$('#teacherIdInput').value.trim(),name:$('#teacherName').value,subject:$('#teacherSubject').value,className:$('#teacherClass').value});save();renderTeachers();renderAdminPanel('teachers');toast('Teacher record saved.')};
  $$('[data-edit-teacher]').forEach(b=>b.onclick=()=>{const t=state.teachers.find(x=>x.id===b.dataset.editTeacher);$('#teacherId').value=t.id;$('#teacherIdInput').value=t.id;$('#teacherName').value=t.name;$('#teacherSubject').value=t.subject;$('#teacherClass').value=t.className});
  $$('[data-del-teacher]').forEach(b=>b.onclick=()=>{state.teachers=state.teachers.filter(t=>t.id!==b.dataset.delTeacher);save();renderTeachers();renderAdminPanel('teachers')});
 }
 if(panel==='messages'){
  p.innerHTML=`<section class="glass admin-box"><h3>💬 Parent Questions / Complaints / Payment References</h3>${state.demoMessages.slice().reverse().map(m=>`<div class="message-item"><b>${escapeHTML(m.type)} — ${escapeHTML(m.studentName)}</b><small>Class ${escapeHTML(m.className)} • ${escapeHTML(m.date.slice(0,10))}</small><p>${escapeHTML(m.message)}</p><button class="small-btn" data-close-msg="${m.id}">${m.status==='Resolved'?'Resolved':'Mark Resolved'}</button></div>`).join('')||'<p class="muted">No messages yet.</p>'}</section>`;
  $$('[data-close-msg]').forEach(b=>b.onclick=()=>{const m=state.demoMessages.find(x=>x.id===b.dataset.closeMsg);if(m)m.status='Resolved';save();renderAdminPanel('messages')});
 }
 if(panel==='site'){
  p.innerHTML=`<section class="glass admin-box"><h3>🌐 Edit Public Website Content</h3><form id="siteForm" class="admin-form"><label>Hero Title<input id="siteHeroTitle" value="${escapeHTML(state.siteSettings.heroTitle)}"></label><label>Hero Subtitle<input id="siteHeroSubtitle" value="${escapeHTML(state.siteSettings.heroSubtitle)}"></label><label>About Text<textarea id="siteAbout" rows="4">${escapeHTML(state.siteSettings.aboutText)}</textarea></label><label>Contact Phone<input id="sitePhone" value="${escapeHTML(state.siteSettings.contactPhone)}"></label><label>Contact Email<input id="siteEmail" value="${escapeHTML(state.siteSettings.contactEmail)}"></label><button class="btn" type="submit">Save Website Content</button></form><p class="muted">This demo stores changes in this browser. A real school website needs a server/database so every device sees the same updates.</p></section>`;
  $('#siteForm').onsubmit=e=>{e.preventDefault();Object.assign(state.siteSettings,{heroTitle:$('#siteHeroTitle').value,heroSubtitle:$('#siteHeroSubtitle').value,aboutText:$('#siteAbout').value,contactPhone:$('#sitePhone').value,contactEmail:$('#siteEmail').value});save();applySiteSettings();toast('Website content saved.');};
 }
}
function adminEditStudent(username){
 const s=state.students.find(x=>x.username===username);if(!s)return;
 const marksHTML=Object.entries(s.marks).map(([sub,v])=>`<label>${escapeHTML(sub)}<input type="number" min="0" max="50" data-mark="${escapeHTML(sub)}" value="${v}"></label>`).join('');
 $('#portalDashboard').insertAdjacentHTML('beforeend',`<div class="modal-backdrop" id="studentEditModal"><div class="glass modal wide"><button class="modal-close" id="closeStudentEdit">×</button><h3>Edit Student: ${escapeHTML(s.name)}</h3><div class="edit-grid"><label>Name<input id="edName" value="${escapeHTML(s.name)}"></label><label>Class<select id="edClass">${classes.map(c=>`<option ${c===s.className?'selected':''}>${c}</option>`).join('')}</select></label><label>Roll No.<input type="number" id="edRoll" value="${s.rollNo}"></label><label>Attendance %<input type="number" id="edAttendance" min="0" max="100" value="${s.attendance}"></label><label>Last Year Due<input type="number" id="edLastDue" value="${s.fees.lastYearDue}"></label><label>This Year Fee<input type="number" id="edThisFee" value="${s.fees.thisYearFee}"></label><label>Vehicle Fee<input type="number" id="edVehicle" value="${s.fees.vehicleFee}"></label><label>Paid<input type="number" id="edPaid" value="${s.fees.paid}"></label></div><h4>Marks / 50</h4><div class="edit-grid">${marksHTML}</div><button class="btn" id="saveStudentEdit">Save Student</button></div></div>`);
 $('#closeStudentEdit').onclick=()=>$('#studentEditModal').remove();
 $('#saveStudentEdit').onclick=()=>{
   s.name=$('#edName').value;s.className=$('#edClass').value;s.rollNo=Number($('#edRoll').value);s.attendance=Number($('#edAttendance').value);
   s.fees.lastYearDue=Number($('#edLastDue').value);s.fees.thisYearFee=Number($('#edThisFee').value);s.fees.vehicleFee=Number($('#edVehicle').value);s.fees.paid=Number($('#edPaid').value);
   $$('[data-mark]').forEach(i=>s.marks[i.dataset.mark]=Math.max(0,Math.min(50,Number(i.value))));
   s.fees.installments.forEach((x,k)=>{x.status=s.fees.paid>=s.fees.thisYearFee*(k+1)/4?'Paid':'Due'});
   save();renderStudentFilters();$('#studentEditModal').remove();renderAdminPanel('students');toast('Student record updated.');
 };
}
function applySiteSettings(){
 const ss=state.siteSettings;
 const hero=$('#heroTitle');if(hero)hero.textContent=ss.heroTitle;
 const sub=$('#heroSubtitle');if(sub)sub.textContent=ss.heroSubtitle;
 const about=$('#aboutText');if(about)about.textContent=ss.aboutText;
}
function setupHeroBindings(){
 const hero=$('#heroTitle'); if(hero&&!hero.textContent.trim())hero.textContent=state.siteSettings.heroTitle;
 const sub=$('#heroSubtitle'); if(sub&&!sub.textContent.trim())sub.textContent=state.siteSettings.heroSubtitle;
}
function setupPortal(){
 $$('.role-tab').forEach(b=>b.onclick=()=>roleChanged(b.dataset.role));
 $('#portalLoginForm').onsubmit=e=>{
  e.preventDefault();const u=$('#portalUsername').value.trim(),p=$('#portalPassword').value;
  const found=loginPortal(currentRole,u,p);
  if(found){currentUser=found;$('#portalLoginMessage').textContent='Login successful.';showPortal()}
  else $('#portalLoginMessage').textContent='Invalid login details.';
 };
 roleChanged('student');
}

$('#langToggle')?.addEventListener('click',()=>{language=language==='en'?'hi':'en';applyLanguage()});
$('#themeToggle')?.addEventListener('click',()=>{const next=document.body.classList.contains('light')?'dark':'light';localStorage.setItem('theme',next);applyTheme()});
$('#menuToggle')?.addEventListener('click',()=>{$('#navLinks')?.classList.toggle('open')});
function setupPublicSectionSlides(){
 const publicIds=['about','academics','students','teachers','results','notices','facilities','activities','gallery','admissions','contact'];
 publicIds.forEach(id=>{
   const section=$('#'+id); if(!section)return;
   let close=section.querySelector('.section-slide-close');
   if(!close){ close=document.createElement('button'); close.className='section-slide-close'; close.type='button'; close.innerHTML='× <span>Close</span>'; close.setAttribute('aria-label','Close section'); section.prepend(close); close.onclick=()=>closePublicSection(section); }
 });
 $$('.nav-links a, .quick-card, .hero-actions a').forEach(a=>a.addEventListener('click',e=>{
   const href=a.getAttribute('href')||''; if(!href.startsWith('#'))return; const id=href.slice(1);
   if(publicIds.includes(id)){e.preventDefault(); const section=$('#'+id); if(section)openPublicSection(section); $('#navLinks')?.classList.remove('open');}
 }));
}
function openPublicSection(section){
 $$('.section-slide-open').forEach(s=>s.classList.remove('section-slide-open'));
 section.classList.add('section-slide-open'); document.body.classList.add('section-slide-mode'); section.scrollTop=0;
}
function closePublicSection(section){section.classList.remove('section-slide-open');document.body.classList.remove('section-slide-mode');}
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('#navLinks')?.classList.remove('open')));
$('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();$('#contactMessage').textContent='Demo enquiry submitted. No real data was sent.';e.target.reset()});
$('#studentSearch')?.addEventListener('input',renderStudentFilters);$('#classFilter')?.addEventListener('change',renderStudentFilters);

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('reveal')}),{threshold:.08});
$$('.glass,.section-heading').forEach(el=>observer.observe(el));
const sections=$$('main section[id]'), navItems=$$('.nav-links a');
const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navItems.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-40% 0px -50%'});
sections.forEach(s=>navObserver.observe(s));
$('#topBtn')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
window.addEventListener('scroll',()=>$('#topBtn')?.classList.toggle('show',scrollY>500));

renderClasses();renderStudentFilters();renderTeachers();setupNoticeFilters();renderNotices();renderActivities();applyLanguage();applyTheme();setupPortal();setupHeroBindings();applySiteSettings();setupSlideshow();setupPublicSectionSlides();
$('#year').textContent=new Date().getFullYear();
