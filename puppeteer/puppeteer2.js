const puppeteer = require('puppeteer');

async function getData(){
    try{
        const browser = await puppeteer.launch({
            headless : false //작업과정 확인
        });//브라우저 열기
        const page =await browser.newPage();//새창열기
        await page.goto('https://www.yes24.com/Product/category/bestseller?CategoryNumber=001&sumgb=06');//페이지 이동
        page.setViewport({ //기본 800*600px
            width:1920,
            height:1080,
            deviceScaleFactor:1
        });
        
        await browser.close();//브러우저 닫기 (종료)
    }catch(error){
        console.error(error);
    }
}
getData();
