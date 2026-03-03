// 插片映射配置文件
// 用于管理插片内部格式和显示格式的映射关系

// 插片类型映射：内部类型 → 显示名称
window.slotTypeMapping = {
    'toolSlot1': '基础工具插片',
    'headlightSlot': '头灯插片',
    'cartSlot': '矿车插片',
    'pickaxeSlot': '采矿锄插片'
};

// 插片稀有度映射：内部稀有度 → 显示名称
window.slotRarityMapping = {
    'common': '普通',
    'uncommon': '稀有',
    'rare': '史诗',
    'epic': '传说'
};

// 插片效果映射：内部效果ID → 显示名称
window.slotEffectMapping = {
    'itemConversion': '成品转化',
    'chainMining': '连锁采矿',
    'goldExp': '金币经验',
    'fuelSurprise': '燃料惊喜',
    'fragmentRecovery': '碎片回收',
    'autoTransport': '自动运输',
    'capacityDouble': '运力翻倍',
    'fuelCrit': '燃料暴击',
    'compressedFuel': '压缩燃料',
    'onSitePurchase': '现场收购',
    'strengthenBulb': '加强灯泡',
    'batteryOptimization': '电池优化',
    'byproductEnhancement': '副产物增强',
    'overloadLighting': '超载照明',
    'luckyMagnet': '幸运磁铁'
};

// 反向映射：显示名称 → 内部效果ID
window.slotEffectReverseMapping = {
    '成品转化': 'itemConversion',
    '连锁采矿': 'chainMining',
    '金币经验': 'goldExp',
    '燃料惊喜': 'fuelSurprise',
    '碎片回收': 'fragmentRecovery',
    '自动运输': 'autoTransport',
    '运力翻倍': 'capacityDouble',
    '燃料暴击': 'fuelCrit',
    '压缩燃料': 'compressedFuel',
    '现场收购': 'onSitePurchase',
    '加强灯泡': 'strengthenBulb',
    '电池优化': 'batteryOptimization',
    '副产物增强': 'byproductEnhancement',
    '超载照明': 'overloadLighting',
    '幸运磁铁': 'luckyMagnet'
};

// 工具类型对应的可用效果列表
window.toolAvailableEffects = {
    'pickaxe': ['itemConversion', 'chainMining', 'goldExp', 'fuelSurprise', 'fragmentRecovery'],
    'cart': ['autoTransport', 'capacityDouble', 'fuelCrit', 'compressedFuel', 'onSitePurchase'],
    'headlight': ['strengthenBulb', 'batteryOptimization', 'byproductEnhancement', 'overloadLighting', 'luckyMagnet'],
    'base': ['baseSlot']
};

// 解析插片内部格式到显示格式
// 内部格式：baseType_rarity_effectId
// 返回：{ type: 显示类型, rarity: 显示稀有度, effect: 显示效果, baseName: 内部类型, rarityId: 内部稀有度, effectId: 内部效果ID }
window.parseSlotInternalFormat = function(fullSlotName) {
    // 去除首尾空格并将连续的空格替换为单个空格
    const cleanedName = fullSlotName.trim().replace(/\s+/g, ' ');
    
    if (cleanedName.includes('_')) {
        const parts = cleanedName.split('_');
        
        if (parts.length >= 3) {
            const baseType = parts[0] || 'pickaxeSlot';
            const rarityId = parts[1] || 'common';
            const effectId = parts.slice(2).join('_') || '';
            
            return {
                baseName: baseType,
                rarityId: rarityId,
                effectId: effectId,
                type: window.slotTypeMapping[baseType] || baseType,
                rarity: window.slotRarityMapping[rarityId] || rarityId,
                effect: window.slotEffectMapping[effectId] || effectId
            };
        } else if (parts.length === 2) {
            const baseType = parts[0] || 'pickaxeSlot';
            const rarityId = parts[1] || 'common';
            
            return {
                baseName: baseType,
                rarityId: rarityId,
                effectId: '',
                type: window.slotTypeMapping[baseType] || baseType,
                rarity: window.slotRarityMapping[rarityId] || rarityId,
                effect: ''
            };
        }
    }
    
    // 处理无法解析的情况，返回原始信息
    return {
        baseName: cleanedName,
        rarityId: 'common',
        effectId: '',
        type: cleanedName,
        rarity: '普通',
        effect: ''
    };
};

// 将显示格式转换为内部格式
// 显示格式：[类型] [稀有度] [效果]
// 返回：baseType_rarity_effectId
window.formatSlotInternalName = function(baseType, rarity, effect) {
    // 获取内部类型
    let internalType = baseType;
    if (!baseType.includes('Slot')) {
        // 如果是显示名称，转换为内部类型
        const reverseTypeMap = Object.fromEntries(
            Object.entries(window.slotTypeMapping).map(([key, value]) => [value, key])
        );
        internalType = reverseTypeMap[baseType] || 'pickaxeSlot';
    }
    
    // 获取内部稀有度
    let internalRarity = rarity;
    if (['普通', '稀有', '史诗', '传说'].includes(rarity)) {
        const reverseRarityMap = Object.fromEntries(
            Object.entries(window.slotRarityMapping).map(([key, value]) => [value, key])
        );
        internalRarity = reverseRarityMap[rarity] || 'common';
    }
    
    // 获取内部效果ID
    let internalEffect = effect;
    if (effect && !Object.keys(window.slotEffectMapping).includes(effect)) {
        // 如果是显示效果，转换为内部效果ID
        internalEffect = window.slotEffectReverseMapping[effect] || '';
    }
    
    return `${internalType}_${internalRarity}_${internalEffect}`;
};
