/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
module.exports = function ({ page, frame, browser, action }) {
    return new Promise((resolve) => {
        page.once("dialog", async (dialog) => {
            setTimeout(async () => {
                console.log(dialog.message());
                await dialog.dismiss();
                resolve();
            }, 3000);
        });
    });
};
