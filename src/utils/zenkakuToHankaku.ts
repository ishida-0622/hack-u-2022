const zenkakuToHankaku = (str: string) => {
    return str
        .replace(/[ａ-ｚＡ-Ｚ0-9！-～]/g, (s) =>
            String.fromCharCode(s.charCodeAt(0) - 0xfee0)
        )
        .replace(/”/g, '"')
        .replace(/’/g, "'")
        .replace(/‘/g, "`")
        .replace(/￥/g, "\\")
        .replace(/　/g, " ")
        .replace(/〜/g, "~");
};

export default zenkakuToHankaku;
