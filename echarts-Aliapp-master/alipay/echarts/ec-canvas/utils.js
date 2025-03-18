module.exports = {
    getDpr() {
        let ratio = 1;

        let info = my.getSystemInfoSync();

        ratio = info.pixelRatio || 2;
        return ratio;
    }
};
