// 中文名字生成器
// 用于为矿工生成随机中文名字

// 中文姓氏库（包含常见姓氏）
const chineseSurnames = [
    '赵', '钱', '孙', '李', '周', '吴', '郑', '王',
    '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨',
    '朱', '秦', '尤', '许', '何', '吕', '施', '张',
    '孔', '曹', '严', '华', '金', '魏', '陶', '姜',
    '戚', '谢', '邹', '喻', '柏', '水', '窦', '章',
    '云', '苏', '潘', '葛', '奚', '范', '彭', '郎',
    '鲁', '韦', '昌', '马', '苗', '凤', '花', '方',
    '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐',
    '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤',
    '滕', '殷', '罗', '毕', '郝', '邬', '安', '常',
    '乐', '于', '时', '傅', '皮', '卞', '齐', '康',
    '伍', '余', '元', '卜', '顾', '孟', '平', '黄',
    '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪',
    '祁', '毛', '禹', '狄', '米', '贝', '明', '臧',
    '计', '伏', '成', '戴', '谈', '宋', '茅', '庞',
    '熊', '纪', '舒', '屈', '项', '祝', '董', '梁'
];

// 中文名字库（包含有意义的单字）
const chineseGivenNames = [
    // 第一部分
    '伟', '芳', '秀英', '娜', '敏', '静', '丽', '强',
    '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛',
    '明', '超', '秀兰', '霞', '平', '刚', '桂', '兰',
    '荣', '彬', '雪', '飞', '英', '华', '锋', '燕',
    '龙', '玲', '翔', '秀云', '梅', '红', '健', '军',
    '生', '春', '丽', '庆', '德', '辉', '兵', '燕',
    '芳', '娜', '静', '波', '秀', '兰', '英', '华',
    '金', '强', '勇', '军', '涛', '明', '超', '秀兰',
    // 矿工相关的名字
    '矿', '工', '山', '石', '铁', '铜', '金', '银',
    '矿', '山', '石', '岩', '铁', '钢', '铜', '金',
    '银', '铅', '锌', '锡', '煤', '炭', '矿', '夫',
    '工', '人', '匠', '师', '傅', '老', '大', '哥',
    '弟', '妹', '叔', '伯', '爷', '奶', '公', '婆',
    '长', '大', '小', '中', '高', '矮', '胖', '瘦',
    '强', '壮', '勇', '猛', '刚', '毅', '坚', '韧',
    '勤', '劳', '苦', '干', '耐', '劳', '辛', '勤'
];

// 生成随机中文名字
function generateChineseName() {
    // 随机选择一个姓氏
    const surname = chineseSurnames[Math.floor(Math.random() * chineseSurnames.length)];
    
    // 随机选择一个名字（1-2个字符）
    const givenNameLength = Math.random() > 0.5 ? 2 : 1;
    let givenName = '';
    
    for (let i = 0; i < givenNameLength; i++) {
        givenName += chineseGivenNames[Math.floor(Math.random() * chineseGivenNames.length)];
    }
    
    return surname + givenName;
}

// 生成矿工名字（带有矿工特色）
function generateMinerName() {
    const baseName = generateChineseName();
    
    // 10%的概率添加矿工称号
    if (Math.random() < 0.1) {
        const titles = ['矿工', '挖矿者', '掘金者', '矿夫', '矿师', '老矿工'];
        const title = titles[Math.floor(Math.random() * titles.length)];
        return baseName + title;
    }
    
    return baseName;
}

// 导出函数供其他文件使用
// 强制将函数挂载到window对象，确保在浏览器环境中可用
window.generateChineseName = generateChineseName;
window.generateMinerName = generateMinerName;

// 如果在Node.js环境中，也导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateChineseName, generateMinerName };
}