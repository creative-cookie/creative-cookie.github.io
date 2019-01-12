const creditNum = document.getElementById('creditNum');
const validateBtn = document.getElementById('validate');
let creditNumValue;


const issuers = {
  isVisa: /^4(?!.*[\D])/,
  isAmex: /^3[47](?!.*[\D])/,
  isDiscover: /^6(?:011|5)(?!.*[\D])/,
  isMaster: /^(?:5[1-5]|222[1-9]|22[3-9][0-9]|2[3-6][0-9][0-9]|27[01][0-9]|2720)(?!.*[\D])/,
  isDash: /-*/g
};


creditNum.addEventListener('keyup', () => {
    creditNumValue = creditNum.value;
    if(issuers.isDash.test(creditNum.value)){
        creditNum.value = creditNum.value.replace(/-*/g, "");
        creditNumValue = creditNum.value;
    }
    if(issuers.isVisa.test(creditNum.value) && creditNum.value.length <= 16){
        document.getElementById('isVisa').classList.add('valid');
    } else{
        document.getElementById('isVisa').classList.remove('valid');
    }
    if(issuers.isAmex.test(creditNum.value) && creditNum.value.length <= 15){
        document.getElementById('isAmex').classList.add('valid');
    } else{
        document.getElementById('isAmex').classList.remove('valid');
    }
    if(issuers.isDiscover.test(creditNum.value) && creditNum.value.length <= 16){
        document.getElementById('isDiscover').classList.add('valid');
    } else{
        document.getElementById('isDiscover').classList.remove('valid');
    }
    if(issuers.isMaster.test(creditNum.value) && creditNum.value.length <= 16){
        document.getElementById('isMaster').classList.add('valid');
    } else{
        document.getElementById('isMaster').classList.remove('valid');
    }
});

validateBtn.addEventListener('click', () => {
    console.log(typeof parseInt(creditNumValue));
    if(checksum(creditNumValue))
    {
      console.log('valid');
      document.getElementById('creditNum').classList.remove('invalid');
      document.getElementById('creditNum').classList.add('valid');
      document.getElementById('feedbackText').style.display = "block";
      document.getElementById('feedbackText').innerHTML = "This credit card number is mathmatically valid";
      document.getElementById('feedbackText').style.color = "green";
    } else{
      console.log('not valid');
      document.getElementById('creditNum').classList.remove('valid');
      document.getElementById('creditNum').classList.add('invalid');
      document.getElementById('feedbackText').style.display = "block";
      document.getElementById('feedbackText').innerHTML = "This credit card number is not mathmatically valid";
      document.getElementById('feedbackText').style.color = "red";
    }
});

function checksum(creditNo){
  let length = creditNo.length;
  let checksumTotal = 0;
  let isSecondDigit = false;

  for(let i = (length - 1); i >= 0; i--){
    let currentDigit = creditNo[i];

    if(isSecondDigit == true){
      currentDigit *= 2;
    }

    checksumTotal += Math.floor(currentDigit / 10);
    checksumTotal += currentDigit % 10;
    isSecondDigit = !isSecondDigit;
  }
  console.log(checksumTotal);
  return(checksumTotal % 10 === 0);
};
