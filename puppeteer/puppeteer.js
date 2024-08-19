const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({
        headless : false //작업과정 확인
    });//브라우저 열기
    const page =await browser.newPage();//새창열기
    await page.goto('https://www.naver.com');//페이지 이동
    page.setViewport({ //기본 800*600px
        width:1920,
        height:1080,
        deviceScaleFactor:1
    });

    await page.screenshot({path:'example2.png'}); //저장될 파일 명

    await page.pdf({
        path:"examplePDF.pdf",
        format:"A4"
    })

    await browser.close();//브라우저 닫기 (종료)
    
})();