// 插片配置文件

// 插片稀有度等级定义
const slotRarities = [
    { id: 'common', name: '普通', color: '#ffffff' },
    { id: 'uncommon', name: '稀有', color: '#0004ffff' },
    { id: 'rare', name: '史诗', color: '#a335ee' },
    { id: 'epic', name: '传说', color: '#ff8000' }


// 各工具可用的插片效果
const slotEffects = {
    'pickaxe': [
        { id: 'itemConversion', name: '成品转化' },
        { id: 'chainMining', name: '连锁采矿' },
        { id: 'goldExp', name: '金币经验' },
        { id: 'fuelSurprise', name: '燃料惊喜' },
        { id: 'fragmentRecovery', name: '碎片回收' }
    ],
    'cart': [
        { id: 'autoTransport', name: '自动运输' },
        { id: 'capacityDouble', name: '运力翻倍' },
        { id: 'fuelCrit', name: '燃料暴击' },
        { id: 'compressedFuel', name: '压缩燃料' },
        { id: 'onSitePurchase', name: '现场收购' }
    ],
    'headlight': [
        { id: 'strengthenBulb', name: '加强灯泡' },
        { id: 'batteryOptimization', name: '电池优化' },
        { id: 'byproductEnhancement', name: '副产物增强' },
        { id: 'overloadLighting', name: '超载照明' },
        { id: 'luckyMagnet', name: '幸运磁铁' }
    ],
    'base': [
        { id: 'baseSlot', name: '基础插片' }
    ]
};

// 插片合成规则
const slotCombineRules = {
    // 基础规则：同工具、同稀有度的两个插片可以合成
    baseRule: 'sameToolSameRarity',
    // 合成概率
    probabilities: {
        // 1%概率：提升2级稀有度
        levelUp2: 0.01,
        // 50%概率：提升1级稀有度
        levelUp1: 0.5,
        // 49%概率：同稀有度
        sameLevel: 0.49
    }
};

// 插片制作配方
const slotCraftingRecipes = {
    'toolSlot1': {
        name: '基础工具插片',
        materials: {
            '磁铁': 5,
            '工具插片碎片': 10
        }
    },
    'headlightSlot': {
        name: '头灯插片',
        materials: {
            'toolSlot1': 1,
            'battery': 1,
            'headlightTicket': 1
        }
    },
    'cartSlot': {
        name: '矿车插片',
        materials: {
            'toolSlot1': 1,
            'fuel': 1,
            'cartTicket': 1
        }
    },
    'pickaxeSlot': {
        name: '采矿锄插片',
        materials: {
            'toolSlot1': 1,
            'magnet': 1,
            'pickaxeTicket': 1
        }
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        slotRarities,
        slotEffects,
        slotCombineRules,
        slotCraftingRecipes
    };
}