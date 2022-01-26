module.exports = function ({ page, frame, config }) {
    return new Promise((resolve, reject) => {
        page.once("dialog", async (dialog) => {
            setTimeout(async () => {
                await dialog.dismiss();
                resolve();
            }, 3000);
        });
    });
};
