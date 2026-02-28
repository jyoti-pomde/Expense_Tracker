function downloadPDF(){
  const win = window.open("", "", "width=800,height=600");
  win.document.write("<h2>Finance Report</h2>");
  win.document.write(document.querySelector("table").outerHTML);
  win.print();
}