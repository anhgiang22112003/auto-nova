import { Controller, Get } from '@nestjs/common';
import { AutoLoginService } from './auto-login.service';

@Controller('auto')
export class AutoLoginController {
  constructor(private readonly autoService: AutoLoginService) {}

@Get()
ui() {
  return `
    <html>
    <head>
      <title>Auto Login Control</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f5f6fa;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          width: 400px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.1);
          text-align: center;
        }
        h2 {
          margin-bottom: 20px;
          color: #333;
        }
        button {
          padding: 12px 24px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          color: white;
          transition: 0.25s;
          margin: 8px;
        }
        .start {
          background-color: #27ae60;
        }
        .start:hover {
          background-color: #1f8c4d;
        }
        .stop {
          background-color: #e74c3c;
        }
        .stop:hover {
          background-color: #c0392b;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h2>Auto Login Control</h2>

        <button class="start" onclick="fetch('/auto/start').then(()=>alert('Đã chạy'))">
          ▶ Chạy Auto Login
        </button>

        <button class="stop" onclick="fetch('/auto/stop').then(()=>alert('Đã dừng'))">
          ■ Hủy Auto Login
        </button>
      </div>
    </body>
    </html>
  `;
}


  @Get('start')
  start() {
    return this.autoService.start();
  }

  @Get('stop')
  stop() {
    return this.autoService.stop();
  }
}
