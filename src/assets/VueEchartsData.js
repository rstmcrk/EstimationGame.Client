const option = {
  
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '96%',
      data: [],
      label: {
        show: true,
        position: 'inside', 
        formatter: '{b}', 
        color: '#fff',    
        fontSize: 18,     
        fontWeight: 'bold'
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

export {
    option,
};