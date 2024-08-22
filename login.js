const express=require('express');
const {body, validationResult}=require("express-validator");
//npm i express
//npm i express-validator
//npm i ejs

const app = express();
const path=require('path');

//ejs 성정
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));  //요청 본문 파싱을 위한 미들웨어

//정적 파일 저장
app.use(express.static(path.join(__dirname,'public')));

//하드코딩된 사용자 정보 (실제로는 데이터베이스나 다른 방식으로 관리해야 합니다)
const users=[
    {username: 'admin', password:'password123'},
    {username: 'normal', password: 'noraml'}
]

//로그인 페이지 라우트
app.get("/login",(req,res)=>{
    res.render("login");
}) 

//로그인 처리 라우트
app.post("/login",[
    body("username")
        .isLength({min:3, max:20})
        .withMessage("아이디는 3자 이상 20자 이하여야 합니다."),
    body("password")
        .isLength({min:6, max:20})
        .withMessage("아이디는 6자 이상 20자 이하여야 합니다.")
]
    ,(req,res)=>{
        const errors=validationResult(req);
        //유효성 검증을 하면서 생기는 에러메시지 정보가 있음
        if(!errors.isEmpty()){ //유효성 검증을 하면서 생기는 에러메시지를 받을 수 있음.
            return res.status(400).json({errors: errors.array()});
        }
        const {username, password}=req.body;

        //로그인 로직
        const user=users.find(user => user.username === username && user.password === password);
        if(user){
            //로그인 성공
            res.redirect("/dashboard?username="+user.username);
        }else{
            //로그인 실패
            res.status(401).send("아이디 혹은 비밀번호가 일치하지 않았습니다.");
        }

        console.log("정보",username,password);

        // res.send(username);
});

//대시보드 라우트 (로그인 후 페이지)
app.get("/dashboard",(req,res)=>{
    const username = req.query.username;

    if(username){
        res.send(`사용자명 : ${username}`);
    }else{
        res.status(401).send("로그인 후 접근하세요.");
    }

});

app.listen(3000,()=>{
    console.log("Server is running");
});