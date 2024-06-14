## How to run?
```
node md2sql.js <tablename> <databasetype> <delimiter>
```




`<databasetype>` currently supported
1. `MySQL`
2. `Oracle`
3. `PostgreSQL`(default)

Autodetection of datatypes is done using first row of table.(i.e.2nd row of actual input as first row is considered as header)
### Ideal input formats as per their precedence :
1. Markdown table
```
|head1|head2|
|---|---|
|value1|value2|
|value3|value4|
```
2. `<delimiter>`optional argument if passed any
3. `,`csv
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
5. ` `whitespace or tab
```
head1 head2
value1 value2
value3 value4
```
