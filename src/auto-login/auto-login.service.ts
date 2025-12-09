import { Injectable, OnModuleInit } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AutoLoginService implements OnModuleInit {
    async onModuleInit() {
        const browser = await puppeteer.launch({ headless: false }); // set headless: false nếu bạn muốn xem trình duyệt.
        const page: any = await browser.newPage();

        await page.goto('https://novavn.vn/admin');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Đợi 10 giây
        await page.waitForSelector('#email');   
        const isLoginPage = await page.$('#email') !== null;

        if (isLoginPage) {
            console.log('Trang đăng nhập. Đang đăng nhập...');
            await page.type('#email', 'honggiang22112003@gmail.com'); 
            await page.type('#password', 'giang22112003');

            // Gửi form đăng nhập
            await page.click('button[type="submit"]');

            await page.waitForNavigation();

            console.log('Đăng nhập thành công!');
        } else {
            console.log('Đã đăng nhập. Reload trang mỗi 5 phút...');
        }
        setInterval(async () => {
            console.log('Reload trang sau 5 phút...');
            await page.reload();
        }, 5 * 60 * 1000 ); // 5 phút = 5 * 60 * 1000 ms
    }
}
