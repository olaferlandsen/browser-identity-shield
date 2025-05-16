const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Agrega el plugin de stealth para evitar detecciones básicas
puppeteer.use(StealthPlugin());

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--use-fake-ui-for-media-stream'
        ]
    });

    const page = await browser.newPage();

    await page.evaluateOnNewDocument(() => {
        window.addEventListener = new Proxy(window.addEventListener, {
            apply(target, thisArg, args) {
                const [type] = args;
                if (['blur', 'focus'].includes(type) && thisArg === window) {
                    return;
                }
                return Reflect.apply(target, thisArg, args);
            }
        });

        Object.defineProperty(document, 'hasFocus', {
            value: () => true,
            configurable: true
        });

        document.addEventListener = new Proxy(document.addEventListener, {
            apply(target, thisArg, args) {
                const [type] = args;
                if (['blur', 'focus', 'visibilitychange'].includes(type)) {
                    return;
                }
                return Reflect.apply(target, thisArg, args);
            }
        });

        Object.defineProperty(document, 'visibilityState', {
            get: () => 'visible',
            configurable: true
        });

        Object.defineProperty(document, 'hidden', {
            get: () => false,
            configurable: true
        });

        const cursorTolerance = 100;
        let lastX = null, lastY = null;
        document.addEventListener('mousemove', (e) => {
            const dx = Math.abs(e.clientX - lastX);
            const dy = Math.abs(e.clientY - lastY);
            if (lastX !== null && lastY !== null && (dx > cursorTolerance || dy > cursorTolerance)) {
                const steps = 10;
                for (let i = 1; i <= steps; i++) {
                    const fakeX = lastX + ((e.clientX - lastX) * i / steps);
                    const fakeY = lastY + ((e.clientY - lastY) * i / steps);
                    const event = new MouseEvent('mousemove', {
                        bubbles: true,
                        cancelable: true,
                        clientX: fakeX,
                        clientY: fakeY
                    });
                    document.dispatchEvent(event);
                }
            }
            lastX = e.clientX;
            lastY = e.clientY;
        }, true);

        const getParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(param) {
            if (param === 37445) return 'FakeVendor'; // UNMASKED_VENDOR_WEBGL
            if (param === 37446) return 'FakeRenderer'; // UNMASKED_RENDERER_WEBGL
            return getParameter.call(this, param);
        };

        Object.defineProperty(navigator, 'hardwareConcurrency', {
            get: () => 16
        });

        navigator.mediaDevices.enumerateDevices = async function () {
            return [
                { kind: 'videoinput', label: 'Fake HD Webcam', deviceId: 'foo' },
                { kind: 'audioinput', label: 'Fake Microphone', deviceId: 'bar' }
            ];
        };
    });

    await page.goto('https://browserleaks.com/');

})();
