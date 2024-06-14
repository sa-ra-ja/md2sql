## How to run?
```
node md2sql.js <tablename> <databasetype> <delimiter>
```

 `<databasetype>` currently supported
1. `MySQL`
2. `Oracle`
3. `PostgreSQL`(default if not mentioned explicitly) 

## Features
- Autodetection of datatypes is done using first row of table.(i.e.2nd row of actual input as first row is considered as header)
- Autodetection of input format and delimiter
  - ### Precedence :
1. Markdown table
```
|head1|head2|
|---|---|
|value1|value2|
|value3|value4|
```
2. Custom `<delimiter>` if passed any
4. `,`csv
```
head1,head2
value1,value2
value3,value4
```
4. `|`pipe separated
```
head1|head2
value1|value2
value3|value4
```
5. ` `whitespace or `  ` tab separated
```
head1 head2
value1 value2
value3 value4
```
> [!NOTE]
> Press `Ctrl+D` on newline to end the input
