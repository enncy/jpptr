module.exports = {
    name: "close-dialog-plugin",
    run({ page, frame, json }) {
        return new Promise((resolve, reject) => {
            page.once("dialog", async (dialog) => {
                setTimeout(async () => {
                    await dialog.dismiss();
                    resolve();
                }, 3000);
            });
        });
    },
};
