const PI = 3.141592653589793;
let chart;

const slider1 = document.getElementById("xVal");
const slider2 = document.getElementById("mean");

slider2.addEventListener("input", () =>{
    const val = parseInt(slider2.value);
    if (val > parseInt (slider1.value)-5){
        slider1.value = val + 15
        document.getElementById("xVal1").innerHTML = slider1.value;
    }
});

slider1.addEventListener("input", () =>{
    const val = parseInt(slider1.value);
    if (val < parseInt (slider2.value)){
        slider2.value = slider1.value -10
        document.getElementById("meanVal").innerHTML = slider2.value;
    }
});


function store_x(x){
    let n;
    n = x;
    return n;
}

function factorial (n){
    let fact=1;
    for (let i=1; i<=n; i++){
        fact *=i;
    }
    return fact;
}

function compute_f_x(x, mean, sd){
    let a= 1/sd* Math.sqrt(2*PI);
    let b = (x-mean)/sd;
    let c = (-1/2)*Math.pow(b,2);
    let y = a*Math.exp(c);
    return y;
}

function compute_f_x_2 (x, mean){
    let a = Math.exp(-mean);
    b = Math.pow(mean, x);
    c = factorial (x);
    let y = a*b/c;
    return y;
}

function compute_plot_values (x_value, mean,){
    var plot_XY = [];
    for (let x =0; x<=x_value; x++){
        let y = compute_f_x_2(x, mean);
        plot_XY.push ({x, y});        
    }
    return plot_XY;
}

function update_graph1(x, mean){
    var ctx = document.getElementById('chart').getContext('2d');
    const dataPoints = compute_plot_values(x, mean);
    console.log(dataPoints);
    const maxY = Math.max(...dataPoints.map(p => p.y))
    const minY = Math.min(...dataPoints.map(p => p.y))
    


    const data = {
        datasets: [{
          label: 'f(x)',
          data: dataPoints,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          showLine: true,
          fill: false,
          tension: 0.3
        }]
      };
    
      const config = {
        type: 'line', 
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          
          scales: {
            x: {
                type: 'linear',
                
              reverse: false, 
              min: 0,
              max:x,
              grid: {
                drawOnChartArea: true,
                
              },
              title: {
                display: true,
                text: 'x', 
                font: {
                size: 14
            }
              },
              ticks: {
                stepSize: 1,
              }
            },


            y: {
              reverse: false,
              display:true,
              beginAtZero: true, 
              min: 0,
              max: maxY + 0.5*maxY,
              grid: {
                drawOnChartArea: true
              },
              title: {
                display:true,
                text: 'f(x)',
                font: {
                    size :14
                }
              },
              ticks: {
                stepSize: 0.01,
                display:true,
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
                callbacks: {
                  label: function(context) {
                    const x = context.parsed.x.toFixed(1);  // 5 decimal places
                    const y = context.parsed.y.toFixed(7);  // 5 decimal places
                    return `(${x}, ${y})`;
                  },
                }
              },
              title: {
                display:true,
                text: "Poisson's Distribution Curve for Mean = " + mean + " and given respective X-values",
              },
            annotation:{
                annotations:{
                    centerYAxis: {
                        type: 'line',
                        scaleID: 'x',
                        value: 0,
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        borderWidth: 2,
                        // Draw Y-ticks manually
                        drawTime: 'afterDraw',
                        label: {
                          enabled: false
                        }
                      },
                      
                }
            }
           
          }
        }
      };
    
      if (chart != undefined) {
        chart.destroy();
    }

      chart = new Chart(ctx, config);
}

update_graph1(10, 1);