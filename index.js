$(function() {
    
    //to make Ajax work in IE
    jQuery.support.cors = true;
    
$.ajax({
  url: "http://openexchangerates.org/api/currencies.json?app_id=601daf13b5e342cc836d73c7b5436f8b",
  cache: true,
  dataType: "json",
  success: function(data) {
    
    $.each(data, function(key, value) {
        
        if ((key === "USD") || (key === "GBP") || (key === "EUR") || (key === "INR") || (key === "JPY") || (key === "CAD") || (key === "AUD") || (key === "CNY")){
            $(".initial, .code").prepend($("<option/>", {
                value: key,
                text: value
            }));
        } else 
            $(".initial, .code").append($("<option/>", {
                value: key,
                text: value
            }));
    });
      
      $(".initial").prepend($("<option/>", {
        value: "Error",
        text: "आधार मुद्रा",
        selected: "selected"
      }));
      
      $(".code").prepend($("<option/>", {
        value: "Error",
        text: "नया मुद्रा",
        selected: "selected"
      }));
  }
});
    
 /*$.getJSON("http://openexchangerates.org/api/currencies.json?app_id=601daf13b5e342cc836d73c7b5436f8b", function(data) {
        
       console.log(5);
        var codes = data;
        
        var output = [];

$.each(codes, function(key, value)
{
  output.push('<option value="'+ key +'">'+ value +'</option>');
});

$('.initial').html(output.join(''));
    });*/
    
    $.getJSON("http://openexchangerates.org/api/latest.json?app_id=601daf13b5e342cc836d73c7b5436f8b", function(data) {
    
        var amount;
        var codeInput;
        var base;
        var newAmt;
        var baseRate;
        var newRate;
        var check;
        var baseText;
        var codeText;
        var rates = data.rates;
        
        $(".submit").click(function() {
            amount = $(".amount").val();
            check = isNaN(amount);
            
            if ((check === true) || (amount === ""))
            {
                //$(".conv").val("");
                confirm("कृपया मुल्यमा कुनै अंक प्रविष्ट गर्नुहोस्। धन्यवाद!");
                return;
            }

            base = $(".initial").val();
            baseText = $(".initial option:selected").text();
            codeInput = $(".code").val();
            codeText = $(".code option:selected").text();
            
            if ((base === 'Error') || (codeInput === 'Error'))
                {
                    confirm("कृपया उपयुक्त मुद्रा छानुहोस् । धन्यवाद!");
            return;
                }
            
            $.each(rates, function(code, rate){
            //console.log(codeInput);
            if (code === base)
            {
                baseRate = rate;
            }
                
            if (code === codeInput)
            {
                newRate = rate;
            }
                
        });
            newAmt = amount * (newRate/baseRate);
            newAmt = newAmt.toFixed(2);
            confirm(amount + " " + baseText + " बराबर " + newAmt + " " + codeText + " हुन्छ । ");
        //$(".conv").val(rates.INR);
        });
        
        $(".code").focus(function() {
            //$(".conv").val("");
        });
        
        

    });
     
});
