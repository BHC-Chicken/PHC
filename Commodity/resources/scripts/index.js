window.addEventListener('load', () => {
   Data.retrieve({
      vendor:'CHRIS',
      code:'CME_CL1'
   });

   Data_gold.retrieve({
      vendor:'CHRIS',
      code:'CME_GC1'
   });
});