describe('Simple POS UI', () => {
    it('should add a product to the cart', async () => {
        // Wait for products to load
        const productGrid = await $('div[class*="grid-cols-"]');
        await productGrid.waitForExist({ timeout: 5000 });

        // Find the first product card and click it
        const firstProduct = await productGrid.$$('div.group')[0];
        await firstProduct.waitForClickable();
        
        // Get product name for verification
        const productNameElement = await firstProduct.$('h3');
        const productName = await productNameElement.getText();
        
        await firstProduct.click();

        // Verify item appeared in cart
        const cartItem = await $('div.bg-background.border-border.group');
        await cartItem.waitForExist();
        
        const cartItemName = await cartItem.$('h4').getText();
        expect(cartItemName).toBe(productName);
    });

    it('should update quantity', async () => {
        const cartItem = await $('div.bg-background.border-border.group');
        
        // Find quantity display
        const quantitySpan = await cartItem.$('span.w-8.text-center');
        let quantity = await quantitySpan.getText();
        expect(quantity).toBe('1');

        // Click plus button
        const plusBtn = await cartItem.$('button svg:has(path[d*="M19"])').parentElement(); 
        // Note: The specific selector for plus button might be tricky with icons.
        // Let's use the layout: it's the second button in the controls (minus, qty, plus)
        
        const controlsDiv = await cartItem.$('div.bg-card.border-border.flex.items-center');
        const buttons = await controlsDiv.$$('button');
        const plusButton = buttons[1]; // Index 1 is the plus button
        
        await plusButton.click();
        
        // Verify quantity increased
        quantity = await quantitySpan.getText();
        expect(quantity).toBe('2');
    });

    it('should remove item from cart', async () => {
        const cartItem = await $('div.bg-background.border-border.group');
        
        // Find delete button (top row, last element)
        const deleteBtn = await cartItem.$('button.text-muted\\/40');
        await deleteBtn.click();

        // Verify cart is empty or item removed
        await cartItem.waitForExist({ reverse: true });
    });
});
