const currentUser = localStorage.getItem("loggedInUser");
if(!currentUser) window.location="auth.html";
document.getElementById("welcomeUser").textContent="welcome " +currentUser;

let transactions = JSON.parse(
  localStorage.getItem("transactions_"+currentUser)
) || [];

const balanceEl=document.getElementById("balance");
const incomeEl=document.getElementById("income");
const expenseEl=document.getElementById("expense");
const list=document.getElementById("list");

document.getElementById("form").addEventListener("submit",e=>{
  e.preventDefault();

  const desc=document.getElementById("desc").value;
  const amount=+document.getElementById("amount").value;
  const type=document.getElementById("type").value;

  transactions.push({desc,amount,type});
  localStorage.setItem("transactions_"+currentUser, JSON.stringify(transactions));

  update();
});

function update(){
  list.innerHTML="";
  let income=0,expense=0;

  transactions.forEach(t=>{
    list.innerHTML+=`<tr><td>${t.desc}</td><td>${t.amount}</td><td>${t.type}</td></tr>`;
    t.type==="income"?income+=t.amount:expense+=t.amount;
  });

  incomeEl.textContent="₹"+income;
  expenseEl.textContent="₹"+expense;
  balanceEl.textContent="₹"+(income-expense);

  drawChart(income,expense);
}

let chart;
function drawChart(i,e){
  if(chart) chart.destroy();
  chart=new Chart(document.getElementById("chart"),{
    type:"pie",
    data:{labels:["Income","Expense"],datasets:[{data:[i,e]}]}
  });
}

function logout(){
  localStorage.removeItem("loggedInUser");
  window.location="auth.html";
}

function toggleTheme(){
  document.body.classList.toggle("dark");
}

update();