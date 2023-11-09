
    const sugaService = {
    labels: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.","ส."],
    datasets: [
      {
        data: [0, 20, 40, 60, 80, 100],
        color: (opacity = 0) => `rgba(22, 49, 194, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["ปัจจุบัน"] // optional
  };

  export  default sugaService;

 

  

  
