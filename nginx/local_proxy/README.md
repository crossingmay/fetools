├── nginx
│   ├── ca.crt
│   ├── ca.srl
│   ├── nginx.conf
│   ├── nginx.log
│   ├── server.crt
│   ├── server.csr
│   └── server.key

### 证书生成
生成server.key
`$ openssl genrsa -des3 -out server.key 2048`

以上命令是基于des3算法生成的rsa私钥，在生成私钥时必须输入至少4位的密码。

生成无密码的server.key
`$ openssl rsa -in server.key -out server.key`

生成CA的crt
`$ openssl req -new -x509 -key server.key -out ca.crt -days 3650`

基于ca.crt生成csr
`$ openssl req -new -key server.key -out server.csr`

命令的执行过程中依次输入国家、省份、城市、公司、部门及邮箱等信息。

生成crt（已认证）
`$ openssl x509 -req -days 3650 -in server.csr -CA ca.crt -CAkey server.key -CAcreateserial -out server.crt`