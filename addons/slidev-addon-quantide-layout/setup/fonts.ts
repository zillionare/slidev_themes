
export const fontMapping: Record<string, string> = {
    // 庞门正道
    '庞门正道标题体': 'PangMenTitle',
    '庞门正道标题体免费版': 'PangMenTitle',
    '庞门正道粗书体': 'PangMenChuShuTi',

    // 演示系列
    '演示夏行': 'YanShiXiaXing',
    '演示春风': 'YanShiChunFeng',
    '演示秋鸿': 'YanShiQiuHong',

    // 阿里巴巴普惠体
    '阿里巴巴普惠体-Black': 'AlibabaPuHuiTi-Black',
    '阿里巴巴普惠体-Thin': 'AlibabaPuHuiTi-Thin',
    '阿里巴巴普惠体-Regular': 'AlibabaPuHuiTi-RegularL3',
    '阿里巴巴普惠体-Bold': 'AlibabaPuHuiTi-Bold',

    // 其他
    '青柳隶书': 'QingLiuLiShu',
    '鸿雷板书简体': 'HongLeiBanShuJianTi',
    '鸿雷行书简体': 'HongLeiXingShuJianTi',
    '辰余落雁细': 'ChenYuLuoYanXi',
    '文泉驿微米黑': 'WenQuanWeiMiHei',
    '文泉驿正黑': 'WenQuanYiZenHei',
    '文泉驿正黑等宽': 'WenQuanYiZenHeiMono',
    '朱雀仿宋': 'ZhuqueFangsong',
    'OPPOSans-Bold': 'OPPOSans-Bold',
    'OPPOSans-Medium': 'OPPOSans-Medium',
    'OPPOSans-Regular': 'OPPOSans-Regular',
    '文泉驿微米黑-轻': 'wqy-microhei-lite',
    '文泉驿微米黑等宽-轻': 'wqy-microhei-mono-lite',
};

export function getFontFamily(name: string | undefined): string | undefined {
    if (!name) return undefined;
    // If the name is in mapping, return the mapped value
    if (fontMapping[name]) return fontMapping[name];
    // Otherwise return the name itself (allows using mapped names directly)
    return name;
}
