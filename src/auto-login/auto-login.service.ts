import { Injectable } from '@nestjs/common'
import puppeteer, { Browser, Page } from 'puppeteer'

@Injectable()
export class AutoLoginService {
    private browser: Browser | null = null;
    private page: Page | null = null;
    private intervalId: NodeJS.Timeout | null = null;
    private isRunning = false;

    async start() {
        if (this.isRunning) return 'Đang chạy rồi!'

        this.isRunning = true
        this.browser = await puppeteer.launch({ headless: false })
        this.page = await this.browser.newPage()

        await this.page.goto('https://novavn.vn/admin')

        // Đợi page load xíu
        await new Promise(resolve => setTimeout(resolve, 3000))

        // Kiểm tra xem có ô email hay không
        let isLoginPage = false
        try {
            await this.page.waitForSelector('#email', { timeout: 3000 })
            isLoginPage = true
        } catch (e) {
            isLoginPage = false
        }

        if (isLoginPage) {
            console.log('Trang đăng nhập. Đang đăng nhập...')

            await this.page.type('#email', 'honggiang22112003@gmail.com')
            await this.page.type('#password', 'giang22112003')
            await this.page.click('button[type="submit"]')

            await this.page.waitForNavigation()

            console.log('Đăng nhập thành công!')
        } else {
            console.log('Đã đăng nhập trước đó — không cần login.')
        }

        // Auto reload mỗi 5 phút
        this.intervalId = setInterval(async () => {
            if (this.page) {
                console.log('Reload trang sau 5 phút...')
                await this.page.reload()
            }
        },15000)

        return 'Đã bắt đầu Auto Login!'
    }


    async stop() {
        this.isRunning = false

        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }

        if (this.browser) {
            await this.browser.close()
            this.browser = null
            this.page = null
        }

        return 'Đã dừng Auto Login!'
    }

    getStatus() {
        return this.isRunning
    }
}
