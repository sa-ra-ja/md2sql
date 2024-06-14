## Introduction
A javascript to convert MD Tables data into SQL queries(DDL,DML).

Added support for `,`comma,`|`pipe ,` `space or custom delimiter separated data
## Prerequisite
nodejs[Download](https://nodejs.org/en/download/prebuilt-installer)
## How to run?
```
node md2sql.js <tablename> <databasetype> <delimiter>
```
### Arguments:
`<tablename>`:Name of your table

`<databasetype>`:MySQL,Oracle or PostgreSQL(default)

`<delimiter>`: `,`,`|`,`:` or anything


## Details
- Detection of datatypes is done using first row of table.(*i.e.2nd row of actual input as first row is considered as header*)
- Autodetection of input format and delimiters.
  - ### Precedence :
    - Markdown Table
    - custom delimiter
    - `,`csv
    - `|`pipe
    - ` `space
    #### Input Examples
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
    5. ` `space separated
    ```
    head1 head2
    value1 value2
    value3 value4
    ```
> [!NOTE]
> Press `Ctrl+D` on newline to end the input
## Example
```
node md2sql.js EMP
```
*input* :
```
> Id,Name,Country
> 1,Rahul Gaikwad,India
> 2,Sayli Bachan,America
```
*output* :
```sql
[
  [ 'Id', 'Name', 'Country' ],
  [ '1', 'Rahul Gaikwad', 'India' ],
  [ '2', 'Sayli Bachan', 'America' ]
]
[ 'number', 'string', 'string' ]
CREATE TABLE EMP (Id INT,Name TEXT,Country TEXT);
INSERT INTO EMP (Id,Name,Country) VALUES (1,'Rahul Gaikwad','India');
INSERT INTO EMP (Id,Name,Country) VALUES (2,'Sayli Bachan','America');
```


## Future Scope
- [ ] Adding SQLite support
- [ ] Adding Date datatype support
- [ ] Rewriting in python
- [ ] Integrating in website as a tool
