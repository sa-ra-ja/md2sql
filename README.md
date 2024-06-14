## How to run?
```
node md2sql.js <tablename> <databasetype> <delimiter>
```
*`<value>` are optional arguments*
`<databasetype>`currently supported
1. `MySQL`
2. `Oracle`
3. `PostgreSQL`(default)

Autodetection of datatypes is done using first row of table.

Autodetection of input format precedence
- Markdown table
```
|head1|head2|
|---|---|
|value1|value2|
|value3|value4|
```
- `<delimiter>`optional argument if passed any
- `,`csv
```
head1,head2
value1,value2
value3,value4
```
- `|`pipe separated
```
head1|head2
value1|value2
value3|value4
```
- ` `whitespace or tab
```
head1 head2
value1 value2
value3 value4
```
