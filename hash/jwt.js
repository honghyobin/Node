
const jwt = require('jsonwebtoken')

//JWT 발급 비밀키
const secret ="mySecretKey";

//페이로드 객체
const payload = {
    "id" : "1", 
    "username" : "john",
    "roles"  : "admin"
};

const token = jwt.sign(payload,secret,{expiresIn:'1h',algorithm:"HS256"});

//토큰 검증하기
jwt.verify(token,secret,(err,decode)=>{
    if(err){ 
        console.error(err);
        return;
    }
    //디코딩된 페이로드 출력
    console.error(decode);
});

console.log(token);