describe('Simple POS Insert Data Tests', () => {
    // Helper function to workaround Tauri WebDriver click issues on Linux
    const clickElement = async (el) => {
        await browser.execute((element) => {
            element.click();
        }, el);
    };

    // Helper function to workaround Tauri WebDriver setValue issues on Linux with React
    const setInputValue = async (el, value) => {
        await browser.execute((element, val) => {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            nativeInputValueSetter.call(element, val);
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }, el, value);
    };

    it('should complete the setup or login flow', async () => {
        // Wait for the main title to appear to determine which screen we are on
        const h1 = await $('h1');
        await h1.waitForExist({ timeout: 30000 });
        const titleText = await h1.getText();

        if (titleText.includes('Welcome')) {
            // Welcome Screen
            const startSetupBtn = await $('button.btn-hero');
            await clickElement(startSetupBtn);

            // Password Setup Screen
            const passwordInput = await $('input[placeholder="Enter a strong password"]');
            await passwordInput.waitForExist({ timeout: 5000 });
            await setInputValue(passwordInput, 'testpassword123');

            const confirmInput = await $('input[placeholder="Repeat your password"]');
            await setInputValue(confirmInput, 'testpassword123');

            const nextButton = await $('button[type="submit"]');
            await browser.pause(500);
            await clickElement(nextButton);

            // Settings Setup Screen
            const finishSetupBtn = await $('xpath=//button[contains(., "Finish Setup")]');
            await finishSetupBtn.waitForExist({ timeout: 5000 });
            await clickElement(finishSetupBtn);
            // Wait for the Settings Setup to transition out
            await finishSetupBtn.waitForExist({ timeout: 5000, reverse: true });
        } else if (titleText.includes('Login')) {
            // Login Screen
            const passwordInput = await $('input[placeholder="Enter password"]');
            await passwordInput.waitForExist({ timeout: 5000 });
            await setInputValue(passwordInput, 'testpassword123');

            const loginButton = await $('button[type="submit"]');
            await clickElement(loginButton);
            // Wait for login to transition out
            await loginButton.waitForExist({ timeout: 5000, reverse: true });
        }

        // Small pause to let POS screen load
        await browser.pause(1000);
    });

    it('should create a test product', async () => {
        // Find hamburger and click if displayed
        const hamburgerBtn = await $('button.text-muted.-ml-2');
        if (await hamburgerBtn.isExisting() && await hamburgerBtn.isDisplayed()) {
            await clickElement(hamburgerBtn);
            await browser.pause(500); // wait for animation
        }

        // Click "Management" to expand group
        const mgmtGroup = await $('//button[.//span[contains(text(),"Management")]]');
        await mgmtGroup.waitForDisplayed({ timeout: 5000 });
        await clickElement(mgmtGroup);
        await browser.pause(500);

        // Click "Product Management"
        const prodMgmtLink = await $('//a[.//span[contains(text(),"Product Management")]]');
        await prodMgmtLink.waitForDisplayed({ timeout: 5000 });
        await clickElement(prodMgmtLink);

        // Wait for Manage Page to load and "New Product" button to appear
        const newProductBtn = await $('//button[.//span[text()="New Product"]]');
        await newProductBtn.waitForDisplayed({ timeout: 10000 });
        await clickElement(newProductBtn);

        // Fill out modal
        const titleInput = await $('//div[label[contains(text(), "Title")]]/input');
        await titleInput.waitForDisplayed({ timeout: 5000 });
        await setInputValue(titleInput, "Xbox Controller");

        const priceInput = await $('//div[label[contains(text(), "Price")]]/input');
        await setInputValue(priceInput, "15000");

        // Click Save Product
        const saveProductBtn = await $('button[type="submit"]');
        await clickElement(saveProductBtn);

        // Wait for it to appear in table (modal closes)
        const row = await $('//table//td[contains(., "Xbox Controller")]');
        await row.waitForExist({ timeout: 10000 });

        if (await hamburgerBtn.isExisting() && await hamburgerBtn.isDisplayed()) {
            await clickElement(hamburgerBtn);
            await browser.pause(500);
        }

        // Click Main Page to go back
        const mainPageLink = await $('//a[.//span[contains(text(),"Main Page")]]');
        await mainPageLink.waitForDisplayed({ timeout: 5000 });
        await clickElement(mainPageLink);

        // Wait for grid to render
        await browser.pause(1000);
    });

    it('should create a test material', async () => {
        // Find hamburger and click if displayed
        const hamburgerBtn = await $('button.text-muted.-ml-2');
        if (await hamburgerBtn.isExisting() && await hamburgerBtn.isDisplayed()) {
            await clickElement(hamburgerBtn);
            await browser.pause(500); // wait for animation
        }

        // Ensure "Management" group is expanded. Expand if necessary.
        const mgmtGroup = await $('//button[.//span[contains(text(),"Management")]]');
        await mgmtGroup.waitForDisplayed({ timeout: 5000 });
        // We only expand it if the Stock Management link isn't already visible
        const stockMgmtLink = await $('//a[.//span[contains(text(),"Stock Management")]]');
        if (!(await stockMgmtLink.isDisplayed())) {
            await clickElement(mgmtGroup);
            await browser.pause(500);
        }

        // Click "Stock Management"
        await stockMgmtLink.waitForDisplayed({ timeout: 5000 });
        await clickElement(stockMgmtLink);
        await browser.pause(1000);

        // Click "Manage Materials" link from the Stock Page
        const manageMaterialsLink = await $('//a[.//span[contains(text(),"Manage Materials")]]');
        await manageMaterialsLink.waitForDisplayed({ timeout: 5000 });
        await clickElement(manageMaterialsLink);

        // Wait for Material Page to load and "Add Material" button to appear
        const addMaterialBtn = await $('//button[.//span[contains(text(),"Add Material")]]');
        await addMaterialBtn.waitForDisplayed({ timeout: 10000 });
        await clickElement(addMaterialBtn);

        // Fill out modal
        const nameInput = await $('//div[label[contains(text(), "Material Name")]]/input');
        await nameInput.waitForDisplayed({ timeout: 5000 });
        await setInputValue(nameInput, "Plastic Shell");

        const volumeInput = await $('//div[label[contains(text(), "Volume")]]/input');
        await setInputValue(volumeInput, "10");

        const qtyInput = await $('//div[label[contains(text(), "Quantity")]]/input');
        await setInputValue(qtyInput, "50");

        // Select type
        const typeSelect = await $('//div[label[contains(text(), "Type / Unit")]]/select');
        await typeSelect.selectByVisibleText('Pieces');

        // Click Save Material
        const saveMaterialBtn = await $('button[type="submit"]');
        await clickElement(saveMaterialBtn);

        // Wait for it to appear in table (modal closes)
        const row = await $('//table//td[contains(., "Plastic Shell")]');
        await row.waitForExist({ timeout: 10000 });

        if (await hamburgerBtn.isExisting() && await hamburgerBtn.isDisplayed()) {
            await clickElement(hamburgerBtn);
            await browser.pause(500);
        }

        // Click Main Page to go back
        const mainPageLink = await $('//a[.//span[contains(text(),"Main Page")]]');
        await mainPageLink.waitForDisplayed({ timeout: 5000 });
        await clickElement(mainPageLink);

        // Wait for grid to render
        await browser.pause(1000);
    });
});
