var readline = require('readline');

var input = [];
//var input2 = [];
var dbase=`${process.argv[3] || 'PostgreSQL'}`;
var delimiter=`${process.argv[4]}`;
//var newfirstrowsplit=[];
var Dtype='default';
var DtypeArray=[];
var Newsplit=[];
var newrow=[];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.prompt();

rl.on('line', function (cmd) {

    input.push(cmd);
});

rl.on('close', function (cmd) {
    //removing |---|---|
    if (/---*/.test(input[1])) {
        input.splice(1,1);
    }

//Extracting second row for datatype detection
for (let i=0;i<=input.length-1;i++){
    if(input[i].charAt(0)=='|' && input[i].charAt(input[i].length-1)=='|'){
        var rowSplit=input[i].split('');
        rowSplit.shift();
        rowSplit.pop();
        input[i]=rowSplit.join('').split('|');
        //console.log("ture");
    } else if (input[i].charAt(0)=='|' || input[i].charAt(input[i].length-1)=='|'){
        if (input[i].charAt(0)=='|'){
            var rowSplit=input[i].split('');
            rowSplit.shift();
            input[i]=rowSplit.join('').split('|');
        }else{
            var rowSplit=input[i].split('');
            rowSplit.pop();
            input[i]=rowSplit.join('').split('|');
        }
    }  else {
        if (!!process.argv[4]){
            input[i]=input[i].split(delimiter);
        }
        else if(/,/g.test(input[i])){
            input[i]=input[i].split(',');
        }
        else if(/\|/g.test(input[i])){
            input[i]=input[i].split('|');
        }
        else{
            if(/\s/g.test(input[i])){
            input[i]=input[i].split(' ');
        }else{
            input[i]=input[i].split(delimiter);
            //input[i]=input[i].split('');//splits each charater
        }}
       
    }
//const row=Firstrow; //this is second row of table
}
console.log(input);
for(let k=0;k<=input[1].length-1;k++){ //detection of number and string
        if (/^[0-9]+$/.test(input[1][k])){
            Dtype='number';
           
            //console.log(Firstrow[k]+"is number")
        } else if(/[a-z]/i.test(input[1][k])){
            Dtype='string';
            //console.log(Firstrow[k]+"is string")
        }else if(/\s/g.test(input[1][k])){
            Dtype='Empty';
            //console.log('White space')
        }
        DtypeArray[k]=Dtype;
    }
    console.log(DtypeArray);
//console.log(DtypeArray.length);
//console.log("inputlength="+input.length);
for(i=0;i<=input.length-1;i++){
    if (i==0){
        for(let j=0;j<=DtypeArray.length-1;j++){
    if(DtypeArray[j]=='number'){
        if (/MySQL/i.test(dbase)){
            Newsplit[j]=input[0][j]+' INT';
        } else if (/Oracle/i.test(dbase)) {
            Newsplit[j]=input[0][j]+' NUMBER';
        } else if (/PostgreSQL/i.test(dbase)){
            Newsplit[j]=input[0][j]+' INT';
        }
    } else if (DtypeArray[j]=='string'){
        if (/MySQL/i.test(dbase)){
            Newsplit[j]=input[0][j]+' TEXT';
        } else if (/Oracle/i.test(dbase)) {
            Newsplit[j]=input[0][j]+' VARCHAR2(50)';
        } else if (/PostgreSQL/i.test(dbase)){
            Newsplit[j]=input[0][j]+' TEXT';
        }     
    } else if (DtypeArray[j]=='Empty'){
        if (/MySQL/i.test(dbase)){
            Newsplit[j]=input[0][j]+' VARCHAR(30)';
        } else if (/Oracle/i.test(dbase)) {
            Newsplit[j]=input[0][j]+' VARCHAR2(30)';
        } else if (/PostgreSQL/i.test(dbase)){
            Newsplit[j]=input[0][j]+' VARCHAR(30)';
        }
    } else if (DtypeArray[j]=='default'){
        Newsplit[j]=input[0][j];
    }

}
console.log(`CREATE TABLE ${process.argv[2] || '<table>'} (`+Newsplit.join(',')+`);`);
//console.log(Newsplit);//Create row array
}
    if (i>0) { 
    for(let k=0;k<=input[i].length-1;k++){ //detection of number and string
        // if (/^[0-9]/.test(Firstrow[k])&&/[0-9]$/.test(Firstrow[k])&&/^[0-9]*$/.test(Firstrow[k])){
            
            if (/^[0-9]+$/.test(input[i][k])){ //for number
               newrow[k]=input[i][k];
                //console.log(Firstrow[k]+"is number")
            } else if(/[a-z]/i.test(input[i][k])){ // for string

                var notfirstrow=input[i][k].trim().split('');
                if(/^\'*$/.test(notfirstrow[0])){
                    newrow[k]=notfirstrow.join('');
                }else{
               notfirstrow.unshift('\'');
               notfirstrow.push('\'');
               newrow[k]=notfirstrow.join('');}
                //console.log(Firstrow[k]+"is string")
            }else if(/\s/g.test(input[i][k])){ // for empty or whitespace
               newrow[k]='NULL';
                //console.log('White space')
            }
            
        }
        console.log(`INSERT INTO ${process.argv[2] || '<table>'} (`+input[0].join(',')+`) VALUES (`+newrow.join(',')+`);`);
      //  console.log(newrow);
    }
}

//for(i=0;i<=input.length-1;i++){
         
   // }
    //var countCol=input[0].split('|')
    //var creatable="CREATE TABLE <tablename> ()"
    //if (input[0].split('|')==' '){
    //}
    //console.log(input.join('\n'));
    // var count=input.length;
    //console.log(input[0].replace(/\|/g,''));
    // console.log(Primaryrow);
    process.exit(0);
});