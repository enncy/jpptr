/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
module.exports = function ({ page, frame, browser, action }) {
    console.log("closing dialog...");
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
