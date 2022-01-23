module.exports = function ({ page, frame, options }) {
    return new Promise((resolve, reject) => {
        page.once("dialog", async (dialog) => {
            setTimeout(async () => {
                console.log(dialog.message());
                await dialog.dismiss();
                resolve();
            }, 3000);
        });
    });
};
