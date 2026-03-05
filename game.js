// 游戏数据
// 版本号: v0.0.1
let gameData = {
    player: {
        level: 1,
        exp: 0,
        nextExp: 50,
        gold: 0
    },
    gainedInfo: {
        exp: 0,
        gold: 0,
        minerals: 0,
        cloth: 0
    },
    messages: [],
    activeEffects: {}, // 活跃效果对象，存储所有当前活跃的效果
    tools: {
        pickaxe: {
            level: 0,
            exp: 0,
            nextExp: 50,
            maxLevel: 50, // 初始等级上限
            unlockTickets: 0, // 等级提升券数量
            slots: [null, null, null] // 插片槽位，最多3个
        },
        cart: {
            crafted: false,
            level: 0,
            exp: 0,
            fuelTank: false, // 燃料箱解锁状态
            optimized: false, // 优化标记，只能优化一次
            maxLevel: 50, // 初始等级上限
            unlockTickets: 0, // 等级提升券数量
            slots: [null, null, null] // 插片槽位，最多3个
        },
        headlight: {
            crafted: false,
            level: 0,
            exp: 0,
            batterySlot: false, // 电池仓解锁状态
            optimized: false, // 优化标记，只能优化一次
            maxLevel: 50, // 初始等级上限
            unlockTickets: 0, // 等级提升券数量
            slots: [null, null, null] // 插片槽位，最多3个
        }
    },
    unlockTickets: {
        pickaxe: 0,
        cart: 0,
        headlight: 0
    },
    furnace: {
        crafted: false,
        level: 0,
        fuel: {
            type: null,
            amount: 0,
            maxAmount: 100,
            burnTime: 0,
            maxBurnTime: 0
        },
        // 单个制作状态（用于熔炼）
        crafting: {
            inProgress: false,
            type: null, // 'smelt' 或 'alloy'
            recipe: null, // 选中的配方
            amount: 1, // 制作数量
            totalTime: 0, // 总炼制时间
            remainingTime: 0, // 剩余炼制时间
            timer: null, // 定时器ID
            extraData: null // 额外数据，用于炼制完成时使用
        },
        // 合金位置，每个位置有独立的制作状态
        alloyPositions: {
            1: {
                crafting: {
                    inProgress: false,
                    type: null, // 'alloy'
                    recipe: null, // 选中的配方
                    amount: 1, // 制作数量
                    totalTime: 0, // 总炼制时间
                    remainingTime: 0, // 剩余炼制时间
                    timer: null, // 定时器ID
                    extraData: null // 额外数据，用于炼制完成时使用
                },
                autoCraft: {
                    enabled: false,
                    recipe: null, // 选中的配方
                    amount: 1, // 每次制作数量
                    total: 0, // 总共要制作的数量
                    made: 0 // 已制作数量
                }
            },
            2: {
                crafting: {
                    inProgress: false,
                    type: null,
                    recipe: null,
                    amount: 1,
                    totalTime: 0,
                    remainingTime: 0,
                    timer: null,
                    extraData: null
                },
                autoCraft: {
                    enabled: false,
                    recipe: null,
                    amount: 1,
                    total: 0,
                    made: 0
                }
            },
            3: {
                crafting: {
                    inProgress: false,
                    type: null,
                    recipe: null,
                    amount: 1,
                    totalTime: 0,
                    remainingTime: 0,
                    timer: null,
                    extraData: null
                },
                autoCraft: {
                    enabled: false,
                    recipe: null,
                    amount: 1,
                    total: 0,
                    made: 0
                }
            },
            4: {
                crafting: {
                    inProgress: false,
                    type: null,
                    recipe: null,
                    amount: 1,
                    totalTime: 0,
                    remainingTime: 0,
                    timer: null,
                    extraData: null
                },
                autoCraft: {
                    enabled: false,
                    recipe: null,
                    amount: 1,
                    total: 0,
                    made: 0
                }
            },
            5: {
                crafting: {
                    inProgress: false,
                    type: null,
                    recipe: null,
                    amount: 1,
                    totalTime: 0,
                    remainingTime: 0,
                    timer: null,
                    extraData: null
                },
                autoCraft: {
                    enabled: false,
                    recipe: null,
                    amount: 1,
                    total: 0,
                    made: 0
                }
            }
        },
        // 全局自动制作设置
        autoCraft: {
            enabled: false,
            type: null, // 'smelt' 或 'alloy'
            recipe: null, // 选中的配方
            amount: 1, // 每次制作数量
            total: 0, // 总共要制作的数量
            made: 0, // 已制作数量
            interval: 5, // 制作间隔（秒）
            timer: null // 定时器ID
        }
    },
    backpack: {
        capacity: 10,
        baseCapacity: 10,
        items: {},
        expansionSlots: [],
        maxExpansionSlots: 12,
        baseStackSize: 20,
        currentStackSize: 20
    },
    tempBackpack: {
        items: {} // 临时背包，用于存放溢出物品
    },
    unlockedRecipes: {}, // 存储已解锁的配方
    miningCount: {},
    selectedMineral: null,
    // 物品过滤设置
    filterSettings: {}, // 存储物品过滤设置，格式: {itemName: minAmount}
    // 商店系统
    shop: {
        unlocked: false,
        level: 0,
        upgradeCosts: [100000, 500000, 1000000], // 1→2级:10万, 2→3级:50万, 3→4级:100万
        freeRefreshes: 0,
        maxFreeRefreshes: 50,
        lastFreeRefreshTime: Date.now(),
        neededItem: null,
        autoPurchaseItems: [],
        autoPurchaseDiscounts: false,
        refreshTime: 180, // 3分钟自动刷新
        currentTime: 0,
        items: [],
        lastRefresh: Date.now(),
        manualRefreshCost: 1000,
        // 已解锁的图纸（制作过一次后不再刷出）
        unlockedBlueprints: {
            '加工台图纸': false,
            '电池图纸': false,
            '燃料配方': false
        },
        // 记录上一次刷新是否出现了旅行背包
        lastHadTravelBackpack: false
    },
    // 加工台系统
    workshop: {
        unlocked: false,
        batterySlot: 0,
        batteryEnergy: 0,
        maxBatteryEnergy: 50,
        itemsCrafted: 0
    },
    // 插片制作系统
    slotCrafting: {
        level: 1,
        exp: 0,
        maxExp: 400,
        itemsCrafted: 0,
        maxLevel: 6
    },
    // 任务大厅系统
    questHall: {
        unlocked: false, // 任务大厅解锁状态
        quests: [], // 当前可用任务列表
        acceptedQuests: [], // 已接受的任务列表
        lastRefreshTime: Date.now(), // 上次刷新时间
        refreshInterval: 120000, // 2分钟刷新一次（毫秒）
        maxQuests: 3 // 最大任务数量
    },
    // 矿工协会系统
    minersGuild: {
        unlocked: false, // 矿工协会解锁状态
        miners: [], // 矿工列表
        storage: {}, // 协会仓库，存储物品
        autoMining: {
            enabled: false, // 自动挖矿是否启用
            selectedMineral: null, // 选择的矿物
            interval: 60, // 自动挖矿间隔（秒）
            lastMiningTime: 0 // 上次挖矿时间
        },
        commissionRate: 0, // 暂时关闭佣金（0%）
        maxMiners: 5, // 最大矿工数量
        // 徽章升级系统
        badgeSystem: {
            currentLevel: 0, // 当前徽章等级
            maxLevel: 10, // 最大徽章等级
            upgradeMaterials: [
                { level: 1, materials: { '银质粉末': 100, '磁铁': 100 } },
                { level: 2, materials: { '银质粉末': 150, '磁铁': 150 } },
                { level: 3, materials: { '白金粉末': 200, '磁铁': 200 } },
                { level: 4, materials: { '白金粉末': 250, '磁铁': 250 } },
                { level: 5, materials: { '白金粉末': 250, '磁铁': 250, '金砖': 20 } },
                { level: 6, materials: { '金砖': 50, 'pickaxeTicket': 10, 'cartTicket': 10, 'headlightTicket': 10 } },
                { level: 7, materials: { '金砖': 100, 'pickaxeTicket': 50, 'cartTicket': 50, 'headlightTicket': 50 } },
                { level: 8, materials: { '水晶簇': 100, 'toolSlot1': 150 } },
                { level: 9, materials: { '水晶簇': 150, 'toolSlot1': 450 } },
                { level: 10, materials: { 'forgeDelegate': true, 'magicEquipment': true } }
            ],
            // 徽章等级对应的矿工效率加成
            efficiencyBonuses: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
        }
    },
    // 特殊事件系统
    specialEvents: {
        npcCopperPurchase: {
            triggered: false, // 是否已触发
            completed: false, // 是否已完成
            requiredAmount: 9999, // 需要的铜矿数量
            declineCount: 0, // 拒绝次数
            reward: {
                type: 'badge',
                name: '初级矿工徽章'
            }
        }
    },
    // 徽章系统
    badges: {
        hasMinersBadge: false, // 是否拥有矿工徽章
        badgeLevel: 0 // 徽章等级
    }
};

const backpackExpansions = {
    '棉布包': {
        name: '棉布包',
        description: '增加1堆叠数量',
        materials: { '棉布': 20 },
        effect: { stackSize: 1 },
        type: 'stack'
    },
    '织布包': {
        name: '织布包',
        description: '增加5堆叠数量',
        materials: { '棉布': 20, '织布': 20 },
        effect: { stackSize: 5 },
        type: 'stack'
    },
    '粗麻布包': {
        name: '粗麻布包',
        description: '增加15堆叠数量',
        materials: { '织布': 25, '粗麻布': 25 },
        effect: { stackSize: 15 },
        type: 'stack'
    },
    '尼龙布包': {
        name: '尼龙布包',
        description: '增加10格数和20堆叠数量',
        materials: { '尼龙布': 30, '棉布包': 2, '织布包': 2, '粗麻布包': 2 },
        effect: { capacity: 10, stackSize: 20 },
        type: 'both'
    },
    '旅行背包': {
        name: '旅行背包',
        description: '增加500堆叠数量',
        materials: {
            '尼龙布': 30,
            '木材': 10
        },
        effect: { stackSize: 500 },
        type: 'stack',
        isSpecial: true
    }
};

// 合并同类型矿物，将所有带后缀的矿物合并到基础矿物中
function mergeSameTypeItems() {
    const mergedItems = {};
    
    // 遍历所有物品，合并同类型矿物，但保留插片不变
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        // 检查是否是插片（包含Slot或中文插片名称）
        const isSlot = itemName.includes('Slot') || 
                     itemName.includes('插片') ||
                     itemName === 'toolSlot1' ||
                     itemName === 'headlightSlot' ||
                     itemName === 'cartSlot' ||
                     itemName === 'pickaxeSlot';
        
        if (isSlot) {
            // 插片不合并，直接保留原始名称
            mergedItems[itemName] = (mergedItems[itemName] || 0) + count;
        } else {
            // 矿物合并，只保留基础名称
            const baseName = itemName.split('_')[0];
            if (!mergedItems[baseName]) {
                mergedItems[baseName] = 0;
            }
            mergedItems[baseName] += count;
        }
    }
    
    // 清空原物品列表
    gameData.backpack.items = {};
    
    // 重新添加合并后的物品
    for (const [name, totalCount] of Object.entries(mergedItems)) {
        gameData.backpack.items[name] = totalCount;
    }
}

const minerals = [
    {
        name: "石矿",
        minLevel: 0,
        maxLevel: 5,
        baseTime: 5,
        exp: 5, // 提高5倍
        price: 2,
        drops: [
            { name: "棉布", chance: 0.3 },
            { name: "织布", chance: 0.2 }
        ]
    },
    {
        name: "煤矿",
        minLevel: 5,
        maxLevel: 10,
        baseTime: 8,
        exp: 10, // 提高约3.3倍
        price: 5,
        drops: [
            { name: "织布", chance: 0.2 },
            { name: "粗麻布", chance: 0.2 }
        ]
    },
    {
        name: "铁矿",
        minLevel: 10,
        maxLevel: 15,
        baseTime: 10,
        exp: 20, // 提高约1.7倍
        price: 7,
        drops: [
            { name: "粗麻布", chance: 0.2 },
            { name: "尼龙布", chance: 0.2 }
        ]
    },
    {
        name: "铜矿",
        minLevel: 15,
        maxLevel: 20,
        baseTime: 15,
        exp: 30, // 提高约1.7倍
        price: 11,
        drops: [
            { name: "尼龙布", chance: 0.2 },
            { name: "硫磺", chance: 0.2 }
        ]
    },
    {
        name: "钴矿",
        minLevel: 20,
        maxLevel: 25,
        baseTime: 20,
        exp: 40, // 提高约1.8倍
        price: 15,
        toolReq: 5,
        drops: [
            { name: "硫磺", chance: 0.3 }
        ]
    },
    {
        name: "镍矿",
        minLevel: 25,
        maxLevel: 30,
        baseTime: 25,
        exp: 50, // 提高2倍
        price: 18,
        toolReq: 15
    },
    {
        name: "银矿",
        minLevel: 30,
        maxLevel: 35,
        baseTime: 28,
        exp: 65, // 提高约2.2倍
        price: 21,
        toolReq: 15
    },
    {
        name: "白金矿",
        minLevel: 35,
        maxLevel: 40,
        baseTime: 33,
        exp: 80, // 提高约2.6倍
        price: 25,
        toolReq: 20
    },
    {
        name: "金矿",
        minLevel: 40,
        maxLevel: 45,
        baseTime: 38,
        exp: 100, // 提高约2.9倍
        price: 44, // 提高50%
        toolReq: 25
    },
    {
        name: "水晶矿",
        minLevel: 45,
        maxLevel: Infinity,
        baseTime: 41,
        exp: 130, // 提高约3.3倍
        price: 53, // 提高50%
        toolReq: 25
    }
];

// 单存档模式，移除多存档支持
let currentSaveSlot = "save1";

// 移除saveSlots变量，单存档模式不需要
// let saveSlots = [];

function initSaveSystem() {
    // 单存档模式，直接检查当前存档是否存在
    if (!localStorage.getItem(`miningGame-${currentSaveSlot}`)) {
        saveGame();
    }
}

// 注释掉多存档相关函数，单存档模式下不再需要
/*
function updateSaveSlotsUI() {
    const saveSlotsContainer = document.getElementById('save-slots-container');
    if (!saveSlotsContainer) return;
    saveSlotsContainer.innerHTML = '';
    const slotsList = document.createElement('div');
    slotsList.className = 'save-slots-list';
    saveSlots.forEach(slot => {
        const slotEl = document.createElement('div');
        slotEl.className = `save-slot ${currentSaveSlot === slot ? 'active' : ''}`;
        const saveData = JSON.parse(localStorage.getItem(slot));
        const level = saveData.player.level;
        const gold = saveData.player.gold;
        slotEl.innerHTML = `
            <div class="slot-info">
                <div class="slot-name">${slot.replace("miningGame-", "存档 ")}</div>
                <div class="slot-details">等级: ${level} | 金币: ${gold}</div>
            </div>
            <div class="slot-actions">
                <button onclick="loadSaveSlot('${slot}')">加载</button>
                <button onclick="deleteSaveSlot('${slot}')">删除</button>
            </div>
        `;
        slotsList.appendChild(slotEl);
    });
    const newSlotBtn = document.createElement('button');
    newSlotBtn.className = 'new-slot-btn';
    newSlotBtn.textContent = '新建存档';
    newSlotBtn.onclick = createNewSaveSlot;
    saveSlotsContainer.appendChild(slotsList);
    saveSlotsContainer.appendChild(newSlotBtn);
}
*/

/*
function createNewSaveSlot() {
    const newSlot = `save${saveSlots.length + 1}`;
    currentSaveSlot = newSlot;
    saveGame();
    saveSlots.push(newSlot);
    updateSaveSlotsUI();
    showSaveMessage('新存档已创建！');
}

function loadSaveSlot(slot) {
    currentSaveSlot = slot;
    loadGame();
    updateSaveSlotsUI();
    showSaveMessage('存档已加载！');
}

function deleteSaveSlot(slot) {
    if (saveSlots.length <= 1) {
        alert('至少需要保留一个存档！');
        return;
    }
    localStorage.removeItem(slot);
    saveSlots = saveSlots.filter(s => s !== slot);
    if (currentSaveSlot === slot) {
        currentSaveSlot = saveSlots[0];
        loadGame();
    }
    updateSaveSlotsUI();
    showSaveMessage('存档已删除！');
}
*/

function calculateBackpackStats() {
    if (!gameData.backpack.baseCapacity) {
        gameData.backpack.baseCapacity = 10;
    }
    if (!gameData.backpack.baseStackSize) {
        gameData.backpack.baseStackSize = 20;
    }
    if (!gameData.backpack.expansionSlots) {
        gameData.backpack.expansionSlots = [];
    }
    let totalCapacity = gameData.backpack.baseCapacity;
    let totalStackSize = gameData.backpack.baseStackSize;
    gameData.backpack.expansionSlots.forEach(expansion => {
        if (expansion && backpackExpansions[expansion]) {
            const expData = backpackExpansions[expansion];
            if (expData.effect.capacity) {
                totalCapacity += expData.effect.capacity;
            }
            if (expData.effect.stackSize) {
                totalStackSize += expData.effect.stackSize;
            }
        }
    });
    const oldCapacity = gameData.backpack.capacity;
    gameData.backpack.capacity = Math.max(totalCapacity, gameData.backpack.baseCapacity);
    gameData.backpack.currentStackSize = Math.max(totalStackSize, gameData.backpack.baseStackSize);
    if (oldCapacity !== gameData.backpack.capacity) {
        generateBackpack();
    }
}

function initGame() {
    initSaveSystem();
    loadGame();
    
    // 修复经验值溢出问题
    checkLevelUp();
    
    // 强制修复所有关键状态
    console.log('游戏初始化 - 强制修复开始');
    
    // 强制修复加工台状态
    if (gameData.workshop.unlocked !== true && gameData.workshop.unlocked !== false) {
        gameData.workshop.unlocked = false;
        console.log('强制修复加工台状态为:', gameData.workshop.unlocked);
    }
    
    // 强制修复商店状态
    if (gameData.shop.unlocked !== true && gameData.shop.unlocked !== false) {
        gameData.shop.unlocked = false;
        console.log('强制修复商店状态为:', gameData.shop.unlocked);
    }
    
    // 强制修复商店等级
    if (gameData.shop.level === undefined) {
        gameData.shop.level = 0;
        console.log('强制修复商店等级为:', gameData.shop.level);
    }
    
    generateMineralGrid();
    generateBackpack();
    generateExpansionSlots();
    
    // 合并所有同类型矿物，确保没有带后缀的矿物
    mergeSameTypeItems();
    
    // 合并后再次检查特殊事件
    checkSpecialEvents();
    
    // 确保所有矿工都有intimacy属性
    if (gameData.minersGuild && gameData.minersGuild.miners) {
        gameData.minersGuild.miners.forEach(miner => {
            if (miner.intimacy === undefined || miner.intimacy === null) {
                miner.intimacy = 0;
            }
        });
    }
    
    // 加载熔炉配方
    loadFurnaceRecipes();
    
    // 立即更新所有UI
    updateWorkshopUI();
    updateShopUI();
    updateUI(); // 确保UI更新，包括商店界面
    updateFurnaceUI();
    updateGainedInfo();
    updateMessages();
    updateTempBackpackDisplay();
    addEventListeners();
    
    // 再次检查商店解锁状态，确保商店界面能够正确显示
    // 修复商店界面不显示的问题
    setTimeout(() => {
        checkShopUnlock();
        updateWorkshopUI();
        updateShopUI();
        updateUI();
        updateToolSlotsUI(); // 更新工具插片UI
        console.log('游戏初始化 - 强制修复完成');
    }, 100);
    
    // 启动自动出售定时器，每60秒执行一次
    startAutoSellTimer();
    
    // 启动挂机计时器
    startAfkTimer();
    
    // 初始化任务大厅
    initQuestHall();
    
    // 启动任务刷新定时器
    startQuestRefreshTimer();
    
    // 启动任务刷新倒计时定时器，实现实时显示
    startQuestCountdownTimer();
    
    // 检查特殊事件
    checkSpecialEvents();
    
    // 恢复自动挖矿状态
    if (gameData.minersGuild && gameData.minersGuild.autoMining && gameData.minersGuild.autoMining.enabled) {
        startAutoMining();
    }
    
    // 恢复熔炉相关定时器
    // 1. 恢复温度更新定时器（如果正在燃烧）
    if (gameData.furnace.fuel.isBurning) {
        startTemperatureUpdate();
    }
    
    // 2. 恢复正在进行的制作定时器
    // 检查融石制作
    if (gameData.furnace.crafting.inProgress) {
        startCraftingTimer();
    }
    
    // 检查合金制作
    for (let i = 1; i <= 5; i++) {
        if (gameData.furnace.alloyPositions[i] && gameData.furnace.alloyPositions[i].crafting.inProgress) {
            startCraftingTimer(i);
        }
    }
    
    // 移除了自动制作功能
}

// 检查特殊事件
function checkSpecialEvents() {
    // 检查NPC购买铜矿事件
    checkNPCCopperPurchaseEvent();
}

// 检查NPC购买铜矿事件
function checkNPCCopperPurchaseEvent() {
    // 确保specialEvents对象存在
    if (!gameData.specialEvents || !gameData.specialEvents.npcCopperPurchase) {
        return;
    }
    
    const event = gameData.specialEvents.npcCopperPurchase;
    
    // 检查事件是否已触发或完成
    if (event.triggered || event.completed) {
        return;
    }
    
    // 先合并所有铜矿类型，确保计算准确
    mergeSameTypeItems();
    
    // 检查玩家是否拥有足够的铜矿（包括所有铜矿类型）
    let copperAmount = 0;
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        if (itemName.startsWith('铜矿')) {
            copperAmount += count;
        }
    }
    
    // 调试信息
    console.log('铜矿总量:', copperAmount);
    console.log('需求数量:', event.requiredAmount);
    
    // 检查玩家等级是否足够（铜矿需要15级）
    const playerLevel = gameData.player.level;
    
    if (playerLevel >= 15 && copperAmount >= event.requiredAmount) {
        // 触发NPC购买铜矿事件
        triggerNPCCopperPurchaseEvent();
    }
}

// 触发NPC购买铜矿事件
function triggerNPCCopperPurchaseEvent() {
    // 确保specialEvents对象存在
    if (!gameData.specialEvents || !gameData.specialEvents.npcCopperPurchase) {
        return;
    }
    
    // 先合并所有铜矿类型，确保计算准确
    mergeSameTypeItems();
    
    const event = gameData.specialEvents.npcCopperPurchase;
    event.triggered = true;
    
    // 创建NPC交易界面
    createNPCTradeInterface();
}

// 创建NPC交易界面
function createNPCTradeInterface() {
    // 确保specialEvents对象存在
    if (!gameData.specialEvents || !gameData.specialEvents.npcCopperPurchase) {
        return;
    }
    
    const event = gameData.specialEvents.npcCopperPurchase;
    const requiredAmount = event.requiredAmount;
    
    // 创建交易界面
    const panel = document.createElement('div');
    panel.className = 'npc-trade-overlay';
    panel.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1001;
        animation: fadeIn 0.3s ease-in-out;
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .npc-trade-panel {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 500px;
            padding: 30px;
            animation: slideIn 0.3s ease-out;
        }
        .npc-trade-header {
            text-align: center;
            margin-bottom: 25px;
        }
        .npc-trade-header h3 {
            margin: 0 0 10px 0;
            font-size: 1.5em;
            color: #2c3e50;
        }
        .npc-trade-content {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 25px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        }
        .npc-message {
            font-size: 1.1em;
            line-height: 1.6;
            color: #2c3e50;
            margin-bottom: 20px;
        }
        .trade-details {
            margin-bottom: 20px;
        }
        .trade-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .trade-item:last-child {
            border-bottom: none;
        }
        .trade-label {
            font-weight: 500;
            color: #2c3e50;
        }
        .trade-value {
            color: #3498db;
            font-weight: 600;
        }
        .trade-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        .trade-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .accept-btn {
            background: linear-gradient(45deg, #27ae60 0%, #229954 100%);
            color: white;
        }
        .accept-btn:hover {
            background: linear-gradient(45deg, #229954 0%, #1e8449 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
        }
        .decline-btn {
            background: linear-gradient(45deg, #e74c3c 0%, #c0392b 100%);
            color: white;
        }
        .decline-btn:hover {
            background: linear-gradient(45deg, #c0392b 0%, #a93226 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
        }
    `;
    document.head.appendChild(style);
    
    panel.innerHTML = `
        <div class="npc-trade-panel">
            <div class="npc-trade-header">
                <h3>神秘矿工来访</h3>
            </div>
            <div class="npc-trade-content">
                <div class="npc-message">
                    <p>你好，年轻的矿工！</p>
                    <p>我是矿工协会的使者，正在寻找高质量的铜矿。</p>
                    <p>我注意到你拥有大量的铜矿储备，我愿意用矿工协会的徽章来换取你的铜矿。</p>
                    <p style="font-weight: bold; margin-top: 15px;">⚠️ 矿工协会提示：如果你拒绝这次交易，下次我再来时需要的铜矿数量会增加1%哦！<span style="color: #FF0000;">每次拒绝都会<span style="font-size: 1.2em;">累积增加</span>哦！</span></p>
                </div>
                <div class="trade-details">
                    <div class="trade-item">
                        <span class="trade-label">需要物品：</span>
                        <span class="trade-value">铜矿 × ${requiredAmount}</span>
                    </div>
                    <div class="trade-item">
                        <span class="trade-label">奖励：</span>
                        <span class="trade-value">初级矿工徽章</span>
                    </div>
                </div>
            </div>
            <div class="trade-actions">
                <button class="trade-btn accept-btn" onclick="acceptNPCTrade()">接受交易</button>
                <button class="trade-btn decline-btn" onclick="declineNPCTrade()">拒绝交易</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
}

// 接受NPC交易
function acceptNPCTrade() {
    // 确保specialEvents对象存在
    if (!gameData.specialEvents || !gameData.specialEvents.npcCopperPurchase) {
        return;
    }
    
    const event = gameData.specialEvents.npcCopperPurchase;
    const requiredAmount = event.requiredAmount;
    
    // 先合并所有铜矿类型，确保计算准确
    mergeSameTypeItems();
    
    // 检查玩家是否拥有足够的铜矿（包括所有铜矿类型）
    let copperAmount = 0;
    console.log('合并后的背包物品:', gameData.backpack.items);
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        if (itemName.startsWith('铜矿')) {
            copperAmount += count;
            console.log('铜矿类型:', itemName, '数量:', count);
        }
    }
    
    console.log('最终铜矿总量:', copperAmount);
    console.log('需求数量:', requiredAmount);
    
    if (copperAmount < requiredAmount) {
        addMessage('铜矿数量不足，无法完成交易！');
        addMessage(`当前铜矿总量: ${copperAmount}，需要: ${requiredAmount}`);
        return;
    }
    
    // 扣除铜矿
    gameData.backpack.items['铜矿'] -= requiredAmount;
    
    // 如果铜矿数量为0或负数，删除该键
    if (gameData.backpack.items['铜矿'] <= 0) {
        delete gameData.backpack.items['铜矿'];
    }
    
    // 给予初级矿工徽章
    if (!gameData.badges) {
        gameData.badges = {};
    }
    gameData.badges.hasMinersBadge = true;
    gameData.badges.badgeLevel = 1;
    
    // 标记事件为完成
    event.completed = true;
    
    // 解锁矿工协会
    gameData.minersGuild.unlocked = true;
    
    // 关闭交易界面
    const panel = document.querySelector('.npc-trade-overlay');
    if (panel) {
        panel.remove();
    }
    
    // 添加消息
    addMessage('交易完成！你获得了初级矿工徽章！');
    addMessage('矿工协会已解锁，你现在可以管理矿工和设置自动挖矿了！');
    
    // 更新UI
    updateUI();
    updateQuestUI();
    
    // 保存游戏
    saveGame();
}

// 拒绝NPC交易
function declineNPCTrade() {
    // 确保specialEvents对象存在
    if (!gameData.specialEvents || !gameData.specialEvents.npcCopperPurchase) {
        return;
    }
    
    const event = gameData.specialEvents.npcCopperPurchase;
    
    // 增加拒绝次数
    event.declineCount = (event.declineCount || 0) + 1;
    
    // 计算涨价幅度：每次拒绝增加declineCount%，例如第一次1%，第二次2%，第三次3%...
    const increasePercentage = event.declineCount;
    const increaseMultiplier = 1 + increasePercentage / 100;
    
    // 增加需求量，并向下取整
    event.requiredAmount = Math.floor(event.requiredAmount * increaseMultiplier);
    
    // 重置触发状态，允许再次触发
    event.triggered = false;
    
    // 关闭交易界面
    const panel = document.querySelector('.npc-trade-overlay');
    if (panel) {
        panel.remove();
    }
    
    // 添加消息
    addMessage('你拒绝了NPC的交易请求。');
    addMessage(`下次矿工协会使者来访时，需要的铜矿数量将增加${increasePercentage}%！`);
    
    // 保存游戏
    saveGame();
}

// 挂机计时器变量
let afkTimerSeconds = 0;
let afkTimerInterval = null;

// 启动自动出售定时器
function startAutoSellTimer() {
    // 立即执行一次
    executeFilter();
    
    // 设置定时器，每60秒执行一次
    setInterval(() => {
        executeFilter();
    }, 60000);
}

// 初始化任务大厅
function initQuestHall() {
    // 确保任务大厅数据结构存在
    if (!gameData.questHall) {
        gameData.questHall = {
            unlocked: false,
            quests: [],
            acceptedQuests: [],
            lastRefreshTime: Date.now(),
            refreshInterval: 120000,
            maxQuests: 3
        };
    }
    
    // 检查任务大厅解锁状态
    checkQuestHallUnlock();
    
    // 如果任务大厅已解锁且没有任务，生成初始任务
    if (gameData.questHall.unlocked && gameData.questHall.quests.length === 0) {
        generateQuests();
        // 更新刷新时间
        gameData.questHall.lastRefreshTime = Date.now();
    }
    
    // 更新任务UI
    updateQuestUI();
    
    // 更新等级提升券UI
    updateUnlockTicketsUI();
}

// 更新等级提升券UI
function updateUnlockTicketsUI() {
    const toolsInfo = document.querySelector('.tools-info');
    
    // 移除旧的等级提升券区域
    const existingTicketsUI = toolsInfo.querySelector('.unlock-tickets-container');
    if (existingTicketsUI) {
        existingTicketsUI.remove();
    }
    
    // 创建等级提升券区域
    const ticketsContainer = document.createElement('div');
    ticketsContainer.className = 'unlock-tickets-container';
    ticketsContainer.style.marginTop = '15px';
    ticketsContainer.style.padding = '15px';
    ticketsContainer.style.backgroundColor = '#fff3e0';
    ticketsContainer.style.borderRadius = '5px';
    ticketsContainer.style.border = '1px solid #ffcc80';
    
    let ticketsHTML = '';
    
    // 添加每个工具的等级提升券信息
    const toolTypes = ['pickaxe', 'cart', 'headlight'];
    toolTypes.forEach(toolType => {
        let tool = gameData.tools[toolType];
        // 确保unlockTickets对象存在
        if (!gameData.unlockTickets) {
            gameData.unlockTickets = {
                pickaxe: 0,
                cart: 0,
                headlight: 0
            };
        }
        // 确保工具对象和maxLevel属性存在
        if (!tool) {
            tool = {
                level: 0,
                exp: 0,
                nextExp: 50,
                maxLevel: 50,
                unlockTickets: 0
            };
            gameData.tools[toolType] = tool;
        } else if (tool.maxLevel === undefined) {
            tool.maxLevel = 50;
        }
        const unlockTickets = gameData.unlockTickets[toolType] || 0;
        
        ticketsHTML += `
            <div style="margin-bottom: 10px; padding: 10px; background-color: #fff; border-radius: 3px; border: 1px solid #ffecb3;">
                <div style="font-weight: bold; margin-bottom: 5px;">${getToolName(toolType)}</div>
                <div style="font-size: 0.9em; margin-bottom: 5px;">当前等级上限: ${tool.maxLevel}级</div>
                <div style="font-size: 0.9em; margin-bottom: 8px;">等级提升券: ${unlockTickets}张</div>
                ${unlockTickets > 0 ? `
                    <div style="font-size: 0.8em; color: #ff6f00; margin-bottom: 5px;">使用后等级上限提升至 ${tool.maxLevel + 1} 级</div>
                    <button onclick="useUnlockTicket('${toolType}')" style="padding: 5px 12px; background-color: #ff9800; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 0.8em;">
                        使用等级提升券
                    </button>
                ` : '<div style="font-size: 0.8em; color: #757575;">没有等级提升券</div>'}
            </div>
        `;
    });
    
    // 获取独立的工具等级提升券容器
    const existingTicketsContainer = document.querySelector('.unlock-tickets-container');
    
    if (existingTicketsContainer) {
        // 更新容器内容，保留原有的h3标题
        const containerContent = existingTicketsContainer.innerHTML;
        const titleMatch = containerContent.match(/<h3>.*?<\/h3>/);
        const title = titleMatch ? titleMatch[0] : '<h3>工具等级提升券</h3>';
        
        existingTicketsContainer.innerHTML = title + ticketsHTML;
    } else {
        // 如果没有找到容器，仍然添加到工具信息中作为备用
        ticketsContainer.innerHTML = '<h3>工具等级提升券</h3>' + ticketsHTML;
        toolsInfo.appendChild(ticketsContainer);
    }
}

// 任务刷新倒计时定时器变量
let questRefreshCountdownInterval = null;

// 插片稀有度经验值奖励映射
const slotRarityExpRewards = {
    common: 10,
    uncommon: 20,
    rare: 40,
    epic: 80
};

// 插片制作等级经验值需求表（250%指数增长）
const slotCraftingLevelExpTable = {
    1: 400,
    2: 1000,
    3: 2500,
    4: 6250,
    5: 15625,
    6: 39063
};

// 检查插片制作系统是否可以升级
function checkSlotCraftingLevelUp() {
    const currentLevel = gameData.slotCrafting.level;
    
    // 如果已达到最高等级，不再升级
    if (currentLevel >= gameData.slotCrafting.maxLevel) {
        return;
    }
    
    const currentExp = gameData.slotCrafting.exp;
    const nextLevel = currentLevel + 1;
    const requiredExp = slotCraftingLevelExpTable[currentLevel];
    
    // 检查是否满足升级条件
    if (currentExp >= requiredExp) {
        // 升级
        gameData.slotCrafting.level = nextLevel;
        
        // 计算剩余经验
        const remainingExp = currentExp - requiredExp;
        
        // 更新经验值和升级所需经验值
        gameData.slotCrafting.exp = remainingExp;
        
        // 添加升级消息
        addMessage(`插片制作系统升级到${nextLevel}级！`);
        
        // 递归检查是否可以继续升级
        checkSlotCraftingLevelUp();
        
        // 更新插片制作等级显示
        updateToolSlotsUI();
    }
}

// 获取稀有度中文名称
function getRarityName(rarity) {
    const rarityNames = {
        common: '普通',
        uncommon: '稀有',
        rare: '史诗',
        epic: '传说'
    };
    return rarityNames[rarity] || rarity;
}

// 插片配置已移至外部文件 slots/slot-config.js
// 使用外部配置文件中定义的变量
try {
    // 构建稀有度名称映射
    window.slotRarityNames = {};
    if (Array.isArray(window.slotRarities)) {
        window.slotRarities.forEach(rarity => {
            window.slotRarityNames[rarity.id] = rarity.name;
        });
    }
    
    // 保留原始插片效果结构，添加一个方便访问名称的映射
    // 原始结构: { toolType: [{ id: 'effectId', name: '效果名称' }, ...] }
    // 同时创建一个名称数组映射，方便随机选择效果
    window.slotEffectNames = {};
    if (window.slotEffects) {
        Object.keys(window.slotEffects).forEach(toolType => {
            if (Array.isArray(window.slotEffects[toolType])) {
                window.slotEffectNames[toolType] = window.slotEffects[toolType].map(effect => effect.name);
            }
        });
    }
    
    // 确保 slotCraftingRecipes 从外部配置加载
    if (!window.slotCraftingRecipes) {
        throw new Error('slotCraftingRecipes not found in external config');
    }
} catch (error) {
    console.warn('未能加载外部插片配置，使用默认配置:', error);
    // 备用默认配置
    window.slotRarities = [
        { id: 'common', name: '普通', color: '#ffffff' },
        { id: 'uncommon', name: '稀有', color: '#0004ffff' },
        { id: 'rare', name: '史诗', color: '#a335ee' },
        { id: 'epic', name: '传说', color: '#ff8000' }
    ];
    window.slotRarityNames = {
        'common': '普通',
        'uncommon': '稀有',
        'rare': '史诗',
        'epic': '传说'
    };
    window.slotEffects = {
        'pickaxe': ['成品转化', '连锁采矿', '金币经验', '燃料惊喜', '碎片回收'],
        'cart': ['自动运输', '运力翻倍', '燃料暴击', '压缩燃料', '现场收购'],
        'headlight': ['加强灯泡', '电池优化', '副产物增强', '超载照明', '幸运磁铁'],
        'base': ['基础插片']
    };
    window.slotCraftingRecipes = {
        'toolSlot1': {
            name: '基础工具插片',
            materials: {
                '磁铁': 5,
                '工具插片碎片': 10
            },
            description: '基础工具插片，用于徽章升级和制作各种工具插片'
        },
        'headlightSlot': {
            name: '头灯插片',
            materials: {
                'toolSlot1': 1,
                '电池': 1,
                'headlightTicket': 1
            },
            description: '头灯专用插片，用于提升头灯性能'
        },
        'cartSlot': {
            name: '矿车插片',
            materials: {
                'toolSlot1': 1,
                '燃料': 1,
                'cartTicket': 1
            },
            description: '矿车专用插片，用于提升矿车性能'
        },
        'pickaxeSlot': {
            name: '采矿锄插片',
            materials: {
                'toolSlot1': 1,
                '磁铁': 1,
                'pickaxeTicket': 1
            },
            description: '采矿锄专用插片，用于提升采矿锄性能'
        }
    };
}

// 获取插片基础名称和稀有度
function getSlotBaseAndRarity(fullSlotName) {
    // 使用外部映射文件中的解析函数来解析插片名称
    const parsedInfo = window.parseSlotInternalFormat(fullSlotName);
    
    // 返回简化的结果，保持与原有函数的兼容性
    return {
        baseName: parsedInfo.baseName,
        rarity: parsedInfo.rarityId,
        effect: parsedInfo.effect
    };
}

// 获取插片类型
function getSlotType(fullSlotName) {
    const baseName = getSlotBaseAndRarity(fullSlotName).baseName;
    // 处理内部格式的baseName
    if (baseName === 'toolSlot1') return 'base';
    if (baseName === 'headlightSlot') return 'headlight';
    if (baseName === 'cartSlot') return 'cart';
    if (baseName === 'pickaxeSlot') return 'pickaxe';
    // 处理显示格式的baseName
    if (baseName === '采矿锄插片') return 'pickaxe';
    if (baseName === '矿车插片') return 'cart';
    if (baseName === '头灯插片') return 'headlight';
    if (baseName === '基础工具插片') return 'base';
    return 'unknown';
}

// 增强现有的getSlotName函数，支持更多类型
function getSlotName(baseName) {
    switch (baseName) {
        case 'toolSlot1':
        case 'base':
            return '基础工具插片';
        case 'headlightSlot':
        case 'headlight':
            return '头灯插片';
        case 'cartSlot':
        case 'cart':
            return '矿车插片';
        case 'pickaxeSlot':
        case 'pickaxe':
            return '采矿锄插片';
        default:
            return baseName;
    }
}

// 添加带稀有度的插片到背包
function addSlotWithRarity(baseSlotName, rarity = 'common', effect = '') {
    // 检查baseSlotName是否已经是内部格式（包含Slot）
    let internalBaseName = baseSlotName;
    
    // 如果是显示格式，转换为内部格式
    if (baseSlotName === '采矿锄插片') internalBaseName = 'pickaxeSlot';
    else if (baseSlotName === '矿车插片') internalBaseName = 'cartSlot';
    else if (baseSlotName === '头灯插片') internalBaseName = 'headlightSlot';
    else if (baseSlotName === '基础工具插片') internalBaseName = 'toolSlot1';
    
    // 如果没有提供效果，随机分配一个
    if (!effect) {
        // 直接根据internalBaseName获取插片类型
        let slotType;
        switch (internalBaseName) {
            case 'toolSlot1':
                slotType = 'base';
                break;
            case 'headlightSlot':
                slotType = 'headlight';
                break;
            case 'cartSlot':
                slotType = 'cart';
                break;
            case 'pickaxeSlot':
                slotType = 'pickaxe';
                break;
            default:
                slotType = 'unknown';
        }
        
        const possibleEffects = window.slotEffectNames[slotType] || [];
        
        if (possibleEffects.length > 0) {
            const randomIndex = Math.floor(Math.random() * possibleEffects.length);
            effect = possibleEffects[randomIndex];
        } else {
            // 如果没有可用效果，确保effect不为空
            effect = '成品转化'; // 默认效果
        }
    }
    
    // 使用外部映射文件中的格式化函数生成统一的内部格式插片名称
    const fullSlotName = window.formatSlotInternalName(internalBaseName, rarity, effect);
    
    // 检查背包是否已满
    calculateBackpackStats();
    const currentStackSize = gameData.backpack.currentStackSize;
    let added = false;
    
    // 尝试添加到现有堆叠（考虑基础名称、稀有度和效果）
    for (const [name, count] of Object.entries(gameData.backpack.items)) {
        if (name === fullSlotName && count < currentStackSize) {
            gameData.backpack.items[name]++;
            added = true;
            break;
        }
    }
    
    // 如果没有添加到现有堆叠，尝试创建新堆叠
    if (!added) {
        const itemCount = Object.keys(gameData.backpack.items).length;
        if (itemCount < gameData.backpack.capacity) {
            // 背包还有空槽位，直接创建新物品
            gameData.backpack.items[fullSlotName] = (gameData.backpack.items[fullSlotName] || 0) + 1;
            added = true;
        } else {
            // 背包满了，放入临时背包
            addToTempBackpack(fullSlotName);
            return;
        }
    }
    
    // 记录详细获得信息
    ensureGainedInfoExists();
    if (gameData.gainedInfo.detailed[internalBaseName]) {
        gameData.gainedInfo.detailed[internalBaseName]++;
    } else {
        gameData.gainedInfo.detailed[internalBaseName] = 1;
    }
    
    // 更新背包显示
    updateBackpackDisplay();
    showItemTotals();
    
    // 触发相关更新
    checkLevelUp();
    checkSpecialEvents();
    updateGainedInfo();
    
    return added;
}

// 获取玩家背包中的所有插片
function getAllSlots() {
    const slots = [];
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        // 尝试解析物品，看是否是插片
        const { baseName, rarity, effect } = getSlotBaseAndRarity(itemName);
        const type = getSlotType(itemName);
        
        // 检查是否是有效的插片类型
        if (type === 'pickaxe' || type === 'cart' || type === 'headlight' || type === 'base') {
            // 即使效果为空，也要添加到列表中，避免插片丢失
            slots.push({
                fullName: itemName,
                baseName: baseName,
                rarity: rarity,
                effect: effect || '',
                count: count,
                type: type
            });
        }
    }
    return slots;
}

// 获取同类型插片列表
function getSlotsByType(type) {
    const allSlots = getAllSlots();
    return allSlots.filter(slot => getSlotType(slot.fullName) === type);
}

// 更新工具插片UI函数
function updateToolSlotsUI() {
    const toolSlotsElement = document.getElementById('tool-slots');
    if (!toolSlotsElement) return;
    
    const toolSlotsContent = toolSlotsElement.querySelector('.tool-slots-content');
    if (!toolSlotsContent) return;
    
    // 确保插片制作系统数据存在，兼容旧存档
    if (!gameData.slotCrafting) {
        gameData.slotCrafting = {
            level: 1,
            exp: 0,
            maxExp: 400,
            itemsCrafted: 0,
            maxLevel: 6
        };
    }
    
    // 生成工具插片UI内容
    toolSlotsContent.innerHTML = `
        <div class="slot-crafting-level" style="margin-bottom: 15px; padding: 10px; background-color: #f0f8ff; border-radius: 5px; border: 1px solid #add8e6;">
            <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 1.1em; color: #0066cc;">插片制作等级</h3>
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-weight: bold;">等级: <span id="slot-crafting-level">${gameData.slotCrafting.level}</span>/<span id="slot-crafting-max-level">${gameData.slotCrafting.maxLevel}</span></div>
                <div>经验: <span id="slot-crafting-exp">${gameData.slotCrafting.exp}</span>/<span id="slot-crafting-next-exp">${slotCraftingLevelExpTable[gameData.slotCrafting.level] || 'MAX'}</span></div>
                <div style="font-size: 0.9em; color: #666;">已制作: <span id="slot-crafting-items">${gameData.slotCrafting.itemsCrafted}</span>个</div>
            </div>
            <div style="margin-top: 8px; width: 100%; height: 8px; background-color: #ddd; border-radius: 4px; overflow: hidden;">
                <div id="slot-crafting-exp-bar" style="height: 100%; background-color: #4CAF50; width: ${gameData.slotCrafting.level >= gameData.slotCrafting.maxLevel ? 100 : (gameData.slotCrafting.exp / (slotCraftingLevelExpTable[gameData.slotCrafting.level] || 1)) * 100}%; transition: width 0.3s ease;"></div>
            </div>
        </div>
        <div class="tool-slots-controls">
            <div class="tool-control-item">
                <button id="craft-tool-slot-btn">制作插片</button>
                <div class="tool-dropdown craft-dropdown" id="craft-tool-slot-dropdown" style="display: none;">
                    <div class="dropdown-content">
                        <div class="dropdown-header">制作插片</div>
                        <div class="dropdown-body">
                            <div class="tool-slot-select" style="margin-top: 10px;">
                                <label for="tool-slot-type">选择插片类型:</label>
                                <select id="tool-slot-type" style="padding: 5px; border: 1px solid #ddd; border-radius: 3px;">
                                    <option value="toolSlot1">基础工具插片</option>
                                    <option value="headlightSlot">头灯插片</option>
                                    <option value="cartSlot">矿车插片</option>
                                    <option value="pickaxeSlot">采矿锄插片</option>
                                </select>
                            </div>
                            <div class="tool-slot-quantity" style="margin-top: 10px;">
                                <label for="tool-slot-quantity">数量:</label>
                                <input type="number" id="tool-slot-quantity" min="1" max="50" value="1" style="padding: 5px; border: 1px solid #ddd; border-radius: 3px; width: 80px;">
                            </div>
                            <div class="tool-slot-info" id="tool-slot-info" style="margin-top: 10px; padding: 10px; background-color: #f9f9f9; border-radius: 3px; border: 1px solid #ddd;">
                                <h4>插片信息</h4>
                                <div id="tool-slot-details">
                                    请选择一个插片类型查看详细信息
                                </div>
                            </div>
                            <button id="confirm-craft-tool-slot" style="margin-top: 10px;">确认制作</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tool-control-item">
                <button id="combine-tool-slots-btn">合成插片</button>
                <div class="tool-dropdown combine-dropdown" id="combine-tool-slots-dropdown" style="display: none;">
                    <div class="dropdown-content">
                        <div class="dropdown-header">合成插片</div>
                        <div class="dropdown-body">
                            <p>选择两个同类型的插片进行合成：</p>
                            <div class="combine-slots">
                                <div class="combine-slot">
                                    <label for="combine-slot-1">插片1:</label>
                                    <select id="combine-slot-1" style="padding: 5px; border: 1px solid #ddd; border-radius: 3px; margin-right: 10px;"></select>
                                </div>
                                <div class="combine-slot">
                                    <label for="combine-slot-2">插片2:</label>
                                    <select id="combine-slot-2" style="padding: 5px; border: 1px solid #ddd; border-radius: 3px;"></select>
                                </div>
                            </div>
                            <div class="combine-info" id="combine-info" style="margin-top: 10px; padding: 10px; background-color: #f9f9f9; border-radius: 3px; border: 1px solid #ddd;">
                                <h4>合成信息</h4>
                                <div id="combine-details">
                                    请选择两个插片查看合成信息
                                </div>
                            </div>
                            <div style="margin-top: 10px; display: flex; align-items: center;">
                                <button id="confirm-combine-slots" style="background-color: #4CAF50; color: white; border: none; padding: 8px 15px; border-radius: 3px; cursor: pointer;">开始合成</button>
                                <div id="combine-loading" style="margin-left: 10px; display: none; align-items: center;">
                                    <div style="width: 20px; height: 20px; border: 3px solid #f3f3f3; border-top: 3px solid #4CAF50; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                                    <span style="margin-left: 5px; font-size: 14px;">合成中...</span>
                                    <div style="margin-left: 15px; width: 100px; height: 6px; background-color: #f3f3f3; border-radius: 3px; overflow: hidden;">
                                        <div id="combine-progress" style="height: 100%; width: 0%; background-color: #4CAF50; transition: width 0.5s ease;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tool-control-item">
                <button id="equip-tool-slot-btn">装备插片</button>
                <div class="tool-dropdown equip-dropdown" id="equip-tool-slot-dropdown" style="display: none;">
                    <div class="dropdown-content">
                        <div class="dropdown-header">装备插片</div>
                        <div class="dropdown-body">
                            <div class="tool-slot-select" style="margin-top: 10px;">
                                <label for="equip-tool-type">选择工具:</label>
                                <select id="equip-tool-type" style="padding: 5px; border: 1px solid #ddd; border-radius: 3px;">
                                    <option value="pickaxe">采矿锄</option>
                                    <option value="cart">矿车</option>
                                    <option value="headlight">头灯</option>
                                </select>
                            </div>
                            <div id="tool-slots-container" style="margin-top: 15px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加事件监听器
    document.getElementById('tool-slot-type')?.addEventListener('change', updateToolSlotInfo);
    document.getElementById('tool-slot-quantity')?.addEventListener('input', updateToolSlotInfo);
    
    // 为制作插片按钮添加点击事件
    const craftBtn = document.getElementById('craft-tool-slot-btn');
    const craftDropdown = document.getElementById('craft-tool-slot-dropdown');
    if (craftBtn && craftDropdown) {
        craftBtn.addEventListener('click', () => {
            // 切换制作插片下拉菜单的显示状态
            craftDropdown.style.display = craftDropdown.style.display === 'none' ? 'block' : 'none';
            // 隐藏其他所有下拉菜单
            const combineDropdown = document.getElementById('combine-tool-slots-dropdown');
            const equipDropdown = document.getElementById('equip-tool-slot-dropdown');
            if (combineDropdown) {
                combineDropdown.style.display = 'none';
            }
            if (equipDropdown) {
                equipDropdown.style.display = 'none';
            }
        });
    }
    
    // 为合成插片按钮添加点击事件
    const combineBtn = document.getElementById('combine-tool-slots-btn');
    const combineDropdown = document.getElementById('combine-tool-slots-dropdown');
    if (combineBtn && combineDropdown) {
        combineBtn.addEventListener('click', () => {
            // 切换合成插片下拉菜单的显示状态
            combineDropdown.style.display = combineDropdown.style.display === 'none' ? 'block' : 'none';
            // 隐藏其他所有下拉菜单
            const craftDropdown = document.getElementById('craft-tool-slot-dropdown');
            const equipDropdown = document.getElementById('equip-tool-slot-dropdown');
            if (craftDropdown) {
                craftDropdown.style.display = 'none';
            }
            if (equipDropdown) {
                equipDropdown.style.display = 'none';
            }
        });
    }
    
    // 为确认制作按钮添加点击事件
    document.getElementById('confirm-craft-tool-slot')?.addEventListener('click', craftToolSlot);
    
    // 初始化合成插片界面
    initCombineSlotsUI();
    
    // 为合成按钮添加点击事件
    document.getElementById('confirm-combine-slots')?.addEventListener('click', combineSlots);
    
    // 为合成插片选择框添加change事件
    document.getElementById('combine-slot-1')?.addEventListener('change', updateCombineInfo);
    document.getElementById('combine-slot-2')?.addEventListener('change', updateCombineInfo);
    
    // 为装备插片按钮添加点击事件
    const equipBtn = document.getElementById('equip-tool-slot-btn');
    const equipDropdown = document.getElementById('equip-tool-slot-dropdown');
    if (equipBtn && equipDropdown) {
        equipBtn.addEventListener('click', () => {
            // 切换装备插片下拉菜单的显示状态
            equipDropdown.style.display = equipDropdown.style.display === 'none' ? 'block' : 'none';
            // 隐藏其他下拉菜单
            const craftDropdown = document.getElementById('craft-tool-slot-dropdown');
            const combineDropdown = document.getElementById('combine-tool-slots-dropdown');
            if (craftDropdown) craftDropdown.style.display = 'none';
            if (combineDropdown) combineDropdown.style.display = 'none';
            
            // 初始化装备界面
            updateToolSlotEquipment();
        });
    }
    
    // 为工具类型选择框添加change事件
    document.getElementById('equip-tool-type')?.addEventListener('change', updateToolSlotEquipment);
    
    // 初始化插片信息
    updateToolSlotInfo();
    
    // 初始化合成信息
    updateCombineInfo();
}

// 更新工具插片装备界面
function updateToolSlotEquipment() {
    const toolType = document.getElementById('equip-tool-type')?.value;
    const slotsContainer = document.getElementById('tool-slots-container');
    
    // 移除对 slotSelect 的依赖
    if (!toolType || !slotsContainer) return;
    
    const tool = gameData.tools[toolType];
    if (!tool) return;
    
    // 确保 tool.slots 存在
    if (!tool.slots) {
        tool.slots = [null, null, null];
    }
    
    // 获取工具对应的插片类型
    let slotType;
    switch (toolType) {
        case 'pickaxe':
            slotType = 'pickaxeSlot';
            break;
        case 'cart':
            slotType = 'cartSlot';
            break;
        case 'headlight':
            slotType = 'headlightSlot';
            break;
        default:
            slotType = 'base';
    }
    
    // 获取背包中可用的该类型插片
    const availableSlots = getAllSlots().filter(slot => {
        const slotTypeFromSlot = getSlotType(slot.fullName);
        return slotTypeFromSlot === toolType;
    });
    
    // 生成插片槽位UI
    let slotsHTML = '<h4 style="margin-bottom: 10px;">插片槽位</h4>';
    
    for (let i = 0; i < 3; i++) {
        const slot = tool.slots[i] || null;
        slotsHTML += `
            <div style="margin-bottom: 15px; padding: 12px; background-color: #f5f5f5; border-radius: 5px; border: 1px solid #ddd;">
                <div style="font-weight: bold; margin-bottom: 8px;">槽位 ${i + 1}</div>
                ${slot ? `
                    <div style="margin-bottom: 10px; padding: 8px; background-color: ${window.slotRarities.find(r => r.id === slot.rarity)?.color || '#ffffff'}; color: #000; border-radius: 3px;">
                        <div>${getSlotName(slot.baseName)} (${slotRarityNames[slot.rarity]})</div>
                        <div style="font-size: 0.8em; margin-top: 3px;">效果: ${getSlotEffectDescription(slot.baseName, slot.rarity, slot.effect)}</div>
                    </div>
                    <button onclick="unequipSlot('${toolType}', ${i})" style="padding: 5px 12px; background-color: #f44336; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 0.9em;">
                        卸载
                    </button>
                ` : `
                    <div style="margin-bottom: 10px; padding: 10px; background-color: #e0e0e0; border-radius: 3px; text-align: center;">
                        空槽位
                    </div>
                    <select id="slot-select-${i}" style="padding: 5px; border: 1px solid #ddd; border-radius: 3px; margin-right: 8px;">
                        <option value="">选择插片</option>
                        ${availableSlots.map(slot => `
                            <option value="${slot.fullName}">${getSlotName(slot.baseName)} (${slotRarityNames[slot.rarity]}) - ${slot.effect}</option>
                        `).join('')}
                    </select>
                    <button onclick="equipSlot('${toolType}', ${i})" style="padding: 5px 12px; background-color: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 0.9em;">
                        装备
                    </button>
                `}
            </div>
        `;
    }
    
    slotsContainer.innerHTML = slotsHTML;
}

// 装备插片
function equipSlot(toolType, slotIndex) {
    const selectElement = document.getElementById(`slot-select-${slotIndex}`);
    if (!selectElement) return;
    
    const slotFullName = selectElement.value;
    if (!slotFullName) {
        addMessage('请选择要装备的插片！');
        updateMessages();
        return;
    }
    
    const tool = gameData.tools[toolType];
    if (!tool) return;
    
    // 检查该插片是否已经在其他槽位装备 - 已移除限制，允许相同效果插片叠加
    // 后续可在此处添加效果叠加上限或特殊规则
    const slotInfo = getSlotBaseAndRarity(slotFullName);
    
    // TODO: 如需添加效果叠加上限，可在此处实现
    // 示例：const effectCount = tool.slots.filter(slot => slot && slot.effect === slotInfo.effect).length;
    // 示例：if (effectCount >= maxStackLimit) { /* 显示提示并返回 */ }
    
    // 装备插片
    tool.slots[slotIndex] = {
        fullName: slotFullName,
        baseName: slotInfo.baseName,
        rarity: slotInfo.rarity,
        effect: slotInfo.effect
    };
    
    // 从背包中移除该插片
    gameData.backpack.items[slotFullName]--;
    if (gameData.backpack.items[slotFullName] <= 0) {
        delete gameData.backpack.items[slotFullName];
    }
    
    addMessage('插片装备成功！');
    updateMessages();
    updateBackpackDisplay();
    updateToolSlotEquipment();
    saveGame();
}

// 卸载插片
function unequipSlot(toolType, slotIndex) {
    const tool = gameData.tools[toolType];
    if (!tool) return;
    
    const slot = tool.slots[slotIndex];
    if (!slot) return;
    
    // 直接使用原插片的fullName来添加插片，确保与原插片完全相同
    // 检查背包是否已满
    calculateBackpackStats();
    const currentStackSize = gameData.backpack.currentStackSize;
    let added = false;
    
    // 尝试添加到现有堆叠（考虑完整名称）
    for (const [name, count] of Object.entries(gameData.backpack.items)) {
        if (name === slot.fullName && count < currentStackSize) {
            gameData.backpack.items[name]++;
            added = true;
            break;
        }
    }
    
    // 如果没有添加到现有堆叠，尝试创建新堆叠
    if (!added) {
        const itemCount = Object.keys(gameData.backpack.items).length;
        if (itemCount < gameData.backpack.capacity) {
            // 背包还有空槽位，直接创建新物品
            gameData.backpack.items[slot.fullName] = (gameData.backpack.items[slot.fullName] || 0) + 1;
            added = true;
        } else {
            // 背包满了，放入临时背包
            addToTempBackpack(slot.fullName);
            return;
        }
    }
    
    // 记录详细获得信息
    ensureGainedInfoExists();
    const slotInfo = getSlotBaseAndRarity(slot.fullName);
    if (gameData.gainedInfo.detailed[slotInfo.baseName]) {
        gameData.gainedInfo.detailed[slotInfo.baseName]++;
    } else {
        gameData.gainedInfo.detailed[slotInfo.baseName] = 1;
    }
    
    // 清空槽位
    tool.slots[slotIndex] = null;
    
    addMessage('插片卸载成功！');
    updateMessages();
    updateBackpackDisplay();
    updateToolSlotEquipment();
    saveGame();
}

// 确认装备插片（已废弃，保留用于兼容）
function confirmEquipSlots() {
    // 提示用户使用新的装备方式
    addMessage('装备功能已优化，请使用槽位旁边的装备按钮！');
    updateMessages();
}

// 获取插片名称
function getSlotName(baseName) {
    switch (baseName) {
        case 'toolSlot1':
            return '基础工具插片';
        case 'headlightSlot':
            return '头灯插片';
        case 'cartSlot':
            return '矿车插片';
        case 'pickaxeSlot':
            return '采矿锄插片';
        default:
            return baseName;
    }
}

// 获取插片效果描述
function getSlotEffectDescription(baseName, rarity, effect) {
    // 这里根据插片类型、稀有度和实际效果生成具体的效果描述
    const slotType = getSlotType(`${baseName}_${rarity}`);
    // 确保effect不为undefined且去除空格
    effect = (effect || '').trim();
    
    // 根据工具类型、稀有度和实际效果获取具体效果描述
    if (slotType === 'pickaxe') {
        // 采矿锄插片效果
        switch (effect) {
            case '成品转化':
                switch (rarity) {
                    case 'common': return '成品转化：石矿、煤矿直接变成成品（石灰、煤炭）';
                    case 'uncommon': return '成品转化：石矿、煤矿、银矿直接变成成品（石灰、煤炭、银质粉末）';
                    case 'rare': return '成品转化：石矿、煤矿、银矿、白金矿、金矿直接变成成品（石灰、煤炭、银质粉末、白金粉末、金砖）';
                    case 'epic': return '成品转化：石矿、煤矿、银矿、白金矿、金矿、水晶矿直接变成成品（石灰、煤炭、银质粉末、白金粉末、金砖、水晶簇），且产出翻倍';
                    default: return '成品转化：根据稀有度不同随机某一种矿物直接变成成品';
                }
            case '连锁采矿':
                switch (rarity) {
                    case 'common': return '连锁采矿：获得上一个等级的矿物（不包括副产物），如果本次采集是最低级矿物则失效';
                    case 'uncommon': return '连锁采矿：获得上一个等级的矿物（包括副产物），如果本次采集是最低级矿物则失效';
                    case 'rare': return '连锁采矿：获得上一个等级的矿物（不包括副产物），和下一个等级的矿物（不包括副产物）。如果本次采集是最低级矿物则只获得下一等级矿物（不包括副产物）；如果本次采集的是最高级矿物则只获得上一级矿物（不包括副产物）';
                    case 'epic': return '连锁采矿：获得上一个等级的矿物（包括副产物），和下一个等级的矿物（包括副产物）。如果本次采集是最低级矿物则只获得下一等级矿物（包括副产物）；如果本次采集的是最高级矿物则只获得上一级矿物（包括副产物），且当前采集矿物的副产品翻倍';
                    default: return '连锁采矿：根据稀有度不同在采矿时同步获得相同数量的相邻的矿石';
                }
            case '金币经验':
                switch (rarity) {
                    case 'common': return '金币经验：获得1倍矿物价值金币基数的经验';
                    case 'uncommon': return '金币经验：获得2倍矿物价值金币基数的经验';
                    case 'rare': return '金币经验：获得4倍矿物价值金币基数的经验';
                    case 'epic': return '金币经验：获得8倍矿物价值金币基数的经验，雇佣的矿工1分钟内所得物增加100%';
                    default: return '金币经验：根据稀有度不同获得采集的矿物的价值金币基数倍率的经验';
                }
            case '燃料惊喜':
                switch (rarity) {
                    case 'common': return '燃料惊喜：获得总数5个（比例随机电池或者燃料）随机燃料';
                    case 'uncommon': return '燃料惊喜：获得总数10个（比例随机电池或者燃料）随机燃料';
                    case 'rare': return '燃料惊喜：获得总数20个（比例随机电池或者燃料）随机燃料';
                    case 'epic': return '燃料惊喜：获得总数50个（比例随机电池或者燃料）随机燃料，且必定获得一个扎啤';
                    default: return '燃料惊喜：根据稀有度不同获得随机燃料随机数量';
                }
            case '碎片回收':
                switch (rarity) {
                    case 'common': return '碎片回收：获得1个插片碎片';
                    case 'uncommon': return '碎片回收：获得2个插片碎片';
                    case 'rare': return '碎片回收：获得4个插片碎片';
                    case 'epic': return '碎片回收：获得8个插片碎片，5%几率获得一个随机非传说级非碎片回收插片';
                    default: return '碎片回收：根据稀有度不同获得不同数量的插片碎片';
                }
            default:
                return `${slotRarityNames[rarity]}采矿锄插片`;
        }
    } else if (slotType === 'cart') {
        // 矿车插片效果
        switch (effect) {
            case '自动运输':
                switch (rarity) {
                    case 'common': return '自动运输：无燃料运行时间30秒冷却30秒';
                    case 'uncommon': return '自动运输：无燃料运行时间60秒冷却25秒';
                    case 'rare': return '自动运输：无燃料运行时间90秒冷却20秒';
                    case 'epic': return '自动运输：无燃料运行时间180秒冷却15秒，且必出一个副产物';
                    default: return '自动运输：根据稀有度不同获得不同时间的无燃料运行时间但有冷却';
                }
            case '运力翻倍':
                switch (rarity) {
                    case 'common': return '运力翻倍：当前采集的150%';
                    case 'uncommon': return '运力翻倍：当前采集的200%';
                    case 'rare': return '运力翻倍：当前采集的400%';
                    case 'epic': return '运力翻倍：当前采集的800%，且不消耗所得矿物立即获得一次金币';
                    default: return '运力翻倍：根据稀有度不同获得不同倍数矿物';
                }
            case '燃料暴击':
                switch (rarity) {
                    case 'common': return '燃料暴击：消耗燃料增加100%后，所得矿物数量乘以消耗燃料数量';
                    case 'uncommon': return '燃料暴击：消耗燃料增加200%后，所得矿物数量乘以消耗燃料数量';
                    case 'rare': return '燃料暴击：消耗燃料增加400%后，所得矿物数量乘以消耗燃料数量';
                    case 'epic': return '燃料暴击：消耗燃料增加800%后，所得矿物数量乘以消耗燃料数量，且返还一个史诗级燃料暴击插片';
                    default: return '燃料暴击：根据稀有度不同获得消耗燃料倍数矿物';
                }
            case '压缩燃料':
                switch (rarity) {
                    case 'common': return '压缩燃料：油箱上限加100%后，无消耗自动填满';
                    case 'uncommon': return '压缩燃料：油箱上限加150%后，无消耗自动填满';
                    case 'rare': return '压缩燃料：油箱上限加300%后，无消耗自动填满';
                    case 'epic': return '压缩燃料：油箱上限加600%后，无消耗自动填满，且获得自动填满的燃料进入背包';
                    default: return '压缩燃料：根据稀有度不同获得不同压缩倍数燃料';
                }
            case '现场收购':
                switch (rarity) {
                    case 'common': return '现场收购：现场出售产出矿物收益加100%';
                    case 'uncommon': return '现场收购：现场出售产出矿物收益加150%';
                    case 'rare': return '现场收购：现场出售产出矿物收益加200%';
                    case 'epic': return '现场收购：现场出售产出矿物收益加400%，且5%几率获得一个随机的工具等级提升券';
                    default: return '现场收购：根据稀有度不同获得不同概率直接收购矿物';
                }
            default:
                return `${slotRarityNames[rarity]}矿车插片`;
        }
    } else if (slotType === 'headlight') {
        // 头灯插片效果
        switch (effect) {
            case '加强灯泡':
                switch (rarity) {
                    case 'common': return '加强灯泡：头灯数据加10%概率';
                    case 'uncommon': return '加强灯泡：头灯数据加20%概率';
                    case 'rare': return '加强灯泡：头灯数据加40%概率';
                    case 'epic': return '加强灯泡：头灯数据加80%概率，且使获得的物品翻倍';
                    default: return '加强灯泡：根据稀有度不同获得不同范围的照明';
                }
            case '电池优化':
                switch (rarity) {
                    case 'common': return '电池优化：头灯电池能量上限增加100%后无消耗自动填满';
                    case 'uncommon': return '电池优化：头灯电池能量上限增加150%后无消耗自动填满';
                    case 'rare': return '电池优化：头灯电池能量上限增加300%后无消耗自动填满';
                    case 'epic': return '电池优化：头灯电池能量上限增加600%后无消耗自动填满，且获得自动填满的电池进入背包';
                    default: return '电池优化：根据稀有度不同获得不同时间的电池续航';
                }
            case '副产物增强':
                switch (rarity) {
                    case 'common': return '副产物增强：10%获得下一级矿物的副产物几率';
                    case 'uncommon': return '副产物增强：15%获得下一级矿物的副产物几率';
                    case 'rare': return '副产物增强：30%获得下一级矿物的副产物几率';
                    case 'epic': return '副产物增强：60%获得下一级矿物的副产物几率，且5%几率获得下两级的副产物';
                    default: return '副产物增强：根据稀有度不同获得不同概率的副产物';
                }
            case '超载照明':
                switch (rarity) {
                    case 'common': return '超载照明：消耗电量增加100%后，所得矿物数量乘以消耗电量数量';
                    case 'uncommon': return '超载照明：消耗电量增加200%后，所得矿物数量乘以消耗电量数量';
                    case 'rare': return '超载照明：消耗电量增加400%后，所得矿物数量乘以消耗电量数量';
                    case 'epic': return '超载照明：消耗电量增加800%后，所得矿物数量乘以消耗电量数量，且返还一个史诗级超载照明插片';
                    default: return '超载照明：根据稀有度不同获得不同时间的超亮照明';
                }
            case '幸运磁铁':
                switch (rarity) {
                    case 'common': return '幸运磁铁：10%几率获得铁矿';
                    case 'uncommon': return '幸运磁铁：20%几率获得钴矿';
                    case 'rare': return '幸运磁铁：40%几率获得镍矿';
                    case 'epic': return '幸运磁铁：80%几率获得铝矿，且必得一个磁铁';
                    default: return '幸运磁铁：根据稀有度不同获得不同概率的磁铁效果';
                }
            default:
                return `${slotRarityNames[rarity]}头灯插片`;
        }
    } else {
        return `${slotRarityNames[rarity]}效果`;
    }
}

// 获取采矿锄插片效果描述
function getPickaxeSlotEffect(rarity) {
    let itemConversionDesc = '';
    let chainMiningDesc = '';
    let goldExpDesc = '';
    let fuelSurpriseDesc = '';
    let fragmentRecoveryDesc = '';
    
    switch (rarity) {
        case 'common':
            itemConversionDesc = '石矿、煤矿直接变成成品（石灰、煤炭）';
            chainMiningDesc = '获得上一个等级的矿物（不包括副产物），如果本次采集是最低级矿物则失效';
            goldExpDesc = '获得1倍矿物价值金币基数的经验';
            fuelSurpriseDesc = '获得总数5个（比例随机电池或者燃料）随机燃料';
            fragmentRecoveryDesc = '获得1个插片碎片';
            break;
        case 'uncommon':
            itemConversionDesc = '石矿、煤矿、银矿直接变成成品（石灰、煤炭、银质粉末）';
            chainMiningDesc = '获得上一个等级的矿物（包括副产物），如果本次采集是最低级矿物则失效';
            goldExpDesc = '获得2倍矿物价值金币基数的经验';
            fuelSurpriseDesc = '获得总数10个（比例随机电池或者燃料）随机燃料';
            fragmentRecoveryDesc = '获得2个插片碎片';
            break;
        case 'rare':
            itemConversionDesc = '石矿、煤矿、银矿、白金矿、金矿直接变成成品（石灰、煤炭、银质粉末、白金粉末、金砖）';
            chainMiningDesc = '获得上一个等级的矿物（不包括副产物），和下一个等级的矿物（不包括副产物）。如果本次采集是最低级矿物则只获得下一等级矿物（不包括副产物）；如果本次采集的是最高级矿物则只获得上一级矿物（不包括副产物）';
            goldExpDesc = '获得4倍矿物价值金币基数的经验';
            fuelSurpriseDesc = '获得总数20个（比例随机电池或者燃料）随机燃料';
            fragmentRecoveryDesc = '获得4个插片碎片';
            break;
        case 'epic':
            itemConversionDesc = '石矿、煤矿、银矿、白金矿、金矿、水晶矿直接变成成品（石灰、煤炭、银质粉末、白金粉末、金砖、水晶簇），且产出翻倍';
            chainMiningDesc = '获得上一个等级的矿物（包括副产物），和下一个等级的矿物（包括副产物）。如果本次采集是最低级矿物则只获得下一等级矿物（包括副产物）；如果本次采集的是最高级矿物则只获得上一级矿物（包括副产物），且当前采集矿物的副产品翻倍';
            goldExpDesc = '获得8倍矿物价值金币基数的经验，雇佣的矿工1分钟内所得物增加100%';
            fuelSurpriseDesc = '获得总数50个（比例随机电池或者燃料）随机燃料，且必定获得一个扎啤';
            fragmentRecoveryDesc = '获得8个插片碎片，5%几率获得一个随机非传说级非碎片回收插片';
            break;
    }
    
    return `采矿锄插片效果：
- 成品转化：${itemConversionDesc}
- 连锁采矿：${chainMiningDesc}
- 金币经验：${goldExpDesc}
- 燃料惊喜：${fuelSurpriseDesc}
- 碎片回收：${fragmentRecoveryDesc}`;
}

// 获取矿车插片效果描述
function getCartSlotEffect(rarity) {
    let autoTransportDesc = '';
    let capacityDoubleDesc = '';
    let fuelCritDesc = '';
    let compressedFuelDesc = '';
    let onSitePurchaseDesc = '';
    
    switch (rarity) {
        case 'common':
            autoTransportDesc = '无燃料运行时间30秒冷却30秒';
            capacityDoubleDesc = '当前采集的150%';
            fuelCritDesc = '消耗燃料增加100%后，所得矿物数量乘以消耗燃料数量';
            compressedFuelDesc = '油箱上限加100%后，无消耗自动填满';
            onSitePurchaseDesc = '现场出售产出矿物收益加100%';
            break;
        case 'uncommon':
            autoTransportDesc = '无燃料运行时间60秒冷却25秒';
            capacityDoubleDesc = '当前采集的200%';
            fuelCritDesc = '消耗燃料增加200%后，所得矿物数量乘以消耗燃料数量';
            compressedFuelDesc = '油箱上限加150%后，无消耗自动填满';
            onSitePurchaseDesc = '现场出售产出矿物收益加150%';
            break;
        case 'rare':
            autoTransportDesc = '无燃料运行时间90秒冷却20秒';
            capacityDoubleDesc = '当前采集的400%';
            fuelCritDesc = '消耗燃料增加400%后，所得矿物数量乘以消耗燃料数量';
            compressedFuelDesc = '油箱上限加300%后，无消耗自动填满';
            onSitePurchaseDesc = '现场出售产出矿物收益加200%';
            break;
        case 'epic':
            autoTransportDesc = '无燃料运行时间180秒冷却15秒，且必出一个副产物';
            capacityDoubleDesc = '当前采集的800%，且不消耗所得矿物立即获得一次金币';
            fuelCritDesc = '消耗燃料增加800%后，所得矿物数量乘以消耗燃料数量，且返还一个史诗级燃料暴击插片';
            compressedFuelDesc = '油箱上限加600%后，无消耗自动填满，且获得自动填满的燃料进入背包';
            onSitePurchaseDesc = '现场出售产出矿物收益加400%，且5%几率获得一个随机的工具等级提升券';
            break;
    }
    
    return `矿车插片效果：
- 自动运输：${autoTransportDesc}
- 运力翻倍：${capacityDoubleDesc}
- 燃料暴击：${fuelCritDesc}
- 压缩燃料：${compressedFuelDesc}
- 现场收购：${onSitePurchaseDesc}`;
}

// 获取头灯插片效果描述
function getHeadlightSlotEffect(rarity) {
    let strengthenBulbDesc = '';
    let batteryOptimizationDesc = '';
    let byproductEnhancementDesc = '';
    let overloadLightingDesc = '';
    let luckyMagnetDesc = '';
    
    switch (rarity) {
        case 'common':
            strengthenBulbDesc = '头灯数据加10%概率';
            batteryOptimizationDesc = '头灯电池能量上限增加100%后无消耗自动填满';
            byproductEnhancementDesc = '10%获得下一级矿物的副产物几率';
            overloadLightingDesc = '消耗电量增加100%后，所得矿物数量乘以消耗电量数量';
            luckyMagnetDesc = '10%几率获得铁矿';
            break;
        case 'uncommon':
            strengthenBulbDesc = '头灯数据加20%概率';
            batteryOptimizationDesc = '头灯电池能量上限增加150%后无消耗自动填满';
            byproductEnhancementDesc = '15%获得下一级矿物的副产物几率';
            overloadLightingDesc = '消耗电量增加200%后，所得矿物数量乘以消耗电量数量';
            luckyMagnetDesc = '20%几率获得钴矿';
            break;
        case 'rare':
            strengthenBulbDesc = '头灯数据加40%概率';
            batteryOptimizationDesc = '头灯电池能量上限增加300%后无消耗自动填满';
            byproductEnhancementDesc = '30%获得下一级矿物的副产物几率';
            overloadLightingDesc = '消耗电量增加400%后，所得矿物数量乘以消耗电量数量';
            luckyMagnetDesc = '40%几率获得镍矿';
            break;
        case 'epic':
            strengthenBulbDesc = '头灯数据加80%概率，且使获得的物品翻倍';
            batteryOptimizationDesc = '头灯电池能量上限增加600%后无消耗自动填满，且获得自动填满的电池进入背包';
            byproductEnhancementDesc = '60%获得下一级矿物的副产物几率，且5%几率获得下两级的副产物';
            overloadLightingDesc = '消耗电量增加800%后，所得矿物数量乘以消耗电量数量，且返还一个史诗级超载照明插片';
            luckyMagnetDesc = '80%几率获得铝矿，且必得一个磁铁';
            break;
    }
    
    return `头灯插片效果：
- 加强灯泡：${strengthenBulbDesc}
- 电池优化：${batteryOptimizationDesc}
- 副产增强：${byproductEnhancementDesc}
- 超载照明：${overloadLightingDesc}
- 幸运磁铁：${luckyMagnetDesc}`;
}

// 中文效果名称到英文效果类型的映射
const effectNameToTypeMap = {
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

// 应用工具插片效果
function applyToolSlotEffects(mineral, baseAmount) {
    let adjustedAmount = baseAmount;
    let effects = {
        itemConversion: [], // 成品转化效果
        chainMining: [], // 连锁采矿效果
        goldExp: [], // 金币经验效果
        fuelSurprise: [], // 燃料惊喜效果
        fragmentRecovery: [], // 碎片回收效果
        autoTransport: [], // 自动运输效果
        capacityDouble: [], // 运力翻倍效果
        fuelCrit: [], // 燃料暴击效果
        compressedFuel: [], // 压缩燃料效果
        onSitePurchase: [], // 现场收购效果
        strengthenBulb: [], // 加强灯泡效果
        batteryOptimization: [], // 电池优化效果
        byproductEnhancement: [], // 副产物增强效果
        overloadLighting: [], // 超载照明效果
        luckyMagnet: [] // 幸运磁铁效果
    };
    
    // 收集所有装备的插片效果
    const allSlots = [
        ...gameData.tools.pickaxe.slots,
        ...gameData.tools.cart.slots,
        ...gameData.tools.headlight.slots
    ].filter(slot => slot !== null);
    
    allSlots.forEach(slot => {
        // 根据插片的实际效果类型添加相应的效果
        const effectType = effectNameToTypeMap[slot.effect] || slot.effect;
        
        // 检查效果类型是否存在于effects对象中
        if (effects[effectType] !== undefined) {
            effects[effectType].push({
                rarity: slot.rarity,
                effect: slot.effect
            });
        }
        
        // 对于采矿锄和矿车插片，增加采矿数量
        const slotType = getSlotType(slot.fullName);
        if (slotType === 'pickaxe' || slotType === 'cart') {
            adjustedAmount += getSlotBonus(slot.rarity);
        }
    });
    
    return {
        adjustedAmount: Math.max(1, adjustedAmount),
        effects: effects
    };
}

// 根据插片稀有度获取基础加成
function getSlotBonus(rarity) {
    switch (rarity) {
        case 'common':
            return 0;
        case 'uncommon':
            return 1;
        case 'rare':
            return 2;
        case 'epic':
            return 3;
        default:
            return 0;
    }
}

// 将矿物转化为成品
function convertMineralToFinishedProduct(mineralName, rarity) {
    switch (mineralName) {
        case '石矿':
            return '石灰';
        case '煤矿':
            return '煤炭';
        case '银矿':
            if (rarity === 'uncommon' || rarity === 'rare' || rarity === 'epic') {
                return '银质粉末';
            }
            return mineralName;
        case '白金矿':
            if (rarity === 'rare' || rarity === 'epic') {
                return '白金粉末';
            }
            return mineralName;
        case '金矿':
            if (rarity === 'rare' || rarity === 'epic') {
                return '金砖';
            }
            return mineralName;
        case '水晶矿':
            if (rarity === 'epic') {
                return '水晶簇';
            }
            return mineralName;
        default:
            return mineralName;
    }
}

// 初始化合成插片界面
function initCombineSlotsUI() {
    const slot1Select = document.getElementById('combine-slot-1');
    const slot2Select = document.getElementById('combine-slot-2');
    
    if (!slot1Select || !slot2Select) return;
    
    // 获取玩家背包中的所有插片
    const allSlots = getAllSlots();
    
    // 清空现有选项
    slot1Select.innerHTML = '';
    slot2Select.innerHTML = '';
    
    // 添加默认选项
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '请选择插片';
    slot1Select.appendChild(defaultOption.cloneNode(true));
    slot2Select.appendChild(defaultOption.cloneNode(true));
    
    // 添加插片选项
    allSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot.fullName;
        const slotName = getSlotName(slot.baseName);
        option.textContent = `${slotName} (${slotRarityNames[slot.rarity]}) - ${slot.count}个`;
        slot1Select.appendChild(option.cloneNode(true));
        slot2Select.appendChild(option.cloneNode(true));
    });
}

// 更新合成信息
function updateCombineInfo() {
    const slot1Select = document.getElementById('combine-slot-1');
    const slot2Select = document.getElementById('combine-slot-2');
    const combineDetails = document.getElementById('combine-details');
    
    if (!slot1Select || !slot2Select || !combineDetails) return;
    
    const slot1 = slot1Select.value;
    const slot2 = slot2Select.value;
    
    if (!slot1 || !slot2) {
        combineDetails.innerHTML = '请选择两个插片查看合成信息';
        return;
    }
    
    const slot1Info = getSlotBaseAndRarity(slot1);
    const slot2Info = getSlotBaseAndRarity(slot2);
    
    const slot1Type = getSlotType(slot1);
    const slot2Type = getSlotType(slot2);
    
    if (slot1Type !== slot2Type) {
        combineDetails.innerHTML = '<p style="color: red;">只能合成同类型的插片！</p>';
        return;
    }
    
    const slot1Name = getSlotName(slot1Info.baseName);
    
    // 获取当前稀有度名称
    const currentRarityName = slotRarityNames[slot1Info.rarity];
    
    // 获取稀有度顺序
    const slotRarities = window.slotRarities.map(rarity => rarity.id);
    const currentRarityIndex = slotRarities.indexOf(slot1Info.rarity);
    
    // 计算可能的合成结果
    let nextRarityName = '达到最高稀有度';
    let nextNextRarityName = '达到最高稀有度';
    
    if (currentRarityIndex < slotRarities.length - 1) {
        nextRarityName = slotRarityNames[slotRarities[currentRarityIndex + 1]];
    }
    
    if (currentRarityIndex < slotRarities.length - 2) {
        nextNextRarityName = slotRarityNames[slotRarities[currentRarityIndex + 2]];
    }
    
    combineDetails.innerHTML = `
        <div class="combine-preview">
            <p>合成预览：</p>
            <div style="margin: 10px 0;">
                <strong>消耗：</strong>${slot1Name} x 2
            </div>
            <div style="margin: 10px 0;">
                <strong>当前稀有度：</strong>${currentRarityName}
            </div>
            <div style="margin: 10px 0;">
                <strong>可能的稀有度结果：</strong>
                <ul>
                    <li style="color: #4CAF50;">1%概率：提升2级稀有度 → ${nextNextRarityName}</li>
                    <li style="color: #2196F3;">50%概率：提升1级稀有度 → ${nextRarityName}</li>
                    <li style="color: #FF9800;">49%概率：保持当前稀有度 → ${currentRarityName}</li>
                </ul>
            </div>
            <div style="margin: 10px 0;">
                <strong>效果变化可能性：</strong>
                <ul>
                    <li>30%概率：随机继承原插片的效果之一</li>
                    <li>30%概率：获得全新随机效果</li>
                    <li>25%概率：随机选择原效果之一</li>
                    <li>15%概率：混合两个原效果（如果不同）</li>
                </ul>
            </div>
            <div style="margin: 10px 0;">
                <strong>稀有度等级：</strong>普通 → 稀有 → 史诗 → 传说
            </div>
            <div style="margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
                <strong>合成说明：</strong>
                <p>将两个相同类型和稀有度的插片合成为一个新的插片，有机会提升稀有度。</p>
                <p>合成后的插片将获得随机效果变化，增加游戏多样性。</p>
            </div>
        </div>
    `;
}

// 执行插片合成
function combineSlots() {
    // 显示加载状态
    const loadingElement = document.getElementById('combine-loading');
    const progressElement = document.getElementById('combine-progress');
    const buttonElement = document.getElementById('confirm-combine-slots');
    
    if (loadingElement && progressElement && buttonElement) {
        loadingElement.style.display = 'flex';
        progressElement.style.width = '0%';
        buttonElement.disabled = true;
        buttonElement.style.opacity = '0.7';
    }
    
    const slot1Select = document.getElementById('combine-slot-1');
    const slot2Select = document.getElementById('combine-slot-2');
    
    if (!slot1Select || !slot2Select) {
        // 隐藏加载状态
        if (loadingElement && buttonElement) {
            loadingElement.style.display = 'none';
            buttonElement.disabled = false;
            buttonElement.style.opacity = '1';
        }
        return;
    }
    
    const slot1 = slot1Select.value;
    const slot2 = slot2Select.value;
    
    if (!slot1 || !slot2) {
        addMessage('请选择两个插片进行合成！');
        updateMessages();
        // 隐藏加载状态
        if (loadingElement && buttonElement) {
            loadingElement.style.display = 'none';
            buttonElement.disabled = false;
            buttonElement.style.opacity = '1';
        }
        return;
    }
    
    // 更新进度
    if (progressElement) {
        progressElement.style.width = '20%';
    }
    
    const slot1Info = getSlotBaseAndRarity(slot1);
    const slot2Info = getSlotBaseAndRarity(slot2);
    
    const slot1Type = getSlotType(slot1);
    const slot2Type = getSlotType(slot2);
    
    if (slot1Type !== slot2Type) {
        addMessage('只能合成同类型的插片！');
        updateMessages();
        // 隐藏加载状态
        if (loadingElement && buttonElement) {
            loadingElement.style.display = 'none';
            buttonElement.disabled = false;
            buttonElement.style.opacity = '1';
        }
        return;
    }
    
    // 更新进度
    if (progressElement) {
        progressElement.style.width = '40%';
    }
    
    // 检查两个插片是否是同稀有度，3级以上合成等级允许跨稀有度合成
    if (slot1Info.rarity !== slot2Info.rarity) {
        const requiredLevel = 3;
        if (gameData.slotCrafting.level < requiredLevel) {
            addMessage(`跨稀有度合成需要制作合成插片等级${requiredLevel}级以上解锁！`);
            updateMessages();
            // 隐藏加载状态
            if (loadingElement && buttonElement) {
                loadingElement.style.display = 'none';
                buttonElement.disabled = false;
                buttonElement.style.opacity = '1';
            }
            return;
        }
        // 合成等级足够，允许跨稀有度合成
    }
    
    // 更新进度
    if (progressElement) {
        progressElement.style.width = '50%';
    }
    
    // 检查背包中是否有这两个插片
    if (!gameData.backpack.items[slot1] || gameData.backpack.items[slot1] <= 0) {
        addMessage('插片1已不足！');
        updateMessages();
        initCombineSlotsUI(); // 重新初始化UI
        // 隐藏加载状态
        if (loadingElement && buttonElement) {
            loadingElement.style.display = 'none';
            buttonElement.disabled = false;
            buttonElement.style.opacity = '1';
        }
        return;
    }
    if (!gameData.backpack.items[slot2] || gameData.backpack.items[slot2] <= 0) {
        addMessage('插片2已不足！');
        updateMessages();
        initCombineSlotsUI(); // 重新初始化UI
        // 隐藏加载状态
        if (loadingElement && buttonElement) {
            loadingElement.style.display = 'none';
            buttonElement.disabled = false;
            buttonElement.style.opacity = '1';
        }
        return;
    }
    
    // 更新进度
    if (progressElement) {
        progressElement.style.width = '60%';
    }
    
    // 消耗插片
    gameData.backpack.items[slot1]--;
    if (gameData.backpack.items[slot1] <= 0) {
        delete gameData.backpack.items[slot1];
    }
    
    gameData.backpack.items[slot2]--;
    if (gameData.backpack.items[slot2] <= 0) {
        delete gameData.backpack.items[slot2];
    }
    
    // 更新进度
    if (progressElement) {
        progressElement.style.width = '70%';
    }
    
    // 确定基础插片类型
    let baseSlotName;
    switch (slot1Type) {
        case 'base':
            baseSlotName = 'toolSlot1';
            break;
        case 'headlight':
            baseSlotName = 'headlightSlot';
            break;
        case 'cart':
            baseSlotName = 'cartSlot';
            break;
        case 'pickaxe':
            baseSlotName = 'pickaxeSlot';
            break;
        default:
            baseSlotName = slot1Info.baseName;
    }
    
    // 更新进度
    if (progressElement) {
        progressElement.style.width = '80%';
    }
    
    // 获取插片稀有度数组
    const slotRarities = window.slotRarities.map(rarity => rarity.id);
    
    // 确定当前稀有度
    const currentRarityIndex = slotRarities.indexOf(slot1Info.rarity);
    
    // 生成随机数决定合成结果（还原原始设定）
    const random = Math.random();
    let newRarityIndex;
    
    if (random < 0.01) {
        // 1%概率：提升2级稀有度
        newRarityIndex = Math.min(currentRarityIndex + 2, slotRarities.length - 1);
    } else if (random < 0.51) {
        // 50%概率：提升1级稀有度
        newRarityIndex = Math.min(currentRarityIndex + 1, slotRarities.length - 1);
    } else {
        // 49%概率：同稀有度
        newRarityIndex = currentRarityIndex;
    }
    
    const newRarity = slotRarities[newRarityIndex];
    
    // 更新进度
    if (progressElement) {
        progressElement.style.width = '90%';
    }
    
    // 增强效果随机性：从多种效果来源中随机选择
    let finalEffect;
    const effectRandom = Math.random();
    
    // 获取该类型插片的所有可能效果
    let allPossibleEffects = [];
    if (window.slotEffects && window.slotEffects[slot1Type]) {
        allPossibleEffects = window.slotEffects[slot1Type].map(effect => effect.id);
    }
    
    // 确保至少有效果可选
    if (allPossibleEffects.length === 0) {
        allPossibleEffects = [slot1Info.effect, slot2Info.effect].filter(Boolean);
    }
    
    // 效果选择机制
    if (effectRandom < 0.3) {
        // 30%概率：随机选择原插片的效果之一
        const possibleEffects = [slot1Info.effect, slot2Info.effect].filter(Boolean);
        finalEffect = possibleEffects[Math.floor(Math.random() * possibleEffects.length)];
    } else if (effectRandom < 0.6) {
        // 30%概率：随机选择一个全新的效果（从该类型插片的所有可能效果中）
        finalEffect = allPossibleEffects[Math.floor(Math.random() * allPossibleEffects.length)];
    } else if (effectRandom < 0.85) {
        // 25%概率：随机选择两个原效果中的一个
        const possibleEffects = [slot1Info.effect, slot2Info.effect].filter(Boolean);
        finalEffect = possibleEffects[Math.floor(Math.random() * possibleEffects.length)];
    } else {
        // 15%概率：混合两个原效果（如果它们不同）
        if (slot1Info.effect && slot2Info.effect && slot1Info.effect !== slot2Info.effect) {
            finalEffect = `${slot1Info.effect}_${slot2Info.effect}`;
        } else {
            // 如果效果相同或其中一个为空，则随机选择一个
            const possibleEffects = [slot1Info.effect, slot2Info.effect].filter(Boolean);
            finalEffect = possibleEffects[Math.floor(Math.random() * possibleEffects.length)];
        }
    }
    
    // 更新进度
    if (progressElement) {
        progressElement.style.width = '95%';
    }
    
    // 添加合成的插片到背包
    addSlotWithRarity(baseSlotName, newRarity, finalEffect);
    
    // 获取插片中文名称
    const slotName = baseSlotName === 'toolSlot1' ? '基础工具插片' : 
                     baseSlotName === 'headlightSlot' ? '头灯插片' :
                     baseSlotName === 'cartSlot' ? '矿车插片' :
                     baseSlotName === 'pickaxeSlot' ? '采矿锄插片' : baseSlotName;
    
    // 显示合成结果
    addMessage(`合成成功！获得了${slotRarityNames[newRarity]}${slotName}！`);
    updateMessages();
    
    // 更新UI
    updateBackpackDisplay();
    initCombineSlotsUI(); // 重新初始化合成界面
    updateCombineInfo();
    
    // 更新工具插片UI
    updateToolSlotsUI();
    updateToolSlotInfo(); // 更新插片信息，确保制作材料实时更新
    
    saveGame();
    
    // 更新进度到100%
    if (progressElement) {
        progressElement.style.width = '100%';
    }
    
    // 短暂延迟后隐藏加载状态
    setTimeout(() => {
        if (loadingElement && buttonElement) {
            loadingElement.style.display = 'none';
            buttonElement.disabled = false;
            buttonElement.style.opacity = '1';
        }
    }, 500);
}

// 更新插片信息
function updateToolSlotInfo() {
    const toolSlotType = document.getElementById('tool-slot-type')?.value;
    const quantity = parseInt(document.getElementById('tool-slot-quantity')?.value || 1);
    const toolSlotDetails = document.getElementById('tool-slot-details');
    if (!toolSlotDetails) return;
    
    // 获取配方
    const recipe = window.slotCraftingRecipes[toolSlotType];
    
    if (recipe) {
        // 计算材料需求
        let calculatedMaterials = {};
        for (const [material, baseAmount] of Object.entries(recipe.materials)) {
            calculatedMaterials[material] = baseAmount * quantity;
        }
        
        // 生成材料需求HTML
        let materialsHTML = '<ul>';
        for (const [material, amount] of Object.entries(calculatedMaterials)) {
            // 获取材料中文名称
            let materialName;
            let hasEnough;
            let ownedAmount;
            
            switch (material) {
                case 'toolSlot1':
                    materialName = '基础工具插片';
                    hasEnough = hasEnoughItem(material, amount);
                    ownedAmount = 0;
                    const itemEntries = Object.entries(gameData.backpack.items);
                    for (const [name, count] of itemEntries) {
                        const baseName = name.split('_')[0];
                        if (baseName === material) {
                            ownedAmount += count;
                        }
                    }
                    break;
                case 'headlightTicket':
                    materialName = '头灯等级提升券';
                    // 头灯等级提升券是特殊物品，存储在gameData.unlockTickets中
                    ownedAmount = gameData.unlockTickets.headlight || 0;
                    hasEnough = ownedAmount >= amount;
                    break;
                case 'cartTicket':
                    materialName = '矿车等级提升券';
                    ownedAmount = gameData.unlockTickets.cart || 0;
                    hasEnough = ownedAmount >= amount;
                    break;
                case 'pickaxeTicket':
                    materialName = '采矿锄等级提升券';
                    ownedAmount = gameData.unlockTickets.pickaxe || 0;
                    hasEnough = ownedAmount >= amount;
                    break;
                default:
                    materialName = material;
                    hasEnough = hasEnoughItem(material, amount);
                    ownedAmount = 0;
                    const defaultEntries = Object.entries(gameData.backpack.items);
                    for (const [name, count] of defaultEntries) {
                        if (name === material) {
                            ownedAmount += count;
                        }
                    }
            }
            
            materialsHTML += `<li style="color: ${hasEnough ? 'green' : 'red'}">
                ${materialName}: ${amount}个 (拥有: ${ownedAmount}个)
            </li>`;
        }
        materialsHTML += '</ul>';
        
        // 获取插片中文名称
        let toolSlotName;
        switch (toolSlotType) {
            case 'toolSlot1':
                toolSlotName = '基础工具插片';
                break;
            case 'headlightSlot':
                toolSlotName = '头灯插片';
                break;
            case 'cartSlot':
                toolSlotName = '矿车插片';
                break;
            case 'pickaxeSlot':
                toolSlotName = '采矿锄插片';
                break;
            default:
                toolSlotName = toolSlotType;
        }
        
        // 生成插片信息HTML
        toolSlotDetails.innerHTML = `
            <div class="recipe-info-item">
                <strong>${toolSlotName}</strong>
            </div>
            <div class="recipe-info-item">
                <strong>制作材料:</strong>
                ${materialsHTML}
            </div>
            <div class="recipe-info-item">
                <strong>描述:</strong> ${recipe.description}
            </div>
        `;
    } else {
        toolSlotDetails.innerHTML = '请选择一个插片类型查看详细信息';
    }
}

// 制作插片
function craftToolSlot() {
    const toolSlotType = document.getElementById('tool-slot-type')?.value;
    const quantityInput = document.getElementById('tool-slot-quantity');
    
    if (quantityInput) {
        const quantity = parseInt(quantityInput.value);
        const recipe = window.slotCraftingRecipes[toolSlotType];
        
        if (recipe) {
            // 转换插片类型为中文名称
            let toolSlotName;
            switch (toolSlotType) {
                case 'toolSlot1':
                    toolSlotName = '基础工具插片';
                    break;
                case 'headlightSlot':
                    toolSlotName = '头灯插片';
                    break;
                case 'cartSlot':
                    toolSlotName = '矿车插片';
                    break;
                case 'pickaxeSlot':
                    toolSlotName = '采矿锄插片';
                    break;
                default:
                    toolSlotName = toolSlotType;
            }
            
            // 计算实际所需材料
            let calculatedMaterials = {};
            for (const [material, baseAmount] of Object.entries(recipe.materials)) {
                calculatedMaterials[material] = baseAmount * quantity;
            }
            
            // 检查材料
            let canCraft = true;
            let missingMaterials = [];
            for (const [material, amount] of Object.entries(calculatedMaterials)) {
                if (!hasEnoughItem(material, amount)) {
                    canCraft = false;
                    // 获取材料中文名称
                    let materialName;
                    switch (material) {
                        case 'toolSlot1':
                            materialName = '基础工具插片';
                            break;
                        case 'headlightTicket':
                            materialName = '头灯等级提升券';
                            break;
                        case 'cartTicket':
                            materialName = '矿车等级提升券';
                            break;
                        case 'pickaxeTicket':
                            materialName = '采矿锄等级提升券';
                            break;
                        default:
                            materialName = material;
                    }
                    missingMaterials.push(`${materialName}: ${amount}`);
                }
            }
            
            if (canCraft) {
                // 消耗材料
                let consumeSuccess = true;
                for (const [material, amount] of Object.entries(calculatedMaterials)) {
                    if (!consumeItem(material, amount)) {
                        consumeSuccess = false;
                        break;
                    }
                }
                
                if (!consumeSuccess) {
                    addMessage(`材料不足，无法制作${toolSlotName}！`);
                    updateMessages();
                    return;
                }
                
                // 使用新的插片制作等级系统
                let craftingLevel = gameData.slotCrafting.level;
                
                // 添加制作的物品到背包
                const craftedSlots = [];
                let totalExpGained = 0;
                for (let i = 0; i < quantity; i++) {
                    // 根据合成等级决定插片稀有度
                    let rarity;
                    const random = Math.random() * 100;
                    
                    // 稀有度概率表，根据合成等级确定
                    const rarityProbabilities = {
                        1: { common: 80, uncommon: 15, rare: 5, epic: 0 },
                        2: { common: 65, uncommon: 20, rare: 10, epic: 5 },
                        3: { common: 40, uncommon: 30, rare: 20, epic: 10 },
                        4: { common: 10, uncommon: 20, rare: 30, epic: 40 },
                        5: { common: 5, uncommon: 10, rare: 20, epic: 65 },
                        6: { common: 0, uncommon: 5, rare: 15, epic: 80 }
                    };
                    
                    const probs = rarityProbabilities[craftingLevel];
                    let cumulative = 0;
                    for (const [r, prob] of Object.entries(probs)) {
                        cumulative += prob;
                        if (random < cumulative) {
                            rarity = r;
                            break;
                        }
                    }
                    
                    // 为新插片分配随机效果
                    let effect = '';
                    const slotType = getSlotType(`${toolSlotType}_${rarity}`);
                    const possibleEffects = window.slotEffectNames[slotType] || [];
                    
                    if (possibleEffects.length > 0) {
                        const randomIndex = Math.floor(Math.random() * possibleEffects.length);
                        effect = possibleEffects[randomIndex];
                    }
                    
                    // 获取稀有度中文名称
                    let rarityName;
                    switch (rarity) {
                        case 'common': rarityName = '普通'; break;
                        case 'uncommon': rarityName = '稀有'; break;
                        case 'rare': rarityName = '史诗'; break;
                        case 'epic': rarityName = '传说'; break;
                        default: rarityName = rarity;
                    }
                    
                    craftedSlots.push({ rarity: rarityName, effect: effect, rarityId: rarity });
                    addSlotWithRarity(toolSlotType, rarity, effect);
                    
                    // 获取该稀有度对应的经验值
                    const expGain = slotRarityExpRewards[rarity] || 0;
                    totalExpGained += expGain;
                }
                
                // 显示制作成功信息，包括每个插片的稀有度和效果
                let message = `${quantity}个${toolSlotName}制作成功！制作合成等级: ${craftingLevel}\n`;
                craftedSlots.forEach((slot, index) => {
                    message += `第${index + 1}个: ${slot.rarity}品质，效果: ${slot.effect}\n`;
                });
                addMessage(message);
                
                // 更新插片制作系统经验值
                gameData.slotCrafting.exp += totalExpGained;
                gameData.slotCrafting.itemsCrafted += quantity;
                
                // 检查是否可以升级
                checkSlotCraftingLevelUp();
                
                // 如果获得了经验值，显示经验获取信息
                if (totalExpGained > 0) {
                    addMessage(`获得了${totalExpGained}点插片制作经验！`);
                }
                
                updateMessages();
                updateBackpackDisplay();
                updateToolSlotInfo(); // 更新插片信息
                updateToolSlotsUI(); // 更新插片制作等级显示
                updateUI(); // 自动更新工具状态显示
                saveGame();
            } else {
                addMessage(`材料不足，无法制作${toolSlotName}！缺少: ${missingMaterials.join(', ')}`);
                updateMessages();
            }
        }
    }
}

// 合成插片
function combineToolSlots() {
    const slot1 = document.getElementById('combine-slot-1')?.value;
    const slot2 = document.getElementById('combine-slot-2')?.value;
    
    if (!slot1 || !slot2 || slot1 === slot2) {
        addMessage('请选择两个不同的插片进行合成！');
        updateMessages();
        return;
    }
    
    // 解析两个插片的信息
    const slotInfo1 = getSlotBaseAndRarity(slot1);
    const slotInfo2 = getSlotBaseAndRarity(slot2);
    
    // 检查是否为同类型插片
    if (slotInfo1.baseName !== slotInfo2.baseName) {
        addMessage('只能合成同类型的插片！');
        updateMessages();
        return;
    }
    
    // 检查背包中是否有这两个插片
    if (!gameData.backpack.items[slot1] || gameData.backpack.items[slot1] < 1 ||
        !gameData.backpack.items[slot2] || gameData.backpack.items[slot2] < 1) {
        addMessage('背包中没有足够的插片进行合成！');
        updateMessages();
        return;
    }
    
    // 使用新的插片制作等级系统
    const craftingLevel = gameData.slotCrafting.level;
    
    // 消耗两个插片
    consumeItem(slot1, 1);
    consumeItem(slot2, 1);
    
    // 2-in-1合成，生成一个新的插片，稀有度提升或保持不变
    // 合成规则：根据两个插片的稀有度和合成等级决定新插片的稀有度
    const rarityOrder = ['common', 'uncommon', 'rare', 'epic'];
    const rarity1Index = rarityOrder.indexOf(slotInfo1.rarity);
    const rarity2Index = rarityOrder.indexOf(slotInfo2.rarity);
    const minRarityIndex = Math.min(rarity1Index, rarity2Index);
    const maxRarityIndex = Math.max(rarity1Index, rarity2Index);
    
    // 合成稀有度概率
    let newRarity;
    const random = Math.random() * 100;
    
    // 基础概率表
    const rarityUpProbabilities = {
        1: { same: 80, up1: 20, up2: 0, up3: 0 },
        2: { same: 70, up1: 25, up2: 5, up3: 0 },
        3: { same: 60, up1: 30, up2: 10, up3: 0 },
        4: { same: 50, up1: 35, up2: 12, up3: 3 },
        5: { same: 40, up1: 35, up2: 20, up3: 5 },
        6: { same: 30, up1: 35, up2: 25, up3: 10 }
    };
    
    const probs = rarityUpProbabilities[craftingLevel];
    let cumulative = 0;
    
    if (random < cumulative + probs.same) {
        // 保持最高稀有度
        newRarity = rarityOrder[maxRarityIndex];
    } else {
        cumulative += probs.same;
        if (random < cumulative + probs.up1) {
            // 提升1个稀有度
            newRarity = rarityOrder[Math.min(maxRarityIndex + 1, rarityOrder.length - 1)];
        } else {
            cumulative += probs.up1;
            if (random < cumulative + probs.up2) {
                // 提升2个稀有度
                newRarity = rarityOrder[Math.min(maxRarityIndex + 2, rarityOrder.length - 1)];
            } else {
                cumulative += probs.up2;
                // 提升3个稀有度
                newRarity = rarityOrder[Math.min(maxRarityIndex + 3, rarityOrder.length - 1)];
            }
        }
    }
    
    // 为新插片分配随机效果
    const baseSlotName = slotInfo1.baseName;
    let effect = '';
    const slotType = getSlotType(`${baseSlotName}_${newRarity}`);
    const possibleEffects = window.slotEffectNames[slotType] || [];
    
    if (possibleEffects.length > 0) {
        const randomIndex = Math.floor(Math.random() * possibleEffects.length);
        effect = possibleEffects[randomIndex];
    }
    
    // 添加新插片到背包
    addSlotWithRarity(baseSlotName, newRarity, effect);
    
    // 获取该稀有度对应的经验值
    const expGain = slotRarityExpRewards[newRarity] || 0;
    
    // 更新插片制作系统经验值
    gameData.slotCrafting.exp += expGain;
    gameData.slotCrafting.itemsCrafted += 1;
    
    // 检查是否可以升级
    checkSlotCraftingLevelUp();
    
    // 获取稀有度中文名称
    const newRarityName = getRarityName(newRarity);
    
    // 显示合成成功信息
    addMessage(`插片合成成功！生成了一个${newRarityName}品质的${getSlotType(baseSlotName)}插片！`);
    
    // 如果获得了经验值，显示经验获取信息
    if (expGain > 0) {
        addMessage(`获得了${expGain}点插片制作经验！`);
    }
    
    // 更新UI
    updateMessages();
    updateBackpackDisplay();
    updateToolSlotInfo(); // 更新插片信息
    updateToolSlotsUI(); // 更新插片制作等级显示
    updateUI(); // 更新工具状态显示
    saveGame();
}

// 启动任务刷新定时器
function startQuestRefreshTimer() {
    // 每10秒检查一次任务刷新
    setInterval(() => {
        if (gameData.questHall.unlocked) {
            const now = Date.now();
            if (now - gameData.questHall.lastRefreshTime >= gameData.questHall.refreshInterval) {
                refreshQuests();
                updateQuestUI();
            }
        }
    }, 10000);
}

// 启动任务刷新倒计时定时器
function startQuestCountdownTimer() {
    // 清除现有的定时器
    if (questRefreshCountdownInterval) {
        clearInterval(questRefreshCountdownInterval);
    }
    
    // 每秒更新一次任务大厅UI，实现实时倒计时效果
    questRefreshCountdownInterval = setInterval(() => {
        if (gameData.questHall.unlocked) {
            updateQuestUI();
        }
    }, 1000);
}

// 自动挖矿变量
let autoMiningInterval = null;

// 启动自动挖矿
function startAutoMining() {
    if (!gameData.minersGuild.autoMining.enabled) {
        addMessage('自动挖矿未启用！');
        return;
    }
    
    // 清除现有的定时器
    if (autoMiningInterval) {
        clearInterval(autoMiningInterval);
        addMessage('已清除现有定时器！');
    }
    
    // 添加调试信息
    const workingMiners = gameData.minersGuild.miners.filter(miner => miner.working && miner.assignedMineral);
    addMessage(`启动自动挖矿，当前有${workingMiners.length}个工作中的矿工！`);
    
    // 初始化lastMiningTime为当前时间，不立即执行挖矿操作，等待定时器触发
    gameData.minersGuild.autoMining.lastMiningTime = Date.now();
    saveGame();
    
    // 设置20秒的定时器
    const interval = gameData.minersGuild.autoMining.interval * 1000;
    addMessage(`设置${interval/1000}秒的定时器！`);
    autoMiningInterval = setInterval(() => {
        addMessage('定时器触发，执行挖矿操作！');
        performAutoMining();
        gameData.minersGuild.autoMining.lastMiningTime = Date.now();
        saveGame();
    }, interval);
    
    addMessage('自动挖矿已启动！');
}

// 切换挖矿状态
function toggleMining() {
    // 检查是否有已派遣的矿工
    const assignedMiners = gameData.minersGuild.miners.filter(miner => miner.assignedMineral);
    
    // 如果当前没有启用自动挖矿
    if (!gameData.minersGuild.autoMining.enabled) {
        if (assignedMiners.length === 0) {
            addMessage('没有已派遣的矿工，请先派遣矿工到矿场！');
            return;
        }
        
        // 设置所有已派遣矿工的工作状态
        gameData.minersGuild.miners.forEach(miner => {
            if (miner.assignedMineral) {
                miner.working = true;
            }
        });
        
        // 启用自动挖矿
        gameData.minersGuild.autoMining.enabled = true;
        
        // 设置为20秒一次
        gameData.minersGuild.autoMining.interval = 20;
        
        // 初始化lastMiningTime为当前时间，不立即执行，而是20秒后执行
        gameData.minersGuild.autoMining.lastMiningTime = Date.now();
        
        // 启动自动挖矿定时器
        startAutoMining();
        
        addMessage('所有已派遣的矿工开始挖矿，每20秒自动执行一次！');
    } else {
        // 停止自动挖矿
        stopAutoMining();
    }
    
    saveGame();
    
    // 更新按钮文字
    const toggleBtn = document.getElementById('mining-toggle-btn');
    if (toggleBtn) {
        toggleBtn.textContent = gameData.minersGuild.autoMining.enabled ? '全部停止' : '开始挖矿';
    }
    
    // 更新矿工列表显示
    const minersList = document.getElementById('miners-list');
    if (minersList) {
        minersList.innerHTML = generateMinersList();
    }
}

// 开始单个矿工工作
function startMinerWork(index) {
    const miner = gameData.minersGuild.miners[index];
    if (!miner) return;
    
    // 如果矿工没有派遣矿物，提示用户
    if (!miner.assignedMineral) {
        addMessage(`${miner.name} 还没有派遣到矿场，请先派遣矿工！`);
        return;
    }
    
    miner.working = true;
    addMessage(`${miner.name} 开始工作！`);
    saveGame();
    
    // 如果自动挖矿未启用，启动自动挖矿
    if (!gameData.minersGuild.autoMining.enabled) {
        gameData.minersGuild.autoMining.enabled = true;
        gameData.minersGuild.autoMining.interval = 20;
        gameData.minersGuild.autoMining.lastMiningTime = Date.now();
        startAutoMining();
    }
    
    // 更新矿工列表显示
    const minersList = document.getElementById('miners-list');
    if (minersList) {
        minersList.innerHTML = generateMinersList();
    }
}

// 停止单个矿工工作
function stopMinerWork(index) {
    const miner = gameData.minersGuild.miners[index];
    if (!miner) return;
    
    miner.working = false;
    addMessage(`${miner.name} 已停止工作！`);
    saveGame();
    
    // 检查是否还有工作中的矿工
    const workingMiners = gameData.minersGuild.miners.filter(miner => miner.working);
    if (workingMiners.length === 0) {
        // 没有工作中的矿工，停止自动挖矿
        stopAutoMining();
    }
    
    // 更新矿工列表显示
    const minersList = document.getElementById('miners-list');
    if (minersList) {
        minersList.innerHTML = generateMinersList();
    }
}

// 停止自动挖矿
function stopAutoMining() {
    if (autoMiningInterval) {
        clearInterval(autoMiningInterval);
        autoMiningInterval = null;
    }
    gameData.minersGuild.autoMining.enabled = false;
    
    // 停止所有矿工的工作状态
    gameData.minersGuild.miners.forEach(miner => {
        miner.working = false;
    });
    
    addMessage('自动挖矿已停止！');
    saveGame();
    
    // 更新矿工列表显示
    const minersList = document.getElementById('miners-list');
    if (minersList) {
        minersList.innerHTML = generateMinersList();
    }
}

// 执行自动挖矿
function performAutoMining() {
    addMessage('开始执行自动挖矿！');
    
    // 获取所有正在工作的矿工
    const workingMiners = gameData.minersGuild.miners.filter(miner => miner.working && miner.assignedMineral);
    
    addMessage(`找到${workingMiners.length}个工作中的矿工！`);
    
    if (workingMiners.length === 0) {
        addMessage('没有工作中的矿工，自动挖矿结束！');
        return;
    }
    
    // 遍历所有工作中的矿工
    workingMiners.forEach(miner => {
        addMessage(`正在处理矿工：${miner.name}`);
        
        const mineralName = miner.assignedMineral;
        addMessage(`矿工${miner.name}的分配矿物：${mineralName}`);
        
        const mineral = minerals.find(m => m.name === mineralName);
        
        if (!mineral) {
            addMessage(`找不到矿物${mineralName}，跳过该矿工！`);
            return;
        }
        
        // 检查玩家等级是否足够
        if (gameData.player.level < mineral.minLevel) {
            addMessage(`玩家等级${gameData.player.level}低于矿物${mineralName}的需求等级${mineral.minLevel}，跳过该矿工！`);
            return;
        }
        
        // 计算挖矿奖励
        addMessage(`计算挖矿奖励：矿物${mineralName}，矿工等级${miner.level}`);
        const rewards = calculateMiningRewards(mineral, miner);
        addMessage(`挖矿奖励：${JSON.stringify(rewards)}`);
        
        // 应用矿工佣金
        applyMinerCommission(rewards);
        addMessage(`应用佣金后奖励：${JSON.stringify(rewards)}`);
        
        // 将奖励存入协会仓库
        addMessage(`将奖励存入协会仓库！`);
        for (const [item, amount] of Object.entries(rewards.items)) {
            if (!gameData.minersGuild.storage) {
                gameData.minersGuild.storage = {};
            }
            if (!gameData.minersGuild.storage[item]) {
                gameData.minersGuild.storage[item] = 0;
            }
            gameData.minersGuild.storage[item] += amount;
            addMessage(`存入${amount}个${item}到协会仓库，现在仓库中有${gameData.minersGuild.storage[item]}个${item}！`);
        }
        
        // 移除矿工挖矿增加玩家经验的逻辑
        // addMessage(`玩家获得${rewards.exp}点经验！`);
        // gameData.player.exp += rewards.exp;
        
        // 确保矿工对象有exp和nextExp属性
        if (miner.exp === undefined) miner.exp = 0;
        if (miner.nextExp === undefined) miner.nextExp = 100;
        
        // 确保rewards.exp有值
        if (rewards.exp === undefined) rewards.exp = mineral.exp || 10;
        
        // 为矿工添加经验（如果经验未满）
        addMessage(`矿工${miner.name}当前经验：${miner.exp}/${miner.nextExp}，获得经验：${rewards.exp * 0.5}`);
        if (miner.exp < miner.nextExp) {
            const minerExpGain = Math.floor(rewards.exp * 0.5); // 矿工获得玩家经验的50%
            miner.exp += minerExpGain;
            addMessage(`矿工${miner.name}获得${minerExpGain}点经验，当前经验：${miner.exp}/${miner.nextExp}！`);
            if (miner.exp >= miner.nextExp) {
                if (!isBackground) addMessage(`${miner.name} 的经验已满，等待升级！`);
            }
        } else {
            addMessage(`矿工${miner.name}经验已满，等待升级！`);
        }
        
        // 更新挖矿计数
        if (!gameData.miningCount[mineralName]) {
            gameData.miningCount[mineralName] = 0;
        }
        gameData.miningCount[mineralName]++;
        
        // 检查升级
        checkLevelUp();
        
        // 更新UI
        updateUI();
        updateBackpackDisplay();
        
        // 添加消息，显示是哪个矿工进行了挖矿
        addMessage(`${miner.name} 开采获得了${rewards.items[mineralName] || 0}个${mineralName}！`);
        addMessage(`资源已存入协会仓库，请打开矿工协会界面查看和取出！`);
        
        // 无论仓库界面是否打开，都更新仓库物品显示
        updateStorageUI();
        
        // 更新消息界面
        updateMessages();
        
        // 更新仓库界面（如果仓库界面已打开）
        const storageItemsDiv = document.getElementById('storage-items');
        if (storageItemsDiv) {
            addMessage('已更新仓库界面！');
            // 直接更新仓库界面内容
            updateStorageItems();
        }
        
        // 矿工工作时随机获得物品
        // 4级矿工有5%概率获得工具插片碎片
        if (miner.level >= 4 && Math.random() < 0.05) {
            if (!gameData.minersGuild.storage['工具插片碎片']) {
                gameData.minersGuild.storage['工具插片碎片'] = 0;
            }
            gameData.minersGuild.storage['工具插片碎片'] += 1;
            addMessage(`${miner.name} 工作时随机获得了1个工具插片碎片！`);
        }
        
        // 3级矿工有5%概率获得工具等级提升券
        if (miner.level >= 3 && Math.random() < 0.05) {
            const toolTypes = ['pickaxe', 'cart', 'headlight'];
            const toolType = toolTypes[Math.floor(Math.random() * toolTypes.length)];
            if (!gameData.unlockTickets[toolType]) {
                gameData.unlockTickets[toolType] = 0;
            }
            gameData.unlockTickets[toolType] += 1;
            gameData.tools[toolType].unlockTickets += 1;
            addMessage(`${miner.name} 工作时随机获得了1张${getToolName(toolType)}等级提升券！`);
            updateUI();
            saveGame();
        }
    });
    
    addMessage('自动挖矿执行完毕！');
}

// 计算挖矿奖励
function calculateMiningRewards(mineral, miner) {
    const rewards = {
        items: {},
        exp: mineral.exp
    };
    
    // 计算基础效率
    const minerEfficiency = calculateMinerEfficiency(miner);
    
    // 按照新公式计算收获数量：数量 = (20秒 / 矿物开采基础时间 + 矿工等级) * 矿工效率，向上取整
    const baseTime = mineral.baseTime;
    const minerLevel = miner.level;
    let amount = Math.ceil((20 / baseTime + minerLevel) * minerEfficiency);
    
    // 应用双倍掉落能力（使用中文技能名称）
    if (miner.abilities.includes('双倍掉落')) {
        amount = Math.floor(amount * 2);
    }
    
    // 添加矿物本身
    rewards.items[mineral.name] = amount;
    
    // 处理副产物
    if (mineral.drops) {
        mineral.drops.forEach(drop => {
            // 应用双倍掉落能力到副产物（使用中文技能名称）
            let dropChance = drop.chance;
            if (miner.abilities.includes('双倍掉落')) {
                dropChance = Math.min(1.0, dropChance * 2);
            }
            
            if (Math.random() < dropChance) {
                if (!rewards.items[drop.name]) {
                    rewards.items[drop.name] = 0;
                }
                rewards.items[drop.name]++;
                
                // 双倍掉落能力可能让副产物也掉落多个（使用中文技能名称）
                if (miner.abilities.includes('双倍掉落') && Math.random() < 0.5) {
                    rewards.items[drop.name]++;
                }
            }
        });
    }
    
    return rewards;
}

// 应用矿工佣金
function applyMinerCommission(rewards) {
    const commissionRate = gameData.minersGuild.commissionRate;
    
    // 如果佣金率为0，直接返回
    if (commissionRate === 0) {
        return;
    }
    
    // 计算佣金
    for (const [item, amount] of Object.entries(rewards.items)) {
        const commission = Math.floor(amount * commissionRate);
        if (commission > 0) {
            rewards.items[item] = Math.max(1, amount - commission); // 确保至少剩余1个矿物
            // 这里可以添加佣金到矿工协会的逻辑
        }
    }
    
    // 经验也需要扣除佣金
    rewards.exp = Math.floor(rewards.exp * (1 - commissionRate));
}

// 切换矿工协会界面
function toggleMinersGuild() {
    const existingPanel = document.querySelector('.miners-guild-overlay');
    if (existingPanel) {
        existingPanel.remove();
        return;
    }
    
    // 确保矿工协会数据结构存在
    if (!gameData.minersGuild) {
        gameData.minersGuild = {
            unlocked: true,
            miners: [],
            storage: {},
            autoMining: {
                enabled: false,
                selectedMineral: null,
                interval: 60,
                lastMiningTime: 0
            },
            commissionRate: 0,
            maxMiners: 5,
            badgeSystem: {
                currentLevel: 0,
                maxLevel: 10,
                upgradeMaterials: [
                    { level: 1, materials: { '银质粉末': 100, '磁铁': 100 } },
                    { level: 2, materials: { '银质粉末': 150, '磁铁': 150 } },
                    { level: 3, materials: { '白金粉末': 200, '磁铁': 200 } },
                    { level: 4, materials: { '白金粉末': 250, '磁铁': 250 } },
                    { level: 5, materials: { '白金粉末': 250, '磁铁': 250, '金砖': 20 } },
                    { level: 6, materials: { '金砖': 50, 'pickaxeTicket': 10, 'cartTicket': 10, 'headlightTicket': 10 } },
                    { level: 7, materials: { '金砖': 100, 'pickaxeTicket': 50, 'cartTicket': 50, 'headlightTicket': 50 } },
                    { level: 8, materials: { '水晶簇': 100, 'toolSlot1': 150 } },
                    { level: 9, materials: { '水晶簇': 150, 'toolSlot1': 450 } },
                    { level: 10, materials: { 'forgeDelegate': true, 'magicEquipment': true } }
                ],
                efficiencyBonuses: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
            }
        };
    } else {
        // 确保badgeSystem对象存在
        if (!gameData.minersGuild.badgeSystem) {
            gameData.minersGuild.badgeSystem = {
                currentLevel: 0,
                maxLevel: 10,
                upgradeMaterials: [
                    { level: 1, materials: { '银质粉末': 100, '磁铁': 100 } },
                    { level: 2, materials: { '银质粉末': 150, '磁铁': 150 } },
                    { level: 3, materials: { '白金粉末': 200, '磁铁': 200 } },
                    { level: 4, materials: { '白金粉末': 250, '磁铁': 250 } },
                    { level: 5, materials: { '白金粉末': 250, '磁铁': 250, '金砖': 20 } },
                    { level: 6, materials: { '金砖': 50, 'pickaxeTicket': 10, 'cartTicket': 10, 'headlightTicket': 10 } },
                    { level: 7, materials: { '金砖': 100, 'pickaxeTicket': 50, 'cartTicket': 50, 'headlightTicket': 50 } },
                    { level: 8, materials: { '水晶簇': 100, 'toolSlot1': 150 } },
                    { level: 9, materials: { '水晶簇': 150, 'toolSlot1': 450 } },
                    { level: 10, materials: { 'forgeDelegate': true, 'magicEquipment': true } }
                ],
                efficiencyBonuses: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
            };
        } else {
            // 确保badgeSystem属性完整
            if (!gameData.minersGuild.badgeSystem.currentLevel) gameData.minersGuild.badgeSystem.currentLevel = 0;
            if (!gameData.minersGuild.badgeSystem.maxLevel) gameData.minersGuild.badgeSystem.maxLevel = 10;
            
            // 强制使用默认的升级材料配置
            gameData.minersGuild.badgeSystem.upgradeMaterials = [
                { level: 1, materials: { '银质粉末': 100, '磁铁': 100 } },
                { level: 2, materials: { '银质粉末': 150, '磁铁': 150 } },
                { level: 3, materials: { '白金粉末': 200, '磁铁': 200 } },
                { level: 4, materials: { '白金粉末': 250, '磁铁': 250 } },
                { level: 5, materials: { '白金粉末': 250, '磁铁': 250, '金砖': 20 } },
                { level: 6, materials: { '金砖': 50, 'pickaxeTicket': 10, 'cartTicket': 10, 'headlightTicket': 10 } },
                { level: 7, materials: { '金砖': 100, 'pickaxeTicket': 50, 'cartTicket': 50, 'headlightTicket': 50 } },
                { level: 8, materials: { '水晶簇': 100, 'toolSlot1': 150 } },
                { level: 9, materials: { '水晶簇': 150, 'toolSlot1': 450 } },
                { level: 10, materials: { 'forgeDelegate': true, 'magicEquipment': true } }
            ];
            
            // 确保efficiencyBonuses数组完整
            if (!gameData.minersGuild.badgeSystem.efficiencyBonuses || gameData.minersGuild.badgeSystem.efficiencyBonuses.length !== 11) {
                gameData.minersGuild.badgeSystem.efficiencyBonuses = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
            }
            
            // 确保currentLevel不超过maxLevel
            gameData.minersGuild.badgeSystem.currentLevel = Math.min(gameData.minersGuild.badgeSystem.currentLevel, gameData.minersGuild.badgeSystem.maxLevel);
        }
    }
    
    // 确保storage字段存在
    if (!gameData.minersGuild.storage) {
        gameData.minersGuild.storage = {};
    }
    
    // 解锁矿工协会
    gameData.minersGuild.unlocked = true;
    
    // 创建矿工协会界面
    const panel = document.createElement('div');
    panel.className = 'miners-guild-overlay';
    panel.innerHTML = `
        <div class="miners-guild-panel">
            <div class="miners-guild-header">
                <h3>矿工协会</h3>
                <button onclick="this.closest('.miners-guild-overlay').remove()" style="padding: 5px 10px; background-color: #f44336; color: white; border: none; border-radius: 3px; cursor: pointer;">关闭</button>
            </div>
            <div class="miners-guild-content">
                <div class="miners-section">
                    <h4 style="display: flex; justify-content: space-between; align-items: center;">
                        矿工管理
                        <button onclick="hireMiner()" ${gameData.minersGuild.miners.length >= gameData.minersGuild.maxMiners ? 'disabled' : ''} style="margin-left: 10px; padding: 5px 10px; background-color: #2196F3; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 0.8em;">
                            雇佣矿工
                        </button>
                    </h4>
                    <div class="miners-list" id="miners-list">
                        ${generateMinersList()}
                    </div>
                </div>
                <div class="auto-mining-section">
                    <h4>自动挖矿设置</h4>
                    <div class="auto-mining-settings">
                        <div class="setting-item">
                            <label>选择矿工：</label>
                            <select id="auto-mining-miner">
                                ${generateMinersOptions()}
                            </select>
                            <span style="margin-left: 10px; font-size: 0.8em; color: #666;">${gameData.minersGuild.miners.length === 0 ? '请先雇佣至少一个矿工为你服务' : ''}</span>
                        </div>
                        <div class="setting-item">
                            <label>选择矿物：</label>
                            <select id="auto-mining-mineral">
                                ${generateMineralOptions()}
                            </select>
                        </div>
                        <button onclick="saveAutoMiningSettings()" style="margin-top: 15px; margin-right: 10px; padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer;">
                            确认派遣
                        </button>
                        <button id="mining-toggle-btn" onclick="toggleMining()" style="margin-top: 15px; padding: 8px 16px; background-color: #FF9800; color: white; border: none; border-radius: 3px; cursor: pointer;">
                            ${gameData.minersGuild.autoMining.enabled ? '全部停止' : '开始挖矿'}
                        </button>
                    </div>
                </div>
                <div class="guild-storage-section">
                    <h4>协会仓库</h4>
                    <div class="storage-info">
                        <h5>仓库物品</h5>
                        <div class="storage-items" id="storage-items">
                            <!-- 仓库物品将动态生成 -->
                        </div>
                    </div>
                    <div class="storage-actions" style="margin-top: 20px;">
                        <div class="action-item" style="margin-bottom: 15px;">
                            <label for="storage-item-select" style="display: block; margin-bottom: 5px; font-weight: 500;">选择物品：</label>
                            <select id="storage-item-select" style="width: 100%; padding: 8px; border: 2px solid #ddd; border-radius: 6px; font-size: 1em;">
                                <!-- 物品选项将动态生成 -->
                            </select>
                        </div>
                        <div class="action-item" style="margin-bottom: 15px;">
                            <label for="storage-amount-input" style="display: block; margin-bottom: 5px; font-weight: 500;">取出数量：</label>
                            <input type="number" id="storage-amount-input" min="1" value="1" style="width: 100%; padding: 8px; border: 2px solid #ddd; border-radius: 6px; font-size: 1em;">
                        </div>
                        <button onclick="takeFromStorage()" style="width: 100%; padding: 10px; background: linear-gradient(45deg, #27ae60 0%, #229954 100%); color: white; border: none; border-radius: 8px; font-size: 1em; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            取出物品
                        </button>
                        <button onclick="takeAllFromStorage()" style="width: 100%; padding: 10px; margin-top: 10px; background: linear-gradient(45deg, #9b59b6 0%, #8e44ad 100%); color: white; border: none; border-radius: 8px; font-size: 1em; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                            一键回收
                        </button>
                    </div>
                </div>
                <div class="badge-upgrade-section">
                    <h4>徽章升级</h4>
                    <div class="badge-info">
                        <div class="badge-level">当前徽章等级：${gameData.minersGuild.badgeSystem.currentLevel}/${gameData.minersGuild.badgeSystem.maxLevel}</div>
                        <div class="badge-efficiency">矿工效率加成：${((gameData.minersGuild.badgeSystem.efficiencyBonuses[gameData.minersGuild.badgeSystem.currentLevel] - 1) * 100).toFixed(0)}%</div>
                    </div>
                    ${gameData.minersGuild.badgeSystem.currentLevel < gameData.minersGuild.badgeSystem.maxLevel ? `
                        <div class="upgrade-materials">
                            <h5>升级所需材料：</h5>
                            ${(() => {
                                const nextLevel = gameData.minersGuild.badgeSystem.currentLevel + 1;
                                const upgradeData = gameData.minersGuild.badgeSystem.upgradeMaterials.find(data => data.level === nextLevel);
                                let materialsHTML = '';
                                if (upgradeData) {
                                    for (const [item, amount] of Object.entries(upgradeData.materials)) {
                                        const materialName = materialNameMap[item] || item;
                                        const playerHas = item === '金币' ? gameData.player.gold : (gameData.backpack.items[item] || 0);
                                        const enough = playerHas >= amount;
                                        materialsHTML += `
                                            <div class="material-item">
                                                <span class="material-name">${materialName}：</span>
                                                <span class="material-amount ${enough ? 'enough' : 'not-enough'}">${playerHas}/${amount}</span>
                                            </div>
                                        `;
                                    }
                                }
                                return materialsHTML;
                            })()}
                        </div>
                        <button onclick="upgradeBadge()" class="upgrade-btn" style="margin-top: 10px; padding: 8px 16px; background-color: #FF9800; color: white; border: none; border-radius: 3px; cursor: pointer;">
                            升级徽章
                        </button>
                    ` : `
                        <div class="max-level">徽章已达到最高等级！</div>
                    `}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } } .miners-guild-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; animation: fadeIn 0.3s ease-in-out; } .miners-guild-panel { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); width: 90%; max-width: 600px; max-height: 80vh; overflow-y: auto; animation: slideIn 0.3s ease-out; } .miners-guild-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: linear-gradient(90deg, #2c3e50 0%, #34495e 100%); color: white; border-radius: 12px 12px 0 0; } .miners-guild-header h3 { margin: 0; font-size: 1.5em; font-weight: 600; } .miners-guild-header button { padding: 8px 16px; background: linear-gradient(45deg, #e74c3c 0%, #c0392b 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.3s ease; } .miners-guild-header button:hover { background: linear-gradient(45deg, #c0392b 0%, #a93226 100%); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4); } .miners-guild-content { padding: 25px; } .miners-section, .auto-mining-section, .guild-storage-section, .badge-upgrade-section { background: white; border-radius: 10px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; } .miners-section:hover, .auto-mining-section:hover, .guild-storage-section:hover, .badge-upgrade-section:hover { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15); transform: translateY(-2px); } .badge-info { margin-bottom: 15px; } .badge-level, .badge-efficiency { margin-bottom: 5px; font-size: 0.95em; } .upgrade-materials { margin-bottom: 15px; } .material-item { margin-bottom: 8px; display: flex; justify-content: space-between; } .material-amount.enough { color: #4CAF50; font-weight: bold; } .material-amount.not-enough { color: #f44336; } .max-level { color: #FF9800; font-weight: bold; margin-top: 10px; } .miners-section h4, .auto-mining-section h4, .guild-storage-section h4, .badge-upgrade-section h4 { margin: 0 0 15px 0; color: #2c3e50; font-size: 1.2em; font-weight: 600; border-bottom: 2px solid #3498db; padding-bottom: 8px; } .miners-list { margin-bottom: 15px; } .miner-item { display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; border-radius: 8px; padding: 12px; margin-bottom: 10px; border-left: 4px solid #3498db; transition: all 0.3s ease; } .miner-item:hover { background: #e3f2fd; transform: translateX(5px); } .miner-info { flex: 1; } .miner-name { font-weight: 600; color: #2c3e50; margin-bottom: 4px; } .miner-status { font-size: 0.9em; color: #7f8c8d; } .miner-actions button { padding: 6px 14px; background: linear-gradient(45deg, #e74c3c 0%, #c0392b 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85em; font-weight: 500; transition: all 0.3s ease; } .miner-actions button:hover { background: linear-gradient(45deg, #c0392b 0%, #a93226 100%); transform: translateY(-1px); box-shadow: 0 2px 8px rgba(231, 76, 60, 0.4); } .no-miners { text-align: center; padding: 30px; color: #7f8c8d; font-style: italic; background: #f8f9fa; border-radius: 8px; border: 2px dashed #dee2e6; } .auto-mining-settings { display: flex; flex-direction: column; gap: 15px; } .setting-item { display: flex; align-items: center; gap: 10px; } .setting-item label { flex: 0 0 120px; font-weight: 500; color: #2c3e50; } .setting-item input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; } .setting-item select, .setting-item input[type="number"] { flex: 1; padding: 8px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 1em; transition: all 0.3s ease; } .setting-item select:focus, .setting-item input[type="number"]:focus { outline: none; border-color: #3498db; box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1); } .miners-section button, .auto-mining-section button { padding: 10px 20px; border: none; border-radius: 8px; font-size: 1em; font-weight: 600; cursor: pointer; transition: all 0.3s ease; margin-top: 10px; } .miners-section button { background: linear-gradient(45deg, #3498db 0%, #2980b9 100%); color: white; } .miners-section button:hover:not(:disabled) { background: linear-gradient(45deg, #2980b9 0%, #1f618d 100%); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4); } .miners-section button:disabled { background: #bdc3c7; cursor: not-allowed; opacity: 0.7; } .auto-mining-section button { background: linear-gradient(45deg, #27ae60 0%, #229954 100%); color: white; align-self: flex-start; } .auto-mining-section button:hover { background: linear-gradient(45deg, #229954 0%, #1e8449 100%); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4); animation: pulse 0.6s ease-in-out; } .storage-items { background: #f8f9fa; border-radius: 8px; padding: 15px; } .storage-totals-list { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; } .storage-total-item { font-size: 0.9em; color: #666; font-weight: normal; } .storage-item { display: flex; justify-content: space-between; align-items: center; background: white; border-radius: 6px; padding: 10px; margin-bottom: 8px; border-left: 4px solid #3498db; } .storage-item-name { font-size: 0.9em; color: #666; font-weight: normal; } .storage-item-amount { font-size: 0.9em; color: #666; font-weight: normal; } .no-storage-items { text-align: center; color: #7f8c8d; font-style: italic; padding: 20px; }';
    document.head.appendChild(style);
    
    // 初始化仓库界面
    updateStorageUI();
    
    // 添加点击外部关闭功能
    panel.addEventListener('click', (e) => {
        if (e.target === panel) {
            panel.remove();
        }
    });
}

// 更新仓库界面
function updateStorageUI() {
    // 更新仓库物品显示
    updateStorageItems();
    
    // 更新物品选择下拉菜单
    updateStorageItemSelect();
    
    // 更新数量输入框的最大值
    updateStorageAmountInput();
}

// 更新仓库物品显示
function updateStorageItems() {
    const storageItemsDiv = document.getElementById('storage-items');
    if (!storageItemsDiv) return;
    
    const storage = gameData.minersGuild.storage;
    const items = Object.entries(storage).filter(([_, amount]) => amount > 0);
    
    if (items.length === 0) {
        storageItemsDiv.innerHTML = '<div class="no-storage-items">仓库中没有物品</div>';
        return;
    }
    
    let html = '<div class="storage-totals-list">';
    items.forEach(([itemName, amount]) => {
        html += `
            <div class="storage-total-item">${itemName}: ${amount}</div>
        `;
    });
    html += '</div>';
    
    storageItemsDiv.innerHTML = html;
}

// 更新物品选择下拉菜单
function updateStorageItemSelect() {
    const select = document.getElementById('storage-item-select');
    if (!select) return;
    
    const storage = gameData.minersGuild.storage;
    const items = Object.entries(storage).filter(([_, amount]) => amount > 0);
    
    // 清空现有选项
    select.innerHTML = '<option value="">请选择物品</option>';
    
    // 添加物品选项
    items.forEach(([itemName, amount]) => {
        const option = document.createElement('option');
        option.value = itemName;
        option.textContent = `${itemName} (${amount}个)`;
        select.appendChild(option);
    });
    
    // 添加事件监听，当选择变化时更新数量输入框
    select.addEventListener('change', updateStorageAmountInput);
}

// 更新数量输入框
function updateStorageAmountInput() {
    const select = document.getElementById('storage-item-select');
    const input = document.getElementById('storage-amount-input');
    if (!select || !input) return;
    
    const selectedItem = select.value;
    if (!selectedItem) {
        input.value = '1';
        input.disabled = true;
        return;
    }
    
    const amountInStorage = gameData.minersGuild.storage[selectedItem] || 0;
    input.disabled = false;
    input.min = '1';
    input.max = amountInStorage;
    input.value = amountInStorage;
}

// 从仓库取出物品
function takeFromStorage() {
    const select = document.getElementById('storage-item-select');
    const input = document.getElementById('storage-amount-input');
    if (!select || !input) return;
    
    const selectedItem = select.value;
    if (!selectedItem) {
        addMessage('请选择要取出的物品！');
        return;
    }
    
    const amount = parseInt(input.value);
    if (isNaN(amount) || amount < 1) {
        addMessage('请输入有效的取出数量！');
        return;
    }
    
    // 检查仓库中是否有足够的物品
    if ((gameData.minersGuild.storage[selectedItem] || 0) < amount) {
        addMessage('仓库中没有足够的物品！');
        return;
    }
    
    // 检查背包是否能放下
    const canAdd = canAddToBackpack(selectedItem, amount);
    if (!canAdd) {
        addMessage('背包空间不足，无法取出物品！');
        return;
    }
    
    // 从仓库取出物品
    gameData.minersGuild.storage[selectedItem] -= amount;
    if (gameData.minersGuild.storage[selectedItem] <= 0) {
        delete gameData.minersGuild.storage[selectedItem];
    }
    
    // 将物品添加到背包
    for (let i = 0; i < amount; i++) {
        addToBackpack(selectedItem);
    }
    
    addMessage(`成功从仓库取出${amount}个${selectedItem}到背包！`);
    
    // 更新仓库界面
    updateStorageUI();
    
    // 保存游戏
    saveGame();
}

// 一键回收所有物品
function takeAllFromStorage() {
    const storage = gameData.minersGuild.storage;
    const items = Object.entries(storage).filter(([_, amount]) => amount > 0);
    
    if (items.length === 0) {
        addMessage('仓库中没有物品可回收！');
        return;
    }
    
    // 检查所有物品是否都能放入背包
    let canTakeAll = true;
    for (const [itemName, amount] of items) {
        if (!canAddToBackpack(itemName, amount)) {
            canTakeAll = false;
            break;
        }
    }
    
    if (!canTakeAll) {
        addMessage('背包空间不足，无法回收所有物品！');
        return;
    }
    
    // 从仓库取出所有物品
    let takenItems = [];
    let needUpdateUI = false;
    for (const [itemName, amount] of items) {
        // 从仓库取出物品
        delete gameData.minersGuild.storage[itemName];
        
        // 批量添加物品到背包，暂时禁用UI更新
        addToBackpack(itemName, amount, false);
        needUpdateUI = true;
        
        takenItems.push(`${itemName} × ${amount}`);
    }
    
    // 所有物品添加完成后，执行一次UI更新
    if (needUpdateUI) {
        updateBackpackDisplay();
        updateToolSlotInfo();
    }
    
    addMessage(`成功回收所有物品！共回收 ${takenItems.join(', ')}`);
    
    // 更新仓库界面
    updateStorageUI();
    
    // 保存游戏
    saveGame();
}

// 检查背包是否能放下指定数量的物品
function canAddToBackpack(itemName, amount) {
    calculateBackpackStats();
    const currentStackSize = gameData.backpack.currentStackSize;
    const items = gameData.backpack.items;
    const capacity = gameData.backpack.capacity;
    
    let remainingAmount = amount;
    
    // 检查现有堆叠
    for (const [name, count] of Object.entries(items)) {
        const baseName = name.split('_')[0];
        if (baseName === itemName && count < currentStackSize) {
            const canAddToStack = currentStackSize - count;
            remainingAmount -= canAddToStack;
            if (remainingAmount <= 0) {
                return true;
            }
        }
    }
    
    // 检查剩余槽位
    const emptySlots = capacity - Object.keys(items).length;
    const stacksNeeded = Math.ceil(remainingAmount / currentStackSize);
    
    return stacksNeeded <= emptySlots;
}

// 生成矿工列表
function generateMinersList() {
    if (gameData.minersGuild.miners.length === 0) {
        return '<div class="no-miners">暂无矿工，点击"雇佣矿工"按钮雇佣你的第一个矿工吧！</div>';
    }
    
    let html = '';
    gameData.minersGuild.miners.forEach((miner, index) => {
        // 确定矿工状态显示
        let statusText = '';
        if (miner.assignedMineral) {
            statusText = miner.working ? `工作中 (${miner.assignedMineral})` : `已派遣到${miner.assignedMineral}`;
        } else {
            statusText = '空闲';
        }
        
        // 确定按钮文字和事件
        const workBtnText = miner.working ? '停止工作' : '开始工作';
        const workBtnOnclick = miner.working ? `stopMinerWork(${index})` : `startMinerWork(${index})`;
        
        html += `
            <div class="miner-item">
                <div class="miner-info">
                    <div class="miner-name">${miner.name}</div>
                    <div class="miner-status">状态：${statusText}</div>
                    <div class="miner-efficiency">效率：${(miner.efficiency * 100).toFixed(0)}%</div>
                </div>
                <div class="miner-actions">
                    <button onclick="showMinerDetails(${index})" style="margin-bottom: 8px; background-color: #2196F3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85em; font-weight: 500; transition: all 0.3s ease; padding: 6px 14px;"><!--
                        -->详细信息<!--
                    --></button>
                    <button onclick="${workBtnOnclick}" style="margin-bottom: 8px; margin-right: 8px;"><!--
                        -->${workBtnText}<!--
                    --></button>
                    <button onclick="fireMiner(${index})"><!--
                        -->解雇<!--
                    --></button>
                </div>
            </div>
        `;
    });
    
    return html;
}

// 显示矿工详细信息
function showMinerDetails(index) {
    const miner = gameData.minersGuild.miners[index];
    if (!miner) return;
    
    // 计算升级成本
    const upgradeCost = 500 * Math.pow(2, miner.level - 1);
    
    // 创建详细信息面板
    const panel = document.createElement('div');
    panel.className = 'miner-details-overlay';
    
    // 检查是否已达等级上限
    const isMaxLevel = miner.level >= 5;
    
    panel.innerHTML = `
        <div class="miner-details-panel">
            <div class="miner-details-header">
                <h3>${miner.name} - 详细信息</h3>
                <button onclick="this.closest('.miner-details-overlay').remove()" class="close-btn">×</button>
            </div>
            <div class="miner-details-content">
                <div class="detail-item">
                    <span class="detail-label">等级：</span>
                    <span class="detail-value">lv${miner.level}/5</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">经验：</span>
                    <span class="detail-value">${miner.exp}/${miner.nextExp}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">效率：</span>
                    <span class="detail-value">${(miner.efficiency * 100).toFixed(0)}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">状态：</span>
                    <span class="detail-value">${miner.assignedMineral ? (miner.working ? `工作中 (${miner.assignedMineral})` : `已派遣到${miner.assignedMineral}`) : '空闲'}</span>
                </div>
                ${!isMaxLevel ? `
                <div class="detail-item">
                    <span class="detail-label">升级成本：</span>
                    <span class="detail-value">${upgradeCost}金币</span>
                </div>
                ` : `
                <div class="detail-item">
                    <span class="detail-label">等级状态：</span>
                    <span class="detail-value" style="color: #4CAF50; font-weight: bold;">已达最大等级</span>
                </div>
                `}
                ${miner.abilities.length > 0 ? `
                    <div class="detail-item">
                        <span class="detail-label">技能：</span>
                        <span class="detail-value">${miner.abilities.join(', ')}</span>
                    </div>
                ` : ''}
            </div>
            <div class="miner-details-footer">
                <button onclick="drinkBeerWithMiner(${index}); this.closest('.miner-details-overlay').remove()" class="beer-btn" title="请矿工喝扎啤，增加亲密度">
                    <img src="data/images/${Math.random() > 0.5 ? '044e604164b39247048e79d69f7efc8b' : '75b81ddea31ad33c19f5f9544f4a9c18'}.jpg" alt="喝扎啤" style="width: 40px; height: 40px; vertical-align: middle; margin-right: 5px;">
                    喝扎啤
                </button>
                ${!isMaxLevel ? `
                <button onclick="upgradeMiner(${index}); this.closest('.miner-details-overlay').remove()" class="upgrade-btn">升级矿工</button>
                ` : `
                <button disabled class="upgrade-btn" style="background-color: #ccc; cursor: not-allowed;">已达最大等级</button>
                `}
                <button onclick="this.closest('.miner-details-overlay').remove()" class="close-btn">关闭</button>
            </div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .miner-details-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1001;
            animation: fadeIn 0.3s ease-in-out;
        }
        
        .miner-details-panel {
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        }
        
        .miner-details-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: linear-gradient(90deg, #2c3e50 0%, #34495e 100%);
            color: white;
            border-radius: 12px 12px 0 0;
        }
        
        .miner-details-header h3 {
            margin: 0;
            font-size: 1.5em;
            font-weight: 600;
        }
        
        .close-btn {
            padding: 12px 24px;
            background: linear-gradient(45deg, #e74c3c 0%, #c0392b 100%);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            font-size: 1em;
            white-space: nowrap;
        }
        
        .close-btn:hover {
            background: linear-gradient(45deg, #c0392b 0%, #a93226 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
        }
        
        .miner-details-content {
            padding: 25px;
        }
        
        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .detail-label {
            font-weight: 600;
            color: #2c3e50;
        }
        
        .detail-value {
            color: #666;
        }
        
        .miner-details-footer {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 0 0 12px 12px;
        }
        
        .upgrade-btn {
            padding: 10px 20px;
            background: linear-gradient(45deg, #FF9800 0%, #f57c00 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .upgrade-btn:hover {
            background: linear-gradient(45deg, #f57c00 0%, #ef6c00 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4);
        }
        
        .beer-btn {
            padding: 5px 10px;
            background: none;
            color: #4CAF50;
            border: 1px solid #4CAF50;
            border-radius: 8px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .beer-btn:hover {
            background: rgba(76, 175, 80, 0.1);
            transform: translateY(-2px);
            box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(panel);
}

// 生成矿物选项
function generateMineralOptions() {
    let html = '<option value="">请选择矿物</option>';
    minerals.forEach(mineral => {
        if (gameData.player.level >= mineral.minLevel) {
            html += `
                <option value="${mineral.name}" ${gameData.minersGuild.autoMining.selectedMineral === mineral.name ? 'selected' : ''}>
                    ${mineral.name} (等级${mineral.minLevel}+)
                </option>
            `;
        }
    });
    return html;
}

// 生成矿工选项
function generateMinersOptions() {
    if (gameData.minersGuild.miners.length === 0) {
        return '<option value="">请先雇佣至少一个矿工</option>';
    }
    
    let html = '<option value="">请选择矿工</option>';
    gameData.minersGuild.miners.forEach((miner, index) => {
        html += `
            <option value="${index}" ${gameData.minersGuild.autoMining.selectedMiner === index ? 'selected' : ''}>
                ${miner.name} (等级${miner.level})
            </option>
        `;
    });
    return html;
}

// 与矿工喝扎啤
function drinkBeerWithMiner(index) {
    const miner = gameData.minersGuild.miners[index];
    if (!miner) return;
    
    // 检查背包中是否有扎啤
    if (!gameData.backpack.items['扎啤'] || gameData.backpack.items['扎啤'] < 1) {
        createNPCDialoguePanel('喝酒提示', miner.name, '伙计，你的酒呢？别耍我！');
        return;
    }
    
    // 扣除背包中的扎啤
    gameData.backpack.items['扎啤'] -= 1;
    if (gameData.backpack.items['扎啤'] <= 0) {
        delete gameData.backpack.items['扎啤'];
    }
    
    // 增加亲密度
    const intimacyGain = Math.floor(Math.random() * 5) + 5; // 5-9点亲密度
    miner.intimacy = (miner.intimacy || 0) + intimacyGain;
    
    // 根据亲密度获取对话内容
    const dialogue = getMinerDialogue(miner.intimacy);
    
    // 创建对话面板
    createBeerDialoguePanel(miner.name, dialogue);
    
    // 保存游戏
    saveGame();
}

// 根据亲密度获取对话内容
function getMinerDialogue(intimacy) {
    if (intimacy < 20) {
        return [
            "谢谢你请我喝啤酒，陌生人！",
            "这杯啤酒真不错，我感觉干劲十足！",
            "第一次有人请我喝酒，谢谢你的好意。"
        ];
    } else if (intimacy < 50) {
        return [
            "嘿，朋友！再来一杯怎么样？",
            "和你一起工作真开心，这杯酒让我更有动力了！",
            "我们越来越熟了，谢谢你一直照顾我。"
        ];
    } else if (intimacy < 100) {
        return [
            "兄弟！这杯酒我敬你！",
            "有你这样的老板，我愿意为你卖命挖矿！",
            "我们的关系越来越好了，希望能一直在一起工作。"
        ];
    } else {
        return [
            "我的好兄弟！这杯酒算我的！",
            "能遇到你这样的老板，是我最大的幸运！",
            "我们的友谊已经超越了雇佣关系，我会永远为你工作！"
        ];
    }
}

// 创建通用NPC对话面板
function createNPCDialoguePanel(title, speaker, dialogue) {
    // 创建对话面板
    const panel = document.createElement('div');
    panel.className = 'npc-dialogue-overlay';
    panel.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1002;
        animation: fadeIn 0.3s ease-in-out;
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .npc-dialogue-panel {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 500px;
            animation: slideIn 0.3s ease-out;
        }
        .npc-dialogue-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: linear-gradient(90deg, #2c3e50 0%, #34495e 100%);
            color: white;
            border-radius: 12px 12px 0 0;
        }
        .npc-dialogue-header h3 {
            margin: 0;
            font-size: 1.5em;
            font-weight: 600;
        }
        .npc-dialogue-close {
            padding: 8px 16px;
            background: linear-gradient(45deg, #e74c3c 0%, #c0392b 100%);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        .npc-dialogue-close:hover {
            background: linear-gradient(45deg, #c0392b 0%, #a93226 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
        }
        .npc-dialogue-content {
            padding: 30px;
            background: white;
            border-radius: 0 0 12px 12px;
        }
        .npc-name {
            font-size: 1.2em;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
        }
        .npc-dialogue {
            font-size: 1.1em;
            line-height: 1.6;
            color: #34495e;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #3498db;
        }
    `;
    document.head.appendChild(style);
    
    panel.innerHTML = `
        <div class="npc-dialogue-panel">
            <div class="npc-dialogue-header">
                <h3>${title}</h3>
                <button class="npc-dialogue-close" onclick="this.closest('.npc-dialogue-overlay').remove()">关闭</button>
            </div>
            <div class="npc-dialogue-content">
                <div class="npc-name">${speaker}：</div>
                <div class="npc-dialogue">${dialogue}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
}

// 创建喝啤酒对话面板
function createBeerDialoguePanel(minerName, dialogueOptions) {
    // 随机选择一个对话
    const randomDialogue = dialogueOptions[Math.floor(Math.random() * dialogueOptions.length)];
    
    // 使用通用对话面板
    createNPCDialoguePanel(`与${minerName}喝扎啤`, minerName, randomDialogue);
}

// 合并同类型矿物，将所有带后缀的矿物合并到基础矿物中
function mergeSameTypeItems() {
    const mergedItems = {};
    
    // 遍历所有物品，合并同类型矿物，但保留插片不变
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        // 检查是否是插片（包含Slot或中文插片名称）
        const isSlot = itemName.includes('Slot') || 
                     itemName.includes('插片') ||
                     itemName === 'toolSlot1' ||
                     itemName === 'headlightSlot' ||
                     itemName === 'cartSlot' ||
                     itemName === 'pickaxeSlot';
        
        if (isSlot) {
            // 插片不合并，直接保留原始名称
            mergedItems[itemName] = (mergedItems[itemName] || 0) + count;
        } else {
            // 矿物合并，只保留基础名称
            const baseName = itemName.split('_')[0];
            if (!mergedItems[baseName]) {
                mergedItems[baseName] = 0;
            }
            mergedItems[baseName] += count;
        }
    }
    
    // 清空原物品列表
    gameData.backpack.items = {};
    
    // 重新添加合并后的物品
    for (const [name, totalCount] of Object.entries(mergedItems)) {
        gameData.backpack.items[name] = totalCount;
    }
}

// 雇佣矿工
function hireMiner() {
    if (gameData.minersGuild.miners.length >= gameData.minersGuild.maxMiners) {
        addMessage('矿工数量已达到上限！');
        return;
    }
    
    // 计算雇佣成本
    const minerCount = gameData.minersGuild.miners.length;
    const hireCost = 1000 * (minerCount + 1);
    
    if (gameData.player.gold < hireCost) {
        addMessage('金币不足，无法雇佣矿工！');
        return;
    }
    
    // 扣除金币
    gameData.player.gold -= hireCost;
    
    // 生成矿工名字
    const minerName = generateMinerName();
    
    // 检查是否带有矿工称号，带有特殊称号的矿工基础属性提高30%
    const hasMinerTitle = minerName.includes('矿工') || minerName.includes('挖矿者') || minerName.includes('掘金者') || minerName.includes('矿夫') || minerName.includes('矿师') || minerName.includes('老矿工');
    const baseEfficiency = hasMinerTitle ? 1.3 : 1.0;
    
    // 添加矿工
    gameData.minersGuild.miners.push({
        id: Date.now() + Math.random(),
        name: minerName,
        level: 1,
        exp: 0,
        nextExp: 100,
        intimacy: 0, // 亲密度
        working: false,
        assignedMineral: null,
        efficiency: baseEfficiency,
        abilities: []
    });
    
    addMessage(`成功雇佣了${hasMinerTitle ? '特殊' : ''}矿工 ${minerName}，花费${hireCost}金币！`);
    if (hasMinerTitle) {
        addMessage(`🌟 ${minerName} 拥有特殊称号，基础效率提高30%！`);
    }
    
    // 更新界面
    const minersList = document.getElementById('miners-list');
    if (minersList) {
        minersList.innerHTML = generateMinersList();
    }
    
    // 更新自动挖矿设置中的矿工选择下拉菜单
    const autoMiningMinerSelect = document.getElementById('auto-mining-miner');
    if (autoMiningMinerSelect) {
        autoMiningMinerSelect.innerHTML = generateMinersOptions();
    }
    
    // 更新雇佣按钮状态
    const hireButton = document.querySelector('.miners-section button');
    if (hireButton) {
        hireButton.disabled = gameData.minersGuild.miners.length >= gameData.minersGuild.maxMiners;
    }
    
    updateUI();
    saveGame();
}

// 升级矿工
function upgradeMiner(index) {
    const miner = gameData.minersGuild.miners[index];
    if (!miner) {
        return;
    }
    
    // 检查等级上限
    if (miner.level >= 5) {
        createNPCDialoguePanel('升级提示', miner.name, '我已经达到最高等级了！');
        return;
    }
    
    // 计算升级成本
    const upgradeCost = 500 * Math.pow(2, miner.level - 1);
    
    // 检查经验值
    if (miner.exp < miner.nextExp) {
        createNPCDialoguePanel('升级提示', miner.name, '哦不，我还差点火候！');
        return;
    }
    
    // 计算所需亲密度（每级需求上升，达到200后不再限制）
    const requiredIntimacy = Math.min(200, Math.floor(50 * Math.pow(1.2, miner.level - 1)));
    
    // 检查亲密度
    if (miner.intimacy < requiredIntimacy) {
        createNPCDialoguePanel('升级提示', miner.name, '嘿伙计，我们还没有那么铁！');
        return;
    }
    
    if (gameData.player.gold < upgradeCost) {
        createNPCDialoguePanel('升级提示', miner.name, '金币不足，无法升级矿工！');
        return;
    }
    
    // 扣除金币
    gameData.player.gold -= upgradeCost;
    
    // 升级矿工
    miner.level += 1;
    miner.exp = 0;
    miner.nextExp = Math.floor(miner.nextExp * 1.5);
    
    // 增加效率，考虑特殊称号的基础效率加成
    const hasMinerTitle = miner.name.includes('矿工') || miner.name.includes('挖矿者') || miner.name.includes('掘金者') || miner.name.includes('矿夫') || miner.name.includes('矿师') || miner.name.includes('老矿工');
    // 正确的效率计算：1级基础效率 + (等级-1)*0.1
    // 特殊称号矿工1级是1.3，每升一级增加0.1
    miner.efficiency = hasMinerTitle ? 1.3 + ((miner.level - 1) * 0.1) : 1.0 + ((miner.level - 1) * 0.1);
    
    // 解锁能力
    unlockMinerAbility(miner);
    
    createNPCDialoguePanel('升级成功', miner.name, `恭喜！我已经升级到${miner.level}级了，感谢你的培养！`);
    
    // 更新界面
    const minersList = document.getElementById('miners-list');
    if (minersList) {
        minersList.innerHTML = generateMinersList();
    }
    
    saveGame();
}

// 解锁矿工能力
function unlockMinerAbility(miner) {
    const level = miner.level;
    
    // 不同等级解锁不同能力（调整后，直接使用中文技能名称）
    if (level === 3 && !miner.abilities.includes('快速挖矿')) {
        miner.abilities.push('快速挖矿');
        addMessage(`矿工获得了快速挖矿能力！`);
    } else if (level === 4 && !miner.abilities.includes('双倍掉落')) {
        miner.abilities.push('双倍掉落');
        addMessage(`矿工获得了双倍掉落能力！`);
    } else if (level === 5 && !miner.abilities.includes('专家矿工')) {
        miner.abilities.push('专家矿工');
        addMessage(`矿工获得了专家矿工能力！`);
    }
}

// 计算矿工效率
function calculateMinerEfficiency(miner) {
    let efficiency = miner.efficiency || 1.0;
    
    // 应用徽章加成
    const badgeSystem = gameData.minersGuild.badgeSystem;
    const badgeLevel = badgeSystem.currentLevel;
    const badgeBonus = badgeSystem.efficiencyBonuses[badgeLevel] || 1.0;
    efficiency *= badgeBonus;
    
    // 应用能力加成（使用中文技能名称）
    if (miner.abilities.includes('快速挖矿')) {
        efficiency *= 1.2; // 快速挖矿：+20%效率
    }
    if (miner.abilities.includes('专家矿工')) {
        efficiency *= 1.3; // 专家矿工：+30%效率
    }
    
    return efficiency;
}

// 解雇矿工
function fireMiner(index) {
    if (index < 0 || index >= gameData.minersGuild.miners.length) {
        return;
    }
    
    gameData.minersGuild.miners.splice(index, 1);
    addMessage('成功解雇了矿工！');
    
    // 更新界面
    const minersList = document.getElementById('miners-list');
    if (minersList) {
        minersList.innerHTML = generateMinersList();
    }
    
    // 更新雇佣按钮状态
    const hireButton = document.querySelector('.miners-section button');
    if (hireButton) {
        hireButton.disabled = gameData.minersGuild.miners.length >= gameData.minersGuild.maxMiners;
    }
    
    // 更新自动挖矿设置中的矿工选择下拉菜单
    const autoMiningMinerSelect = document.getElementById('auto-mining-miner');
    if (autoMiningMinerSelect) {
        autoMiningMinerSelect.innerHTML = generateMinersOptions();
    }
    
    // 检查被解雇的矿工是否是当前选中的自动挖矿矿工
    if (gameData.minersGuild.autoMining.selectedMiner === index) {
        // 重置自动挖矿选中的矿工
        gameData.minersGuild.autoMining.selectedMiner = null;
    } else if (gameData.minersGuild.autoMining.selectedMiner > index) {
        // 如果当前选中的矿工索引大于被解雇的矿工索引，需要调整索引
        gameData.minersGuild.autoMining.selectedMiner--;
    }
    
    saveGame();
}

// 保存自动挖矿设置
function saveAutoMiningSettings() {
    const selectedMinerIndex = parseInt(document.getElementById('auto-mining-miner').value);
    const selectedMineral = document.getElementById('auto-mining-mineral').value;
    // 验证设置
    if (isNaN(selectedMinerIndex) || selectedMinerIndex < 0 || selectedMinerIndex >= gameData.minersGuild.miners.length) {
        addMessage('请选择一个有效的矿工！');
        return;
    }
    
    if (!selectedMineral) {
        addMessage('请选择要自动挖掘的矿物！');
        return;
    }
    
    // 检查矿工是否正在工作
    const miner = gameData.minersGuild.miners[selectedMinerIndex];
    if (miner.working) {
        addMessage(`${miner.name} 正在工作中，无法重新派遣！`);
        return;
    }
    
    // 保存设置，使用默认的挖矿间隔
    gameData.minersGuild.autoMining.selectedMiner = selectedMinerIndex;
    gameData.minersGuild.autoMining.selectedMineral = selectedMineral;
    gameData.minersGuild.autoMining.interval = 60; // 默认60秒
    
    // 更新矿工派遣状态
    miner.assignedMineral = selectedMineral;
    miner.working = false; // 派遣后不直接开始工作
    addMessage(`${miner.name} 已派遣到${selectedMineral}矿！`);
    saveGame();
    
    // 更新矿工列表显示
    const minersList = document.getElementById('miners-list');
    if (minersList) {
        minersList.innerHTML = generateMinersList();
    }
}

// 检查任务大厅解锁状态
function checkQuestHallUnlock() {
    // 玩家达到25级解锁任务大厅
    if (gameData.player.level >= 25 && !gameData.questHall.unlocked) {
        gameData.questHall.unlocked = true;
        generateQuests();
        addMessage('恭喜！任务大厅已解锁！');
        saveGame();
    }
}

// 获取玩家已解锁的所有物品
function getAvailableItems() {
    const availableItems = [];
    
    // 添加已解锁的矿物
    const availableMinerals = minerals.filter(mineral => {
        return gameData.player.level >= mineral.minLevel;
    });
    availableMinerals.forEach(mineral => {
        availableItems.push({
            name: mineral.name,
            type: 'mineral',
            level: mineral.minLevel
        });
    });
    
    // 添加背包扩展包（检查材料是否足够）
    const backpackItems = ['棉布包', '织布包', '粗麻布包', '尼龙布包', '旅行背包'];
    backpackItems.forEach(item => {
        // 检查材料是否足够
        let canCraft = true;
        const expansionData = backpackExpansions[item];
        if (expansionData && expansionData.materials) {
            for (const [material, required] of Object.entries(expansionData.materials)) {
                const playerHas = gameData.backpack.items[material] || 0;
                if (playerHas < required) {
                    canCraft = false;
                    break;
                }
            }
        }
        if (canCraft) {
            availableItems.push({
                name: item,
                type: 'backpack',
                level: 0
            });
        }
    });
    
    // 添加燃料（如果已解锁燃料配方）
    if (gameData.shop.unlockedBlueprints['燃料配方']) {
        availableItems.push({
            name: '燃料',
            type: 'fuel',
            level: 0
        });
    }
    
    // 添加电池（如果已解锁电池图纸）
    if (gameData.shop.unlockedBlueprints['电池图纸']) {
        availableItems.push({
            name: '电池',
            type: 'battery',
            level: 0
        });
    }
    

    
    // 添加合金（如果熔炉已解锁）
    if (gameData.furnace.crafted) {
        const alloys = ['铜铁合金', '铜钴合金', '铜镍合金', '铜银合金'];
        alloys.forEach(alloy => {
            availableItems.push({
                name: alloy,
                type: 'alloy',
                level: 10
            });
        });
    }
    
    // 添加布料（检查玩家等级是否足够）
    const clothItems = ['棉布', '织布', '粗麻布', '尼龙布'];
    clothItems.forEach(item => {
        // 根据布料类型检查玩家等级
        let requiredLevel = 0;
        switch (item) {
            case '织布':
                requiredLevel = 5;
                break;
            case '粗麻布':
                requiredLevel = 10;
                break;
            case '尼龙布':
                requiredLevel = 15;
                break;
        }
        if (gameData.player.level >= requiredLevel) {
            availableItems.push({
                name: item,
                type: 'cloth',
                level: requiredLevel
            });
        }
    });
    
    // 过滤掉玩家等级不够的物品
    return availableItems.filter(item => {
        return gameData.player.level >= item.level;
    });
}

// 生成任务
// refreshOnly: 只刷新现有任务，不改变数量
function generateQuests(refreshOnly = false) {
    const availableItems = getAvailableItems();
    
    if (availableItems.length === 0) return;
    
    const newQuests = [];
    const maxQuests = gameData.questHall.maxQuests;
    const acceptedQuestsCount = gameData.questHall.acceptedQuests.length;
    
    let questsToGenerate;
    if (refreshOnly) {
        // 只刷新现有任务，保持数量不变
        questsToGenerate = gameData.questHall.quests.length;
    } else {
        // 生成足够的任务来填满总任务数
        questsToGenerate = Math.max(0, maxQuests - acceptedQuestsCount);
    }
    
    while (newQuests.length < questsToGenerate) {
        // 有5%概率生成特殊任务：用扎啤换取铝矿配方或磁铁配方
        if (Math.random() < 0.05) {
            // 生成特殊任务
            const recipeTypes = ['铝矿配方', '磁铁配方'];
            const recipeType = recipeTypes[Math.floor(Math.random() * recipeTypes.length)];
            const quest = {
                id: Date.now() + Math.random(),
                type: 'special',
                item: '扎啤',
                itemType: 'special',
                amount: 10,
                collected: 0,
                reward: {
                    type: 'recipe',
                    value: recipeType
                }
            };
            newQuests.push(quest);
            continue;
        }
        
        let item;
        // 确保选择的物品有效
        do {
            item = availableItems[Math.floor(Math.random() * availableItems.length)];
        } while (!item || !item.name);
        
        const isExperienceQuest = Math.random() > 0.5;
        
        let amount, reward;
        
        // 根据物品类型设置合理的数量
        switch (item.type) {
            case 'mineral':
                amount = isExperienceQuest ? Math.floor(Math.random() * 10) + 10 : Math.floor(Math.random() * 50) + 50;
                break;
            case 'backpack':
                amount = Math.floor(Math.random() * 2) + 2; // 增加难度：需要2-3个背包扩展
                break;
            case 'fuel':
            case 'battery':
                amount = Math.floor(Math.random() * 5) + 3;
                break;
            case 'blueprint':
                amount = 1;
                break;
            case 'alloy':
                amount = Math.floor(Math.random() * 5) + 8; // 增加难度：需要8-12个合金
                break;
            case 'cloth':
                amount = Math.floor(Math.random() * 20) + 10;
                break;
            default:
                amount = Math.floor(Math.random() * 10) + 10;
        }
        
        // 生成合理的奖励
        if (isExperienceQuest) {
            // 经验奖励：根据物品价值和数量计算
            let baseExp = 10;
            switch (item.type) {
                case 'mineral':
                    const mineral = minerals.find(m => m.name === item.name);
                    baseExp = mineral ? mineral.exp : 10;
                    break;
                case 'backpack':
                    baseExp = 50;
                    break;
                case 'alloy':
                    baseExp = 30;
                    break;
                case 'blueprint':
                    baseExp = 100;
                    break;
            }
            const expReward = baseExp * amount * 2; // 经验奖励为物品经验的200%
            reward = {
                type: 'experience',
                value: expReward
            };
        } else {
            // 物品奖励：根据任务物品稀有度生成合理的奖励
            let rewardTypes = ['recipe', 'gold', 'gold', 'gold'];
            
            // 只有当任务物品是稀有物品时，才可能获得工具等级提升券
            const rareItemTypes = ['alloy', 'backpack', 'blueprint'];
            const isRareItem = rareItemTypes.includes(item.type);
            
            if (isRareItem) {
                rewardTypes.push('ticket'); // 稀有物品任务才可能获得ticket奖励
            }
            
            const rewardType = rewardTypes[Math.floor(Math.random() * rewardTypes.length)];
            
            if (rewardType === 'recipe') {
                // 配方奖励
                const recipeNames = ['铜铁合金熔炼配方', '铜钴合金熔炼配方', '铜镍合金熔炼配方', '铜银合金熔炼配方'];
                const recipeName = recipeNames[Math.floor(Math.random() * recipeNames.length)];
                reward = {
                    type: 'recipe',
                    value: recipeName
                };
            } else if (rewardType === 'ticket') {
                // 等级提升券奖励
                const toolTypes = ['pickaxe', 'cart', 'headlight'];
                const toolType = toolTypes[Math.floor(Math.random() * toolTypes.length)];
                reward = {
                    type: 'ticket',
                    tool: toolType,
                    amount: 1
                };
            } else {
                // 金币奖励
                let goldReward = amount * 10;
                switch (item.type) {
                    case 'backpack':
                        goldReward = amount * 1000;
                        break;
                    case 'blueprint':
                        goldReward = amount * 500;
                        break;
                    case 'alloy':
                        goldReward = amount * 50;
                        break;
                }
                reward = {
                    type: 'gold',
                    value: goldReward
                };
            }
        }
        
        const quest = {
            id: Date.now() + Math.random(),
            type: 'collection',
            item: item.name,
            itemType: item.type,
            amount: amount,
            collected: 0,
            reward: reward
        };
        
        newQuests.push(quest);
    }
    
    gameData.questHall.quests = newQuests;
    gameData.questHall.lastRefreshTime = Date.now();
    updateQuestUI();
    saveGame();
}

// 刷新任务
function refreshQuests() {
    // 只刷新未接受的任务
    generateQuests();
    // 更新刷新时间
    gameData.questHall.lastRefreshTime = Date.now();
    // 更新任务UI，确保倒计时和进度条正确重置
    updateQuestUI();
}

// 金币刷新任务
function refreshQuestsWithGold() {
    const refreshCost = 1000;
    
    // 检查金币是否足够
    if (gameData.player.gold < refreshCost) {
        // 移除金币不足的提示
        return;
    }
    
    // 扣除金币
    gameData.player.gold -= refreshCost;
    
    // 只刷新现有任务，不改变数量
    generateQuests(true);
    
    updateQuestUI();
    updateUI();
    saveGame();
}

// 接受任务
function acceptQuest(questId) {
    const questIndex = gameData.questHall.quests.findIndex(q => q.id === questId);
    if (questIndex === -1) return;
    
    const quest = gameData.questHall.quests[questIndex];
    gameData.questHall.acceptedQuests.push(quest);
    gameData.questHall.quests.splice(questIndex, 1);
    
    addMessage(`已接受任务：收集${quest.amount}个${quest.item}`);
    updateQuestUI();
    saveGame();
}

// 完成任务
function completeQuest(questId) {
    const questIndex = gameData.questHall.acceptedQuests.findIndex(q => q.id === questId);
    if (questIndex === -1) return;
    
    const quest = gameData.questHall.acceptedQuests[questIndex];
    
    // 检查是否有足够的物品
    if (!gameData.backpack.items[quest.item] || gameData.backpack.items[quest.item] < quest.amount) {
        addMessage('物品不足，无法完成任务！');
        return;
    }
    
    // 扣除物品
    gameData.backpack.items[quest.item] -= quest.amount;
    
    // 给予奖励
    if (quest.reward.type === 'experience') {
        gameData.player.exp += quest.reward.value;
        addMessage(`任务完成！获得${quest.reward.value}点经验！`);
        // 检查并处理经验值溢出
        checkLevelUp();
    } else if (quest.reward.type === 'recipe') {
        const recipeValue = quest.reward.value;
        if (recipeValue === '铝矿配方' || recipeValue === '磁铁配方') {
            // 特殊处理铝矿和磁铁配方
            if (!gameData.unlockedRecipes[recipeValue]) {
                gameData.unlockedRecipes[recipeValue] = true;
                addMessage(`任务完成！获得${recipeValue}！`);
            } else {
                addMessage(`任务完成！但你已经拥有该配方了。`);
            }
        } else {
            // 普通配方处理：将配方物品添加到背包
            let recipeItemName;
            if (recipeValue.includes('熔炼配方')) {
                // 将'铜铁合金熔炼配方'转换为'铜铁合金配方'
                recipeItemName = recipeValue.replace('熔炼配方', '配方');
                // 同时解锁对应的合金配方
                const alloyName = recipeValue.replace('熔炼配方', '');
                if (!gameData.unlockedRecipes[alloyName]) {
                    gameData.unlockedRecipes[alloyName] = true;
                }
            } else {
                recipeItemName = recipeValue;
            }
            
            // 添加配方物品到背包
            addToBackpack(recipeItemName);
            addMessage(`任务完成！获得${recipeItemName}！`);
        }
    } else if (quest.reward.type === 'ticket') {
        const toolType = quest.reward.tool;
        const amount = quest.reward.amount || 1;
        
        if (gameData.unlockTickets[toolType] !== undefined) {
            gameData.unlockTickets[toolType] += amount;
            gameData.tools[toolType].unlockTickets += amount;
            addMessage(`任务完成！获得${amount}张${getToolName(toolType)}等级提升券！`);
        }
    } else if (quest.reward.type === 'gold') {
        gameData.player.gold += quest.reward.value;
        addMessage(`任务完成！获得${quest.reward.value}金币！`);
    }
    
    // 移除任务
    gameData.questHall.acceptedQuests.splice(questIndex, 1);
    
    // 检查升级
    checkLevelUp();
    
    updateQuestUI();
    updateUI();
    saveGame();
}

// 获取工具名称
function getToolName(toolType) {
    const toolNames = {
        pickaxe: '采矿锄',
        cart: '矿车',
        headlight: '头灯'
    };
    return toolNames[toolType] || toolType;
}

// 使用等级提升券
function useUnlockTicket(toolType) {
    // 检查工具是否存在
    if (!gameData.tools[toolType]) {
        addMessage('工具不存在！');
        return;
    }
    
    // 确保unlockTickets对象存在
    if (!gameData.unlockTickets) {
        gameData.unlockTickets = {
            pickaxe: 0,
            cart: 0,
            headlight: 0
        };
    }
    
    // 检查是否有足够的提升券
    if ((gameData.unlockTickets[toolType] || 0) <= 0) {
        addMessage(`没有${getToolName(toolType)}等级提升券！`);
        return;
    }
    
    // 确保工具对象有maxLevel属性
    if (gameData.tools[toolType].maxLevel === undefined) {
        gameData.tools[toolType].maxLevel = 50;
    }
    
    // 检查当前等级上限
    const currentMaxLevel = gameData.tools[toolType].maxLevel;
    
    // 提升等级上限（每次使用提升券增加1级上限）
    const newMaxLevel = currentMaxLevel + 1;
    
    // 消耗提升券
    gameData.unlockTickets[toolType]--;
    gameData.tools[toolType].unlockTickets--;
    
    // 更新等级上限
    gameData.tools[toolType].maxLevel = newMaxLevel;
    
    addMessage(`${getToolName(toolType)}等级上限已提升至${newMaxLevel}级！`);
    updateUI();
    saveGame();
}

// 放弃任务
function abandonQuest(questId) {
    const questIndex = gameData.questHall.acceptedQuests.findIndex(q => q.id === questId);
    if (questIndex === -1) return;
    
    const quest = gameData.questHall.acceptedQuests[questIndex];
    
    // 计算扣除的金币（任务物品价值的2倍）
    let penalty = 0;
    
    // 尝试找到与任务物品相关的矿物或其他物品的价格
    const mineral = minerals.find(m => m.name === quest.item);
    if (mineral) {
        const totalPrice = quest.amount * mineral.price;
        penalty = Math.floor(totalPrice * 2); // 惩罚为任务物品价值的2倍
    } else {
        // 如果找不到物品价格，使用默认惩罚
        penalty = Math.floor(quest.amount * 10 * 2); // 默认每个物品10金币，惩罚2倍
    }
    
    if (gameData.player.gold < penalty) {
        addMessage('金币不足，无法放弃任务！');
        return;
    }
    
    // 扣除金币
    gameData.player.gold -= penalty;
    
    // 移除任务
    gameData.questHall.acceptedQuests.splice(questIndex, 1);
    
    addMessage(`已放弃任务，扣除${penalty}金币作为惩罚！`);
    updateQuestUI();
    updateUI();
    saveGame();
}

// 更新任务UI
function updateQuestUI() {
    const questHallEl = document.getElementById('quest-hall');
    if (!questHallEl) return;
    
    if (!gameData.questHall || !gameData.questHall.unlocked) {
        questHallEl.innerHTML = '<div class="quest-hall-locked">任务大厅（25级解锁）</div>';
        return;
    }
    
    let html = '<h3>任务大厅</h3><div class="quest-penalty-notice" style="color: #FF0000; font-weight: bold; font-size: 1.1em; margin-bottom: 15px; padding: 10px; background-color: #FFF3F3; border-radius: 5px; border: 1px solid #FFCCCC;">⚠️ 放弃任务惩罚任务物品价值2倍金币！！！</div>';
    
    // 添加矿工协会按钮（只有拥有矿工徽章时显示）
    if (gameData.badges && gameData.badges.hasMinersBadge) {
        html += `
            <div class="quest-hall-actions" style="margin-bottom: 20px;">
                <button onclick="toggleMinersGuild()" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    矿工协会
                </button>
            </div>
        `;
    }
    
    // 显示已接受的任务
    if (gameData.questHall.acceptedQuests.length > 0) {
        html += '<div class="accepted-quests"><h4>已接受的任务</h4>';
        gameData.questHall.acceptedQuests.forEach(quest => {
            const collected = gameData.backpack.items[quest.item] || 0;
            const progress = Math.min(100, (collected / quest.amount) * 100);
            
            html += `
                <div class="quest-item">
                    <div class="quest-info">
                        <div class="quest-title">收集${quest.amount}个${quest.item}</div>
                        <div class="quest-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                            <span>${collected}/${quest.amount}</span>
                        </div>
                        <div class="quest-reward">
                            奖励: ${quest.reward.type === 'experience' ? quest.reward.value + '经验' : quest.reward.type === 'gold' ? quest.reward.value + '金币' : quest.reward.type === 'ticket' ? getToolName(quest.reward.tool) + '等级提升券' : quest.reward.value}
                        </div>
                    </div>
                    <div class="quest-actions">
                        <button class="complete-quest-btn" onclick="completeQuest(${quest.id})" ${collected >= quest.amount ? '' : 'disabled'}>完成</button>
                        <button class="abandon-quest-btn" onclick="abandonQuest(${quest.id})">放弃</button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    
    // 显示可用任务
    html += '<div class="available-quests"><h4>可用任务</h4>';
    
    // 添加金币刷新按钮
    if (gameData.questHall.quests.length > 0) {
        html += `
            <div style="margin-bottom: 15px;">
                <button onclick="refreshQuestsWithGold()" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    花费1000金币刷新任务
                </button>
            </div>
        `;
    }
    
    if (gameData.questHall.quests.length === 0) {
        html += '<div class="no-quests">暂无可用任务</div>';
    } else {
        gameData.questHall.quests.forEach(quest => {
            html += `
                <div class="quest-item">
                    <div class="quest-info">
                        <div class="quest-title">收集${quest.amount}个${quest.item}</div>
                        <div class="quest-reward">
                            奖励: ${quest.reward.type === 'experience' ? quest.reward.value + '经验' : quest.reward.type === 'gold' ? quest.reward.value + '金币' : quest.reward.type === 'ticket' ? getToolName(quest.reward.tool) + '等级提升券' : quest.reward.value}
                        </div>
                    </div>
                    <div class="quest-actions">
                        <button class="accept-quest-btn" onclick="acceptQuest(${quest.id})">接受</button>
                    </div>
                </div>
            `;
        });
    }
    
    // 显示刷新时间和进度条
    const timeLeft = Math.max(0, Math.ceil((gameData.questHall.lastRefreshTime + gameData.questHall.refreshInterval - Date.now()) / 1000));
    const totalTime = gameData.questHall.refreshInterval / 1000;
    const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
    html += `
        <div class="quest-refresh-container">
            <div class="quest-refresh-time">下次刷新: ${timeLeft}秒</div>
            <div class="quest-refresh-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
            </div>
        </div>
    `;
    html += '</div>';
    
    questHallEl.innerHTML = html;
}

// 启动挂机计时器
function startAfkTimer() {
    // 清除现有的计时器（如果有）
    if (afkTimerInterval) {
        clearInterval(afkTimerInterval);
    }
    
    // 重置计时器
    afkTimerSeconds = 0;
    
    // 每秒钟更新一次计时器
    afkTimerInterval = setInterval(() => {
        afkTimerSeconds++;
        updateAfkTimerDisplay();
    }, 1000);
}

// 更新挂机计时器显示
function updateAfkTimerDisplay() {
    const hours = Math.floor(afkTimerSeconds / 3600);
    const minutes = Math.floor((afkTimerSeconds % 3600) / 60);
    const seconds = afkTimerSeconds % 60;
    
    // 格式化时间为 时:分:秒
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // 更新界面显示
    const timerElement = document.getElementById('afk-timer');
    if (timerElement) {
        timerElement.textContent = formattedTime;
    }
}

function generateMineralGrid() {
    const grid = document.getElementById('mineral-grid');
    grid.innerHTML = '';
    minerals.forEach(mineral => {
        const mineralEl = document.createElement('div');
        mineralEl.className = 'mineral';
        mineralEl.dataset.name = mineral.name;
        // 采矿锄加速效果：每5级一个阶段，40级以后每级加速效果减少
        // 检查是否有丢失矿锄效果
        const hasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
        
        // 确保采矿锄等级存在且有效
        const pickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
        let pickaxeBonus = 0;
        
        if (!hasLostPickaxeEffect) {
            if (pickaxeLevel < 40) {
                // 40级以前：每5级一个阶段，每个阶段增加9%的加速效果
                const stage = Math.min(8, Math.floor(pickaxeLevel / 5) + 1);
                pickaxeBonus = stage * 0.09;
            } else {
                // 40级以后：每级增加0.5%的加速效果
                const baseBonus = 0.72; // 40级时的基础加速效果（8个阶段 × 9%）
                const additionalBonus = (pickaxeLevel - 39) * 0.005;
                pickaxeBonus = baseBonus + additionalBonus;
            }
            
            // 最高加速效果限制在90%
            pickaxeBonus = Math.min(0.9, pickaxeBonus);
        }
        const actualTime = mineral.baseTime * (1 - pickaxeBonus);
        // 调试信息已移除
        const canMine = gameData.player.level >= mineral.minLevel && 
                       (!mineral.toolReq || gameData.tools.pickaxe.level >= mineral.toolReq);
        const isCurrentlyMining = continuousMining && currentContinuousMineral === mineral.name;
        let continuousBtnText = '';
        let continuousBtnDisabled = !canMine;
        // 连续采矿解锁条件：等级限制是前提，单一矿物10次采矿解锁或5级采矿锄解锁（满足其中一个即可）
        const miningCount = gameData.miningCount[mineral.name] || 0;
        const isContinuousUnlocked = gameData.tools.pickaxe.level >= 5 || miningCount >= 10;
        if (isCurrentlyMining) {
            continuousBtnText = '停止连续开采';
            continuousBtnDisabled = false;
        } else if (isContinuousUnlocked && canMine) {
            continuousBtnText = '连续开采 (已解锁)';
            continuousBtnDisabled = false;
        } else if (isContinuousUnlocked) {
            continuousBtnText = '连续开采 (等级不足)';
            continuousBtnDisabled = true;
        } else {
            continuousBtnText = `连续开采 (需要采矿锄5级或开采该矿物10次)`;
            continuousBtnDisabled = !canMine || (gameData.tools.pickaxe.level < 5 && miningCount < 10);
        }
        let dropsHTML = '';
        if (mineral.drops) {
            dropsHTML = '<div class="mineral-drops">副产物: ';
            mineral.drops.forEach((drop, index) => {
                dropsHTML += `${drop.name} (${(drop.chance * 100).toFixed(0)}%)`;
                if (index < mineral.drops.length - 1) {
                    dropsHTML += ', ';
                }
            });
            dropsHTML += '</div>';
        }
        
        // 添加经验值信息
        let expHTML = `<div class="mineral-exp">经验值: ${mineral.exp}</div>`;
        
        // 添加合金配方掉落几率信息
        let recipeHTML = '';
        
        // 检查是否有铁匠祝福效果
        const hasBlacksmithBlessing = gameData.activeEffects && gameData.activeEffects.blacksmithBlessing && gameData.activeEffects.blacksmithBlessing.active;
        const blessingBonus = hasBlacksmithBlessing ? 5 : 0; // 铁匠祝福增加5%爆率
        
        switch (mineral.name) {
            case '铁矿':
                const ironBaseChance = 10;
                const ironActualChance = ironBaseChance + blessingBonus;
                recipeHTML = `<div class="mineral-recipe" style="color: green;">合金配方: 铜铁合金配方 (${ironActualChance}%)${hasBlacksmithBlessing ? ' <span style="color: gold;">(铁匠祝福+5%)</span>' : ''}</div>`;
                break;
            case '钴矿':
                const cobaltBaseChance = 1;
                const cobaltActualChance = cobaltBaseChance + blessingBonus;
                recipeHTML = `<div class="mineral-recipe" style="color: green;">合金配方: 铜钴合金配方 (${cobaltActualChance}%)${hasBlacksmithBlessing ? ' <span style="color: gold;">(铁匠祝福+5%)</span>' : ''}</div>`;
                break;
            case '镍矿':
                const nickelBaseChance = 0.1;
                const nickelActualChance = nickelBaseChance + blessingBonus;
                recipeHTML = `<div class="mineral-recipe" style="color: green;">合金配方: 铜镍合金配方 (${nickelActualChance}%)${hasBlacksmithBlessing ? ' <span style="color: gold;">(铁匠祝福+5%)</span>' : ''}</div>`;
                break;
            case '银矿':
                const silverBaseChance = 0.01;
                const silverActualChance = silverBaseChance + blessingBonus;
                recipeHTML = `<div class="mineral-recipe" style="color: green;">合金配方: 铜银合金配方 (${silverActualChance}%)${hasBlacksmithBlessing ? ' <span style="color: gold;">(铁匠祝福+5%)</span>' : ''}</div>`;
                break;
        }
        
        mineralEl.innerHTML = `
            <div class="mineral-name">${mineral.name}</div>
            <div class="mineral-level">需求等级: ${mineral.minLevel}+</div>
            ${dropsHTML}
            ${expHTML}
            ${recipeHTML}
            <div class="mineral-time">开采时间: ${mineral.baseTime}秒</div>
            <div class="mineral-price">价格: ${mineral.price}金币</div>
            <button class="mine-btn" ${!canMine || isCurrentlyMining ? 'disabled' : ''}>开采</button>
            <button class="continuous-mine-btn" ${continuousBtnDisabled ? 'disabled' : ''}>${continuousBtnText}</button>
            <div class="progress-container" style="display: none;">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="countdown">0.0s</div>
            </div>
        `;
        grid.appendChild(mineralEl);
        mineralEl.addEventListener('click', () => selectMineral(mineral.name));
        mineralEl.querySelector('.mine-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            mineMineral(mineral.name);
        });
        mineralEl.querySelector('.continuous-mine-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            continuousMine(mineral.name);
        });
    });
}

function generateBackpack() {
    const grid = document.getElementById('backpack-grid');
    grid.innerHTML = '';
    for (let i = 0; i < gameData.backpack.capacity; i++) {
        const slot = document.createElement('div');
        slot.className = 'backpack-slot empty';
        slot.dataset.index = i;
        grid.appendChild(slot);
    }
    updateBackpackDisplay();
}

function generateExpansionSlots() {
    const slotsContainer = document.getElementById('expansion-slots');
    slotsContainer.innerHTML = '';
    if (!gameData.backpack.expansionSlots) {
        gameData.backpack.expansionSlots = [];
    }
    while (gameData.backpack.expansionSlots.length < gameData.backpack.maxExpansionSlots) {
        gameData.backpack.expansionSlots.push(null);
    }
    gameData.backpack.expansionSlots.forEach((expansion, index) => {
        const slot = document.createElement('div');
        slot.className = `expansion-slot ${expansion ? 'filled' : ''}`;
        slot.dataset.index = index;
        let slotHTML = '';
        if (expansion && backpackExpansions[expansion]) {
            const expData = backpackExpansions[expansion];
            slotHTML = `
                <div class="slot-content">${expansion}</div>
                <div class="slot-description">${expData.description}</div>
                <button class="remove-btn" onclick="removeExpansion(${index})">移除</button>
            `;
        } else {
            slotHTML = '<div class="slot-content">空</div>';
        }
        slot.innerHTML = slotHTML;
        slotsContainer.appendChild(slot);
        slot.addEventListener('click', () => {
            if (!expansion) {
                showExpansionSelection(index);
            }
        });
    });
    const filledSlots = gameData.backpack.expansionSlots.filter(exp => exp !== null).length;
    const slotsTitle = document.querySelector('.backpack-expansions h3');
    slotsTitle.textContent = `背包扩充栏位 (${filledSlots}/${gameData.backpack.maxExpansionSlots})`;
}

function showExpansionSelection(slotIndex) {
    const expansionsInBackpack = [];
    // 检查主背包中的扩充背包
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        const baseName = itemName.split('_')[0];
        if (baseName in backpackExpansions) {
            if (!expansionsInBackpack.includes(baseName)) {
                expansionsInBackpack.push(baseName);
            }
        }
    }
    // 检查临时背包中的扩充背包
    for (const [itemName, count] of Object.entries(gameData.tempBackpack.items)) {
        const baseName = itemName.split('_')[0];
        if (baseName in backpackExpansions) {
            if (!expansionsInBackpack.includes(baseName)) {
                expansionsInBackpack.push(baseName);
            }
        }
    }
    // 调试信息
    console.log('主背包物品:', gameData.backpack.items);
    console.log('临时背包物品:', gameData.tempBackpack.items);
    console.log('检测到的扩充背包:', expansionsInBackpack);
    console.log('可用的扩充背包类型:', Object.keys(backpackExpansions));
    if (expansionsInBackpack.length === 0) {
        alert('背包中没有可使用的背包扩充！');
        return;
    }
    let panelHTML = '<div class="expansion-selection-panel">';
    panelHTML += '<h3>选择要使用的背包扩充</h3>';
    panelHTML += '<div class="expansion-list">';
    const uniqueExpansions = [...new Set(expansionsInBackpack)];
    uniqueExpansions.forEach(expansion => {
        const expData = backpackExpansions[expansion];
        panelHTML += `
            <div class="expansion-option">
                <div class="expansion-name">${expansion}</div>
                <div class="expansion-description">${expData.description}</div>
                <button onclick="useExpansion('${expansion}', ${slotIndex})">使用</button>
            </div>
        `;
    });
    panelHTML += '</div>';
    panelHTML += '</div>';
    const existingPanel = document.querySelector('.expansion-selection-panel');
    if (existingPanel) {
        existingPanel.remove();
    }
    const panel = document.createElement('div');
    panel.className = 'expansion-selection-overlay';
    panel.innerHTML = panelHTML;
    document.body.appendChild(panel);
    panel.addEventListener('click', (e) => {
        if (e.target === panel) {
            panel.remove();
        }
    });
}

function useExpansion(expansionName, slotIndex) {
    let hasExpansion = false;
    let itemToRemove = null;
    let isFromTemp = false;
    
    // 检查主背包中的扩充背包
    const backpackEntries = Object.entries(gameData.backpack.items);
    for (const [itemName, count] of backpackEntries) {
        const baseName = itemName.split('_')[0];
        if (baseName === expansionName) {
            hasExpansion = true;
            itemToRemove = itemName;
            isFromTemp = false;
            break;
        }
    }
    
    // 如果主背包中没有，检查临时背包中的扩充背包
    if (!hasExpansion) {
        const tempEntries = Object.entries(gameData.tempBackpack.items);
        for (const [itemName, count] of tempEntries) {
            const baseName = itemName.split('_')[0];
            if (baseName === expansionName) {
                hasExpansion = true;
                itemToRemove = itemName;
                isFromTemp = true;
                break;
            }
        }
    }
    
    if (!hasExpansion) {
        alert('背包中没有该背包扩充！');
        return;
    }
    
    const currentExpansion = gameData.backpack.expansionSlots[slotIndex];
    if (currentExpansion) {
        addToBackpack(currentExpansion);
    }
    
    gameData.backpack.expansionSlots[slotIndex] = expansionName;
    
    // 从相应的背包中消耗物品
    if (isFromTemp) {
        // 确保itemToRemove存在于临时背包中
        if (gameData.tempBackpack.items[itemToRemove]) {
            gameData.tempBackpack.items[itemToRemove]--;
            if (gameData.tempBackpack.items[itemToRemove] <= 0) {
                delete gameData.tempBackpack.items[itemToRemove];
            }
            updateTempBackpackDisplay();
        }
    } else {
        consumeItem(expansionName, 1);
    }
    calculateBackpackStats();
    updateBackpackDisplay();
    generateExpansionSlots();
    updateUI();
    addMessage(`使用了${expansionName}，背包属性已更新！`);
    const panel = document.querySelector('.expansion-selection-overlay');
    if (panel) {
        panel.remove();
    }
}

function removeExpansion(slotIndex) {
    const expansion = gameData.backpack.expansionSlots[slotIndex];
    if (expansion) {
        const currentItems = { ...gameData.backpack.items };
        const currentExpansionSlots = [...gameData.backpack.expansionSlots];
        currentExpansionSlots[slotIndex] = null;
        
        let tempCapacity = gameData.backpack.baseCapacity;
        let tempStackSize = gameData.backpack.baseStackSize;
        currentExpansionSlots.forEach(exp => {
            if (exp && backpackExpansions[exp]) {
                const expData = backpackExpansions[exp];
                if (expData.effect.capacity) {
                    tempCapacity += expData.effect.capacity;
                }
                if (expData.effect.stackSize) {
                    tempStackSize += expData.effect.stackSize;
                }
            }
        });
        
        // 移除扩充背包
        gameData.backpack.expansionSlots[slotIndex] = null;
        calculateBackpackStats();
        
        // 检查并处理溢出物品
        const itemEntries = Object.entries(currentItems);
        gameData.backpack.items = {};
        let overflowCount = 0;
        
        for (const [itemName, count] of itemEntries) {
            const baseName = itemName.split('_')[0];
            for (let i = 0; i < count; i++) {
                // 尝试添加到背包
                let added = false;
                const backpackItems = { ...gameData.backpack.items };
                for (const [name, backpackCount] of Object.entries(backpackItems)) {
                    const backpackBaseName = name.split('_')[0];
                    if (backpackBaseName === baseName && backpackCount < gameData.backpack.currentStackSize) {
                        gameData.backpack.items[name]++;
                        added = true;
                        break;
                    }
                }
                if (!added) {
                    const backpackItemCount = Object.keys(gameData.backpack.items).length;
                    if (backpackItemCount < gameData.backpack.capacity) {
                        let suffix = 1;
                        let newItemName = baseName;
                        while (gameData.backpack.items[newItemName]) {
                            suffix++;
                            newItemName = `${baseName}_${suffix}`;
                        }
                        gameData.backpack.items[newItemName] = 1;
                        added = true;
                    }
                }
                if (!added) {
                    // 背包满了，放入临时背包
                    addToTempBackpack(baseName, 1);
                    overflowCount++;
                }
            }
        }
        
        // 最后添加扩充背包
        addToBackpack(expansion);
        
        if (overflowCount > 0) {
            addMessage(`背包空间不足，${overflowCount}个物品已放入临时背包！`);
        }
        
        updateBackpackDisplay();
        generateExpansionSlots();
        updateUI();
        addMessage(`移除了${expansion}，背包属性已更新！`);
    }
}

function updateBackpackDisplay() {
    const slots = document.querySelectorAll('.backpack-slot');
    const items = Object.entries(gameData.backpack.items);
    slots.forEach(slot => {
        slot.className = 'backpack-slot empty';
        slot.innerHTML = '';
        slot.onclick = null;
    });
    items.forEach(([itemName, count], index) => {
        if (index < slots.length) {
            const slot = slots[index];
            slot.className = 'backpack-slot';
            
            // 解析物品名称，特别是插片
            const slotInfo = getSlotBaseAndRarity(itemName);
            const baseName = slotInfo.baseName;
            const rarity = slotInfo.rarity || 'common';
            const effect = slotInfo.effect || '';
            
            // 获取显示名称
            let displayName;
            if (baseName.includes('Slot')) {
                displayName = getSlotName(baseName);
            } else {
                displayName = materialNameMap[baseName] || baseName;
            }
            
            // 获取稀有度中文名称
            let rarityName;
            switch (rarity) {
                case 'common': rarityName = '普通'; break;
                case 'uncommon': rarityName = '稀有'; break;
                case 'rare': rarityName = '史诗'; break;
                case 'epic': rarityName = '传说'; break;
                default: rarityName = rarity;
            }
            
            // 检查是否是插片
            if (baseName.includes('Slot')) {
                slot.innerHTML = `
                    <div class="item-name">${displayName}</div>
                    <div class="item-rarity">${rarityName}</div>
                    ${effect ? `<div class="item-effect">${effect}</div>` : ''}
                    <div class="item-count">${count}/${gameData.backpack.currentStackSize}</div>
                `;
            } else {
                slot.innerHTML = `
                    <div class="item-name">${displayName}</div>
                    <div class="item-count">${count}/${gameData.backpack.currentStackSize}</div>
                `;
            }
            // 添加点击事件监听器
            slot.onclick = () => handleItemClick(itemName, displayName, rarity, effect);
        }
    });
    document.getElementById('backpack-capacity').textContent = items.length;
    document.getElementById('backpack-max').textContent = gameData.backpack.capacity;
    const backpackTitle = document.querySelector('.backpack h2');
    backpackTitle.innerHTML = `背包 (容量: <span id="backpack-capacity">${items.length}</span>/<span id="backpack-max">${gameData.backpack.capacity}</span>) <span class="stack-size">(堆叠: ${gameData.backpack.currentStackSize})</span>`;
    showItemTotals();
}

// 处理背包物品点击
function handleItemClick(itemName, displayName, rarity, effect) {
    // 如果是扎啤，显示使用界面
    if (displayName === '扎啤') {
        showUseBeerDialog(itemName);
    } else if (itemName.includes('Slot')) {
        // 显示插片详细信息
        showSlotDetails(itemName, displayName, rarity, effect);
    }
}

// 显示插片详细信息
function showSlotDetails(itemName, displayName, rarity, effect) {
    const parts = itemName.split('_');
    const baseName = parts[0];
    
    // 获取插片类型
    let slotType;
    switch (baseName) {
        case 'toolSlot1': slotType = 'base'; break;
        case 'headlightSlot': slotType = 'headlight'; break;
        case 'cartSlot': slotType = 'cart'; break;
        case 'pickaxeSlot': slotType = 'pickaxe'; break;
        default: slotType = 'base';
    }
    
    // 获取稀有度中文名称
    let rarityName;
    switch (rarity) {
        case 'common': rarityName = '普通'; break;
        case 'uncommon': rarityName = '稀有'; break;
        case 'rare': rarityName = '史诗'; break;
        case 'epic': rarityName = '传说'; break;
        default: rarityName = rarity;
    }
    
    // 获取效果描述
    const effectDescription = getSlotEffectDescription(baseName, rarity, effect);
    
    // 创建对话框
    const panel = document.createElement('div');
    panel.className = 'slot-details-overlay';
    panel.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1001;
        animation: fadeIn 0.3s ease-in-out;
    `;
    
    panel.innerHTML = `
        <div class="slot-details-panel">
            <div class="slot-details-header">
                <h3>${displayName}</h3>
                <button onclick="this.closest('.slot-details-overlay').remove()" style="padding: 5px 10px; background-color: #f44336; color: white; border: none; border-radius: 3px; cursor: pointer;">关闭</button>
            </div>
            <div class="slot-details-content">
                <div class="slot-info-item">
                    <span class="slot-info-label">稀有度:</span>
                    <span class="slot-info-value">${rarityName}</span>
                </div>
                <div class="slot-info-item">
                    <span class="slot-info-label">类型:</span>
                    <span class="slot-info-value">${slotType === 'base' ? '基础' : slotType === 'headlight' ? '头灯' : slotType === 'cart' ? '矿车' : '采矿锄'}</span>
                </div>
                <div class="slot-info-item">
                    <span class="slot-info-label">效果:</span>
                    <span class="slot-info-value">${effect || '无'}</span>
                </div>
                <div class="slot-info-item">
                    <span class="slot-info-label">效果描述:</span>
                    <span class="slot-info-value">${effectDescription}</span>
                </div>
                <div class="slot-info-item">
                    <span class="slot-info-label">描述:</span>
                    <span class="slot-info-value">${slotType === 'base' ? '基础工具插片，用于徽章升级和制作各种工具插片' : slotType === 'headlight' ? '头灯专用插片，用于提升头灯性能' : slotType === 'cart' ? '矿车专用插片，用于提升矿车性能' : '采矿锄专用插片，用于提升采矿锄性能'}</span>
                </div>
            </div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .slot-details-panel {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 500px;
            animation: slideIn 0.3s ease-out;
        }
        .slot-details-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: linear-gradient(90deg, #2c3e50 0%, #34495e 100%);
            color: white;
            border-radius: 12px 12px 0 0;
        }
        .slot-details-header h3 {
            margin: 0;
            font-size: 1.5em;
            font-weight: 600;
        }
        .slot-details-content {
            padding: 20px;
        }
        .slot-info-item {
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;
        }
        .slot-info-label {
            font-weight: 600;
            margin-bottom: 5px;
            color: #333;
        }
        .slot-info-value {
            color: #666;
            line-height: 1.4;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(panel);
    
    panel.addEventListener('click', (e) => {
        if (e.target === panel) {
            panel.remove();
            document.head.removeChild(style);
        }
    });
}

// 显示使用扎啤的对话框
function showUseBeerDialog(itemName) {
    // 创建对话框
    const panel = document.createElement('div');
    panel.className = 'use-beer-overlay';
    panel.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1001;
        animation: fadeIn 0.3s ease-in-out;
    `;
    
    panel.innerHTML = `
        <div class="use-beer-panel">
            <div class="use-beer-header">
                <h3>使用扎啤</h3>
                <button onclick="this.closest('.use-beer-overlay').remove()" style="padding: 5px 10px; background-color: #f44336; color: white; border: none; border-radius: 3px; cursor: pointer;">关闭</button>
            </div>
            <div class="use-beer-content">
                <p>选择要提升亲密度的矿工：</p>
                <select id="miner-select">
                    ${gameData.minersGuild.miners.map((miner, index) => 
                        `<option value="${index}">${miner.name} (等级${miner.level}，亲密度${miner.intimacy})</option>`
                    ).join('')}
                </select>
                <div class="use-beer-actions">
                    <button onclick="useBeer('${itemName}', document.getElementById('miner-select').value); this.closest('.use-beer-overlay').remove()" class="use-btn">使用扎啤</button>
                </div>
            </div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .use-beer-panel {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 500px;
            animation: slideIn 0.3s ease-out;
        }
        .use-beer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: linear-gradient(90deg, #2c3e50 0%, #34495e 100%);
            color: white;
            border-radius: 12px 12px 0 0;
        }
        .use-beer-header h3 {
            margin: 0;
            font-size: 1.5em;
            font-weight: 600;
        }
        .use-beer-content {
            padding: 25px;
        }
        .use-beer-content p {
            margin: 0 0 15px 0;
            color: #2c3e50;
            font-size: 1.1em;
        }
        #miner-select {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 1em;
            margin-bottom: 20px;
            background: white;
        }
        .use-beer-actions {
            display: flex;
            justify-content: center;
        }
        .use-btn {
            padding: 12px 30px;
            background: linear-gradient(45deg, #27ae60 0%, #229954 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .use-btn:hover {
            background: linear-gradient(45deg, #229954 0%, #1e8449 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(panel);
}

// 使用扎啤提升矿工亲密度
function useBeer(itemName, minerIndex) {
    const miner = gameData.minersGuild.miners[minerIndex];
    if (!miner) {
        addMessage('矿工不存在！');
        return;
    }
    
    // 检查背包中是否有扎啤
    if (!gameData.backpack.items[itemName] || gameData.backpack.items[itemName] <= 0) {
        createNPCDialoguePanel('喝酒提示', miner.name, '伙计，你的酒呢？别耍我！');
        return;
    }
    
    // 消耗1个扎啤
    consumeItem(itemName, 1);
    
    // 提升亲密度50点
    miner.intimacy = (miner.intimacy || 0) + 50;
    
    createNPCDialoguePanel('使用成功', miner.name, `谢谢你的酒！我的亲密度提升了50点，现在感觉和你更亲近了！`);
    
    // 更新UI
    updateBackpackDisplay();
    
    // 更新矿工列表显示
    const minersList = document.getElementById('miners-list');
    if (minersList) {
        minersList.innerHTML = generateMinersList();
    }
    
    saveGame();
}

function selectMineral(mineralName) {
    document.querySelectorAll('.mineral').forEach(mineral => {
        mineral.classList.remove('selected');
    });
    const selectedMineral = document.querySelector(`[data-name="${mineralName}"]`);
    selectedMineral.classList.add('selected');
    gameData.selectedMineral = mineralName;
}

function mineMineral(mineralName) {
    if (continuousMining) {
        return;
    }
    // 检查临时背包是否有物品
    if (hasTempItems()) {
        alert('临时背包中有物品，请先处理临时背包中的物品！');
        return;
    }
    const mineral = minerals.find(m => m.name === mineralName);
    if (!mineral) return;
    const mineralEl = document.querySelector(`[data-name="${mineralName}"]`);
    if (!mineralEl) return;
    const progressContainer = mineralEl.querySelector('.progress-container');
    const progressFill = mineralEl.querySelector('.progress-fill');
    const countdown = mineralEl.querySelector('.countdown');
    const mineBtn = mineralEl.querySelector('.mine-btn');
    const continuousBtn = mineralEl.querySelector('.continuous-mine-btn');
    progressContainer.style.display = 'block';
    progressFill.style.width = '0%';
    mineBtn.disabled = true;
    continuousBtn.disabled = true;
    // 采矿锄加速效果：每5级一个阶段，40级以后每级加速效果减少
    // 检查是否有丢失矿锄效果
    const hasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
    
    // 确保采矿锄等级存在且有效
    const pickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
    let pickaxeBonus = 0;
    
    if (!hasLostPickaxeEffect) {
        if (pickaxeLevel < 40) {
            // 40级以前：每5级一个阶段，每个阶段增加9%的加速效果
            const stage = Math.min(8, Math.floor(pickaxeLevel / 5) + 1);
            pickaxeBonus = stage * 0.09;
        } else {
            // 40级以后：每级增加0.5%的加速效果
            const baseBonus = 0.72; // 40级时的基础加速效果（8个阶段 × 9%）
            const additionalBonus = (pickaxeLevel - 39) * 0.005;
            pickaxeBonus = baseBonus + additionalBonus;
        }
        
        // 最高加速效果限制在90%
        pickaxeBonus = Math.min(0.9, pickaxeBonus);
    }
    const actualTime = mineral.baseTime * (1 - pickaxeBonus);
    // 调试信息：显示矿锄等级和计算出的实际时间
    console.log(`矿锄等级: ${pickaxeLevel}, 加速效果: ${(pickaxeBonus * 100).toFixed(2)}%, 基础时间: ${mineral.baseTime}s, 实际时间: ${actualTime.toFixed(2)}s`);
    let elapsed = 0;
    const interval = 100;
    countdown.textContent = `${actualTime.toFixed(2)}s`;
    const miningInterval = setInterval(() => {
        elapsed += interval;
        const progress = Math.min(100, (elapsed / (actualTime * 1000)) * 100);
        const remaining = Math.max(0, actualTime - (elapsed / 1000));
        progressFill.style.width = `${progress}%`;
        countdown.textContent = `${remaining.toFixed(2)}s`;
        if (progress >= 100) {
            clearInterval(miningInterval);
            progressContainer.style.display = 'none';
            mineBtn.disabled = false;
            const isContinuousUnlocked = gameData.tools.pickaxe.level >= 5;
            const canMine = gameData.player.level >= mineral.minLevel && 
                           (!mineral.toolReq || gameData.tools.pickaxe.level >= mineral.toolReq);
            if (isContinuousUnlocked && canMine) {
                continuousBtn.disabled = false;
                continuousBtn.textContent = '连续开采 (已解锁)';
            } else if (isContinuousUnlocked) {
                continuousBtn.disabled = true;
                continuousBtn.textContent = '连续开采 (等级不足)';
            } else {
                continuousBtn.disabled = true;
                continuousBtn.textContent = `连续开采 (需要采矿锄5级)`;
            }
            completeMining(mineral);
        }
    }, interval);
}

let continuousMining = false;
let currentContinuousMineral = null;
let continuousMiningInterval = null;
let continuousProgressInterval = null;
let continuousElapsedTime = 0;

// 监听页面可见性变化
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面进入后台，记录当前时间戳
        localStorage.setItem('miningGameBackgroundTime', Date.now().toString());
    } else {
        // 页面回到前台，计算经过的时间
        const backgroundTime = localStorage.getItem('miningGameBackgroundTime');
        if (backgroundTime) {
            const elapsedTime = (Date.now() - parseInt(backgroundTime)) / 1000;
            // 处理经过的时间，更新游戏状态
            handleBackgroundTime(elapsedTime);
            // 清除存储的时间戳
            localStorage.removeItem('miningGameBackgroundTime');
        }
    }
});

// 处理后台经过的时间
function handleBackgroundTime(elapsedTime) {
    // 限制最大处理时间为1小时，避免处理过长时间
    const MAX_ELAPSED_TIME = 3600;
    const processedTime = Math.min(elapsedTime, MAX_ELAPSED_TIME);
    
    // 检查是否有正在进行的采矿
    if (continuousMining && currentContinuousMineral) {
        const mineral = minerals.find(m => m.name === currentContinuousMineral);
        if (mineral) {
            // 计算加速后的采矿时间
            // 检查是否有丢失矿锄效果
            const hasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
            
            // 采矿锄加速效果：每5级一个阶段，40级以后每级加速效果减少
            // 确保采矿锄等级存在且有效
            const pickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
            let pickaxeBonus = 0;
            
            if (!hasLostPickaxeEffect) {
                if (pickaxeLevel < 40) {
                    // 40级以前：每5级一个阶段，每个阶段增加9%的加速效果
                    const stage = Math.min(8, Math.floor(pickaxeLevel / 5) + 1);
                    pickaxeBonus = stage * 0.09;
                } else {
                    // 40级以后：每级增加0.5%的加速效果
                    const baseBonus = 0.72; // 40级时的基础加速效果（8个阶段 × 9%）
                    const additionalBonus = (pickaxeLevel - 39) * 0.005;
                    pickaxeBonus = baseBonus + additionalBonus;
                }
                
                // 最高加速效果限制在90%
                pickaxeBonus = Math.min(0.9, pickaxeBonus);
            }
            const actualTime = mineral.baseTime * (1 - pickaxeBonus);
            
            // 计算在后台完成的采矿次数
            const completedMines = Math.floor(processedTime / actualTime);
            
            // 定义每批次处理的最大采矿次数
            const MAX_MINES_PER_BATCH = 10;
            
            // 处理当前批次的采矿
            const minesToProcess = Math.min(completedMines, MAX_MINES_PER_BATCH);
            
            for (let i = 0; i < minesToProcess && continuousMining; i++) {
                completeMining(mineral, true); // 传入true表示后台模式
            }
            
            // 计算剩余采矿次数
            const remainingMines = completedMines - minesToProcess;
            
            if (remainingMines > 0) {
                // 计算剩余时间
                const remainingTime = remainingMines * actualTime;
                
                // 使用setTimeout分批次处理剩余采矿
                setTimeout(() => {
                    handleBackgroundTime(remainingTime);
                }, 0);
            } else {
                // 计算剩余时间，更新当前采矿进度
                const remainingTime = processedTime % actualTime;
                if (remainingTime > 0) {
                    // 更新当前采矿进度
                    continuousElapsedTime = remainingTime * 1000; // 转换为毫秒
                    const progress = Math.min(100, (continuousElapsedTime / (actualTime * 1000)) * 100);
                    const remaining = Math.max(0, actualTime - remainingTime);
                    
                    // 更新UI
                    const mineralEl = document.querySelector(`[data-name="${currentContinuousMineral}"]`);
                    if (mineralEl) {
                        const progressFill = mineralEl.querySelector('.progress-fill');
                        const countdown = mineralEl.querySelector('.countdown');
                        if (progressFill && countdown) {
                            progressFill.style.width = `${progress}%`;
                            countdown.textContent = `${remaining.toFixed(2)}s`;
                        }
                    }
                }
            }
        }
    }
}

function continuousMine(mineralName) {
    const mineral = minerals.find(m => m.name === mineralName);
    if (!mineral) return;
    const mineralEl = document.querySelector(`[data-name="${mineralName}"]`);
    if (!mineralEl) return;
    const mineBtn = mineralEl.querySelector('.mine-btn');
    const continuousBtn = mineralEl.querySelector('.continuous-mine-btn');
    const progressContainer = mineralEl.querySelector('.progress-container');
    const progressFill = mineralEl.querySelector('.progress-fill');
    const countdown = mineralEl.querySelector('.countdown');
    if (continuousMining) {
        stopContinuousMining();
        return;
    }
    // 检查临时背包是否有物品
    if (hasTempItems()) {
        alert('临时背包中有物品，请先处理临时背包中的物品！');
        return;
    }
    // 检查等级限制
    const canMine = gameData.player.level >= mineral.minLevel && 
                   (!mineral.toolReq || gameData.tools.pickaxe.level >= mineral.toolReq);
    if (!canMine) {
        alert('等级不足，无法连续开采此矿物！');
        return;
    }
    // 检查连续采矿解锁条件：采矿锄5级或开采该矿物10次（满足其中一个即可）
    const miningCount = gameData.miningCount[mineral.name] || 0;
    if (gameData.tools.pickaxe.level < 5 && miningCount < 10) {
        alert('连续开采未解锁，需要采矿锄5级或开采该矿物10次！');
        return;
    }
    continuousMining = true;
    currentContinuousMineral = mineralName;
    continuousElapsedTime = 0;
    mineBtn.disabled = true;
    continuousBtn.textContent = '停止连续开采';
    progressContainer.style.display = 'block';
    // 采矿锄加速效果：每5级一个阶段，40级以后每级加速效果减少
    // 检查是否有丢失矿锄效果
    const hasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
    
    // 确保采矿锄等级存在且有效
    const pickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
    let pickaxeBonus = 0;
    
    if (!hasLostPickaxeEffect) {
        if (pickaxeLevel < 40) {
            // 40级以前：每5级一个阶段，每个阶段增加9%的加速效果
            const stage = Math.min(8, Math.floor(pickaxeLevel / 5) + 1);
            pickaxeBonus = stage * 0.09;
        } else {
            // 40级以后：每级增加0.5%的加速效果
            const baseBonus = 0.72; // 40级时的基础加速效果（8个阶段 × 9%）
            const additionalBonus = (pickaxeLevel - 39) * 0.005;
            pickaxeBonus = baseBonus + additionalBonus;
        }
        
        // 最高加速效果限制在90%
        pickaxeBonus = Math.min(0.9, pickaxeBonus);
    }
    const actualTime = mineral.baseTime * (1 - pickaxeBonus);
    // 调试信息：显示矿锄等级和计算出的实际时间
    console.log(`矿锄等级: ${pickaxeLevel}, 加速效果: ${(pickaxeBonus * 100).toFixed(2)}%, 基础时间: ${mineral.baseTime}s, 实际时间: ${actualTime.toFixed(2)}s`);
    const interval = 100;
    progressFill.style.width = '0%';
    countdown.textContent = `${actualTime.toFixed(2)}s`;
    // 创建进度更新间隔
    function createProgressInterval(miningTime) {
        if (continuousProgressInterval) {
            clearInterval(continuousProgressInterval);
        }
        continuousElapsedTime = 0;
        continuousProgressInterval = setInterval(() => {
            continuousElapsedTime += interval;
            const progress = Math.min(100, (continuousElapsedTime / (miningTime * 1000)) * 100);
            const remaining = Math.max(0, miningTime - (continuousElapsedTime / 1000));
            const currentMineralEl = document.querySelector(`[data-name="${currentContinuousMineral}"]`);
            if (currentMineralEl) {
                const currentProgressFill = currentMineralEl.querySelector('.progress-fill');
                const currentCountdown = currentMineralEl.querySelector('.countdown');
                if (currentProgressFill && currentCountdown) {
                    currentProgressFill.style.width = `${progress}%`;
                    currentCountdown.textContent = `${remaining.toFixed(2)}s`;
                }
            }
        }, interval);
    }
    
    // 初始创建进度更新间隔
    createProgressInterval(actualTime);
    // 定义一个函数来处理连续采矿
    function startNextMining() {
        const currentMineral = minerals.find(m => m.name === currentContinuousMineral);
        if (currentMineral && continuousMining) {
            // 重新计算加速效果，确保等级提升后效果立即生效
            // 检查是否有丢失矿锄效果
            const hasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
            const pickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
            let pickaxeBonus = 0;
            
            if (!hasLostPickaxeEffect) {
                if (pickaxeLevel < 40) {
                    // 40级以前：每5级一个阶段，每个阶段增加9%的加速效果
                    const stage = Math.min(8, Math.floor(pickaxeLevel / 5) + 1);
                    pickaxeBonus = stage * 0.09;
                } else {
                    // 40级以后：每级增加0.5%的加速效果
                    const baseBonus = 0.72; // 40级时的基础加速效果（8个阶段 × 9%）
                    const additionalBonus = (pickaxeLevel - 39) * 0.005;
                    pickaxeBonus = baseBonus + additionalBonus;
                }
                
                // 最高加速效果限制在90%
                pickaxeBonus = Math.min(0.9, pickaxeBonus);
            }
            
            const currentActualTime = currentMineral.baseTime * (1 - pickaxeBonus);
            
            // 更新进度条的采矿时间
            createProgressInterval(currentActualTime);
            
            // 设置下一次采矿的间隔
            continuousMiningInterval = setInterval(() => {
                // 再次检查continuousMining状态，确保采矿没有被停止
                if (continuousMining) {
                    const updatedMineral = minerals.find(m => m.name === currentContinuousMineral);
                    if (updatedMineral) {
                        completeMining(updatedMineral);
                        continuousElapsedTime = 0;
                        
                        // 重新获取矿物元素，确保引用是最新的
                        const updatedMineralEl = document.querySelector(`[data-name="${currentContinuousMineral}"]`);
                        if (updatedMineralEl) {
                            const updatedProgressFill = updatedMineralEl.querySelector('.progress-fill');
                            const updatedCountdown = updatedMineralEl.querySelector('.countdown');
                            if (updatedProgressFill && updatedCountdown) {
                                updatedProgressFill.style.width = '0%';
                                
                                // 重新计算加速效果，因为工具等级可能在两次采矿之间发生变化
                                // 检查是否有丢失矿锄效果
                                const updatedHasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
                                const updatedPickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
                                let updatedPickaxeBonus = 0;
                                
                                if (!updatedHasLostPickaxeEffect) {
                                    if (updatedPickaxeLevel < 40) {
                                        // 40级以前：每5级一个阶段，每个阶段增加9%的加速效果
                                        const updatedStage = Math.min(8, Math.floor(updatedPickaxeLevel / 5) + 1);
                                        updatedPickaxeBonus = updatedStage * 0.09;
                                    } else {
                                        // 40级以后：每级增加0.5%的加速效果
                                        const updatedBaseBonus = 0.72; // 40级时的基础加速效果（8个阶段 × 9%）
                                        const updatedAdditionalBonus = (updatedPickaxeLevel - 39) * 0.005;
                                        updatedPickaxeBonus = updatedBaseBonus + updatedAdditionalBonus;
                                    }
                                    
                                    // 最高加速效果限制在90%
                                    updatedPickaxeBonus = Math.min(0.9, updatedPickaxeBonus);
                                }
                                
                                const updatedActualTime = updatedMineral.baseTime * (1 - updatedPickaxeBonus);
                                updatedCountdown.textContent = `${updatedActualTime.toFixed(2)}s`;
                            }
                        }
                        
                        // 清除当前间隔
                        clearInterval(continuousMiningInterval);
                        
                        // 递归调用，继续下一次采矿
                        startNextMining();
                    } else {
                        stopContinuousMining();
                    }
                } else {
                    clearInterval(continuousMiningInterval);
                }
            }, currentActualTime * 1000);
        } else {
            stopContinuousMining();
        }
    }
    
    // 初始设置连续采矿间隔
    continuousMiningInterval = setInterval(() => {
        const currentMineral = minerals.find(m => m.name === currentContinuousMineral);
        if (currentMineral && continuousMining) {
            // 执行第一次采矿
            completeMining(currentMineral);
            continuousElapsedTime = 0;
            
            // 重新获取矿物元素，确保引用是最新的
            const updatedMineralEl = document.querySelector(`[data-name="${currentContinuousMineral}"]`);
            if (updatedMineralEl) {
                const updatedProgressFill = updatedMineralEl.querySelector('.progress-fill');
                const updatedCountdown = updatedMineralEl.querySelector('.countdown');
                if (updatedProgressFill && updatedCountdown) {
                    updatedProgressFill.style.width = '0%';
                    updatedCountdown.textContent = `${actualTime.toFixed(2)}s`;
                }
            }
            
            // 清除初始间隔
            clearInterval(continuousMiningInterval);
            
            // 开始下一次采矿
            startNextMining();
        } else {
            stopContinuousMining();
        }
    }, actualTime * 1000);
}

function stopContinuousMining() {
    if (!continuousMining) return;
    if (continuousMiningInterval) {
        clearInterval(continuousMiningInterval);
        continuousMiningInterval = null;
    }
    if (continuousProgressInterval) {
        clearInterval(continuousProgressInterval);
        continuousProgressInterval = null;
    }
    continuousMining = false;
    const mineralName = currentContinuousMineral;
    currentContinuousMineral = null;
    continuousElapsedTime = 0;
    const mineralEl = document.querySelector(`[data-name="${mineralName}"]`);
    if (mineralEl) {
        const progressContainer = mineralEl.querySelector('.progress-container');
        const mineBtn = mineralEl.querySelector('.mine-btn');
        const continuousBtn = mineralEl.querySelector('.continuous-mine-btn');
        progressContainer.style.display = 'none';
        mineBtn.disabled = false;
        const isContinuousUnlocked = gameData.tools.pickaxe.level >= 5;
        const mineral = minerals.find(m => m.name === mineralName);
        const canMine = mineral && (gameData.player.level >= mineral.minLevel && 
                           (!mineral.toolReq || gameData.tools.pickaxe.level >= mineral.toolReq));
        if (isContinuousUnlocked && canMine) {
            continuousBtn.disabled = false;
            continuousBtn.textContent = `连续开采 (已解锁)`;
        } else if (isContinuousUnlocked) {
            continuousBtn.disabled = true;
            continuousBtn.textContent = `连续开采 (等级不足)`;
        } else {
            continuousBtn.disabled = true;
            continuousBtn.textContent = `连续开采 (需要采矿锄5级)`;
        }
    }
    
}

function completeMining(mineral, isBackground = false) {
    if (!gameData.miningCount) {
        gameData.miningCount = {};
    }
    if (!continuousMining) {
        gameData.miningCount[mineral.name] = (gameData.miningCount[mineral.name] || 0) + 1;
    }
    
    // 初始化空的obtainedDrops数组，用于生成采矿记录
    const obtainedDrops = [];
    
    // 提前调用generateMiningMessage生成采矿记录和设置currentMiningRecordId
    // 这样后续的效果消息就能关联到正确的采矿记录
    const initialMiningResult = generateMiningMessage(mineral, obtainedDrops, false, mineral.exp, 1);
    
    // 检查工具状态和消耗
    if (!gameData.tools.cart) gameData.tools.cart = { crafted: false, active: true, fuelType: 'coal', fuelCapacity: 50, currentFuel: 0 }; // fuelType: 'coal' 或 'fuel'
    if (!gameData.tools.headlight) gameData.tools.headlight = { crafted: false, active: true };
    
    // 矿车加成：增加采矿数量，消耗燃料
    // 检查是否有走丢的矿车效果
    const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
    
    let baseAmount = 1;
    if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.active && !hasLostCartEffect) {
        // 检查自动运输是否激活
        const autoTransportActive = gameData.tools.cart.autoTransport && gameData.tools.cart.autoTransport.active;
        
        if (autoTransportActive) {
            // 自动运输激活，不消耗燃料
            // 矿车每5级提升1个采矿数量
            const cartBonus = Math.floor(gameData.tools.cart.level / 5);
            baseAmount = 1 + cartBonus;
            if (!isBackground) addMessage('自动运输激活中，矿车无燃料消耗！');
        } else {
            const fuelType = gameData.tools.cart.fuelType || 'coal';
            
            if (fuelType === 'coal') {
                // 使用煤矿：直接消耗背包中的煤矿
                if (hasEnoughItem('煤矿', 1)) {
                    consumeItem('煤矿', 1);
                    // 矿车每5级提升1个采矿数量
                    const cartBonus = Math.floor(gameData.tools.cart.level / 5);
                    baseAmount = 1 + cartBonus;
                } else {
                    // 煤矿不足，自动停用矿车
                    gameData.tools.cart.active = false;
                    if (!isBackground) addMessage('煤矿不足，矿车已自动停止使用！请添加煤矿。');
                }
            } else {
                // 使用高级燃料：消耗燃料舱中的燃料次数
                if (gameData.tools.cart.optimized) {
                    // 检查燃料舱中的燃料是否足够
                    if (gameData.tools.cart.currentFuel > 0) {
                        // 消耗1点燃料
                        gameData.tools.cart.currentFuel -= 1;
                        // 矿车每5级提升1个采矿数量，使用燃料时额外加5
                        const cartBonus = Math.floor(gameData.tools.cart.level / 5) + 5;
                        baseAmount = 1 + cartBonus;
                    } else {
                        // 燃料舱燃料不足，尝试从背包中自动添加燃料
                        if (hasEnoughItem('燃料', 1)) {
                            // 消耗背包中的燃料
                            consumeItem('燃料', 1);
                            // 添加50点燃料到燃料舱
                            gameData.tools.cart.currentFuel = 50;
                            // 消耗1点燃料用于本次采矿
                            gameData.tools.cart.currentFuel -= 1;
                            // 矿车每5级提升1个采矿数量，使用燃料时额外加5
                            const cartBonus = Math.floor(gameData.tools.cart.level / 5) + 5;
                            baseAmount = 1 + cartBonus;
                            if (!isBackground) addMessage('燃料舱燃料不足，已自动从背包中添加燃料！');
                        } else {
                            // 燃料不足，尝试切换到煤矿
                            if (hasEnoughItem('煤矿', 1)) {
                                // 切换到煤矿作为燃料
                                gameData.tools.cart.fuelType = 'coal';
                                consumeItem('煤矿', 1);
                                // 矿车每5级提升1个采矿数量
                                const cartBonus = Math.floor(gameData.tools.cart.level / 5);
                                baseAmount = 1 + cartBonus;
                                if (!isBackground) addMessage('燃料不足，已自动切换到煤矿作为燃料！');
                            } else {
                                // 煤矿也不足，自动停用矿车
                                gameData.tools.cart.active = false;
                                if (!isBackground) addMessage('燃料和煤矿都不足，矿车已自动停止使用！请添加燃料或煤矿。');
                            }
                        }
                    }
                } else {
                    // 矿车未优化，自动停用矿车
                    gameData.tools.cart.active = false;
                    if (!isBackground) addMessage('矿车尚未优化！需要先在加工台优化矿车才能使用高级燃料。');
                }
            }
        }
    }
    
    // 应用插片效果
    const slotEffects = applyToolSlotEffects(mineral, baseAmount);
    baseAmount = slotEffects.adjustedAmount;
    
    // 初始化经验和金币变量
    let totalGold = 0;
    let totalMineralExp = 0;
    
    // 移除挖矿时直接获得金币的逻辑，金币应通过出售矿物获得
    // const baseGold = mineral.price || 0;
    // totalGold += baseGold;
    // gameData.player.gold += baseGold;
    // addGainedGold(baseGold);
    
    // 应用金币经验效果（修改为增加矿物经验倍数）
    let minerBonus = false;
    if (slotEffects && slotEffects.effects.goldExp.length > 0) {
        // 获取最高稀有度的金币经验效果
        const highestRarityEffect = slotEffects.effects.goldExp.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 传说级金币经验效果触发矿工加成
        if (highestRarityEffect.rarity === 'epic') {
            minerBonus = true; // 雇佣的矿工1分钟内所得物增加100%
        }
    }
    
    // 处理矿工加成
    if (minerBonus) {
        // 实现矿工1分钟内所得物增加100%的逻辑
        if (!gameData.minersGuild.minerBonus) {
            gameData.minersGuild.minerBonus = {
                active: true,
                endTime: Date.now() + 60000, // 1分钟
                multiplier: 2 // 增加100%
            };
        }
        if (!isBackground) {
            addMessage('传说级金币经验效果触发！雇佣的矿工1分钟内所得物增加100%！');
            updateMessages();
        }
    }
    
    // 为所有工作中的矿工添加经验（手动挖矿时）
    // 只给分配到当前矿物的矿工添加经验
    const workingMiners = gameData.minersGuild.miners.filter(miner => miner.working && miner.assignedMineral === mineral.name);
    workingMiners.forEach(miner => {
        if (miner.exp < miner.nextExp) {
            const minerExpGain = Math.floor(totalMineralExp * 0.5); // 矿工获得玩家经验的50%
            miner.exp += minerExpGain;
            if (miner.exp >= miner.nextExp) {
                addMessage(`${miner.name} 的经验已满，等待升级！`);
            }
        }
    });
    
    // 添加基础矿物
    for (let i = 0; i < baseAmount; i++) {
        let finalItem = mineral.name;
        
        // 应用成品转化效果
        if (slotEffects && slotEffects.effects.itemConversion.length > 0) {
            // 获取最高稀有度的成品转化效果
            const highestRarityEffect = slotEffects.effects.itemConversion.sort((a, b) => {
                const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
                return rarityOrder[b.rarity] - rarityOrder[a.rarity];
            })[0];
            
            // 根据矿物类型和稀有度转化为成品
            finalItem = convertMineralToFinishedProduct(mineral.name, highestRarityEffect.rarity);
        }
        
        addToBackpack(finalItem);
        
        // 为主矿物计算经验
        totalMineralExp += calculateMineralExp(finalItem, 1, slotEffects);
        
        // 采矿获得渣类：30%概率获得对应矿物的渣
        const baseMinerals = ['铜矿', '铁矿', '铅矿', '锌矿', '镍矿', '锡矿', '钴矿', '锰矿', '钨矿', '银矿'];
        if (baseMinerals.includes(mineral.name) && Math.random() < 0.3) {
            // 使用简化的渣类名称（去掉"矿"字）
            const residue = mineral.name.replace('矿', '') + '渣';
            const amount = Math.floor(Math.random() * 2) + 1; // 1-2个
            addToBackpack(residue, amount);
            if (!isBackground) addMessage(`采矿获得：${residue} × ${amount}`);
        }
    }
    
    // 应用连锁采矿效果
    if (slotEffects && slotEffects.effects.chainMining.length > 0) {
        // 获取最高稀有度的连锁采矿效果
        const highestRarityEffect = slotEffects.effects.chainMining.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 矿物等级顺序
        const mineralLevels = ['石矿', '煤矿', '铁矿', '铜矿', '钴矿', '镍矿', '银矿', '白金矿', '金矿', '水晶矿'];
        const currentIndex = mineralLevels.indexOf(mineral.name);
        
        // 根据稀有度实现连锁采矿效果
        let chainMinerals = [];
        let includeByproducts = false;
        let doubleByproducts = false;
        
        switch (highestRarityEffect.rarity) {
            case 'common':
                // 普通（白色）：获得上一个等级的矿物（不包括副产物），如果本次采集是最低级矿物则失效
                if (currentIndex > 0) {
                    chainMinerals.push(mineralLevels[currentIndex - 1]);
                }
                includeByproducts = false;
                break;
            case 'uncommon':
                // 稀有（蓝色）：获得上一个等级的矿物（包括副产物），如果本次采集是最低级矿物则失效
                if (currentIndex > 0) {
                    chainMinerals.push(mineralLevels[currentIndex - 1]);
                }
                includeByproducts = true;
                break;
            case 'rare':
                // 史诗（紫色）：获得上一个等级的矿物（不包括副产物），和下一个等级的矿物（不包括副产物）
                // 如果本次采集是最低级矿物则只获得下一等级矿物（不包括副产物）
                // 如果本次采集的是最高级矿物则只获得上一级矿物（不包括副产物）
                if (currentIndex === 0) {
                    // 最低级矿物，只获得下一等级
                    if (currentIndex < mineralLevels.length - 1) {
                        chainMinerals.push(mineralLevels[currentIndex + 1]);
                    }
                } else if (currentIndex === mineralLevels.length - 1) {
                    // 最高级矿物，只获得上一等级
                    if (currentIndex > 0) {
                        chainMinerals.push(mineralLevels[currentIndex - 1]);
                    }
                } else {
                    // 中间等级矿物，获得上一等级和下一等级
                    if (currentIndex > 0) {
                        chainMinerals.push(mineralLevels[currentIndex - 1]);
                    }
                    if (currentIndex < mineralLevels.length - 1) {
                        chainMinerals.push(mineralLevels[currentIndex + 1]);
                    }
                }
                includeByproducts = false;
                break;
            case 'epic':
                // 传说（橙色）：获得上一个等级的矿物（包括副产物），和下一个等级的矿物（包括副产物）
                // 如果本次采集是最低级矿物则只获得下一等级矿物（包括副产物）
                // 如果本次采集的是最高级矿物则只获得上一级矿物（包括副产物）
                // 且当前采集矿物的副产品翻倍
                if (currentIndex === 0) {
                    // 最低级矿物，只获得下一等级
                    if (currentIndex < mineralLevels.length - 1) {
                        chainMinerals.push(mineralLevels[currentIndex + 1]);
                    }
                } else if (currentIndex === mineralLevels.length - 1) {
                    // 最高级矿物，只获得上一等级
                    if (currentIndex > 0) {
                        chainMinerals.push(mineralLevels[currentIndex - 1]);
                    }
                } else {
                    // 中间等级矿物，获得上一等级和下一等级
                    if (currentIndex > 0) {
                        chainMinerals.push(mineralLevels[currentIndex - 1]);
                    }
                    if (currentIndex < mineralLevels.length - 1) {
                        chainMinerals.push(mineralLevels[currentIndex + 1]);
                    }
                }
                includeByproducts = true;
                doubleByproducts = true;
                break;
        }
        
        // 处理连锁采矿获得的矿物
        if (chainMinerals.length > 0) {
                // 处理连锁采矿获得的矿物并记录
            const gainedMinerals = [];
            
            chainMinerals.forEach(chainMineralName => {
                // 应用成品转化效果
                let finalItem = chainMineralName;
                if (slotEffects && slotEffects.effects.itemConversion.length > 0) {
                    finalItem = convertMineralToFinishedProduct(chainMineralName, highestRarityEffect.rarity);
                }
                
                // 添加连锁采矿获得的矿物，数量与主采矿相同
                for (let i = 0; i < baseAmount; i++) {
                    addToBackpack(finalItem);
                    
                    // 为连锁采矿获得的矿物计算经验
                    totalMineralExp += calculateMineralExp(finalItem, 1, slotEffects);
                }
                
                // 记录获得的矿物（显示时只显示一次，但实际获得多个）
                gainedMinerals.push(finalItem);
            });
            
            // 显示连锁采矿触发的消息，包含具体矿物名称和数量
            if (!isBackground) addMessage(`连锁采矿触发！额外获得了 ${gainedMinerals.map(mineral => `${mineral}×${baseAmount}`).join('、')}！`);
            
            // 处理副产品翻倍效果
            if (doubleByproducts) {
                // 这里可以添加副产品翻倍的逻辑
                if (!isBackground) addMessage('传说级连锁采矿触发！当前采集矿物的副产品翻倍！');
            }
            
            updateMessages();
            // 更新基础数量，包含额外获得的矿物
            baseAmount += gainedMinerals.length * baseAmount;
        }
    }
    
    // 应用燃料惊喜效果
    if (slotEffects && slotEffects.effects.fuelSurprise.length > 0) {
        // 获取最高稀有度的燃料惊喜效果
        const highestRarityEffect = slotEffects.effects.fuelSurprise.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 根据稀有度计算燃料数量
        let fuelCount = 0;
        switch (highestRarityEffect.rarity) {
            case 'common':
                fuelCount = 5; // 普通（白色）：获得总数5个
                break;
            case 'uncommon':
                fuelCount = 10; // 稀有（蓝色）：获得总数10个
                break;
            case 'rare':
                fuelCount = 20; // 史诗（紫色）：获得总数20个
                break;
            case 'epic':
                fuelCount = 50; // 传说（橙色）：获得总数50个
                break;
        }
        
        // 随机分配电池和燃料的数量
        const fuelTypes = ['电池', '燃料'];
        let batteryCount = 0;
        let fuelItemCount = 0;
        
        for (let i = 0; i < fuelCount; i++) {
            if (Math.random() < 0.5) {
                batteryCount++;
            } else {
                fuelItemCount++;
            }
        }
        
        // 添加燃料到背包
        if (batteryCount > 0) {
            addToBackpack('电池', batteryCount);
        }
        if (fuelItemCount > 0) {
            addToBackpack('燃料', fuelItemCount);
        }
        
        // 传说级额外获得一个扎啤
        if (highestRarityEffect.rarity === 'epic') {
            addToBackpack('扎啤', 1);
            if (!isBackground) addMessage('传说级燃料惊喜效果触发！额外获得了一个扎啤！');
        }
        
        // 显示燃料惊喜触发的消息
        if (!isBackground) addMessage(`燃料惊喜效果触发！获得了 ${batteryCount} 个电池和 ${fuelItemCount} 个燃料！`);
        updateMessages();
    }
    
    // 应用碎片回收效果
    if (slotEffects && slotEffects.effects.fragmentRecovery.length > 0) {
        // 获取最高稀有度的碎片回收效果
        const highestRarityEffect = slotEffects.effects.fragmentRecovery.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 根据稀有度计算碎片数量
        let fragmentCount = 0;
        switch (highestRarityEffect.rarity) {
            case 'common':
                fragmentCount = 1; // 普通（白色）：获得1个插片碎片
                break;
            case 'uncommon':
                fragmentCount = 2; // 稀有（蓝色）：获得2个插片碎片
                break;
            case 'rare':
                fragmentCount = 4; // 史诗（紫色）：获得4个插片碎片
                break;
            case 'epic':
                fragmentCount = 8; // 传说（橙色）：获得8个插片碎片
                break;
        }
        
        // 添加碎片到背包
        addToBackpack('工具插片碎片', fragmentCount);
        
        // 传说级额外获得一个随机非传说级非碎片回收插片
        if (highestRarityEffect.rarity === 'epic' && Math.random() < 0.05) {
            // 获得随机非传说级非碎片回收插片
            const slotTypes = ['pickaxeSlot', 'cartSlot', 'headlightSlot'];
            const randomSlotType = slotTypes[Math.floor(Math.random() * slotTypes.length)];
            let possibleEffects = [];
            switch (randomSlotType) {
                case 'pickaxeSlot':
                    possibleEffects = ['成品转化', '连锁采矿', '金币经验', '燃料惊喜'];
                    break;
                case 'cartSlot':
                    possibleEffects = ['自动运输', '运力翻倍', '燃料暴击', '压缩燃料', '现场收购'];
                    break;
                case 'headlightSlot':
                    possibleEffects = ['加强灯泡', '电池优化', '副产物增强', '超载照明', '幸运磁铁'];
                    break;
            }
            const randomEffect = possibleEffects[Math.floor(Math.random() * possibleEffects.length)];
            addSlotWithRarity(randomSlotType, 'epic', randomEffect);
            if (!isBackground) addMessage('传说级碎片回收效果触发！额外获得了一个随机插片！');
        }
        
        // 显示碎片回收触发的消息
        if (!isBackground) addMessage(`碎片回收效果触发！获得了 ${fragmentCount} 个工具插片碎片！`);
        updateMessages();
    }
    
    // 应用自动运输效果
    if (slotEffects && slotEffects.effects.autoTransport.length > 0) {
        // 获取最高稀有度的自动运输效果
        const highestRarityEffect = slotEffects.effects.autoTransport.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 根据稀有度设置无燃料运行时间和冷却时间
        let runTime = 0;
        let coolDownTime = 0;
        switch (highestRarityEffect.rarity) {
            case 'common':
                runTime = 30; // 普通（白色）：无燃料运行时间30秒
                coolDownTime = 30; // 冷却30秒
                break;
            case 'uncommon':
                runTime = 60; // 稀有（蓝色）：无燃料运行时间60秒
                coolDownTime = 25; // 冷却25秒
                break;
            case 'rare':
                runTime = 90; // 史诗（紫色）：无燃料运行时间90秒
                coolDownTime = 20; // 冷却20秒
                break;
            case 'epic':
                runTime = 180; // 传说（橙色）：无燃料运行时间180秒
                coolDownTime = 15; // 冷却15秒
                break;
        }
        
        // 处理自动运输效果
        if (!gameData.tools.cart.autoTransport) {
            gameData.tools.cart.autoTransport = {
                active: false,
                runTime: runTime,
                coolDownTime: coolDownTime,
                remainingTime: 0,
                coolDownRemaining: 0,
                lastUpdate: Date.now()
            };
        }
        
        // 更新自动运输状态
        const now = Date.now();
        const timeElapsed = (now - gameData.tools.cart.autoTransport.lastUpdate) / 1000;
        gameData.tools.cart.autoTransport.lastUpdate = now;
        
        if (gameData.tools.cart.autoTransport.active) {
            // 自动运输激活中
            gameData.tools.cart.autoTransport.remainingTime -= timeElapsed;
            if (gameData.tools.cart.autoTransport.remainingTime <= 0) {
                // 自动运输时间结束，进入冷却
                gameData.tools.cart.autoTransport.active = false;
                gameData.tools.cart.autoTransport.coolDownRemaining = coolDownTime;
                addMessage('自动运输效果结束，进入冷却期！');
                updateMessages();
            }
        } else if (gameData.tools.cart.autoTransport.coolDownRemaining > 0) {
            // 冷却中
            gameData.tools.cart.autoTransport.coolDownRemaining -= timeElapsed;
            if (gameData.tools.cart.autoTransport.coolDownRemaining <= 0) {
                // 冷却结束，可以重新激活
                gameData.tools.cart.autoTransport.coolDownRemaining = 0;
                addMessage('自动运输冷却结束，可以重新激活！');
                updateMessages();
            }
        } else {
            // 可以激活自动运输
            gameData.tools.cart.autoTransport.active = true;
            gameData.tools.cart.autoTransport.remainingTime = runTime;
            addMessage(`自动运输效果激活！无燃料运行时间 ${runTime} 秒！`);
            
            // 传说级额外效果：必出一个副产物
            if (highestRarityEffect.rarity === 'epic') {
                // 必出一个副产物
                if (mineral.drops && mineral.drops.length > 0) {
                    const randomDrop = mineral.drops[Math.floor(Math.random() * mineral.drops.length)];
                    addToBackpack(randomDrop.name);
                    addMessage(`传说级自动运输效果触发！必出一个副产物 ${randomDrop.name}！`);
                }
            }
            
            updateMessages();
        }
        
        // 保存游戏状态
        saveGame();
    }
    
    // 应用运力翻倍效果
    if (slotEffects && slotEffects.effects.capacityDouble.length > 0) {
        // 获取最高稀有度的运力翻倍效果
        const highestRarityEffect = slotEffects.effects.capacityDouble.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 根据稀有度计算运力翻倍倍数
        let capacityMultiplier = 1;
        switch (highestRarityEffect.rarity) {
            case 'common':
                capacityMultiplier = 1.5; // 普通（白色）：当前采集的150%
                break;
            case 'uncommon':
                capacityMultiplier = 2; // 稀有（蓝色）：当前采集的200%
                break;
            case 'rare':
                capacityMultiplier = 4; // 史诗（紫色）：当前采集的400%
                break;
            case 'epic':
                capacityMultiplier = 8; // 传说（橙色）：当前采集的800%
                break;
        }
        
        // 计算额外获得的矿物数量
        const additionalAmount = Math.floor(baseAmount * (capacityMultiplier - 1));
        
        // 添加额外的矿物到背包
        for (let i = 0; i < additionalAmount; i++) {
            let finalItem = mineral.name;
            
            // 应用成品转化效果
            if (slotEffects && slotEffects.effects.itemConversion.length > 0) {
                // 获取最高稀有度的成品转化效果
                const highestConversionEffect = slotEffects.effects.itemConversion.sort((a, b) => {
                    const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
                    return rarityOrder[b.rarity] - rarityOrder[a.rarity];
                })[0];
                
                finalItem = convertMineralToFinishedProduct(mineral.name, highestConversionEffect.rarity);
            }
            
            addToBackpack(finalItem);
            
            // 为额外获得的矿物添加经验
            // 应用金手套经验加成
            const bonusExp = applyGoldenGloveExpBonus(mineral.exp);
            gameData.player.exp += bonusExp;
            addGainedExp(bonusExp);
            // 更新 totalMineralExp，确保采矿记录包含所有经验
            totalMineralExp += bonusExp;
            // 检查并处理经验值溢出
            checkLevelUp();
            
            // 只有当工具经验值未满时才添加经验值
            if (gameData.tools.pickaxe.level < 50) {
                const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
                if (gameData.tools.pickaxe.exp < pickaxeNextExp) {
                    gameData.tools.pickaxe.exp += bonusExp;
                }
            }
            
            if (gameData.tools.cart && gameData.tools.cart.level < 50) {
                const cartNextExp = gameData.tools.cart.nextExp || 50;
                if (gameData.tools.cart.exp < cartNextExp) {
                    gameData.tools.cart.exp += bonusExp;
                }
            }
            
            if (gameData.tools.headlight && gameData.tools.headlight.level < 50) {
                const headlightNextExp = gameData.tools.headlight.nextExp || 50;
                if (gameData.tools.headlight.exp < headlightNextExp) {
                    gameData.tools.headlight.exp += bonusExp;
                }
            }
        }
        
        // 传说级额外效果：不消耗所得矿物立即获得一次金币
        if (highestRarityEffect.rarity === 'epic') {
            // 计算金币数量（基于矿物价值）
            const goldAmount = Math.floor((mineral.price || 0) * baseAmount);
            gameData.player.gold += goldAmount;
            addMessage(`传说级运力翻倍效果触发！立即获得 ${goldAmount} 金币！`);
        }
        
        // 显示运力翻倍触发的消息
        addMessage(`运力翻倍效果触发！获得了 ${additionalAmount} 个额外矿物！`);
        updateMessages();
        // 更新基础数量，包含额外获得的矿物
        baseAmount += additionalAmount;
    }
    
    // 应用燃料暴击效果
    if (slotEffects && slotEffects.effects.fuelCrit.length > 0) {
        // 检查自动运输是否激活（燃料暴击与自动运输冲突）
        const autoTransportActive = gameData.tools.cart.autoTransport && gameData.tools.cart.autoTransport.active;
        if (!autoTransportActive) {
            // 获取最高稀有度的燃料暴击效果
            const highestRarityEffect = slotEffects.effects.fuelCrit.sort((a, b) => {
                const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
                return rarityOrder[b.rarity] - rarityOrder[a.rarity];
            })[0];
            
            // 根据稀有度计算燃料消耗倍数
            let fuelMultiplier = 1;
            switch (highestRarityEffect.rarity) {
                case 'common':
                    fuelMultiplier = 2; // 普通（白色）：消耗燃料增加100%
                    break;
                case 'uncommon':
                    fuelMultiplier = 3; // 稀有（蓝色）：消耗燃料增加200%
                    break;
                case 'rare':
                    fuelMultiplier = 5; // 史诗（紫色）：消耗燃料增加400%
                    break;
                case 'epic':
                    fuelMultiplier = 9; // 传说（橙色）：消耗燃料增加800%
                    break;
            }
            
            // 检查燃料是否足够
            const fuelType = gameData.tools.cart.fuelType || 'coal';
            let fuelEnough = false;
            let fuelConsumed = 0;
            
            if (fuelType === 'coal') {
                // 使用煤矿
                if (hasEnoughItem('煤矿', fuelMultiplier)) {
                    consumeItem('煤矿', fuelMultiplier);
                    fuelEnough = true;
                    fuelConsumed = fuelMultiplier;
                }
            } else {
                // 使用高级燃料
                if (gameData.tools.cart.optimized && gameData.tools.cart.currentFuel >= fuelMultiplier) {
                    gameData.tools.cart.currentFuel -= fuelMultiplier;
                    fuelEnough = true;
                    fuelConsumed = fuelMultiplier;
                }
            }
            
            if (fuelEnough) {
                // 计算额外获得的矿物数量
                const additionalAmount = Math.floor(baseAmount * (fuelConsumed - 1));
                
                // 添加额外的矿物到背包
                for (let i = 0; i < additionalAmount; i++) {
                    let finalItem = mineral.name;
                    
                    // 应用成品转化效果
                    if (slotEffects && slotEffects.effects.itemConversion.length > 0) {
                        // 获取最高稀有度的成品转化效果
                        const highestConversionEffect = slotEffects.effects.itemConversion.sort((a, b) => {
                            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
                            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
                        })[0];
                        
                        finalItem = convertMineralToFinishedProduct(mineral.name, highestConversionEffect.rarity);
                    }
                    
                    addToBackpack(finalItem);
                    
                    // 为额外获得的矿物计算经验
                    totalMineralExp += calculateMineralExp(finalItem, 1, slotEffects);
                }
                
                // 传说级额外效果：返还一个史诗级燃料暴击插片
                if (highestRarityEffect.rarity === 'epic') {
                    // 返还一个史诗级燃料暴击插片
                    addSlotWithRarity('cartSlot', 'epic', '燃料暴击');
                    addMessage('传说级燃料暴击效果触发！返还一个史诗级燃料暴击插片！');
                }
                
                // 显示燃料暴击触发的消息，包含具体矿物名称
                let finalItemName = mineral.name;
                if (slotEffects && slotEffects.effects.itemConversion.length > 0) {
                    finalItemName = convertMineralToFinishedProduct(mineral.name, highestConversionEffect.rarity);
                }
                addMessage(`燃料暴击效果触发！消耗 ${fuelConsumed} 个燃料，获得了 ${additionalAmount} 个额外${finalItemName}！`);
                updateMessages();
                // 更新基础数量，包含额外获得的矿物
                baseAmount += additionalAmount;
            }
        }
    }
    
    // 应用压缩燃料效果
    if (slotEffects && slotEffects.effects.compressedFuel.length > 0) {
        // 获取最高稀有度的压缩燃料效果
        const highestRarityEffect = slotEffects.effects.compressedFuel.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 根据稀有度计算油箱上限加成
        let capacityMultiplier = 1;
        switch (highestRarityEffect.rarity) {
            case 'common':
                capacityMultiplier = 2; // 普通（白色）：油箱上限加100%
                break;
            case 'uncommon':
                capacityMultiplier = 2.5; // 稀有（蓝色）：油箱上限加150%
                break;
            case 'rare':
                capacityMultiplier = 4; // 史诗（紫色）：油箱上限加300%
                break;
            case 'epic':
                capacityMultiplier = 7; // 传说（橙色）：油箱上限加600%
                break;
        }
        
        // 设置油箱上限
        const baseCapacity = 50; // 基础油箱容量
        gameData.tools.cart.fuelCapacity = Math.floor(baseCapacity * capacityMultiplier);
        
        // 无消耗自动填满燃料
        gameData.tools.cart.currentFuel = gameData.tools.cart.fuelCapacity;
        
        // 传说级额外效果：获得自动填满的燃料进入背包
        if (highestRarityEffect.rarity === 'epic') {
            // 添加燃料到背包
            addToBackpack('燃料', gameData.tools.cart.fuelCapacity);
            addMessage(`传说级压缩燃料效果触发！获得 ${gameData.tools.cart.fuelCapacity} 个燃料！`);
        }
        
        // 显示压缩燃料触发的消息
        addMessage(`压缩燃料效果触发！油箱上限提升到 ${gameData.tools.cart.fuelCapacity}，并自动填满燃料！`);
        updateMessages();
        
        // 保存游戏状态
        saveGame();
    }
    
    // 应用现场收购效果
    if (slotEffects && slotEffects.effects.onSitePurchase.length > 0) {
        // 获取最高稀有度的现场收购效果
        const highestRarityEffect = slotEffects.effects.onSitePurchase.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 根据稀有度计算现场出售收益加成
        let profitMultiplier = 1;
        switch (highestRarityEffect.rarity) {
            case 'common':
                profitMultiplier = 2; // 普通（白色）：现场出售产出矿物收益加100%
                break;
            case 'uncommon':
                profitMultiplier = 2.5; // 稀有（蓝色）：现场出售产出矿物收益加150%
                break;
            case 'rare':
                profitMultiplier = 3; // 史诗（紫色）：现场出售产出矿物收益加200%
                break;
            case 'epic':
                profitMultiplier = 5; // 传说（橙色）：现场出售产出矿物收益加400%
                break;
        }
        
        // 计算额外获得的金币
        const baseGold = (mineral.price || 0) * baseAmount;
        const additionalGold = Math.floor(baseGold * (profitMultiplier - 1));
        
        // 添加额外的金币
        gameData.player.gold += additionalGold;
        
        // 传说级额外效果：5%几率获得一个随机的工具等级提升券
        if (highestRarityEffect.rarity === 'epic' && Math.random() < 0.05) {
            // 获得一个随机的工具等级提升券
            const toolTypes = ['pickaxe', 'cart', 'headlight'];
            const randomToolType = toolTypes[Math.floor(Math.random() * toolTypes.length)];
            if (!gameData.unlockTickets) {
                gameData.unlockTickets = {
                    pickaxe: 0,
                    cart: 0,
                    headlight: 0
                };
            }
            gameData.unlockTickets[randomToolType] = (gameData.unlockTickets[randomToolType] || 0) + 1;
            addMessage(`传说级现场收购效果触发！获得一个${getToolName(randomToolType)}等级提升券！`);
        }
        
        // 显示现场收购触发的消息
        addMessage(`现场收购效果触发！额外获得 ${additionalGold} 金币！`);
        updateMessages();
    }
    
    // 应用电池优化效果
    if (slotEffects && slotEffects.effects.batteryOptimization.length > 0) {
        // 获取最高稀有度的电池优化效果
        const highestRarityEffect = slotEffects.effects.batteryOptimization.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 根据稀有度计算电池能量上限加成
        let capacityMultiplier = 1;
        switch (highestRarityEffect.rarity) {
            case 'common':
                capacityMultiplier = 2; // 普通（白色）：头灯电池能量上限增加100%
                break;
            case 'uncommon':
                capacityMultiplier = 2.5; // 稀有（蓝色）：头灯电池能量上限增加150%
                break;
            case 'rare':
                capacityMultiplier = 4; // 史诗（紫色）：头灯电池能量上限增加300%
                break;
            case 'epic':
                capacityMultiplier = 7; // 传说（橙色）：头灯电池能量上限增加600%
                break;
        }
        
        // 设置头灯电池能量上限
        const baseBatteryCapacity = 300; // 基础电池容量（秒）
        gameData.tools.headlight.batteryCapacity = Math.floor(baseBatteryCapacity * capacityMultiplier);
        
        // 无消耗自动填满电池
        gameData.tools.headlight.batteryEnergy = gameData.tools.headlight.batteryCapacity;
        
        // 传说级额外效果：获得自动填满的电池进入背包
        if (highestRarityEffect.rarity === 'epic') {
            // 计算获得的电池数量（每300秒能量对应1个电池）
            const batteryCount = Math.floor(gameData.tools.headlight.batteryCapacity / 300);
            if (batteryCount > 0) {
                addToBackpack('电池', batteryCount);
                addMessage(`传说级电池优化效果触发！获得 ${batteryCount} 个电池！`);
            }
        }
        
        // 显示电池优化触发的消息
        addMessage(`电池优化效果触发！头灯电池能量上限提升到 ${gameData.tools.headlight.batteryCapacity} 秒，并自动填满电池！`);
        updateMessages();
        
        // 保存游戏状态
        saveGame();
    }
    
    // 应用副产增强效果
    if (slotEffects && slotEffects.effects.byproductEnhancement.length > 0) {
        // 获取最高稀有度的副产增强效果
        const highestRarityEffect = slotEffects.effects.byproductEnhancement.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 根据稀有度计算下一级副产物几率
        let nextLevelByproductChance = 0;
        switch (highestRarityEffect.rarity) {
            case 'common':
                nextLevelByproductChance = 0.1; // 普通（白色）：10%获得下一级矿物的副产物几率
                break;
            case 'uncommon':
                nextLevelByproductChance = 0.15; // 稀有（蓝色）：15%获得下一级矿物的副产物几率
                break;
            case 'rare':
                nextLevelByproductChance = 0.3; // 史诗（紫色）：30%获得下一级矿物的副产物几率
                break;
            case 'epic':
                nextLevelByproductChance = 0.6; // 传说（橙色）：60%获得下一级矿物的副产物几率
                break;
        }
        
        // 矿物等级顺序
        const mineralLevels = ['石矿', '煤矿', '铁矿', '铜矿', '钴矿', '镍矿', '银矿', '白金矿', '金矿', '水晶矿'];
        const currentIndex = mineralLevels.indexOf(mineral.name);
        
        // 处理下一级矿物的副产物
        if (currentIndex < mineralLevels.length - 1) {
            const nextLevelMineral = mineralLevels[currentIndex + 1];
            const nextLevelMineralData = minerals.find(m => m.name === nextLevelMineral);
            
            if (nextLevelMineralData && nextLevelMineralData.drops) {
                // 尝试获得下一级矿物的副产物
                if (Math.random() < nextLevelByproductChance) {
                    nextLevelMineralData.drops.forEach(drop => {
                        addToBackpack(drop.name);
                        addMessage(`副产增强效果触发！获得了 ${drop.name}（来自下一级矿物 ${nextLevelMineral}）！`);
                    });
                    updateMessages();
                }
            }
        }
        
        // 传说级额外效果：5%几率获得下两级的副产物
        if (highestRarityEffect.rarity === 'epic' && currentIndex < mineralLevels.length - 2) {
            if (Math.random() < 0.05) {
                const nextNextLevelMineral = mineralLevels[currentIndex + 2];
                const nextNextLevelMineralData = minerals.find(m => m.name === nextNextLevelMineral);
                
                if (nextNextLevelMineralData && nextNextLevelMineralData.drops) {
                    nextNextLevelMineralData.drops.forEach(drop => {
                        addToBackpack(drop.name);
                        addMessage(`传说级副产增强效果触发！获得了 ${drop.name}（来自下两级矿物 ${nextNextLevelMineral}）！`);
                    });
                    updateMessages();
                }
            }
        }
    }
    
    // 应用超载照明效果
    if (slotEffects && slotEffects.effects.overloadLighting.length > 0) {
        // 获取最高稀有度的超载照明效果
        const highestRarityEffect = slotEffects.effects.overloadLighting.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 根据稀有度计算电量消耗倍数
        let energyMultiplier = 1;
        switch (highestRarityEffect.rarity) {
            case 'common':
                energyMultiplier = 2; // 普通（白色）：消耗电量增加100%
                break;
            case 'uncommon':
                energyMultiplier = 3; // 稀有（蓝色）：消耗电量增加200%
                break;
            case 'rare':
                energyMultiplier = 5; // 史诗（紫色）：消耗电量增加400%
                break;
            case 'epic':
                energyMultiplier = 9; // 传说（橙色）：消耗电量增加800%
                break;
        }
        
        // 检查电池能量是否足够
        let energyEnough = false;
        let energyConsumed = 0;
        
        if (gameData.tools.headlight && gameData.tools.headlight.batteryEnergy >= energyMultiplier) {
            // 消耗电池能量
            gameData.tools.headlight.batteryEnergy -= energyMultiplier;
            energyEnough = true;
            energyConsumed = energyMultiplier;
        } else if (hasEnoughItem('电池', 1)) {
            // 电池能量不足，尝试从背包中自动添加电池
            consumeItem('电池', 1);
            // 添加300秒能量到电池仓
            gameData.tools.headlight.batteryEnergy = 300;
            // 消耗相应的能量
            gameData.tools.headlight.batteryEnergy -= energyMultiplier;
            energyEnough = true;
            energyConsumed = energyMultiplier;
            addMessage('电池能量不足，已自动从背包中添加电池！');
        }
        
        if (energyEnough) {
            // 计算额外获得的矿物数量
            const additionalAmount = Math.floor(baseAmount * (energyConsumed - 1));
            
            // 添加额外的矿物到背包
            for (let i = 0; i < additionalAmount; i++) {
                let finalItem = mineral.name;
                
                // 应用成品转化效果
                if (slotEffects && slotEffects.effects.itemConversion.length > 0) {
                    // 获取最高稀有度的成品转化效果
                    const highestConversionEffect = slotEffects.effects.itemConversion.sort((a, b) => {
                        const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
                        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
                    })[0];
                    
                    finalItem = convertMineralToFinishedProduct(mineral.name, highestConversionEffect.rarity);
                }
                
                addToBackpack(finalItem);
                
                // 为额外获得的矿物添加经验
                // 应用金手套经验加成
                const bonusExp = applyGoldenGloveExpBonus(mineral.exp);
                gameData.player.exp += bonusExp;
                addGainedExp(bonusExp);
                // 更新 totalMineralExp，确保采矿记录包含所有经验
                totalMineralExp += bonusExp;
                // 检查并处理经验值溢出
                checkLevelUp();
                
                // 只有当工具经验值未满时才添加经验值
                if (gameData.tools.pickaxe.level < 50) {
                    const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
                    if (gameData.tools.pickaxe.exp < pickaxeNextExp) {
                        gameData.tools.pickaxe.exp += bonusExp;
                    }
                }
                
                if (gameData.tools.cart && gameData.tools.cart.level < 50) {
                    const cartNextExp = gameData.tools.cart.nextExp || 50;
                    if (gameData.tools.cart.exp < cartNextExp) {
                        gameData.tools.cart.exp += bonusExp;
                    }
                }
                
                if (gameData.tools.headlight && gameData.tools.headlight.level < 50) {
                    const headlightNextExp = gameData.tools.headlight.nextExp || 50;
                    if (gameData.tools.headlight.exp < headlightNextExp) {
                        gameData.tools.headlight.exp += bonusExp;
                    }
                }
            }
            
            // 传说级额外效果：返还一个史诗级超载照明插片
            if (highestRarityEffect.rarity === 'epic') {
                // 添加史诗级超载照明插片到背包
                addSlotWithRarity('headlightSlot', 'epic', '超载照明');
                addMessage('传说级超载照明效果触发！返还一个史诗级超载照明插片！');
            }
            
            // 显示超载照明触发的消息
            addMessage(`超载照明效果触发！消耗 ${energyConsumed} 点电量，获得了 ${additionalAmount} 个额外矿物！`);
            updateMessages();
            
            // 更新基础数量，包含额外获得的矿物
            baseAmount += additionalAmount;
        }
    }
    
    // 应用幸运磁铁效果
    if (slotEffects && slotEffects.effects.luckyMagnet.length > 0) {
        // 获取最高稀有度的幸运磁铁效果
        const highestRarityEffect = slotEffects.effects.luckyMagnet.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        // 根据稀有度计算获得磁铁材料的几率和类型
        let magnetChance = 0;
        let magnetMaterial = '';
        switch (highestRarityEffect.rarity) {
            case 'common':
                magnetChance = 0.1; // 普通（白色）：10%几率获得铁矿
                magnetMaterial = '铁矿';
                break;
            case 'uncommon':
                magnetChance = 0.2; // 稀有（蓝色）：20%几率获得钴矿
                magnetMaterial = '钴矿';
                break;
            case 'rare':
                magnetChance = 0.4; // 史诗（紫色）：40%几率获得镍矿
                magnetMaterial = '镍矿';
                break;
            case 'epic':
                magnetChance = 0.8; // 传说（橙色）：80%几率获得铝矿
                magnetMaterial = '铝矿';
                break;
        }
        
        // 尝试获得磁铁材料
        if (Math.random() < magnetChance) {
            addToBackpack(magnetMaterial);
            addMessage(`幸运磁铁效果触发！获得了 ${magnetMaterial}！`);
            updateMessages();
        }
        
        // 传说级额外效果：必得一个磁铁
        if (highestRarityEffect.rarity === 'epic') {
            addToBackpack('磁铁');
            addMessage('传说级幸运磁铁效果触发！必得一个磁铁！');
            updateMessages();
        }
    }
    
    // 头灯效果：增加高一级矿物发现几率
    let headlightGoldConsumed = false;
    if (gameData.tools.headlight && gameData.tools.headlight.crafted && gameData.tools.headlight.active) {
        // 检查是否有闪电蓄能效果
        const hasLightningCharge = gameData.activeEffects && gameData.activeEffects.lightningCharge && gameData.activeEffects.lightningCharge.active;
        
        // 检查燃料类型
        const fuelType = gameData.tools.headlight.fuelType || 'gold';
        
        if (!hasLightningCharge && fuelType === 'gold') {
            // 使用金币作为燃料
            // 检查头灯的金币消耗状态
            if (!gameData.tools.headlight.lastGoldConsume) {
                gameData.tools.headlight.lastGoldConsume = Date.now();
            }
            
            // 每30秒消耗10金币
            const now = Date.now();
            if (now - gameData.tools.headlight.lastGoldConsume >= 30000) {
                if (gameData.player.gold >= 10) {
                    gameData.player.gold -= 10;
                    gameData.tools.headlight.lastGoldConsume = now;
                    headlightGoldConsumed = true;
                } else {
                    // 金币不足，自动停用头灯
                    gameData.tools.headlight.active = false;
                    addMessage('金币不足，头灯已自动停止使用！');
                }
            }
        } else if (!hasLightningCharge && fuelType === 'battery') {
            // 使用电池作为燃料，检查电池能量
            if (!gameData.tools.headlight.batteryEnergy || gameData.tools.headlight.batteryEnergy <= 0) {
                // 电池能量不足，尝试从背包中自动添加电池
                if (hasEnoughItem('电池', 1)) {
                    // 消耗背包中的电池
                    consumeItem('电池', 1);
                    // 添加300秒能量到电池仓
                    gameData.tools.headlight.batteryEnergy = 300;
                    // 更新电池更新时间
                    gameData.tools.headlight.lastBatteryUpdate = Date.now();
                    addMessage('电池能量不足，已自动从背包中添加电池！');
                } else {
                    // 电池不足，尝试切换到金币
                    if (gameData.player.gold >= 10) {
                        // 切换到金币作为燃料
                        gameData.tools.headlight.fuelType = 'gold';
                        // 每30秒消耗10金币
                        gameData.player.gold -= 10;
                        gameData.tools.headlight.lastGoldConsume = Date.now();
                        headlightGoldConsumed = true;
                        addMessage('电池不足，已自动切换到金币作为燃料！');
                    } else {
                        // 金币也不足，自动停用头灯
                        gameData.tools.headlight.active = false;
                        addMessage('电池和金币都不足，头灯已自动停止使用！请添加电池或金币。');
                    }
                }
            }
        }
        
        // 计算高一级矿物发现几率
        let higherLevelChance = 0.1 + (gameData.tools.headlight.level * 0.01);
        
        // 应用加强灯泡效果
        let strengthenBulbMultiplier = 1;
        let doubleItems = false;
        if (slotEffects && slotEffects.effects.strengthenBulb.length > 0) {
            // 获取最高稀有度的加强灯泡效果
            const highestRarityEffect = slotEffects.effects.strengthenBulb.sort((a, b) => {
                const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
                return rarityOrder[b.rarity] - rarityOrder[a.rarity];
            })[0];
            
            // 根据稀有度计算加强灯泡效果
            switch (highestRarityEffect.rarity) {
                case 'common':
                    strengthenBulbMultiplier = 1.1; // 普通（白色）：头灯数据加10%概率
                    break;
                case 'uncommon':
                    strengthenBulbMultiplier = 1.2; // 稀有（蓝色）：头灯数据加20%概率
                    break;
                case 'rare':
                    strengthenBulbMultiplier = 1.4; // 史诗（紫色）：头灯数据加40%概率
                    break;
                case 'epic':
                    strengthenBulbMultiplier = 1.8; // 传说（橙色）：头灯数据加80%概率
                    doubleItems = true; // 传说级：使获得的物品翻倍
                    break;
            }
            
            // 应用加强灯泡效果
            higherLevelChance *= strengthenBulbMultiplier;
        }
        
        if (Math.random() < higherLevelChance) {
            // 生成高一级矿物
            const mineralLevels = ['石矿', '煤矿', '铁矿', '铜矿', '钴矿', '镍矿', '银矿', '白金矿', '金矿', '水晶矿'];
            const currentIndex = mineralLevels.indexOf(mineral.name);
            if (currentIndex < mineralLevels.length - 1) {
                const higherMineral = mineralLevels[currentIndex + 1];
                // 根据燃料类型决定高一级矿物的数量
                let higherAmount = fuelType === 'battery' ? 5 : Math.floor(Math.random() * 2) + 1;
                
                // 传说级加强灯泡效果：使获得的物品翻倍
                if (doubleItems) {
                    higherAmount *= 2;
                }
                
                for (let i = 0; i < higherAmount; i++) {
                    addToBackpack(higherMineral);
                    // 为头灯额外提供的矿物添加经验
                    const higherMineralData = minerals.find(m => m.name === higherMineral);
                    if (higherMineralData) {
                        // 应用金手套经验加成
                            const bonusExp = applyGoldenGloveExpBonus(higherMineralData.exp);
                            gameData.player.exp += bonusExp;
                            addGainedExp(bonusExp);
                            // 检查并处理经验值溢出
                            checkLevelUp();
                            
                            // 只有当工具经验值未满时才添加经验值
                            if (gameData.tools.pickaxe.level < 50) {
                                const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
                                if (gameData.tools.pickaxe.exp < pickaxeNextExp) {
                                    gameData.tools.pickaxe.exp += bonusExp;
                                }
                            }
                            
                            if (gameData.tools.cart && gameData.tools.cart.level < 50) {
                                const cartNextExp = gameData.tools.cart.nextExp || 50;
                                if (gameData.tools.cart.exp < cartNextExp) {
                                    gameData.tools.cart.exp += bonusExp;
                                }
                            }
                            
                            if (gameData.tools.headlight && gameData.tools.headlight.level < 50) {
                                const headlightNextExp = gameData.tools.headlight.nextExp || 50;
                                if (gameData.tools.headlight.exp < headlightNextExp) {
                                    gameData.tools.headlight.exp += bonusExp;
                                }
                            }
                    }
                }
                addMessage(`头灯效果：发现了 ${higherMineral}×${higherAmount}！`);
                
                // 显示加强灯泡效果触发的消息
                if (slotEffects && slotEffects.effects.strengthenBulb.length > 0) {
                    addMessage('加强灯泡效果触发！头灯效率提升！');
                    if (doubleItems) {
                        addMessage('传说级加强灯泡效果触发！获得的物品翻倍！');
                    }
                    updateMessages();
                }
            }
        }
    }
    
    // 配方获得机制 - 将配方作为物品添加到背包中
    
    // 检查是否有铁匠祝福效果
    const hasBlacksmithBlessing = gameData.activeEffects && gameData.activeEffects.blacksmithBlessing && gameData.activeEffects.blacksmithBlessing.active;
    const blessingBonus = hasBlacksmithBlessing ? 0.05 : 0; // 铁匠祝福增加5%爆率
    
    // 铜铁合金配方：挖铁矿随机获得（概率10% + 铁匠祝福5%）
    if (mineral.name === '铁矿') {
        const ironRecipeChance = 0.1 + blessingBonus;
        if (Math.random() < ironRecipeChance) {
            addToBackpack('铜铁合金配方');
            addMessage('恭喜获得铜铁合金配方！');
        }
    }
    
    // 铜钴合金配方：挖钴矿随机获得（概率1% + 铁匠祝福5%）
    if (mineral.name === '钴矿') {
        const cobaltRecipeChance = 0.01 + blessingBonus;
        if (Math.random() < cobaltRecipeChance) {
            addToBackpack('铜钴合金配方');
            addMessage('恭喜获得铜钴合金配方！');
        }
    }
    
    // 铜镍合金配方：挖镍矿随机获得（概率0.1% + 铁匠祝福5%）
    if (mineral.name === '镍矿') {
        const nickelRecipeChance = 0.001 + blessingBonus;
        if (Math.random() < nickelRecipeChance) {
            addToBackpack('铜镍合金配方');
            addMessage('恭喜获得铜镍合金配方！');
        }
    }
    
    // 铜银合金配方：挖银矿随机获得（概率0.01% + 铁匠祝福5%）
    if (mineral.name === '银矿') {
        const silverRecipeChance = 0.0001 + blessingBonus;
        if (Math.random() < silverRecipeChance) {
            addToBackpack('铜银合金配方');
            addMessage('恭喜获得铜银合金配方！');
        }
    }
    
    // 挖掘铜矿时随机获得存钱罐（概率待定，后续可调整）
    if (mineral.name === '铜矿') {
        // 检查是否有活跃的存钱罐效果
        const hasActivePiggyBankEffect = gameData.activeEffects && Object.values(gameData.activeEffects).some(effect => effect.active);
        if (!hasActivePiggyBankEffect && Math.random() < 0.1) { // 10%概率获得存钱罐，且没有活跃的存钱罐效果
            // 显示存钱罐发现弹窗
            showPiggyBankPopup();
        }
    }
    
    // 计算总经验值：基于实际获得的矿物经验和头灯额外经验
    let totalExp = totalMineralExp;
    
    // 头灯额外经验效果：在总经验基础上增加
    let headlightExtraExp = 0;
    if (gameData.tools.headlight && gameData.tools.headlight.crafted && gameData.tools.headlight.active) {
        const higherLevelChance = 0.1 + (gameData.tools.headlight.level * 0.01);
        if (Math.random() < higherLevelChance) {
            const mineralLevels = ['石矿', '煤矿', '铁矿', '铜矿', '钴矿', '镍矿', '银矿', '白金矿', '金矿', '水晶矿'];
            const currentIndex = mineralLevels.indexOf(mineral.name);
            if (currentIndex < mineralLevels.length - 1) {
                const higherMineral = mineralLevels[currentIndex + 1];
                const higherMineralData = minerals.find(m => m.name === higherMineral);
                if (higherMineralData) {
                    const higherAmount = Math.floor(Math.random() * 2) + 1;
                    headlightExtraExp = applyGoldenGloveExpBonus(Math.floor(higherMineralData.exp * higherAmount));
                    totalExp += headlightExtraExp;
                }
            }
        }
    }
    
    // 收集实际获得的掉落物
    if (mineral.drops) {
        mineral.drops.forEach(drop => {
            if (Math.random() < drop.chance) {
                addToBackpack(drop.name);
                if (['棉布', '织布', '粗麻布', '尼龙布'].includes(drop.name)) {
                    addGainedCloth();
                }
                obtainedDrops.push(drop.name);
            }
        });
    }
    
    // 统一添加矿物获得的经验
    if (totalExp > 0) {
        // 添加经验到玩家
        gameData.player.exp += totalExp;
        addGainedExp(totalExp);
        // 检查并处理经验值溢出
        checkLevelUp();
        
        // 只有当工具经验值未满时才添加经验值
        if (gameData.tools.pickaxe.level < 50) {
            const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
            if (gameData.tools.pickaxe.exp < pickaxeNextExp) {
                const pickaxeExp = Math.floor(totalExp / baseAmount); // 平均分配到每个矿物
                gameData.tools.pickaxe.exp += pickaxeExp;
            }
        }
        
        if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.level < 50) {
            const cartNextExp = gameData.tools.cart.nextExp || 50;
            if (gameData.tools.cart.exp < cartNextExp) {
                const cartExp = Math.floor(totalExp / baseAmount); // 平均分配到每个矿物
                gameData.tools.cart.exp += cartExp;
            }
        }
        
        if (gameData.tools.headlight && gameData.tools.headlight.crafted && gameData.tools.headlight.level < 50) {
            const headlightNextExp = gameData.tools.headlight.nextExp || 50;
            if (gameData.tools.headlight.exp < headlightNextExp) {
                const headlightExp = Math.floor(totalExp / baseAmount); // 平均分配到每个矿物
                gameData.tools.headlight.exp += headlightExp;
            }
        }
    }
    
    // 使用最终数据重新生成采矿记录，覆盖之前的初始记录
    // 首先移除初始记录
    const initialRecordIndex = gameData.miningRecords.findIndex(r => r.id === initialMiningResult.miningRecordId);
    if (initialRecordIndex !== -1) {
        gameData.miningRecords.splice(initialRecordIndex, 1);
    }
    // 使用相同的记录ID重新生成采矿记录
    const miningResult = generateMiningMessage(mineral, obtainedDrops, headlightGoldConsumed, totalExp, baseAmount, initialMiningResult.miningRecordId);
    
    // 添加最终的采矿消息
    addMessage({
        message: miningResult.message,
        type: 'mining',
        miningRecordId: miningResult.miningRecordId
    });
    updateUI();
    updateBackpackDisplay();
    updateMessages();
    // 只有在非连续采矿时才更新矿物网格，避免连续采矿过程中丢失元素引用
    if (!continuousMining) {
        // 每次采矿完成后都更新矿物网格，确保开采时间的显示是最新的
        generateMineralGrid();
    }
    saveGame();
}

// 获取徽章升级所需的矿工需求
function getBadgeMinerRequirement(level) {
    switch(level) {
        case 1: return { count: 1, minLevel: 2 }; // 0→1: 至少1个矿工到2级
        case 2: return { count: 2, minLevel: 2 }; // 1→2: 至少2个矿工到2级
        case 3: return { count: 1, minLevel: 3 }; // 2→3: 至少1个矿工到3级
        case 4: return { count: 2, minLevel: 3 }; // 3→4: 至少2个矿工到3级
        case 5: return { count: 3, minLevel: 3 }; // 4→5: 至少3个矿工到3级
        case 6: return { count: 4, minLevel: 3 }; // 5→6: 至少4个矿工到3级
        case 7: return { count: 1, minLevel: 4 }; // 6→7: 至少1个矿工到4级
        case 8: return { count: 2, minLevel: 4 }; // 7→8: 至少2个矿工到4级
        case 9: return { count: 4, minLevel: 4 }; // 8→9: 至少4个矿工到4级
        case 10: return { count: 5, minLevel: 4 }; // 9→10: 5个矿工到4级
        default: return { count: 0, minLevel: 0 };
    }
}

// 检查是否满足矿工需求
function checkMinerRequirements(level) {
    const requirement = getBadgeMinerRequirement(level);
    if (requirement.count === 0) return true;
    
    // 统计符合要求的矿工数量
    const qualifiedMiners = gameData.minersGuild.miners.filter(miner => {
        return miner.level >= requirement.minLevel;
    });
    
    return qualifiedMiners.length >= requirement.count;
}

// 升级徽章
function upgradeBadge() {
    const badgeSystem = gameData.minersGuild.badgeSystem;
    let currentLevel = badgeSystem.currentLevel;
    
    // 确保currentLevel在合理范围内
    currentLevel = Math.max(0, Math.min(currentLevel, badgeSystem.maxLevel));
    badgeSystem.currentLevel = currentLevel;
    
    // 检查是否已达到最高等级
    if (currentLevel >= badgeSystem.maxLevel) {
        addMessage('徽章已达到最高等级！');
        return;
    }
    
    // 获取下一级所需材料
    const nextLevel = currentLevel + 1;
    const upgradeData = badgeSystem.upgradeMaterials.find(data => data.level === nextLevel);
    
    if (!upgradeData) {
        console.error('升级数据错误：找不到等级', nextLevel, '的升级材料');
        console.error('当前等级:', currentLevel, '最大等级:', badgeSystem.maxLevel);
        console.error('升级材料列表:', badgeSystem.upgradeMaterials);
        addMessage('升级数据错误！');
        return;
    }
    
    // 检查矿工需求
    if (!checkMinerRequirements(nextLevel)) {
        const requirement = getBadgeMinerRequirement(nextLevel);
        addMessage(`矿工需求不满足！需要至少${requirement.count}个矿工达到${requirement.minLevel}级！`);
        return;
    }
    
    // 检查特殊材料要求
    const specialMaterials = Object.keys(upgradeData.materials).filter(key => {
        return key === 'forgeDelegate' || key === 'magicEquipment';
    });
    
    for (const specialMaterial of specialMaterials) {
        if (specialMaterial === 'forgeDelegate') {
            // 检查是否完成锻造委托
            if (!gameData.specialEvents || !gameData.specialEvents.forgeDelegate || !gameData.specialEvents.forgeDelegate.completed) {
                addMessage('特殊需求未满足！需要完成锻造委托：成为学徒锻造师！');
                return;
            }
        } else if (specialMaterial === 'magicEquipment') {
            // 检查是否锻造了魔法稀有度装备
            if (!gameData.specialEvents || !gameData.specialEvents.magicEquipment || !gameData.specialEvents.magicEquipment.completed) {
                addMessage('特殊需求未满足！需要锻造1个魔法稀有度装备！');
                return;
            }
        }
    }
    
    // 检查普通材料是否足够
    const normalMaterials = {};
    for (const [item, amount] of Object.entries(upgradeData.materials)) {
        if (item !== 'forgeDelegate' && item !== 'magicEquipment') {
            normalMaterials[item] = amount;
        }
    }
    
    if (!hasEnoughMaterials(normalMaterials)) {
        addMessage('材料不足，无法升级徽章！');
        return;
    }
    
    // 扣除普通材料
    deductMaterials(normalMaterials);
    
    // 处理特殊材料需求（标记为已完成）
    for (const specialMaterial of specialMaterials) {
        if (specialMaterial === 'forgeDelegate' && gameData.specialEvents.forgeDelegate) {
            gameData.specialEvents.forgeDelegate.completed = false; // 重置委托状态，防止重复使用
        } else if (specialMaterial === 'magicEquipment' && gameData.specialEvents.magicEquipment) {
            gameData.specialEvents.magicEquipment.completed = false; // 重置装备状态，防止重复使用
        }
    }
    
    // 升级徽章
    badgeSystem.currentLevel = nextLevel;
    
    // 更新矿工效率
    updateMinersEfficiency();
    
    // 更新badges系统
    gameData.badges.badgeLevel = nextLevel;
    gameData.badges.hasMinersBadge = true;
    
    addMessage(`恭喜！徽章升级到${nextLevel}级！矿工效率提升了！`);
    saveGame();
    
    // 更新界面
    updateBadgeUI();
}

// 检查材料是否足够
function hasEnoughMaterials(materials) {
    for (const [item, amount] of Object.entries(materials)) {
        if (item === '金币') {
            if (gameData.player.gold < amount) {
                return false;
            }
        } else if (item.endsWith('Ticket')) {
            // 处理工具等级提升券
            const toolType = item.replace('Ticket', ''); // pickaxe, cart, headlight
            if (!gameData.unlockTickets || !gameData.unlockTickets[toolType] || gameData.unlockTickets[toolType] < amount) {
                return false;
            }
        } else if (item.startsWith('toolSlot')) {
            // 处理工具插片
            // 假设工具插片存储在backpack.items中
            if (!gameData.backpack.items[item] || gameData.backpack.items[item] < amount) {
                return false;
            }
        } else {
            // 普通材料
            if (!gameData.backpack.items[item] || gameData.backpack.items[item] < amount) {
                return false;
            }
        }
    }
    return true;
}

// 扣除材料
function deductMaterials(materials) {
    for (const [item, amount] of Object.entries(materials)) {
        if (item === '金币') {
            gameData.player.gold -= amount;
        } else if (item.endsWith('Ticket')) {
            // 处理工具等级提升券
            const toolType = item.replace('Ticket', ''); // pickaxe, cart, headlight
            if (gameData.unlockTickets && gameData.unlockTickets[toolType]) {
                gameData.unlockTickets[toolType] -= amount;
                // 同时更新tools对象中的对应字段
                if (gameData.tools && gameData.tools[toolType]) {
                    gameData.tools[toolType].unlockTickets -= amount;
                }
            }
        } else if (item.startsWith('toolSlot')) {
            // 处理工具插片
            if (gameData.backpack.items[item]) {
                gameData.backpack.items[item] -= amount;
            }
        } else {
            // 普通材料
            if (gameData.backpack.items[item]) {
                gameData.backpack.items[item] -= amount;
            }
        }
    }
}

// 更新矿工效率
function updateMinersEfficiency() {
    const badgeSystem = gameData.minersGuild.badgeSystem;
    const currentLevel = badgeSystem.currentLevel;
    const efficiencyBonus = badgeSystem.efficiencyBonuses[currentLevel] || 1.0;
    
    // 更新所有矿工的效率
    gameData.minersGuild.miners.forEach(miner => {
        // 基础效率：根据矿工等级计算
        const baseEfficiency = 1.0 + (miner.level - 1) * 0.1; // 每级矿工增加10%基础效率
        
        // 徽章效率加成：直接乘以基础效率
        const totalEfficiency = baseEfficiency * efficiencyBonus;
        
        // 确保效率不会低于基础值
        miner.efficiency = Math.max(totalEfficiency, baseEfficiency);
    });
}

// 处理徽章升级材料
function processBadgeUpgradeMaterials() {
    const badgeSystem = gameData.minersGuild.badgeSystem;
    const currentLevel = badgeSystem.currentLevel;
    const nextLevel = currentLevel + 1;
    
    // 获取下一级所需材料
    const upgradeData = badgeSystem.upgradeMaterials.find(data => data.level === nextLevel);
    
    if (!upgradeData) {
        return null;
    }
    
    return upgradeData.materials;
}

// 更新徽章UI
function updateBadgeUI() {
    const badgeSystem = gameData.minersGuild.badgeSystem;
    const currentLevel = badgeSystem.currentLevel;
    const nextLevel = currentLevel + 1;
    
    // 获取下一级所需材料
    const upgradeData = badgeSystem.upgradeMaterials.find(data => data.level === nextLevel);
    
    // 更新矿工协会界面中的徽章信息
    const badgeSection = document.querySelector('.badge-upgrade-section');
    if (badgeSection) {
        let materialsHTML = '';
        let specialRequirementsHTML = '';
        let minerRequirementHTML = '';
        
        if (upgradeData && currentLevel < badgeSystem.maxLevel) {
            // 生成矿工需求信息
            const minerRequirement = getBadgeMinerRequirement(nextLevel);
            if (minerRequirement.count > 0) {
                const qualifiedMiners = gameData.minersGuild.miners.filter(miner => {
                    return miner.level >= minerRequirement.minLevel;
                });
                const meetsRequirements = qualifiedMiners.length >= minerRequirement.count;
                minerRequirementHTML = `
                    <div class="miner-requirements">
                        <h5>矿工需求：</h5>
                        <div class="miner-requirement-item">
                            <span>需要至少${minerRequirement.count}个矿工达到${minerRequirement.minLevel}级</span>
                            <span class="miner-requirement-status ${meetsRequirements ? 'enough' : 'not-enough'}">(${qualifiedMiners.length}/${minerRequirement.count})</span>
                        </div>
                    </div>
                `;
            }
            
            // 生成特殊需求信息
            const specialMaterials = Object.keys(upgradeData.materials).filter(key => {
                return key === 'forgeDelegate' || key === 'magicEquipment';
            });
            
            if (specialMaterials.length > 0) {
                specialRequirementsHTML = `<div class="special-requirements"><h5>特殊需求：</h5>`;
                for (const specialMaterial of specialMaterials) {
                    let status = 'not-enough';
                    let description = '';
                    
                    if (specialMaterial === 'forgeDelegate') {
                        description = '完成锻造委托：成为学徒锻造师';
                        if (gameData.specialEvents && gameData.specialEvents.forgeDelegate && gameData.specialEvents.forgeDelegate.completed) {
                            status = 'enough';
                        }
                    } else if (specialMaterial === 'magicEquipment') {
                        description = '锻造1个魔法稀有度装备';
                        if (gameData.specialEvents && gameData.specialEvents.magicEquipment && gameData.specialEvents.magicEquipment.completed) {
                            status = 'enough';
                        }
                    }
                    
                    specialRequirementsHTML += `
                        <div class="special-requirement-item ${status}">
                            ${description}
                            <span class="special-requirement-status">${status === 'enough' ? '✓' : '✗'}</span>
                        </div>
                    `;
                }
                specialRequirementsHTML += `</div>`;
            }
            
            // 生成普通材料信息
            const normalMaterials = Object.entries(upgradeData.materials).filter(([key, value]) => {
                return key !== 'forgeDelegate' && key !== 'magicEquipment';
            });
            
            if (normalMaterials.length > 0) {
                materialsHTML = `<div class="upgrade-materials"><h5>升级所需材料：</h5>`;
                for (const [item, amount] of normalMaterials) {
                    let playerHas = 0;
                    const materialName = materialNameMap[item] || item;
                    
                    if (item === '金币') {
                        playerHas = gameData.player.gold;
                    } else if (item.endsWith('Ticket')) {
                        // 处理工具等级提升券
                        const toolType = item.replace('Ticket', '');
                        playerHas = gameData.unlockTickets && gameData.unlockTickets[toolType] ? gameData.unlockTickets[toolType] : 0;
                    } else {
                        // 普通材料
                        playerHas = gameData.backpack.items[item] || 0;
                    }
                    
                    const enough = playerHas >= amount;
                    materialsHTML += `
                        <div class="material-item">
                            <span class="material-name">${materialName}：</span>
                            <span class="material-amount ${enough ? 'enough' : 'not-enough'}">${playerHas}/${amount}</span>
                        </div>
                    `;
                }
                materialsHTML += `</div>`;
            }
        }
        
        badgeSection.innerHTML = `
            <h4>徽章升级</h4>
            <div class="badge-info">
                <div class="badge-level">当前徽章等级：${currentLevel}/${badgeSystem.maxLevel}</div>
                <div class="badge-efficiency">矿工效率加成：${((badgeSystem.efficiencyBonuses[currentLevel] - 1) * 100).toFixed(0)}%</div>
            </div>
            ${currentLevel < badgeSystem.maxLevel ? `
                ${minerRequirementHTML}
                ${specialRequirementsHTML}
                ${materialsHTML}
                <button onclick="upgradeBadge()" class="upgrade-btn">升级徽章</button>
            ` : `
                <div class="max-level">徽章已达到最高等级！</div>
            `}
        `;
    }
}

function addToBackpack(itemName, amount = 1, updateUI = true) {
    calculateBackpackStats();
    const currentStackSize = gameData.backpack.currentStackSize;
    let remainingAmount = amount;
    let actualAddedAmount = 0;
    
    // 尝试添加到现有堆叠
    for (const [name, count] of Object.entries(gameData.backpack.items)) {
        const baseName = name.split('_')[0];
        if (baseName === itemName && count < currentStackSize) {
            const addAmount = Math.min(remainingAmount, currentStackSize - count);
            gameData.backpack.items[name] += addAmount;
            remainingAmount -= addAmount;
            actualAddedAmount += addAmount;
            
            if (remainingAmount <= 0) {
                break;
            }
        }
    }
    
    // 如果没有添加到现有堆叠，尝试创建新堆叠
    while (remainingAmount > 0) {
        const itemCount = Object.keys(gameData.backpack.items).length;
        if (itemCount < gameData.backpack.capacity) {
            // 背包还有空槽位，直接创建新物品（使用基础名称）
            const addAmount = Math.min(remainingAmount, currentStackSize);
            gameData.backpack.items[itemName] = (gameData.backpack.items[itemName] || 0) + addAmount;
            remainingAmount -= addAmount;
            actualAddedAmount += addAmount;
        } else {
            // 背包满了，放入临时背包
            addToTempBackpack(itemName, remainingAmount);
            break;
        }
    }
    
    // 记录详细获得信息和总矿物数量，只统计实际添加到背包中的数量
    ensureGainedInfoExists();
    if (actualAddedAmount > 0) {
        if (gameData.gainedInfo.detailed[itemName]) {
            gameData.gainedInfo.detailed[itemName] += actualAddedAmount;
        } else {
            gameData.gainedInfo.detailed[itemName] = actualAddedAmount;
        }
        // 更新总矿物数量
        addGainedMineral(actualAddedAmount);
    }
    
    // 更新背包显示
    if (updateUI) {
        updateBackpackDisplay();
        updateToolSlotInfo(); // 更新插片信息，确保制作材料实时更新
        
        // 如果获得的是铜矿，检查NPC购买铜矿事件
        if (itemName === '铜矿') {
            checkSpecialEvents();
        }
    }
}

// 获取工具升级需求
function getToolUpgradeRequirements(toolType, level) {
    if (toolType === 'pickaxe') {
        // 采矿锄升级需求
        const requirements = {
            1: { materials: { '石矿': 30 }, gold: 10 },
            2: { materials: { '石矿': 60 }, gold: 15 },
            3: { materials: { '石矿': 90 }, gold: 23 },
            4: { materials: { '铁矿': 30 }, gold: 35 },
            5: { materials: { '铁矿': 60 }, gold: 53 },
            6: { materials: { '铁矿': 90 }, gold: 80 },
            7: { materials: { '铁矿': 90, '铜铁合金': 1 }, gold: 120 },
            8: { materials: { '铁矿': 90, '铜铁合金': 3 }, gold: 180 },
            9: { materials: { '铁矿': 90, '铜铁合金': 5 }, gold: 270 },
            10: { materials: { '铜矿': 30, '铜铁合金': 7 }, gold: 405 },
            11: { materials: { '铜矿': 60, '铜铁合金': 9 }, gold: 608 },
            12: { materials: { '铜矿': 90, '铜铁合金': 11 }, gold: 912 },
            13: { materials: { '铜矿': 90, '铜铁合金': 13 }, gold: 1368 },
            14: { materials: { '铜矿': 90, '铜铁合金': 15 }, gold: 2052 },
            15: { materials: { '铜矿': 90, '铜铁合金': 17 }, gold: 3078 }
        };
        
        // 15级以上的需求，每级增加2个铜铁合金，金币为前一级的120%，最高不超过50万
        if (level > 15) {
            const baseLevel = 15;
            const baseRequirements = requirements[baseLevel];
            const additionalLevel = level - baseLevel;
            const materials = { ...baseRequirements.materials };
            materials['铜铁合金'] = baseRequirements.materials['铜铁合金'] + (additionalLevel * 2);
            const maxGold = 500000; // 50万金币上限
            const calculatedGold = Math.floor(baseRequirements.gold * Math.pow(1.2, additionalLevel));
            const gold = Math.min(calculatedGold, maxGold);
            return { materials, gold };
        }
        
        return requirements[level] || { materials: {}, gold: 0 };
    }
    
    if (toolType === 'cart') {
        // 矿车升级需求
        const requirements = {
            1: { materials: { '石矿': 50 }, gold: 20 },
            2: { materials: { '石矿': 100 }, gold: 30 },
            3: { materials: { '铁矿': 50 }, gold: 45 },
            4: { materials: { '铁矿': 100 }, gold: 68 },
            5: { materials: { '铁矿': 150, '铜铁合金': 2 }, gold: 102 },
            6: { materials: { '铜矿': 50, '铜铁合金': 4 }, gold: 153 },
            7: { materials: { '铜矿': 100, '铜铁合金': 6 }, gold: 230 },
            8: { materials: { '铜矿': 150, '铜铁合金': 8 }, gold: 345 },
            9: { materials: { '钴矿': 50, '铜钴合金': 2 }, gold: 518 },
            10: { materials: { '钴矿': 100, '铜钴合金': 4 }, gold: 777 }
        };
        
        // 10级以上的需求，每级增加2个铜钴合金，金币为前一级的120%，最高不超过50万
        if (level > 10) {
            const baseLevel = 10;
            const baseRequirements = requirements[baseLevel];
            const additionalLevel = level - baseLevel;
            const materials = { ...baseRequirements.materials };
            materials['铜钴合金'] = baseRequirements.materials['铜钴合金'] + (additionalLevel * 2);
            const maxGold = 500000; // 50万金币上限
            const calculatedGold = Math.floor(baseRequirements.gold * Math.pow(1.2, additionalLevel));
            const gold = Math.min(calculatedGold, maxGold);
            return { materials, gold };
        }
        
        return requirements[level] || { materials: {}, gold: 0 };
    }
    
    if (toolType === 'headlight') {
        // 头灯升级需求
        const requirements = {
            1: { materials: { '石矿': 80 }, gold: 50 },
            2: { materials: { '铁矿': 80 }, gold: 75 },
            3: { materials: { '铁矿': 120 }, gold: 113 },
            4: { materials: { '铜矿': 80, '铜铁合金': 3 }, gold: 170 },
            5: { materials: { '铜矿': 120, '铜铁合金': 5 }, gold: 255 },
            6: { materials: { '钴矿': 80, '铜钴合金': 2 }, gold: 383 },
            7: { materials: { '钴矿': 120, '铜钴合金': 4 }, gold: 575 },
            8: { materials: { '镍矿': 80, '铜镍合金': 2 }, gold: 863 },
            9: { materials: { '镍矿': 120, '铜镍合金': 4 }, gold: 1295 },
            10: { materials: { '银矿': 80, '铜银合金': 2 }, gold: 1943 }
        };
        
        // 10级以上的需求，每级增加2个铜银合金，金币为前一级的120%，最高不超过50万
        if (level > 10) {
            const baseLevel = 10;
            const baseRequirements = requirements[baseLevel];
            const additionalLevel = level - baseLevel;
            const materials = { ...baseRequirements.materials };
            materials['铜银合金'] = baseRequirements.materials['铜银合金'] + (additionalLevel * 2);
            const maxGold = 500000; // 50万金币上限
            const calculatedGold = Math.floor(baseRequirements.gold * Math.pow(1.2, additionalLevel));
            const gold = Math.min(calculatedGold, maxGold);
            return { materials, gold };
        }
        
        return requirements[level] || { materials: {}, gold: 0 };
    }
    
    return { materials: {}, gold: 0 };
}

// 手动升级工具
function upgradeTool(toolType) {
    let tool;
    let toolName;
    
    switch (toolType) {
        case 'pickaxe':
            tool = gameData.tools.pickaxe;
            toolName = '采矿锄';
            break;
        case 'cart':
            tool = gameData.tools.cart;
            toolName = '矿车';
            break;
        case 'headlight':
            tool = gameData.tools.headlight;
            toolName = '头灯';
            break;
        default:
            return;
    }
    
    // 检查临时背包是否有物品
    if (hasTempItems()) {
        alert('临时背包中有物品，请先处理临时背包中的物品！');
        return;
    }
    
    // 检查工具是否已制作（矿车和头灯需要先制作）
    if ((toolType === 'cart' || toolType === 'headlight') && !tool.crafted) {
        alert(`请先制作${toolName}！`);
        return;
    }
    
    // 检查工具是否已达到最高等级
    if (tool.level >= tool.maxLevel) {
        alert(`${toolName}已达到最高等级${tool.maxLevel}级！`);
        return;
    }
    
    // 计算下一级
    const nextLevel = tool.level + 1;
    const requirements = getToolUpgradeRequirements(toolType, nextLevel);
    
    // 检查材料是否足够
    let hasMaterials = true;
    for (const [material, amount] of Object.entries(requirements.materials)) {
        if (!hasEnoughItem(material, amount)) {
            hasMaterials = false;
            break;
        }
    }
    
    // 检查金币是否足够
    const hasGold = gameData.player.gold >= requirements.gold;
    
    if (!hasMaterials) {
        let materialsText = '';
        for (const [material, amount] of Object.entries(requirements.materials)) {
            materialsText += `${material}×${amount} `;
        }
        alert(`材料不足！需要：${materialsText}`);
        return;
    }
    
    if (!hasGold) {
        alert(`金币不足！需要${requirements.gold}金币`);
        return;
    }
    
    // 消耗材料
    for (const [material, amount] of Object.entries(requirements.materials)) {
        consumeItem(material, amount);
    }
    
    // 消耗金币
    gameData.player.gold -= requirements.gold;
    
    // 升级工具
    tool.level = nextLevel;
    
    // 更新UI
    updateUI();
    updateBackpackDisplay();
    // 只有在非连续采矿时才更新矿物网格，避免连续采矿过程中丢失元素引用
    if (!continuousMining) {
        generateMineralGrid();
    }
    
    // 添加升级消息
    addMessage(`${toolName}升级到 ${nextLevel} 级！`);
    
    // 保存游戏
    saveGame();
}

function checkLevelUp() {
    let leveledUp = false;
    
    while (gameData.player.exp >= gameData.player.nextExp) {
        gameData.player.exp -= gameData.player.nextExp;
        gameData.player.level++;
        gameData.player.nextExp = Math.floor(gameData.player.nextExp * 1.5);
        addMessage(`玩家升级到 ${gameData.player.level} 级！`);
        
        // 检查任务大厅解锁
        checkQuestHallUnlock();
        
        leveledUp = true;
    }
    
    // 如果玩家升级了，执行相关更新
    if (leveledUp) {
        checkAndUnlockAllRecipes();
        // 重新生成矿物网格，显示新解锁的矿物
        generateMineralGrid();
        // 重新生成矿物选项，更新下拉菜单
        generateMineralOptions();
        // 更新矿工协会的自动挖矿矿物选项
        if (gameData.minersGuild.unlocked) {
            const mineralSelect = document.getElementById('mineral-select');
            if (mineralSelect) {
                mineralSelect.innerHTML = generateMineralOptions();
            }
        }
    }
    
    // 采矿锄：初始经验50点，每级增加50%，最大50级
    if (gameData.tools.pickaxe.exp === undefined) gameData.tools.pickaxe.exp = 0;
    if (gameData.tools.pickaxe.nextExp === undefined) gameData.tools.pickaxe.nextExp = 50;
    // 确保经验不会超过下一级所需经验
    if (gameData.tools.pickaxe.exp >= gameData.tools.pickaxe.nextExp) {
        gameData.tools.pickaxe.exp = gameData.tools.pickaxe.nextExp;
    }
    
    // 矿车：初始经验100点，每级增加50%，最大50级
    if (gameData.tools.cart && gameData.tools.cart.crafted) {
        if (gameData.tools.cart.exp === undefined) gameData.tools.cart.exp = 0;
        if (gameData.tools.cart.nextExp === undefined) gameData.tools.cart.nextExp = 100;
        // 确保经验不会超过下一级所需经验
        if (gameData.tools.cart.exp >= gameData.tools.cart.nextExp) {
            gameData.tools.cart.exp = gameData.tools.cart.nextExp;
        }
    }
    
    // 头灯：初始经验200点，每级增加50%，最大50级
    if (gameData.tools.headlight && gameData.tools.headlight.crafted) {
        if (gameData.tools.headlight.exp === undefined) gameData.tools.headlight.exp = 0;
        if (gameData.tools.headlight.nextExp === undefined) gameData.tools.headlight.nextExp = 200;
        // 确保经验不会超过下一级所需经验
        if (gameData.tools.headlight.exp >= gameData.tools.headlight.nextExp) {
            gameData.tools.headlight.exp = gameData.tools.headlight.nextExp;
        }
    }
}

// 显示获得的金币
function addGainedGold(amount) {
    if (amount <= 0) return;
    
    // 实现添加金币的显示效果
    const gainedGoldElement = document.createElement('div');
    gainedGoldElement.className = 'gained-gold';
    gainedGoldElement.textContent = `+${amount} 金币`;
    gainedGoldElement.style.position = 'fixed';
    gainedGoldElement.style.top = '50%';
    gainedGoldElement.style.left = '50%';
    gainedGoldElement.style.transform = 'translate(-50%, -50%)';
    gainedGoldElement.style.backgroundColor = 'rgba(255, 215, 0, 0.8)';
    gainedGoldElement.style.color = 'black';
    gainedGoldElement.style.padding = '10px 20px';
    gainedGoldElement.style.borderRadius = '5px';
    gainedGoldElement.style.zIndex = '10000';
    gainedGoldElement.style.fontWeight = 'bold';
    gainedGoldElement.style.animation = 'fadeOut 2s ease-out forwards';
    document.body.appendChild(gainedGoldElement);
    
    // 2秒后移除元素
    setTimeout(() => {
        if (gainedGoldElement.parentNode) {
            gainedGoldElement.parentNode.removeChild(gainedGoldElement);
        }
    }, 2000);
}

function getToolDescription() {
    // 确保工具对象存在
    if (!gameData.tools.cart) gameData.tools.cart = { crafted: false, active: true, fuelType: 'coal', fuelCapacity: 50, currentFuel: 0 };
    if (gameData.tools.cart.fuelCapacity === undefined) gameData.tools.cart.fuelCapacity = 50;
    if (gameData.tools.cart.currentFuel === undefined) gameData.tools.cart.currentFuel = 0;
    if (gameData.tools.cart.fuelType === undefined) gameData.tools.cart.fuelType = 'coal';
    if (!gameData.tools.headlight) gameData.tools.headlight = { crafted: false, active: true };
    
    // 获取下一级工具升级需求
    function getNextLevelRequirements(toolType) {
        const nextLevel = gameData.tools[toolType].level + 1;
        if (nextLevel > 50) {
            return '已达到最高等级';
        }
        const requirements = getToolUpgradeRequirements(toolType, nextLevel);
        let materialsText = '';
        for (const [material, amount] of Object.entries(requirements.materials)) {
            // 计算背包中现有材料的数量
            let existingAmount = 0;
            for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
                const baseName = itemName.split('_')[0];
                if (baseName === material) {
                    existingAmount += count;
                }
            }
            materialsText += `${material}×${amount}(${existingAmount}), `;
        }
        materialsText = materialsText.slice(0, -2);
        return `${materialsText}，金币${requirements.gold}`;
    }
    
    // 计算矿车还能用多少次
    function getCartUsesLeft() {
        if (!gameData.tools.cart.crafted || !gameData.tools.cart.active) {
            return 0;
        }
        // 直接返回燃料舱中的当前燃料量
        return gameData.tools.cart.currentFuel || 0;
    }
    
    // 计算头灯剩余时间
    function getHeadlightTimeLeft() {
        if (!gameData.tools.headlight.crafted || !gameData.tools.headlight.active) {
            return { current: 0, total: 0 };
        }
        
        // 确保头灯属性完整
        if (!gameData.tools.headlight.fuelType) gameData.tools.headlight.fuelType = 'gold';
        if (!gameData.tools.headlight.batteryEnergy) gameData.tools.headlight.batteryEnergy = 0;
        if (!gameData.tools.headlight.lastGoldConsume) gameData.tools.headlight.lastGoldConsume = Date.now();
        
        if (gameData.tools.headlight.fuelType === 'battery') {
            // 使用电池时，返回电池能量
            return { current: gameData.tools.headlight.batteryEnergy * 1000, total: gameData.tools.headlight.batteryEnergy * 1000 };
        } else {
            // 使用金币时，计算剩余时间
            const now = Date.now();
            const lastConsume = gameData.tools.headlight.lastGoldConsume || now;
            const timeSinceLast = now - lastConsume;
            const currentTimeLeft = Math.max(0, 30000 - timeSinceLast);
            const goldCount = gameData.player.gold;
            const totalTimeLeft = Math.floor(goldCount / 10) * 30;
            return { current: currentTimeLeft, total: totalTimeLeft };
        }
    }
    
    const cartUsesLeft = getCartUsesLeft();
    const headlightTime = getHeadlightTimeLeft();
    
    const descriptions = {
        pickaxe: {
            name: '采矿锄',
            description: '加快采矿速度',
            current: `当前效果: 采矿速度提升 ${calculatePickaxeBonus(gameData.tools.pickaxe.level)}%`,
            next: gameData.tools.pickaxe.level < 50 ? `下一级: 采矿速度提升 ${calculatePickaxeBonus(gameData.tools.pickaxe.level + 1)}%` : '已达到最高等级',
            upgrade: gameData.tools.pickaxe.level < 50 ? `升级需求: ${getNextLevelRequirements('pickaxe')}` : ''
        },
        cart: {
            name: '矿车',
            description: gameData.tools.cart.fuelType === 'fuel' ? '增加采矿数量，消耗燃料' : '增加采矿数量，消耗煤矿',
            current: gameData.tools.cart.crafted ? `当前效果: 采矿数量+${Math.floor(gameData.tools.cart.level / 5)}个，使用${gameData.tools.cart.fuelType === 'fuel' ? '燃料作为能源供应数量额外增加5' : '煤炭作为能源供应无特殊加成'}` : '未制作',
            next: gameData.tools.cart.crafted ? (gameData.tools.cart.level < 50 ? `下一级: 采矿数量+${Math.floor((gameData.tools.cart.level + 1) / 5)}个` : '已达到最高等级') : '制作后获得效果',
            upgrade: gameData.tools.cart.crafted && gameData.tools.cart.level < 50 ? `升级需求: ${getNextLevelRequirements('cart')}` : '',
            usesLeft: gameData.tools.cart.crafted ? (gameData.tools.cart.fuelType === 'fuel' ? `燃料舱: ${gameData.tools.cart.currentFuel || 0}/${gameData.tools.cart.fuelCapacity || 50}（剩余${gameData.tools.cart.currentFuel || 0}次使用）` : (() => {
                let coalCount = 0;
                // 计算背包中的煤矿数量
                for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
                    const baseName = itemName.split('_')[0];
                    if (baseName === '煤矿') {
                        coalCount += count;
                    }
                }
                // 计算临时背包中的煤矿数量
                for (const [itemName, count] of Object.entries(gameData.tempBackpack.items)) {
                    const baseName = itemName.split('_')[0];
                    if (baseName === '煤矿') {
                        coalCount += count;
                    }
                }
                return `背包煤矿: ${coalCount}个（剩余${coalCount}次使用）`;
            })()) : '',
            fuelInfo: gameData.tools.cart.crafted ? `${gameData.tools.cart.fuelType === 'fuel' ? '燃料提供50次消耗' : '每次采矿消耗1个煤矿'}` : ''
        },
        headlight: {
            name: '头灯',
            description: gameData.tools.headlight.fuelType === 'battery' ? '增加高一级矿物发现几率，消耗电力' : '增加高一级矿物发现几率，消耗金币',
            current: gameData.tools.headlight.crafted ? (gameData.tools.headlight.fuelType === 'battery' ? `当前效果: 高一级矿物几率+${10 + gameData.tools.headlight.level * 1}%，使用电池作为能源供应产出数量额外增加5` : `当前效果: 高一级矿物几率+${10 + gameData.tools.headlight.level * 1}%，消耗金币`) : '未制作',
            next: gameData.tools.headlight.crafted ? (gameData.tools.headlight.level < 50 ? `下一级: 高一级矿物几率+${10 + (gameData.tools.headlight.level + 1) * 1}%` : '已达到最高等级') : '制作后获得效果',
            upgrade: gameData.tools.headlight.crafted && gameData.tools.headlight.level < 50 ? `升级需求: ${getNextLevelRequirements('headlight')}` : '',
            timeLeft: gameData.tools.headlight.crafted && gameData.tools.headlight.active ? (gameData.tools.headlight.fuelType === 'battery' ? `电池能量: ${Math.round(gameData.tools.headlight.batteryEnergy || 0)}秒` : `剩余时间: ${(headlightTime.current / 1000).toFixed(0)}秒，总可用: ${headlightTime.total}秒`) : '',
            fuelInfo: gameData.tools.headlight.crafted ? `${gameData.tools.headlight.fuelType === 'battery' ? '1个电池提供300秒能量' : '每30秒消耗10金币'}` : ''
        }
    };
    return descriptions;
}

function updateUI() {
    document.getElementById('player-level').textContent = `lv${gameData.player.level}`;
    document.getElementById('player-exp').textContent = gameData.player.exp;
    document.getElementById('player-next-exp').textContent = gameData.player.nextExp;
    document.getElementById('player-gold').textContent = gameData.player.gold;
    
    const toolDescriptions = getToolDescription();
    
    document.getElementById('pickaxe-level').textContent = `lv${gameData.tools.pickaxe.level}`;
    document.getElementById('pickaxe-exp').textContent = gameData.tools.pickaxe.exp;
    document.getElementById('pickaxe-next-exp').textContent = gameData.tools.pickaxe.nextExp;
    
    // 确保工具对象存在
    if (!gameData.tools.cart) gameData.tools.cart = { crafted: false, active: true };
    if (!gameData.tools.headlight) gameData.tools.headlight = { crafted: false, active: true };
    
    // 检查是否有走丢的矿车效果
    const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
    
    const cartText = gameData.tools.cart.crafted 
        ? hasLostCartEffect 
            ? `lv${gameData.tools.cart.level} (${gameData.tools.cart.exp || 0}/${gameData.tools.cart.nextExp || 50}) (矿车走丢中)` 
            : `lv${gameData.tools.cart.level} (${gameData.tools.cart.exp || 0}/${gameData.tools.cart.nextExp || 50}) ${gameData.tools.cart.active ? '(使用中)' : '(已暂停)'}` 
        : '未制作';
    document.getElementById('cart-status').textContent = cartText;
    
    // 设置矿车燃料类型选择
    const cartFuelTypeSelect = document.getElementById('cart-fuel-type');
    const addCartFuelBtn = document.getElementById('add-cart-fuel');
    if (cartFuelTypeSelect) {
        // 检查是否有走丢的矿车效果
        const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
        if (gameData.tools.cart.crafted) {
            if (gameData.tools.cart.optimized && !hasLostCartEffect) {
                cartFuelTypeSelect.value = gameData.tools.cart.fuelType || 'coal';
                cartFuelTypeSelect.disabled = false;
            } else {
                cartFuelTypeSelect.value = 'coal';
                cartFuelTypeSelect.disabled = true;
            }
        } else {
            cartFuelTypeSelect.value = 'coal';
            cartFuelTypeSelect.disabled = true;
        }
    }
    
    // 设置添加燃料按钮状态
    if (addCartFuelBtn) {
        // 检查是否有走丢的矿车效果
        const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
        if (gameData.tools.cart.crafted && gameData.tools.cart.optimized && !hasLostCartEffect) {
            addCartFuelBtn.disabled = false;
        } else {
            addCartFuelBtn.disabled = true;
        }
    }
    
    // 设置矿车切换按钮状态
    const toggleCartBtn = document.getElementById('toggle-cart');
    if (toggleCartBtn) {
        // 检查是否有走丢的矿车效果
        const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
        if (gameData.tools.cart.crafted && !hasLostCartEffect) {
            toggleCartBtn.disabled = false;
        } else {
            toggleCartBtn.disabled = true;
        }
    }
    
    // 设置头灯燃料类型选择
    const headlightFuelTypeSelect = document.getElementById('headlight-fuel-type');
    const installHeadlightBatteryBtn = document.getElementById('install-headlight-battery');
    if (headlightFuelTypeSelect) {
        if (gameData.tools.headlight && gameData.tools.headlight.crafted && gameData.tools.headlight.optimized) {
            headlightFuelTypeSelect.value = gameData.tools.headlight.fuelType || 'gold';
            headlightFuelTypeSelect.disabled = false;
        } else {
            headlightFuelTypeSelect.value = 'gold';
            headlightFuelTypeSelect.disabled = true;
        }
    }
    
    // 设置安装电池按钮状态
    if (installHeadlightBatteryBtn) {
        if (gameData.tools.headlight && gameData.tools.headlight.crafted && gameData.tools.headlight.optimized) {
            installHeadlightBatteryBtn.disabled = false;
        } else {
            installHeadlightBatteryBtn.disabled = true;
        }
    }
    
    const headlightText = gameData.tools.headlight.crafted 
        ? `lv${gameData.tools.headlight.level} (${gameData.tools.headlight.exp || 0}/${gameData.tools.headlight.nextExp || 50}) ${gameData.tools.headlight.active ? '(使用中)' : '(已暂停)'}` 
        : '未制作';
    document.getElementById('headlight-status').textContent = headlightText;
    
    document.getElementById('furnace-level').textContent = gameData.furnace.level;
    
    // 更新加工台UI，确保加工台界面能够正确显示
    updateWorkshopUI();
    
    // 更新工具详细说明
    updateToolDescriptions(toolDescriptions);
    
    // 检查并更新工具升级按钮的显示状态
    // 采矿锄升级按钮
    const upgradePickaxeBtn = document.getElementById('upgrade-pickaxe');
    if (upgradePickaxeBtn) {
        if (gameData.tools.pickaxe.level >= gameData.tools.pickaxe.maxLevel) {
            upgradePickaxeBtn.style.display = 'none';
        } else {
            upgradePickaxeBtn.style.display = 'inline-block';
        }
    }
    
    // 矿车升级按钮
    const upgradeCartBtn = document.getElementById('upgrade-cart');
    if (upgradeCartBtn) {
        if (gameData.tools.cart.crafted && gameData.tools.cart.level >= gameData.tools.cart.maxLevel) {
            upgradeCartBtn.style.display = 'none';
        } else {
            upgradeCartBtn.style.display = 'inline-block';
        }
    }
    
    // 头灯升级按钮
    const upgradeHeadlightBtn = document.getElementById('upgrade-headlight');
    if (upgradeHeadlightBtn) {
        if (gameData.tools.headlight.crafted && gameData.tools.headlight.level >= gameData.tools.headlight.maxLevel) {
            upgradeHeadlightBtn.style.display = 'none';
        } else {
            upgradeHeadlightBtn.style.display = 'inline-block';
        }
    }
    
    // 更新任务UI
    updateQuestUI();
    
    // 控制制作矿车和头灯按钮的显示状态
    const craftCartBtn = document.getElementById('craft-cart');
    if (craftCartBtn) {
        if (gameData.tools.cart.crafted) {
            craftCartBtn.style.display = 'none';
        } else {
            craftCartBtn.style.display = 'inline-block';
        }
    }
    
    const craftHeadlightBtn = document.getElementById('craft-headlight');
    if (craftHeadlightBtn) {
        if (gameData.tools.headlight.crafted) {
            craftHeadlightBtn.style.display = 'none';
        } else {
            craftHeadlightBtn.style.display = 'inline-block';
        }
    }
    
    // 更新等级提升券UI
    updateUnlockTicketsUI();
}

function updateToolDescriptions(descriptions) {
    const toolsInfo = document.querySelector('.tools-info');
    let descriptionHTML = '';
    
    for (const [key, info] of Object.entries(descriptions)) {
        descriptionHTML += `
            <div class="tool-description">
                <strong>${info.name}</strong>: ${info.description}<br>
                <span style="font-size: 0.8em; color: #666;">${info.current}</span><br>
                <span style="font-size: 0.8em; color: #888;">${info.next}</span>
                ${info.upgrade ? `<br><span style="font-size: 0.8em; color: #4CAF50;">${info.upgrade}</span>` : ''}
                ${info.usesLeft ? `<br><span style="font-size: 0.8em; color: #FF9800;">${info.usesLeft}</span>` : ''}
                ${info.fuelInfo ? `<br><span style="font-size: 0.8em; color: #9C27B0;">${info.fuelInfo}</span>` : ''}
                ${info.timeLeft ? `<br><span style="font-size: 0.8em; color: #2196F3;">${info.timeLeft}</span>` : ''}
            </div>
        `;
    }
    
    // 获取独立的工具效果说明容器
    const existingDescription = document.querySelector('.tool-description-container');
    
    if (existingDescription) {
        // 更新容器内容，保留原有的h3标题
        const containerContent = existingDescription.innerHTML;
        const titleMatch = containerContent.match(/<h3>.*?<\/h3>/);
        const title = titleMatch ? titleMatch[0] : '<h3>工具效果说明</h3>';
        
        existingDescription.innerHTML = title + descriptionHTML;
    } else {
        // 如果没有找到容器，仍然添加到工具信息中作为备用
        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'tool-description-container';
        descriptionContainer.style.marginTop = '10px';
        descriptionContainer.style.padding = '10px';
        descriptionContainer.style.backgroundColor = '#f9f9f9';
        descriptionContainer.style.borderRadius = '5px';
        descriptionContainer.style.border = '1px solid #ddd';
        descriptionContainer.innerHTML = '<h3>工具效果说明</h3>' + descriptionHTML;
        
        toolsInfo.appendChild(descriptionContainer);
    }
}

function craftBackpackExpansion(type) {
    const expansion = backpackExpansions[type];
    if (!expansion) return;
    for (const [material, amount] of Object.entries(expansion.materials)) {
        if (!hasEnoughItem(material, amount)) {
            alert(`材料不足！需要${amount}个${material}`);
            return;
        }
    }
    for (const [material, amount] of Object.entries(expansion.materials)) {
        consumeItem(material, amount);
    }
    addToBackpack(type);
    updateUI();
    updateBackpackDisplay();
    addMessage(`制作成功！获得${type}！`);
}

function disassembleItem() {
    const disassembleItemSelect = document.getElementById('disassemble-item');
    const disassembleAmountInput = document.getElementById('disassemble-amount');
    const itemName = disassembleItemSelect.value;
    const amount = parseInt(disassembleAmountInput.value);
    if (!itemName) {
        alert('请选择要拆解的物品！');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('请输入有效的拆解数量！');
        return;
    }
    const expansion = backpackExpansions[itemName];
    if (!expansion) {
        alert('无效的拆解物品！');
        return;
    }
    if (!hasEnoughItem(itemName, amount)) {
        alert(`物品不足！需要${amount}个${itemName}`);
        return;
    }
    const success = consumeItem(itemName, amount);
    if (!success) {
        alert('拆解失败！无法消耗物品！');
        return;
    }
    for (const [material, materialAmount] of Object.entries(expansion.materials)) {
        const totalMaterialAmount = materialAmount * amount;
        for (let i = 0; i < totalMaterialAmount; i++) {
            addToBackpack(material);
        }
    }
    updateUI();
    updateBackpackDisplay();
    updateDisassemblePanel();
    addMessage(`拆解成功！获得${itemName}×${amount}的原材料！`);
}

function hasEnoughItem(itemName, amount) {
    let total = 0;
    
    // 特殊处理工具等级提升券，它们存储在gameData.unlockTickets中
    if (itemName === 'headlightTicket' || itemName === 'cartTicket' || itemName === 'pickaxeTicket') {
        const toolType = itemName.replace('Ticket', '');
        return (gameData.unlockTickets[toolType] || 0) >= amount;
    }
    
    // 检查主背包中的物品数量
    const itemEntries = Object.entries(gameData.backpack.items);
    for (const [name, count] of itemEntries) {
        const baseName = name.split('_')[0];
        if (baseName === itemName) {
            total += count;
        }
    }
    // 检查临时背包中的物品数量
    const tempEntries = Object.entries(gameData.tempBackpack.items);
    for (const [name, count] of tempEntries) {
        const baseName = name.split('_')[0];
        if (baseName === itemName) {
            total += count;
        }
    }
    return total >= amount;
}

// 获取背包中物品的总数
function getItemCount(itemName) {
    let total = 0;
    // 检查主背包中的物品数量
    const itemEntries = Object.entries(gameData.backpack.items);
    for (const [name, count] of itemEntries) {
        const baseName = name.split('_')[0];
        if (baseName === itemName) {
            total += count;
        }
    }
    // 检查临时背包中的物品数量
    const tempEntries = Object.entries(gameData.tempBackpack.items);
    for (const [name, count] of tempEntries) {
        const baseName = name.split('_')[0];
        if (baseName === itemName) {
            total += count;
        }
    }
    return total;
}

// 检查临时背包是否有物品
function hasTempItems() {
    return Object.keys(gameData.tempBackpack.items).length > 0;
}

// 从临时背包中获取物品总数
function getTempItemCount(itemName) {
    const itemEntries = Object.entries(gameData.tempBackpack.items);
    let total = 0;
    for (const [name, count] of itemEntries) {
        const baseName = name.split('_')[0];
        if (baseName === itemName) {
            total += count;
        }
    }
    return total;
}

// 从临时背包中消耗物品
function consumeTempItem(itemName, amount) {
    const itemEntries = Object.entries(gameData.tempBackpack.items);
    let remaining = amount;
    const itemsToUpdate = [...itemEntries];
    for (const [name, count] of itemsToUpdate) {
        const baseName = name.split('_')[0];
        if (baseName === itemName) {
            if (count >= remaining) {
                gameData.tempBackpack.items[name] -= remaining;
                if (gameData.tempBackpack.items[name] <= 0) {
                    delete gameData.tempBackpack.items[name];
                }
                remaining = 0;
                break;
            } else {
                remaining -= count;
                delete gameData.tempBackpack.items[name];
            }
        }
    }
    return remaining === 0;
}

// 将物品添加到临时背包
function addToTempBackpack(itemName, amount = 1) {
    for (let i = 0; i < amount; i++) {
        let added = false;
        const itemsCopy = { ...gameData.tempBackpack.items };
        const targetBaseName = itemName.split('_')[0];
        for (const [name, count] of Object.entries(itemsCopy)) {
            const existingBaseName = name.split('_')[0];
            if (existingBaseName === targetBaseName) {
                gameData.tempBackpack.items[name]++;
                added = true;
                break;
            }
        }
        if (!added) {
            let suffix = 1;
            let newItemName = itemName;
            while (gameData.tempBackpack.items[newItemName]) {
                suffix++;
                newItemName = `${itemName}_${suffix}`;
            }
            gameData.tempBackpack.items[newItemName] = 1;
        }
    }
    addMessage(`背包已满，${itemName.split('_')[0]}已放入临时背包！`);
    updateTempBackpackDisplay();
}

// 显示临时背包内容
function updateTempBackpackDisplay() {
    const content = document.getElementById('temp-backpack-content');
    if (!content) return;
    
    const items = Object.entries(gameData.tempBackpack.items);
    
    if (items.length === 0) {
        content.innerHTML = '<p>临时背包为空</p>';
        return;
    }
    
    let html = '<div class="temp-items-list">';
    items.forEach(([itemName, count]) => {
        const displayName = itemName.split('_')[0];
        html += `
            <div class="temp-item">
                <span>${displayName}</span>
                <span>数量: ${count}</span>
            </div>
        `;
    });
    html += '</div>';
    content.innerHTML = html;
}

// 将临时背包中的物品移到主背包中
function moveTempItemsToBackpack() {
    // 保存临时背包中的物品
    const tempItems = { ...gameData.tempBackpack.items };
    
    // 清空临时背包
    gameData.tempBackpack.items = {};
    
    let movedCount = 0;
    let totalItems = Object.values(tempItems).reduce((a, b) => a + b, 0);
    
    // 逐个处理临时背包中的物品
    for (const [itemName, count] of Object.entries(tempItems)) {
        const baseName = itemName.split('_')[0];
        
        // 先计算主背包的可用空间
        calculateBackpackStats();
        const currentStackSize = gameData.backpack.currentStackSize;
        
        // 计算主背包中该物品的当前数量
        let existingCount = 0;
        for (const [name, cnt] of Object.entries(gameData.backpack.items)) {
            const existingBaseName = name.split('_')[0];
            if (existingBaseName === baseName) {
                existingCount += cnt;
            }
        }
        
        // 计算可以添加的数量
        const availableSlots = gameData.backpack.capacity - Object.keys(gameData.backpack.items).length;
        const maxStacks = availableSlots + Math.floor(existingCount / currentStackSize);
        const maxCapacity = maxStacks * currentStackSize;
        const canAdd = Math.max(0, maxCapacity - existingCount);
        
        // 实际添加的数量
        const actualAdd = Math.min(count, canAdd);
        
        // 添加物品到主背包
        for (let i = 0; i < actualAdd; i++) {
            addToBackpack(baseName);
            movedCount++;
        }
        
        // 将剩余物品放回临时背包
        const remaining = count - actualAdd;
        if (remaining > 0) {
            for (let i = 0; i < remaining; i++) {
                addToTempBackpack(baseName);
            }
        }
    }
    
    // 显示结果
    if (movedCount > 0) {
        addMessage(`成功将 ${movedCount} 个物品从临时背包移到主背包！`);
    }
    
    const remainingItems = Object.values(gameData.tempBackpack.items).reduce((a, b) => a + b, 0);
    if (remainingItems > 0) {
        addMessage(`主背包空间不足，还有 ${remainingItems} 个物品留在临时背包中！`);
    }
    
    // 更新显示
    updateTempBackpackDisplay();
    updateBackpackDisplay();
}

function organizeBackpack() {
    const items = {};
    const currentStackSize = gameData.backpack.currentStackSize;
    const itemEntries = Object.entries(gameData.backpack.items);
    for (const [name, count] of itemEntries) {
        const baseName = name.split('_')[0];
        items[baseName] = (items[baseName] || 0) + count;
    }
    gameData.backpack.items = {};
    for (const [baseName, totalCount] of Object.entries(items)) {
        let remaining = totalCount;
        let currentSuffix = 1;
        while (remaining > 0) {
            const stackSize = Math.min(remaining, currentStackSize);
            let itemName;
            if (currentSuffix === 1) {
                itemName = baseName;
            } else {
                itemName = `${baseName}_${currentSuffix}`;
            }
            while (gameData.backpack.items[itemName]) {
                currentSuffix++;
                itemName = `${baseName}_${currentSuffix}`;
            }
            gameData.backpack.items[itemName] = stackSize;
            remaining -= stackSize;
            currentSuffix++;
        }
    }
    updateBackpackDisplay();
    addMessage('背包整理完成！');
}

// 更新背包属性显示
function updateBackpackInfo(type) {
    const backpackInfoBody = document.getElementById('backpack-info-body');
    if (!backpackInfoBody) return;
    
    if (!type) {
        backpackInfoBody.innerHTML = '<p>请选择一个扩充背包</p>';
        return;
    }
    
    const backpackData = backpackExpansions[type];
    if (!backpackData) {
        backpackInfoBody.innerHTML = '<p>无效的背包类型</p>';
        return;
    }
    
    // 构建背包属性HTML
    let materialsHTML = '';
    for (const [material, amount] of Object.entries(backpackData.materials)) {
        materialsHTML += `${material}×${amount} `;
    }
    
    const backpackInfoHTML = `
        <div class="backpack-name">${backpackData.name}</div>
        <div class="backpack-description">${backpackData.description}</div>
        <div class="backpack-materials">材料：${materialsHTML}</div>
    `;
    
    backpackInfoBody.innerHTML = backpackInfoHTML;
}

// 填充背包类型选择下拉菜单
function populateBackpackTypes() {
    const backpackTypeSelect = document.getElementById('backpack-type');
    if (!backpackTypeSelect) return;
    
    // 清空现有选项
    backpackTypeSelect.innerHTML = '';
    
    // 添加背包类型选项（跳过旅行背包，只能通过商店或任务获得）
    for (const [type, data] of Object.entries(backpackExpansions)) {
        if (type === '旅行背包') continue; // 旅行背包不可制作
        const option = document.createElement('option');
        option.value = type;
        option.textContent = data.name;
        backpackTypeSelect.appendChild(option);
    }
    
    // 初始更新背包属性
    updateBackpackInfo('棉布包');
    
    // 添加事件监听器，当选择变化时更新属性
    backpackTypeSelect.onchange = function() {
        const selectedType = this.value;
        updateBackpackInfo(selectedType);
    };
}

function openBackpackCraftPanel() {
    let panelHTML = '<h3>制作背包扩充</h3><div class="craft-expansion-list">';
    for (const [type, data] of Object.entries(backpackExpansions)) {
        if (type === '旅行背包') continue; // 旅行背包不可制作
        let materialsText = '';
        for (const [material, amount] of Object.entries(data.materials)) {
            materialsText += `${material}×${amount} `;
        }
        panelHTML += `
            <div class="craft-expansion-item">
                <h4>${data.name}</h4>
                <p>${data.description}</p>
                <p>材料：${materialsText}</p>
                <button onclick="craftBackpackExpansion('${type}')">制作</button>
            </div>
        `;
    }
    panelHTML += '</div>';
    let panel = document.getElementById('craft-backpack-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'craft-backpack-panel';
        panel.className = 'craft-backpack-panel';
        document.querySelector('.crafting').appendChild(panel);
    }
    panel.innerHTML = panelHTML;
    panel.style.display = 'block';
}

function showItemTotals() {
    const totalsDiv = document.getElementById('item-totals');
    const items = {};
    const itemEntries = Object.entries(gameData.backpack.items);
    for (const [name, count] of itemEntries) {
        const baseName = name.split('_')[0];
        items[baseName] = (items[baseName] || 0) + count;
    }
    let html = '<h3>物品总数</h3><div class="totals-list">';
    for (const [name, count] of Object.entries(items)) {
        const displayName = materialNameMap[name] || name;
        html += `<div class="total-item">${displayName}: ${count}</div>`;
    }
    html += '</div>';
    totalsDiv.innerHTML = html;
}

function ensureGainedInfoExists() {
    if (!gameData.gainedInfo) {
        gameData.gainedInfo = {
            exp: 0,
            gold: 0,
            minerals: 0,
            cloth: 0,
            detailed: {}, // 详细物品获得信息
            autoSell: {
                gold: 0, // 自动出售获得的金币
                items: {} // 自动出售的物品及数量
            }
        };
    }
    
    // 确保详细信息和自动出售信息对象存在
    if (!gameData.gainedInfo.detailed) {
        gameData.gainedInfo.detailed = {};
    }
    if (!gameData.gainedInfo.autoSell) {
        gameData.gainedInfo.autoSell = {
            gold: 0,
            items: {}
        };
    }
    if (!gameData.gainedInfo.autoSell.items) {
        gameData.gainedInfo.autoSell.items = {};
    }
    
    // 为采矿记录添加详细信息数组
    if (!gameData.miningRecords) {
        gameData.miningRecords = [];
    }
    
    // 为矿工挖矿记录添加独立数组
    if (!gameData.minerMiningRecords) {
        gameData.minerMiningRecords = [];
    }
}

function updateGainedInfo() {
    ensureGainedInfoExists();
    document.getElementById('gained-exp').textContent = gameData.gainedInfo.exp;
    document.getElementById('gained-minerals').textContent = gameData.gainedInfo.minerals;
    document.getElementById('gained-cloth').textContent = gameData.gainedInfo.cloth;
    
    // 更新详细获得信息
    updateDetailedGainedInfo();
    
    // 更新自动出售信息
    updateAutoSellInfo();
}

// 更新详细获得信息
function updateDetailedGainedInfo() {
    const detailedContent = document.getElementById('detailed-gained-info-content');
    if (!detailedContent) return;
    
    ensureGainedInfoExists();
    const detailed = gameData.gainedInfo.detailed;
    
    if (Object.keys(detailed).length === 0) {
        detailedContent.innerHTML = '<p>暂无详细信息</p>';
        return;
    }
    
    let html = '';
    for (const [itemName, count] of Object.entries(detailed)) {
        // 检查是否是插片（包含Slot）
        let displayName = itemName;
        if (itemName.includes('Slot')) {
            // 使用getSlotName函数将内部格式转换为中文名称
            displayName = getSlotName(itemName);
        }
        html += `<div class="detailed-gained-item">${displayName}: ${count}</div>`;
    }
    detailedContent.innerHTML = html;
}

// 更新自动出售信息
function updateAutoSellInfo() {
    const autoSellGoldElement = document.getElementById('auto-sell-gold');
    const autoSellItemsElement = document.getElementById('auto-sell-items');
    if (!autoSellGoldElement || !autoSellItemsElement) return;
    
    ensureGainedInfoExists();
    const autoSell = gameData.gainedInfo.autoSell;
    
    // 更新自动出售获得的金币
    autoSellGoldElement.textContent = autoSell.gold;
    
    // 更新自动出售的物品及数量
    if (Object.keys(autoSell.items).length === 0) {
        autoSellItemsElement.innerHTML = '<p>暂无自动出售记录</p>';
        return;
    }
    
    let html = '';
    for (const [itemName, count] of Object.entries(autoSell.items)) {
        html += `<div class="auto-sell-item">${itemName}: ${count}</div>`;
    }
    autoSellItemsElement.innerHTML = html;
}

function resetGainedInfo() {
    ensureGainedInfoExists();
    gameData.gainedInfo.exp = 0;
    gameData.gainedInfo.minerals = 0;
    gameData.gainedInfo.cloth = 0;
    gameData.gainedInfo.detailed = {};
    gameData.gainedInfo.autoSell = {
        gold: 0,
        items: {}
    };
    updateGainedInfo();
    
    // 重置采矿记录
    gameData.miningRecords = [];
    
    // 重置挂机时间
    afkTimerSeconds = 0;
    updateAfkTimerDisplay();
}

function addGainedExp(amount) {
    ensureGainedInfoExists();
    gameData.gainedInfo.exp += amount;
    updateGainedInfo();
}

function addGainedGold(amount) {
    // 不再跟踪普通金币的获得信息，只保留自动出售获得的金币记录
    // 此函数保留以保持兼容性
    ensureGainedInfoExists();
    // 不更新普通金币获得信息
    // updateGainedInfo(); // 不需要更新，因为不再显示普通金币
}

function addGainedMineral(amount = 1) {
    ensureGainedInfoExists();
    gameData.gainedInfo.minerals += amount;
    updateGainedInfo();
}

function addGainedCloth() {
    ensureGainedInfoExists();
    gameData.gainedInfo.cloth += 1;
    updateGainedInfo();
}

// 统一处理矿物的经验计算
function calculateMineralExp(mineralName, amount = 1, currentSlotEffects) {
    // 查找矿物信息
    const mineral = minerals.find(m => m.name === mineralName);
    if (!mineral) return 0;
    
    // 使用矿物的基础经验值，而不是价格，确保经验与矿物数量成正比
    const baseExp = mineral.exp || 0;
    
    // 获取金币经验倍数（增加经验值的倍数）
    let expMultiplier = 1;
    const hasGoldExpEffect = currentSlotEffects && currentSlotEffects.effects.goldExp && currentSlotEffects.effects.goldExp.length > 0;
    if (hasGoldExpEffect) {
        const highestRarityEffect = currentSlotEffects.effects.goldExp.sort((a, b) => {
            const rarityOrder = { 'common': 0, 'uncommon': 1, 'rare': 2, 'epic': 3 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })[0];
        
        switch (highestRarityEffect.rarity) {
            case 'common':
                expMultiplier = 1;
                break;
            case 'uncommon':
                expMultiplier = 2;
                break;
            case 'rare':
                expMultiplier = 4;
                break;
            case 'epic':
                expMultiplier = 8;
                break;
        }
    }
    
    // 计算经验：基础经验值 × 数量 × 经验倍数
    const rawExp = Math.floor(baseExp * amount * expMultiplier);
    return applyGoldenGloveExpBonus(rawExp);
}

// 存储当前采矿记录ID，用于关联效果消息
let currentMiningRecordId = null;

function addMessage(messageObj) {
    // 支持字符串消息和对象消息两种格式
    const content = typeof messageObj === 'string' ? messageObj : (messageObj.message || messageObj.content || '');
    
    // 检测消息类型
    let type = messageObj.type || 'general';
    if (content.includes('采矿获得') || content.includes('恭喜获得')) {
        type = 'mining';
    } else if (content.includes('效果触发') || content.includes('连锁采矿触发')) {
        type = 'effect';
    } else if (content.includes('矿工协会') || content.includes('雇佣矿工') || content.includes('矿工采集')) {
        type = 'guild';
    }
    
    const messageItem = typeof messageObj === 'string' 
        ? { 
            content: content, 
            type: type, 
            miningRecordId: currentMiningRecordId, 
            isEffectMessage: content && (content.includes('效果触发') || content.includes('连锁采矿触发'))
        }
        : { 
            content: content, 
            type: type, 
            miningRecordId: messageObj.miningRecordId || currentMiningRecordId, 
            isEffectMessage: messageObj.isEffectMessage || (content && (content.includes('效果触发') || content.includes('连锁采矿触发')))
        };
    
    gameData.messages.unshift(messageItem);
    if (gameData.messages.length > 10) {
        gameData.messages.pop();
    }
    updateMessages();
}

function updateMessages() {
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
    
    // 获取复选框状态
    const showMining = document.getElementById('filter-mining')?.checked ?? true;
    const showEffects = document.getElementById('filter-effects')?.checked ?? true;
    const showGuild = document.getElementById('filter-guild')?.checked ?? true;
    const showSystem = document.getElementById('filter-system')?.checked ?? true;
    
    gameData.messages.forEach(msgItem => {
        // 根据类型过滤消息
        if (msgItem.type === 'mining' && !showMining) return;
        if (msgItem.type === 'effect' && !showEffects) return;
        if (msgItem.type === 'guild' && !showGuild) return;
        if (msgItem.type === 'general' && !showSystem) return;
        
        // 过滤掉重复的"采矿获得"消息和效果触发消息
        if ((msgItem.content && msgItem.content.startsWith('采矿获得：')) || msgItem.isEffectMessage) {
            return;
        }
        
        const messageEl = document.createElement('div');
        messageEl.className = 'message-item';
        
        // 根据消息类型显示不同样式
        if (msgItem.type === 'mining') {
            messageEl.classList.add('mining-message');
        }
        
        // 设置消息文本
        messageEl.textContent = msgItem.content || '';
        
        // 只有类型为'mining'的消息才显示为可点击，其他关联消息虽然关联到采矿记录，但不显示为可点击
        if (msgItem.miningRecordId && msgItem.type === 'mining') {
            messageEl.classList.add('clickable-message');
            messageEl.style.cursor = 'pointer';
            messageEl.title = '点击查看详细信息';
            messageEl.addEventListener('click', () => {
                showMiningRecordDetails(msgItem.miningRecordId);
            });
        }
        
        container.appendChild(messageEl);
    });
}

function generateMiningMessage(mineral, drops, headlightGoldConsumed = false, totalExp = null, totalAmount = null, recordId = null) {
    let message = '恭喜获得：';
    
    // 检查是否有走丢的矿车效果
    const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
    
    // 收集插片效果信息
    const slotEffects = {
        mineral: {
            base: 1,
            tool: 0,
            slot: 0
        },
        experience: {
            base: totalExp || mineral.exp,
            tool: 0,
            slot: 0
        },
        consumed: {
            tool: 0,
            slot: 0
        },
        activeEffects: []
    };
    
    // 收集活跃的插片效果
    if (gameData.activeEffects) {
        for (const effectName in gameData.activeEffects) {
            const effect = gameData.activeEffects[effectName];
            if (effect.active) {
                slotEffects.activeEffects.push({
                    name: effectName,
                    description: effect.description || effectName,
                    value: effect.value || 0
                });
            }
        }
    }
    
    // 计算矿物数量，考虑矿车加成和插片效果
    let baseAmount = 1;
    let cartBonus = 0;
    let slotBonus = 0;
    let cartConsume = 0;
    
    let finalTotalAmount;
    
    // 如果没有提供总数量，则重新计算
    if (totalAmount === null) {
        if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.active && !hasLostCartEffect) {
            const fuelType = gameData.tools.cart.fuelType || 'coal';
            // 检查燃料数量
            if (fuelType === 'coal' && hasEnoughItem('煤矿', 1)) {
                // 矿车每5级提升1个采矿数量
                cartBonus = Math.floor(gameData.tools.cart.level / 5);
                cartConsume = 1; // 矿车消耗1煤矿
            } else if (fuelType === 'fuel' && gameData.tools.cart.currentFuel > 0) {
                // 矿车每5级提升1个采矿数量，使用燃料时额外加5
                cartBonus = Math.floor(gameData.tools.cart.level / 5) + 5;
                cartConsume = 1; // 矿车消耗1燃料
            }
        }
        
        // 计算插片加成（这里需要根据实际插片效果来计算，暂时使用0）
        slotBonus = 0;
        
        finalTotalAmount = baseAmount + cartBonus + slotBonus;
    } else {
        // 使用提供的总数量
        finalTotalAmount = totalAmount;
        // 基础数量固定为1
        baseAmount = 1;
        // 计算矿车加成
        if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.active && !hasLostCartEffect) {
            const fuelType = gameData.tools.cart.fuelType || 'coal';
            if ((fuelType === 'coal' && hasEnoughItem('煤矿', 1)) || (fuelType === 'fuel' && gameData.tools.cart.currentFuel > 0)) {
                if (fuelType === 'fuel') {
                    cartBonus = Math.floor(gameData.tools.cart.level / 5) + 5;
                } else {
                    cartBonus = Math.floor(gameData.tools.cart.level / 5);
                }
                cartConsume = 1; // 矿车消耗燃料
            }
        }
        // 计算插片加成：总数量 - 基础数量(1) - 矿车加成
        slotBonus = finalTotalAmount - baseAmount - cartBonus;
        // 确保插片加成为非负数
        if (slotBonus < 0) slotBonus = 0;
    }
    
    // 更新插片效果统计
    slotEffects.mineral.base = baseAmount;
    slotEffects.mineral.tool = cartBonus;
    slotEffects.mineral.slot = slotBonus;
    
    // 显示矿物数量，包括加成说明
    if (cartBonus > 0 || slotBonus > 0) {
        message += `${mineral.name}*${finalTotalAmount}（基础*${baseAmount}`;
        if (cartBonus > 0) {
            message += `+矿车*${cartBonus}`;
        }
        if (slotBonus > 0) {
            message += `+插片*${slotBonus}`;
        }
        message += `）, `;
        if (cartConsume > 0) {
            const fuelType = gameData.tools.cart.fuelType || 'coal';
            message += `${fuelType === 'coal' ? '煤矿' : '燃料剩余次数'}-${cartConsume}（矿车消耗）, `;
        }
    } else {
        message += `${mineral.name}*${baseAmount}, `;
    }
    
    // 头灯消耗 - 只在实际消耗金币时显示
    if (headlightGoldConsumed) {
        message += `金币-10（头灯消耗）, `;
        slotEffects.consumed.tool += 10;
    }
    
    drops.forEach(drop => {
        message += `${drop}*1, `;
    });
    
    // 使用计算出的总经验值或默认使用基础矿物经验值
    const expToShow = totalExp || mineral.exp;
    message += `人物经验*${expToShow}, `;
    
    // 只有当工具经验未满时才显示工具经验提示
    const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
    if (gameData.tools.pickaxe.exp < pickaxeNextExp && gameData.tools.pickaxe.level < 50) {
        message += `采矿锄经验*${expToShow}, `;
    }
    
    if (gameData.tools.cart && gameData.tools.cart.crafted) {
        const cartNextExp = gameData.tools.cart.nextExp || 50;
        if (gameData.tools.cart.exp < cartNextExp && gameData.tools.cart.level < 50) {
            message += `矿车经验*${expToShow}, `;
        }
    }
    
    if (gameData.tools.headlight && gameData.tools.headlight.crafted) {
        const headlightNextExp = gameData.tools.headlight.nextExp || 50;
        if (gameData.tools.headlight.exp < headlightNextExp && gameData.tools.headlight.level < 50) {
            message += `头灯经验*${expToShow}, `;
        }
    }
    
    message = message.slice(0, -2);
    message += '！';
    
    // 存储详细采矿记录
    const miningRecord = {
        id: recordId || Date.now(),
        timestamp: new Date().toLocaleString(),
        mineral: {
            name: mineral.name,
            baseAmount: baseAmount,
            toolAmount: cartBonus,
            slotAmount: slotBonus,
            totalAmount: finalTotalAmount
        },
        drops: [...drops],
        headlightGoldConsumed: headlightGoldConsumed,
        experience: {
            base: totalExp || mineral.exp,
            tool: cartBonus > 0 ? Math.floor((totalExp || mineral.exp) * 0.3) : 0, // 工具经验加成：矿车每增加1个矿物，经验增加30%
            slot: slotBonus > 0 ? Math.floor((totalExp || mineral.exp) * 0.2) : 0, // 插片经验加成：插片每增加1个矿物，经验增加20%
            total: (totalExp || mineral.exp) + (cartBonus > 0 ? Math.floor((totalExp || mineral.exp) * 0.3) : 0) + (slotBonus > 0 ? Math.floor((totalExp || mineral.exp) * 0.2) : 0),
            pickaxe: gameData.tools.pickaxe.exp < pickaxeNextExp && gameData.tools.pickaxe.level < 50 ? (totalExp || mineral.exp) : 0,
            cart: gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.exp < (gameData.tools.cart.nextExp || 50) && gameData.tools.cart.level < 50 ? (totalExp || mineral.exp) : 0,
            headlight: gameData.tools.headlight && gameData.tools.headlight.crafted && gameData.tools.headlight.exp < (gameData.tools.headlight.nextExp || 50) && gameData.tools.headlight.level < 50 ? (totalExp || mineral.exp) : 0
        },
        consumed: {
            tool: cartConsume > 0 ? (gameData.tools.cart.fuelType === 'coal' ? '煤矿' : '燃料') : null,
            toolAmount: cartConsume,
            slot: headlightGoldConsumed ? '金币' : null,
            slotAmount: headlightGoldConsumed ? 10 : 0
        },
        slotEffects: slotEffects.activeEffects
    };
    
    // 将记录添加到miningRecords数组中
    gameData.miningRecords.push(miningRecord);
    
    // 将当前采矿记录ID设置为全局变量，以便关联后续的效果消息
    currentMiningRecordId = miningRecord.id;
    
    return { message, miningRecordId: miningRecord.id };
}

// 显示采矿记录详情
function showMiningRecordDetails(recordId) {
    // 查找对应的采矿记录
    const record = gameData.miningRecords.find(r => r.id === recordId);
    if (!record) return;
    
    // 生成详细内容HTML
    let html = `<h4>采矿记录 - ${record.timestamp}</h4>`;
    
    // 1. 矿物信息部分
    html += `<div class="record-detail-item">`;
    html += `<strong>矿物信息</strong>`;
    html += `<div class="mineral-details">`;
    html += `<div class="detail-row">`;
    html += `<span class="detail-label">基础获得：</span>`;
    html += `<span class="detail-value">${record.mineral.name} x ${record.mineral.baseAmount}</span>`;
    html += `</div>`;
    html += `<div class="detail-row">`;
    html += `<span class="detail-label">工具获得：</span>`;
    html += `<span class="detail-value">+${record.mineral.toolAmount} (矿车加成)</span>`;
    html += `</div>`;
    html += `<div class="detail-row">`;
    html += `<span class="detail-label">插片获得：</span>`;
    html += `<span class="detail-value">+${record.mineral.slotAmount} (插片加成)</span>`;
    html += `</div>`;
    html += `<div class="detail-row total-row">`;
    html += `<span class="detail-label">总量：</span>`;
    html += `<span class="detail-value total-value">${record.mineral.name} x ${record.mineral.totalAmount}</span>`;
    html += `</div>`;
    html += `</div>`;
    html += `</div>`;
    
    // 额外掉落
    if (record.drops.length > 0) {
        html += `<div class="record-detail-item">`;
        html += `<strong>额外掉落</strong>`;
        html += `<div class="drops-details">`;
        record.drops.forEach(drop => {
            html += `<div class="detail-row">`;
            html += `<span class="detail-label">${drop}：</span>`;
            html += `<span class="detail-value">1个</span>`;
            html += `</div>`;
        });
        html += `</div>`;
        html += `</div>`;
    }
    
    // 2. 人物经验部分
    html += `<div class="record-detail-item">`;
    html += `<strong>人物经验</strong>`;
    html += `<div class="exp-details">`;
    html += `<div class="detail-row">`;
    html += `<span class="detail-label">基础挖矿经验：</span>`;
    html += `<span class="detail-value">${record.experience.base}点</span>`;
    html += `</div>`;
    html += `<div class="detail-row">`;
    html += `<span class="detail-label">工具加成：</span>`;
    html += `<span class="detail-value">+${record.experience.tool}点</span>`;
    html += `</div>`;
    html += `<div class="detail-row">`;
    html += `<span class="detail-label">插片效果获得：</span>`;
    html += `<span class="detail-value">+${record.experience.slot}点</span>`;
    html += `</div>`;
    html += `<div class="detail-row total-row">`;
    html += `<span class="detail-label">总获得经验：</span>`;
    html += `<span class="detail-value total-value">${record.experience.total}点</span>`;
    html += `</div>`;
    html += `</div>`;
    html += `</div>`;
    
    // 3. 工具经验部分（如果有）
    const hasToolExp = record.experience.pickaxe > 0 || record.experience.cart > 0 || record.experience.headlight > 0;
    if (hasToolExp) {
        html += `<div class="record-detail-item">`;
        html += `<strong>工具经验</strong>`;
        html += `<div class="tool-exp-details">`;
        if (record.experience.pickaxe > 0) {
            html += `<div class="detail-row">`;
            html += `<span class="detail-label">采矿锄经验：</span>`;
            html += `<span class="detail-value">${record.experience.pickaxe}点</span>`;
            html += `</div>`;
        }
        if (record.experience.cart > 0) {
            html += `<div class="detail-row">`;
            html += `<span class="detail-label">矿车经验：</span>`;
            html += `<span class="detail-value">${record.experience.cart}点</span>`;
            html += `</div>`;
        }
        if (record.experience.headlight > 0) {
            html += `<div class="detail-row">`;
            html += `<span class="detail-label">头灯经验：</span>`;
            html += `<span class="detail-value">${record.experience.headlight}点</span>`;
            html += `</div>`;
        }
        html += `</div>`;
        html += `</div>`;
    }
    
    // 4. 消耗部分
    const hasConsumption = (record.consumed.tool && record.consumed.toolAmount > 0) || (record.consumed.slot && record.consumed.slotAmount > 0);
    if (hasConsumption) {
        html += `<div class="record-detail-item">`;
        html += `<strong>消耗</strong>`;
        html += `<div class="consumption-details">`;
        if (record.consumed.tool && record.consumed.toolAmount > 0) {
            html += `<div class="detail-row">`;
            html += `<span class="detail-label">工具消耗：</span>`;
            html += `<span class="detail-value">${record.consumed.tool} x ${record.consumed.toolAmount}</span>`;
            html += `</div>`;
        }
        if (record.consumed.slot && record.consumed.slotAmount > 0) {
            html += `<div class="detail-row">`;
            html += `<span class="detail-label">插片效果消耗：</span>`;
            html += `<span class="detail-value">${record.consumed.slot} x ${record.consumed.slotAmount}</span>`;
            html += `</div>`;
        }
        html += `</div>`;
        html += `</div>`;
    }
    
    // 5. 效果触发消息部分
    const effectMessages = gameData.messages.filter(msg => 
        msg.miningRecordId === record.id && msg.isEffectMessage
    );
    if (effectMessages.length > 0) {
        html += `<div class="record-detail-item">`;
        html += `<strong>效果触发</strong>`;
        html += `<div class="effect-messages">`;
        effectMessages.forEach(msg => {
            html += `<div class="detail-row">`;
            html += `<span class="detail-value effect-message">${msg.content}</span>`;
            html += `</div>`;
        });
        html += `</div>`;
        html += `</div>`;
    }
    
    // 6. 插片效果统计
    if (record.slotEffects && record.slotEffects.length > 0) {
        html += `<div class="record-detail-item">`;
        html += `<strong>插片效果</strong>`;
        html += `<div class="slot-effects-details">`;
        record.slotEffects.forEach(effect => {
            html += `<div class="detail-row">`;
            html += `<span class="detail-label">${effect.description || effect.name}：</span>`;
            html += `<span class="detail-value">${effect.value || 0}</span>`;
            html += `</div>`;
        });
        html += `</div>`;
        html += `</div>`;
    }
    
    // 设置弹窗内容并显示
    const contentElement = document.getElementById('mining-record-content');
    const modalElement = document.getElementById('mining-record-modal');
    if (contentElement && modalElement) {
        contentElement.innerHTML = html;
        modalElement.style.display = 'block';
    }
}

// 关闭采矿记录详情弹窗
function closeMiningRecordModal() {
    const modalElement = document.getElementById('mining-record-modal');
    if (modalElement) {
        modalElement.style.display = 'none';
    }
}

function addEventListeners() {
    // 清空重置按钮事件监听器
    document.getElementById('reset-gained-info')?.addEventListener('click', resetGainedInfo);
    
    // 为消息过滤复选框添加事件监听器
    const filters = ['mining', 'effects', 'guild', 'system'];
    filters.forEach(filter => {
        document.getElementById(`filter-${filter}`)?.addEventListener('change', updateMessages);
    });
    
    // 添加采矿记录弹窗关闭事件
    document.getElementById('close-mining-record-modal')?.addEventListener('click', closeMiningRecordModal);
    document.getElementById('confirm-mining-record-modal')?.addEventListener('click', closeMiningRecordModal);
    
    // 点击弹窗外部关闭
    window.addEventListener('click', (event) => {
        const modalElement = document.getElementById('mining-record-modal');
        if (event.target === modalElement) {
            closeMiningRecordModal();
        }
    });
    
    document.getElementById('sell-btn').addEventListener('click', () => {
        const sellPanel = document.getElementById('sell-panel');
        sellPanel.classList.toggle('active');
        updateSellPanel();
        document.getElementById('disassemble-panel').classList.remove('active');
        document.getElementById('filter-panel').classList.remove('active');
    });
    document.getElementById('organize-btn').addEventListener('click', organizeBackpack);
    document.getElementById('filter-btn').addEventListener('click', () => {
        const filterPanel = document.getElementById('filter-panel');
        filterPanel.classList.toggle('active');
        updateFilterPanel();
        document.getElementById('sell-panel').classList.remove('active');
        document.getElementById('disassemble-panel').classList.remove('active');
    });
    document.getElementById('disassemble-btn').addEventListener('click', () => {
        const disassemblePanel = document.getElementById('disassemble-panel');
        disassemblePanel.classList.toggle('active');
        updateDisassemblePanel();
        document.getElementById('sell-panel').classList.remove('active');
        document.getElementById('filter-panel').classList.remove('active');
    });
    document.getElementById('confirm-filter').addEventListener('click', applyFilter);
    document.getElementById('remove-filter').addEventListener('click', removeFilter);
    document.getElementById('confirm-sell').addEventListener('click', sellItem);
    document.getElementById('confirm-disassemble').addEventListener('click', disassembleItem);
    document.getElementById('craft-cart').addEventListener('click', craftCart);
    document.getElementById('craft-headlight').addEventListener('click', craftHeadlight);
    
    // 矿车和头灯控制按钮
    document.getElementById('toggle-cart').addEventListener('click', () => {
        if (gameData.tools.cart && gameData.tools.cart.crafted) {
            // 检查是否有走丢的矿车效果
            const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
            if (hasLostCartEffect) {
                alert('矿车走丢了！暂时无法控制矿车。');
                return;
            }
            gameData.tools.cart.active = !gameData.tools.cart.active;
            addMessage(gameData.tools.cart.active ? '矿车已恢复使用！' : '矿车已暂停使用！');
            updateUI();
        } else {
            alert('矿车尚未制作！');
        }
    });
    
    document.getElementById('toggle-headlight').addEventListener('click', () => {
        if (gameData.tools.headlight && gameData.tools.headlight.crafted) {
            if (!gameData.tools.headlight.active) {
                // 恢复使用时，更新时间戳
                if (gameData.tools.headlight.fuelType === 'battery') {
                    gameData.tools.headlight.lastBatteryUpdate = Date.now();
                } else {
                    gameData.tools.headlight.lastGoldConsume = Date.now();
                }
            }
            gameData.tools.headlight.active = !gameData.tools.headlight.active;
            addMessage(gameData.tools.headlight.active ? '头灯已恢复使用！' : '头灯已暂停使用！');
            updateUI();
        } else {
            alert('头灯尚未制作！');
        }
    });
    document.getElementById('craft-furnace').addEventListener('click', craftFurnace);
    
    // 添加燃料按钮事件监听器
    const addFuelBtn = document.getElementById('add-furnace-fuel');
    if (addFuelBtn) {
        addFuelBtn.addEventListener('click', addFurnaceFuel);
        // 添加燃料类型选择事件监听器，自动计算默认数量
        document.getElementById('furnace-fuel-type').addEventListener('change', updateDefaultFuelAmount);
    }
    
    // 显示/隐藏背包扩充下拉菜单
    document.getElementById('craft-backpack').addEventListener('click', () => {
        const backpackDropdown = document.getElementById('backpack-dropdown');
        // 切换背包扩充下拉菜单的显示状态
        backpackDropdown.style.display = backpackDropdown.style.display === 'none' ? 'block' : 'none';
        // 填充背包类型选择
        populateBackpackTypes();
    });
    
    // 确认制作背包扩充
    document.getElementById('confirm-craft-backpack').addEventListener('click', () => {
        const backpackTypeSelect = document.getElementById('backpack-type');
        const selectedType = backpackTypeSelect.value;
        if (selectedType) {
            craftBackpackExpansion(selectedType);
        }
        // 隐藏下拉菜单
        document.getElementById('backpack-dropdown').style.display = 'none';
    });
    // 显示/隐藏融石下拉菜单
    document.getElementById('smelt-stone').addEventListener('click', () => {
        if (!gameData.furnace.crafted) {
            alert('请先制作熔炉！');
            return;
        }
        const smeltDropdown = document.getElementById('smelt-dropdown');
        // 隐藏所有合金下拉菜单
        for (let i = 1; i <= 5; i++) {
            const alloyDropdown = document.getElementById(`alloy-dropdown-${i}`);
            alloyDropdown.style.display = 'none';
        }
        // 切换融石下拉菜单的显示状态
        smeltDropdown.style.display = smeltDropdown.style.display === 'none' ? 'block' : 'none';
        // 填充融石数量选择
        populateSmeltStoneAmounts();
    });
    
    // 为每个合金位置添加事件监听器
    for (let i = 1; i <= 5; i++) {
        // 显示/隐藏合金下拉菜单
        document.querySelector(`[data-position="${i}"]`).addEventListener('click', () => {
            const requiredLevel = 10;
            if (gameData.player.level < requiredLevel) {
                alert(`等级不足！需要${requiredLevel}级才能制作合金`);
                return;
            }
            if (!gameData.furnace.crafted) {
                alert('请先制作熔炉！');
                return;
            }
            const smeltDropdown = document.getElementById('smelt-dropdown');
            // 隐藏融石下拉菜单
            smeltDropdown.style.display = 'none';
            
            // 显示当前位置的合金下拉菜单，隐藏其他位置的
            for (let j = 1; j <= 5; j++) {
                const alloyDropdown = document.getElementById(`alloy-dropdown-${j}`);
                if (j === i) {
                    alloyDropdown.style.display = alloyDropdown.style.display === 'none' ? 'block' : 'none';
                    // 填充合金类型选择
                    populateAlloyTypes(i);
                } else {
                    alloyDropdown.style.display = 'none';
                }
            }
        });
        
        // 确认合金制作
        document.querySelector(`.confirm-alloy[data-position="${i}"]`).addEventListener('click', () => {
            const alloyTypeSelect = document.getElementById(`alloy-type-${i}`);
            const alloyAmountInput = document.getElementById(`alloy-amount-${i}`);
            const selectedAlloy = alloyTypeSelect.value;
            const amount = parseInt(alloyAmountInput.value);
            if (selectedAlloy && amount > 0) {
                makeAlloy(selectedAlloy, amount, i);
            } else {
                alert('请选择合金类型并输入制作数量');
            }
            // 无论是否成功，都隐藏下拉菜单
            document.getElementById(`alloy-dropdown-${i}`).style.display = 'none';
        });
        
        // 移除了合金自动制作功能
    }
    
    // 确认融石
    document.getElementById('confirm-smelt').addEventListener('click', () => {
        const smeltAmountInput = document.getElementById('smelt-amount');
        const amount = parseInt(smeltAmountInput.value) || 1;
        if (amount > 0) {
            smeltStone(amount);
        }
        // 无论是否成功，都隐藏下拉菜单
        document.getElementById('smelt-dropdown').style.display = 'none';
    });
    
    // 移除了融石自动制作功能
    
    // 移除了合金自动制作功能
    document.getElementById('save-btn').addEventListener('click', () => {
        saveGame();
        showSaveMessage('游戏已保存！');
    });
    document.getElementById('load-btn').addEventListener('click', () => {
        loadGame();
        calculateBackpackStats();
        updateUI();
        generateMineralGrid();
        generateBackpack();
        updateFurnaceUI();
        showSaveMessage('游戏已加载！');
    });
    // 添加导出/导入按钮事件监听器（如果按钮存在）
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportGameData);
    }
    
    const importBtn = document.getElementById('import-btn');
    if (importBtn) {
        importBtn.addEventListener('click', importGameData);
    }
    
    // 工具升级按钮事件监听器（如果按钮存在）
    const upgradePickaxeBtn = document.getElementById('upgrade-pickaxe');
    if (upgradePickaxeBtn) {
        upgradePickaxeBtn.addEventListener('click', () => upgradeTool('pickaxe'));
    }
    
    const upgradeCartBtn = document.getElementById('upgrade-cart');
    if (upgradeCartBtn) {
        upgradeCartBtn.addEventListener('click', () => upgradeTool('cart'));
    }
    
    // 矿车燃料类型选择事件监听器（如果元素存在）
    const cartFuelTypeSelect = document.getElementById('cart-fuel-type');
    if (cartFuelTypeSelect) {
        cartFuelTypeSelect.addEventListener('change', function() {
            if (gameData.tools.cart && gameData.tools.cart.crafted) {
                // 检查是否有走丢的矿车效果
                const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
                if (hasLostCartEffect) {
                    alert('矿车走丢了！暂时无法切换燃料类型。');
                    // 重置选择为当前燃料类型
                    this.value = gameData.tools.cart.fuelType || 'coal';
                    return;
                }
                
                if (gameData.tools.cart.optimized) {
                    gameData.tools.cart.fuelType = this.value;
                    addMessage(`矿车燃料类型已切换为${this.value === 'coal' ? '煤矿' : '高级燃料'}！`);
                    updateMessages();
                    saveGame();
                } else {
                    alert('矿车尚未优化！需要先在加工台优化矿车才能切换燃料类型。');
                    // 重置选择
                    this.value = 'coal';
                }
            } else {
                alert('矿车尚未制作！');
                // 重置选择
                this.value = 'coal';
            }
        });
    }
    
    // 头灯燃料类型选择事件监听器（如果元素存在）
    const headlightFuelTypeSelect = document.getElementById('headlight-fuel-type');
    if (headlightFuelTypeSelect) {
        headlightFuelTypeSelect.addEventListener('change', function() {
            if (gameData.tools.headlight && gameData.tools.headlight.crafted && gameData.tools.headlight.optimized) {
                gameData.tools.headlight.fuelType = this.value;
                addMessage(`头灯燃料类型已切换为${this.value === 'gold' ? '金币' : '电池'}！`);
                updateMessages();
                saveGame();
            } else {
                alert('头灯尚未优化！');
                // 重置选择
                this.value = 'gold';
            }
        });
    }
    
    // 添加燃料按钮事件监听器（如果按钮存在）
    const addCartFuelBtn = document.getElementById('add-cart-fuel');
    if (addCartFuelBtn) {
        addCartFuelBtn.addEventListener('click', addCartFuel);
    }
    
    const installHeadlightBatteryBtn = document.getElementById('install-headlight-battery');
    if (installHeadlightBatteryBtn) {
        installHeadlightBatteryBtn.addEventListener('click', installHeadlightBattery);
    }
    // 头灯升级按钮事件监听器（如果按钮存在）
    const upgradeHeadlightBtn = document.getElementById('upgrade-headlight');
    if (upgradeHeadlightBtn) {
        upgradeHeadlightBtn.addEventListener('click', () => upgradeTool('headlight'));
    }
    
    // 临时背包按钮
        const moveTempBtn = document.getElementById('move-temp-items');
        if (moveTempBtn) {
            moveTempBtn.addEventListener('click', moveTempItemsToBackpack);
        }
        
        // 加工台按钮
        const unlockWorkshopBtn = document.getElementById('unlock-workshop');
        if (unlockWorkshopBtn) {
            unlockWorkshopBtn.addEventListener('click', unlockWorkshop);
        }
    }

function showSaveMessage(message) {
    const saveMessage = document.getElementById('save-message');
    saveMessage.textContent = message;
    saveMessage.style.color = '#4CAF50';
    setTimeout(() => {
        saveMessage.textContent = '';
    }, 3000);
}

function updateSellPanel() {
    const sellItemSelect = document.getElementById('sell-item');
    sellItemSelect.innerHTML = '';
    
    // 收集每种物品的总量
    const itemTotals = {};
    
    // 从主背包中收集
    Object.entries(gameData.backpack.items).forEach(([itemName, count]) => {
        const baseName = itemName.split('_')[0];
        if (!isConsumable(baseName)) {
            if (!itemTotals[baseName]) {
                itemTotals[baseName] = 0;
            }
            itemTotals[baseName] += count;
        }
    });
    
    // 从临时背包中收集
    Object.entries(gameData.tempBackpack.items).forEach(([itemName, count]) => {
        const baseName = itemName.split('_')[0];
        if (!isConsumable(baseName)) {
            if (!itemTotals[baseName]) {
                itemTotals[baseName] = 0;
            }
            itemTotals[baseName] += count;
        }
    });
    
    // 添加每种物品的总量选项
    Object.entries(itemTotals).forEach(([itemType, totalCount]) => {
        const option = document.createElement('option');
        option.value = `all_${itemType}`;
        option.textContent = `${itemType} (总量: ${totalCount})`;
        sellItemSelect.appendChild(option);
    });
    
    // 添加事件监听器，当选择物品时自动填充出售数量为物品总数
    const sellAmountInput = document.getElementById('sell-amount');
    sellItemSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        if (!selectedValue) {
            return;
        }
        
        // 解析选择的物品值
        const [backpackType, ...itemNameParts] = selectedValue.split('_');
        const itemName = itemNameParts.join('_');
        
        if (backpackType === 'all') {
            // 计算该类型物品的总数量
            let totalItemCount = 0;
            
            // 检查主背包中的物品
            Object.entries(gameData.backpack.items).forEach(([backpackItemName, count]) => {
                if (backpackItemName.split('_')[0] === itemName) {
                    totalItemCount += count;
                }
            });
            
            // 检查临时背包中的物品
            Object.entries(gameData.tempBackpack.items).forEach(([tempItemName, count]) => {
                if (tempItemName.split('_')[0] === itemName) {
                    totalItemCount += count;
                }
            });
            
            // 设置出售数量为物品总数
            if (sellAmountInput) {
                sellAmountInput.value = totalItemCount;
            }
        } else if (backpackType === 'backpack' || backpackType === 'temp') {
            // 对于单个槽位的物品，设置出售数量为槽位中的物品数量
            let itemCount = 0;
            if (backpackType === 'backpack') {
                itemCount = gameData.backpack.items[itemName] || 0;
            } else if (backpackType === 'temp') {
                itemCount = gameData.tempBackpack.items[itemName] || 0;
            }
            
            // 设置出售数量为槽位中的物品数量
            if (sellAmountInput) {
                sellAmountInput.value = itemCount;
            }
        }
    });
    
    // 触发一次change事件，以初始化出售数量
    if (sellItemSelect.options.length > 0) {
        sellItemSelect.dispatchEvent(new Event('change'));
    }
    
    return;
    
    // 添加主背包中的物品
    const backpackItems = Object.keys(gameData.backpack.items);
    backpackItems.forEach(item => {
        const baseItemName = item.split('_')[0];
        // 跳过消耗品
        if (!isConsumable(baseItemName)) {
            const option = document.createElement('option');
            option.value = `backpack_${item}`;
            const displayName = baseItemName;
            option.textContent = `${displayName} (主背包) (${gameData.backpack.items[item]})`;
            sellItemSelect.appendChild(option);
        }
    });
    
    // 添加临时背包中的物品
    const tempItems = Object.keys(gameData.tempBackpack.items);
    tempItems.forEach(item => {
        const baseItemName = item.split('_')[0];
        // 跳过消耗品
        if (!isConsumable(baseItemName)) {
            const option = document.createElement('option');
            option.value = `temp_${item}`;
            const displayName = baseItemName;
            option.textContent = `${displayName} (临时背包) (${gameData.tempBackpack.items[item]})`;
            sellItemSelect.appendChild(option);
        }
    });
}

function sellItem() {
    const sellItemSelect = document.getElementById('sell-item');
    const sellAmountInput = document.getElementById('sell-amount');
    const itemValue = sellItemSelect.value;
    const amount = parseInt(sellAmountInput.value);
    if (!itemValue || isNaN(amount) || amount <= 0) {
        return;
    }
    
    // 解析物品值，判断物品来自哪个背包
    const [backpackType, ...itemNameParts] = itemValue.split('_');
    const itemName = itemNameParts.join('_');
    const baseItemName = itemName.split('_')[0];
    
    // 检查是否是消耗品
    if (isConsumable(baseItemName)) {
        addMessage('消耗品不可出售！');
        updateMessages();
        return;
    }
    
    let price = 0;
    
    // 检查是否是配方物品
    if (baseItemName.includes('配方')) {
        // 提取合金名称
        const alloyName = baseItemName.replace('配方', '');
        // 根据合金类型设置配方价格（合金价格的100倍）
        switch (alloyName) {
            case '铜铁合金':
                price = 1000; // 假设铜铁合金价格为10，配方价格为10*100
                break;
            case '铜钴合金':
                price = 5000; // 假设铜钴合金价格为50，配方价格为50*100
                break;
            case '铜镍合金':
                price = 8000; // 假设铜镍合金价格为80，配方价格为80*100
                break;
            case '铜银合金':
                price = 10000; // 假设铜银合金价格为100，配方价格为100*100
                break;
            default:
                price = 500;
        }
    } else {
            // 使用统一的价格计算函数
            price = getItemPrice(baseItemName);
        }
    
    // 处理出售所有相同类型物品的情况
    if (backpackType === 'all') {
        // 计算该类型物品的总数量
        let totalItemCount = 0;
        
        // 检查主背包中的物品
        Object.entries(gameData.backpack.items).forEach(([backpackItemName, count]) => {
            if (backpackItemName.split('_')[0] === baseItemName) {
                totalItemCount += count;
            }
        });
        
        // 检查临时背包中的物品
        Object.entries(gameData.tempBackpack.items).forEach(([tempItemName, count]) => {
            if (tempItemName.split('_')[0] === baseItemName) {
                totalItemCount += count;
            }
        });
        
        // 检查数量是否足够
        if (totalItemCount < amount) {
            alert('物品数量不足！');
            return;
        }
        
        // 计算总价，检查谨慎矿工效果
        let totalPrice = price * amount;
        // 检查是否有谨慎地矿工效果
        if (gameData.activeEffects && gameData.activeEffects.carefulMiner && gameData.activeEffects.carefulMiner.active) {
            totalPrice *= 2;
        }
        gameData.player.gold += totalPrice;
        addGainedGold(totalPrice);
        
        // 从背包中消耗物品
        let remaining = amount;
        
        // 先从主背包中消耗
        const backpackItems = Object.entries(gameData.backpack.items);
        const backpackItemsToUpdate = [...backpackItems];
        for (const [backpackItemName, count] of backpackItemsToUpdate) {
            if (backpackItemName.split('_')[0] === baseItemName && remaining > 0) {
                const consumeCount = Math.min(count, remaining);
                gameData.backpack.items[backpackItemName] -= consumeCount;
                if (gameData.backpack.items[backpackItemName] <= 0) {
                    delete gameData.backpack.items[backpackItemName];
                }
                remaining -= consumeCount;
            }
        }
        
        // 再从临时背包中消耗
        if (remaining > 0) {
            const tempItems = Object.entries(gameData.tempBackpack.items);
            const tempItemsToUpdate = [...tempItems];
            for (const [tempItemName, count] of tempItemsToUpdate) {
                if (tempItemName.split('_')[0] === baseItemName && remaining > 0) {
                    const consumeCount = Math.min(count, remaining);
                    gameData.tempBackpack.items[tempItemName] -= consumeCount;
                    if (gameData.tempBackpack.items[tempItemName] <= 0) {
                        delete gameData.tempBackpack.items[tempItemName];
                    }
                    remaining -= consumeCount;
                }
            }
            updateTempBackpackDisplay();
        }
        
        const displayName = baseItemName;
        const sellMessage = `出售成功：${displayName}*${amount}，获得金币*${totalPrice}！`;
        addMessage(sellMessage);
        
        updateUI();
        updateBackpackDisplay();
        updateSellPanel();
        return;
    }
    
    // 检查物品数量是否足够
    let itemCount = 0;
    if (backpackType === 'backpack') {
        itemCount = gameData.backpack.items[itemName] || 0;
    } else if (backpackType === 'temp') {
        itemCount = gameData.tempBackpack.items[itemName] || 0;
    }
    
    if (itemCount < amount) {
        alert('物品数量不足！');
        return;
    }
    
    // 计算总价并增加金币，检查谨慎矿工效果
    let totalPrice = price * amount;
    // 检查是否有谨慎地矿工效果
    if (gameData.activeEffects && gameData.activeEffects.carefulMiner && gameData.activeEffects.carefulMiner.active) {
        totalPrice *= 2;
    }
    gameData.player.gold += totalPrice;
    addGainedGold(totalPrice);
    
    // 从相应的背包中消耗物品
    if (backpackType === 'backpack') {
        if (gameData.backpack.items[itemName]) {
            gameData.backpack.items[itemName] -= amount;
            if (gameData.backpack.items[itemName] <= 0) {
                delete gameData.backpack.items[itemName];
            }
        }
    } else if (backpackType === 'temp') {
        if (gameData.tempBackpack.items[itemName]) {
            gameData.tempBackpack.items[itemName] -= amount;
            if (gameData.tempBackpack.items[itemName] <= 0) {
                delete gameData.tempBackpack.items[itemName];
            }
            updateTempBackpackDisplay();
        }
    }
    
    const displayName = baseItemName;
    const sellMessage = `出售成功：${displayName}*${amount}，获得金币*${totalPrice}！`;
    addMessage(sellMessage);
    
    updateUI();
    updateBackpackDisplay();
    updateToolSlotInfo(); // 更新插片信息，确保制作材料实时更新
    updateSellPanel();
}

function consumeItem(itemName, amount) {
    let remaining = amount;
    
    // 特殊处理工具等级提升券，它们存储在gameData.unlockTickets中
    if (itemName === 'headlightTicket' || itemName === 'cartTicket' || itemName === 'pickaxeTicket') {
        const toolType = itemName.replace('Ticket', '');
        const currentTickets = gameData.unlockTickets[toolType] || 0;
        if (currentTickets >= amount) {
            gameData.unlockTickets[toolType] = currentTickets - amount;
            updateToolSlotInfo(); // 更新插片信息，确保制作材料实时更新
            return true;
        }
        return false;
    }
    
    // 先从主背包中消耗物品
    const itemEntries = Object.entries(gameData.backpack.items);
    const itemsToUpdate = [...itemEntries];
    for (const [name, count] of itemsToUpdate) {
        const baseName = name.split('_')[0];
        if (baseName === itemName) {
            if (count >= remaining) {
                gameData.backpack.items[name] -= remaining;
                if (gameData.backpack.items[name] <= 0) {
                    delete gameData.backpack.items[name];
                }
                remaining = 0;
                break;
            } else {
                remaining -= count;
                delete gameData.backpack.items[name];
            }
        }
    }
    
    // 如果主背包中不够，从临时背包中消耗物品
    if (remaining > 0) {
        const tempEntries = Object.entries(gameData.tempBackpack.items);
        const tempItemsToUpdate = [...tempEntries];
        for (const [name, count] of tempItemsToUpdate) {
            const baseName = name.split('_')[0];
            if (baseName === itemName) {
                if (count >= remaining) {
                    gameData.tempBackpack.items[name] -= remaining;
                    if (gameData.tempBackpack.items[name] <= 0) {
                        delete gameData.tempBackpack.items[name];
                    }
                    remaining = 0;
                    break;
                } else {
                    remaining -= count;
                    delete gameData.tempBackpack.items[name];
                }
            }
        }
        // 更新临时背包显示
        updateTempBackpackDisplay();
    }
    
    // 更新插片信息，确保制作材料实时更新
    if (remaining === 0) {
        updateToolSlotInfo();
    }
    
    return remaining === 0;
}

function craftCart() {
    if (gameData.tools.cart.crafted) {
        alert('矿车已制作！');
        return;
    }
    if (gameData.player.gold < 50) {
        alert('金币不足！需要50金币');
        return;
    }
    if (!consumeItem('铁矿', 20)) {
        alert('材料不足！需要铁矿20');
        return;
    }
    gameData.player.gold -= 50;
    gameData.tools.cart.crafted = true;
    addMessage('矿车制作成功！');
    updateUI();
    updateBackpackDisplay();
    updateMessages();
}

function craftHeadlight() {
    if (gameData.tools.headlight.crafted) {
        alert('头灯已制作！');
        return;
    }
    if (gameData.player.gold < 1000) {
        alert('金币不足！需要1000金币');
        return;
    }
    if (!consumeItem('铁矿', 100)) {
        alert('材料不足！需要铁矿100');
        return;
    }
    if (!consumeItem('铜矿', 10)) {
        alert('材料不足！需要铜矿10');
        return;
    }
    gameData.player.gold -= 1000;
    gameData.tools.headlight.crafted = true;
    addMessage('头灯制作成功！');
    updateUI();
    updateBackpackDisplay();
    updateMessages();
}

function craftFurnace() {
    if (gameData.furnace.crafted) {
        alert('熔炉已制作！');
        return;
    }
    if (!consumeItem('石矿', 20)) {
        alert('材料不足！需要石矿20');
        return;
    }
    gameData.furnace.crafted = true;
    addMessage('熔炉制作成功！');
    updateUI();
    updateBackpackDisplay();
    updateFurnaceUI();
    updateMessages();
}

function upgradeFurnace() {
    if (!gameData.furnace.crafted) {
        alert('请先制作熔炉！');
        return;
    }
    const nextLevel = gameData.furnace.level + 1;
    const materials = getFurnaceUpgradeMaterials(nextLevel);
    if (!hasEnoughMaterials(materials)) {
        let materialsText = '';
        for (const [material, amount] of Object.entries(materials)) {
            materialsText += `${material}×${amount} `;
        }
        alert(`材料不足！需要：${materialsText}`);
        return;
    }
    for (const [material, amount] of Object.entries(materials)) {
        consumeItem(material, amount);
    }
    gameData.furnace.level = nextLevel;
    // 更新燃料最大值
    gameData.furnace.fuel.maxAmount = 100 + (nextLevel * 20);
    addMessage(`熔炉升级成功！现在是${nextLevel}级！`);
    updateUI();
    updateBackpackDisplay();
    updateFurnaceUI();
    updateMessages();
    saveGame();
}

function addFurnaceFuel() {
    if (!gameData.furnace.crafted) {
        alert('请先制作熔炉！');
        return;
    }
    
    const fuelType = document.getElementById('furnace-fuel-type').value;
    let fuelAmount = parseInt(document.getElementById('furnace-fuel-amount').value) || 1;
    
    // 确保数量至少为1
    fuelAmount = Math.max(1, fuelAmount);
    
    // 检查背包是否有足够燃料
    if (!consumeItem(fuelType, fuelAmount)) {
        alert(`材料不足！需要${fuelType}${fuelAmount}`);
        return;
    }
    
    // 检查添加后是否超过上限99
    const currentAmount = gameData.furnace.fuel.inventory[fuelType] || 0;
    const newAmount = currentAmount + fuelAmount;
    
    if (newAmount > 99) {
        // 只添加能达到上限的数量
        const actualAmount = 99 - currentAmount;
        if (actualAmount <= 0) {
            alert(`${fuelType}已达到上限99个！`);
            // 返还未添加的燃料
            addToBackpack(fuelType, fuelAmount);
            return;
        }
        
        // 只消耗实际添加的数量
        addToBackpack(fuelType, fuelAmount - actualAmount);
        fuelAmount = actualAmount;
    }
    
    // 添加到熔炉库存
    gameData.furnace.fuel.inventory[fuelType] += fuelAmount;
    
    addMessage(`添加了${fuelAmount}个${fuelType}到熔炉！`);
    updateFurnaceUI();
    saveGame();
    
    // 更新默认燃料数量
    updateDefaultFuelAmount();
}

function updateDefaultFuelAmount() {
    const fuelTypeSelect = document.getElementById('furnace-fuel-type');
    const fuelAmountInput = document.getElementById('furnace-fuel-amount');
    
    if (!fuelTypeSelect || !fuelAmountInput) {
        return;
    }
    
    const fuelType = fuelTypeSelect.value;
    const currentInventory = gameData.furnace.fuel.inventory[fuelType] || 0;
    
    // 每种燃料的上限是99个
    const maxInventory = 99;
    
    // 计算可以添加的最大数量，默认为1
    const availableAmount = maxInventory - currentInventory;
    const defaultAmount = Math.max(1, Math.min(availableAmount, 10));
    
    // 更新输入框的值
    fuelAmountInput.value = defaultAmount;
}

function getFuelValue(fuelType) {
    switch (fuelType) {
        case '煤矿': return 15; // 150℃
        case '煤炭': return 25; // 250℃
        case '燃料': return 30; // 300℃
        case '超导燃料': return 50; // 500℃
        default: return 0;
    }
}

// 获取燃料的温度值
function getFuelTemperature(fuelType) {
    switch (fuelType) {
        case '煤矿': return 150; // 150℃
        case '煤炭': return 250; // 250℃
        case '燃料': return 300; // 300℃
        case '超导燃料': return 500; // 500℃
        default: return 0;
    }
}



function getFurnaceBurnTimeMultiplier() {
    const level = gameData.furnace.level;
    switch (level) {
        case 1: return 1;
        case 2: return 1;
        case 3: return 1.3;
        case 4: return 1.5;
        case 5: return 2;
        default: return 1;
    }
}

// 获取物品复杂度系数
function getComplexityFactor(itemType) {
    switch (itemType) {
        case '石灰':
        case '煤炭':
            return 1.0; // 基础物品
        case '银质粉末':
            return 1.5; // 中级物品
        case '白金粉末':
            return 2.0; // 高级物品
        case '铜铁合金':
        case '铜钴合金':
        case '铜镍合金':
        case '铜银合金':
            return 3.0; // 合金
        default:
            return 1.0;
    }
}

// 获取熔炉等级系数
function getFurnaceLevelFactor() {
    const level = gameData.furnace.level;
    switch (level) {
        case 1: return 1.0;
        case 2: return 0.9;
        case 3: return 0.8;
        case 4: return 0.7;
        case 5: return 0.6;
        default: return 1.0;
    }
}

// 计算燃料消耗
function calculateFuelConsumption(itemType, amount) {
    // 基础燃料消耗
    const baseCost = 10;
    
    // 获取物品复杂度系数
    const complexityFactor = getComplexityFactor(itemType);
    
    // 获取熔炉等级系数
    const levelFactor = getFurnaceLevelFactor();
    
    // 计算最终燃料消耗
    const fuelConsumption = Math.ceil(baseCost * complexityFactor * levelFactor * amount);
    
    return fuelConsumption;
}









function updateFurnaceFuelUI() {
    try {
        // 获取燃料系统容器
        const fuelSystemDiv = document.querySelector('.furnace-fuel-system');
        if (!fuelSystemDiv) return;
        
        // 获取或创建必要的UI元素
        let temperatureDisplay = document.getElementById('furnace-temperature');
        let burnTimeDisplay = document.getElementById('furnace-burn-time');
        let fuelProgress = document.getElementById('furnace-fuel-progress');
        
        // 创建温度显示元素（如果不存在）
        if (!temperatureDisplay) {
            const temperatureContainer = document.createElement('div');
            temperatureContainer.style.marginTop = '5px';
            temperatureContainer.innerHTML = `
                <div style="font-size: 0.8em; color: #666;">
                    温度: <span id="furnace-temperature">0</span>℃
                </div>
                <div style="width: 100%; height: 5px; background-color: #ddd; margin-top: 3px; border-radius: 2px; overflow: hidden;">
                    <div id="temperature-progress" style="height: 100%; background-color: #ff5722; width: 0%; transition: width 0.3s ease;"></div>
                </div>
            `;
            fuelSystemDiv.appendChild(temperatureContainer);
            temperatureDisplay = document.getElementById('furnace-temperature');
        }
        
        // 创建燃烧时间显示元素（如果不存在）
        if (!burnTimeDisplay) {
            const burnTimeContainer = document.createElement('div');
            burnTimeContainer.style.marginTop = '5px';
            burnTimeContainer.innerHTML = `
                <div style="font-size: 0.8em; color: #666;">
                    燃烧时间: <span id="furnace-burn-time">00:00</span>
                </div>
                <div style="width: 100%; height: 5px; background-color: #ddd; margin-top: 3px; border-radius: 2px; overflow: hidden;">
                    <div id="furnace-fuel-progress" style="height: 100%; background-color: #4CAF50; width: 0%; transition: width 0.3s ease;"></div>
                </div>
            `;
            fuelSystemDiv.appendChild(burnTimeContainer);
            burnTimeDisplay = document.getElementById('furnace-burn-time');
            fuelProgress = document.getElementById('furnace-fuel-progress');
        }
        
        // 创建燃料库存显示元素（如果不存在）
        let inventoryDisplay = document.getElementById('furnace-fuel-inventory');
        if (!inventoryDisplay) {
            const inventoryContainer = document.createElement('div');
            inventoryContainer.id = 'furnace-fuel-inventory';
            inventoryContainer.style.marginTop = '10px';
            inventoryContainer.style.padding = '8px';
            inventoryContainer.style.backgroundColor = '#f5f5f5';
            inventoryContainer.style.borderRadius = '4px';
            inventoryContainer.style.fontSize = '0.8em';
            fuelSystemDiv.appendChild(inventoryContainer);
            inventoryDisplay = document.getElementById('furnace-fuel-inventory');
        }
        
        // 获取或创建点火/熄火按钮
        let toggleBurnBtn = document.getElementById('toggle-burn-btn');
        if (!toggleBurnBtn) {
            toggleBurnBtn = document.createElement('button');
            toggleBurnBtn.id = 'toggle-burn-btn';
            toggleBurnBtn.style.marginLeft = '10px';
            toggleBurnBtn.style.padding = '3px 8px';
            toggleBurnBtn.style.fontSize = '0.8em';
            toggleBurnBtn.style.borderRadius = '3px';
            toggleBurnBtn.style.cursor = 'pointer';
            
            // 添加到燃料系统UI中
            const addFuelBtn = document.getElementById('add-furnace-fuel');
            if (addFuelBtn) {
                addFuelBtn.parentNode.insertBefore(toggleBurnBtn, addFuelBtn.nextSibling);
                toggleBurnBtn.addEventListener('click', toggleBurn);
            }
        }
        
        // 获取或创建取出剩余燃料按钮
        let takeOutFuelBtn = document.getElementById('take-out-fuel-btn');
        if (!takeOutFuelBtn) {
            takeOutFuelBtn = document.createElement('button');
            takeOutFuelBtn.id = 'take-out-fuel-btn';
            takeOutFuelBtn.textContent = '取出剩余燃料';
            takeOutFuelBtn.style.marginLeft = '10px';
            takeOutFuelBtn.style.padding = '3px 8px';
            takeOutFuelBtn.style.fontSize = '0.8em';
            takeOutFuelBtn.style.backgroundColor = '#2196F3';
            takeOutFuelBtn.style.color = 'white';
            takeOutFuelBtn.style.border = 'none';
            takeOutFuelBtn.style.borderRadius = '3px';
            takeOutFuelBtn.style.cursor = 'pointer';
            
            // 添加到燃料系统UI中
            const addFuelBtn = document.getElementById('add-furnace-fuel');
            if (addFuelBtn) {
                let insertPosition = toggleBurnBtn.nextSibling || addFuelBtn.nextSibling;
                addFuelBtn.parentNode.insertBefore(takeOutFuelBtn, insertPosition);
                takeOutFuelBtn.addEventListener('click', takeOutRemainingFuel);
            }
        }
        
        // 更新燃料库存显示
        const inventory = gameData.furnace.fuel.inventory;
        inventoryDisplay.innerHTML = `
            <strong>燃料库存：</strong><br>
            煤矿：${inventory['煤矿'] || 0}/99<br>
            煤炭：${inventory['煤炭'] || 0}/99<br>
            燃料：${inventory['燃料'] || 0}/99<br>
            超导燃料：${inventory['超导燃料'] || 0}/99
        `;
        
        // 更新燃烧时间显示
        if (burnTimeDisplay && fuelProgress) {
            const fuel = gameData.furnace.fuel;
            if (fuel.isBurning && fuel.burningType) {
                const totalRemaining = Math.max(0, Math.round(fuel.remainingBurnTime * 10) / 10); // 保留一位小数进行计算
                const minutes = Math.floor(totalRemaining / 60);
                const seconds = Math.floor(totalRemaining % 60); // 只显示整数秒
                burnTimeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                const progress = fuel.totalBurnTime > 0 ? 
                    ((fuel.totalBurnTime - fuel.remainingBurnTime) / fuel.totalBurnTime) * 100 : 0;
                fuelProgress.style.width = `${progress}%`;
            } else {
                burnTimeDisplay.textContent = '00:00';
                fuelProgress.style.width = '0%';
            }
        }
        
        // 更新温度显示
        if (temperatureDisplay) {
            temperatureDisplay.textContent = Math.round(gameData.furnace.fuel.temperature);
            
            // 更新温度进度条
            const temperatureProgress = document.getElementById('temperature-progress');
            if (temperatureProgress) {
                // 计算温度百分比，使用当前最大温度或默认500℃
                const maxTemp = gameData.furnace.fuel.maxTemperature || 500;
                const tempProgress = Math.min((gameData.furnace.fuel.temperature / maxTemp) * 100, 100);
                temperatureProgress.style.width = `${tempProgress}%`;
            }
        }
        
        // 更新点火/熄火按钮
        if (toggleBurnBtn) {
            if (gameData.furnace.fuel.isBurning) {
                toggleBurnBtn.textContent = '熄火';
                toggleBurnBtn.style.backgroundColor = '#f44336';
                toggleBurnBtn.style.color = 'white';
                toggleBurnBtn.style.border = 'none';
            } else {
                toggleBurnBtn.textContent = '点火';
                toggleBurnBtn.style.backgroundColor = '#4CAF50';
                toggleBurnBtn.style.color = 'white';
                toggleBurnBtn.style.border = 'none';
            }
        }
        
        // 更新取出剩余燃料按钮的状态
        if (takeOutFuelBtn) {
            // 检查是否有剩余燃料可以取出
            let hasFuel = false;
            for (const [fuelType, amount] of Object.entries(gameData.furnace.fuel.inventory)) {
                if (amount > 0) {
                    hasFuel = true;
                    break;
                }
            }
            
            if (hasFuel && gameData.furnace.fuel.temperature === 0) {
                takeOutFuelBtn.disabled = false;
                takeOutFuelBtn.style.backgroundColor = '#2196F3';
                takeOutFuelBtn.style.cursor = 'pointer';
            } else {
                takeOutFuelBtn.disabled = true;
                takeOutFuelBtn.style.backgroundColor = '#90CAF9';
                takeOutFuelBtn.style.cursor = 'not-allowed';
            }
        }
    } catch (error) {
        console.error('updateFurnaceFuelUI 错误:', error);
        // 错误处理：忽略错误，避免游戏崩溃
    }
}

// 切换燃烧状态
function toggleBurn() {
    const fuel = gameData.furnace.fuel;
    console.log('toggleBurn called, isBurning:', fuel.isBurning);
    
    if (fuel.isBurning) {
        // 熄火
        console.log('Calling extinguishFurnace...');
        extinguishFurnace();
    } else {
        // 点火
        console.log('Calling showIgnitionPanel...');
        showIgnitionPanel();
    }
}

// 显示点火面板
function showIgnitionPanel() {
    const fuelSystemDiv = document.querySelector('.furnace-fuel-system');
    if (!fuelSystemDiv) return;
    
    // 检查是否已经存在点火面板
    let ignitionPanel = document.getElementById('ignition-panel');
    if (ignitionPanel) {
        ignitionPanel.remove();
    }
    
    // 创建点火面板
    ignitionPanel = document.createElement('div');
    ignitionPanel.id = 'ignition-panel';
    ignitionPanel.style.marginTop = '15px';
    ignitionPanel.style.padding = '10px';
    ignitionPanel.style.backgroundColor = '#e8f5e8';
    ignitionPanel.style.border = '1px solid #c8e6c9';
    ignitionPanel.style.borderRadius = '4px';
    ignitionPanel.style.fontSize = '0.8em';
    
    // 获取可用燃料类型
    const inventory = gameData.furnace.fuel.inventory;
    const availableFuels = [];
    for (const [type, amount] of Object.entries(inventory)) {
        if (amount > 0) {
            availableFuels.push(type);
        }
    }
    
    if (availableFuels.length === 0) {
        ignitionPanel.innerHTML = '<p style="color: #ff5252;">熔炉中没有燃料，请先添加燃料！</p>';
        fuelSystemDiv.appendChild(ignitionPanel);
        return;
    }
    
    // 构建点火面板HTML
    ignitionPanel.innerHTML = `
        <h4 style="margin-top: 0; margin-bottom: 10px;">点火设置</h4>
        <div style="margin-bottom: 10px;">
            <label for="ignition-fuel-type">选择燃料类型：</label>
            <select id="ignition-fuel-type" style="margin-left: 5px; padding: 3px;">
                ${availableFuels.map(type => `<option value="${type}">${type}</option>`).join('')}
            </select>
        </div>
        <div style="margin-bottom: 10px;">
            <label for="ignition-fuel-amount">燃烧数量：</label>
            <input type="number" id="ignition-fuel-amount" min="1" max="${inventory[availableFuels[0]]}" value="1" style="width: 60px; margin-left: 5px; padding: 3px;">
            <span id="max-amount-text" style="margin-left: 5px; color: #666;">（最大：${inventory[availableFuels[0]]}）</span>
        </div>
        <div style="margin-bottom: 10px;">
            <label for="estimated-burn-time">预计燃烧时间：</label>
            <span id="estimated-burn-time">00:00</span>
        </div>
        <div>
            <button id="confirm-ignition" style="padding: 5px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer;">确认点火</button>
            <button id="cancel-ignition" style="padding: 5px 15px; margin-left: 10px; background-color: #f44336; color: white; border: none; border-radius: 3px; cursor: pointer;">取消</button>
        </div>
    `;
    
    fuelSystemDiv.appendChild(ignitionPanel);
    
    // 添加事件监听器
    const fuelTypeSelect = document.getElementById('ignition-fuel-type');
    const fuelAmountInput = document.getElementById('ignition-fuel-amount');
    const maxAmountText = document.getElementById('max-amount-text');
    const estimatedTimeText = document.getElementById('estimated-burn-time');
    const confirmBtn = document.getElementById('confirm-ignition');
    const cancelBtn = document.getElementById('cancel-ignition');
    
    // 燃料类型变化时更新最大数量和预计时间
    fuelTypeSelect.addEventListener('change', updateIgnitionSettings);
    
    // 燃料数量变化时更新预计时间
    fuelAmountInput.addEventListener('input', updateIgnitionSettings);
    
    // 确认点火
    confirmBtn.addEventListener('click', confirmIgnition);
    
    // 取消点火
    cancelBtn.addEventListener('click', () => {
        ignitionPanel.remove();
    });
    
    // 初始更新
    updateIgnitionSettings();
    
    // 更新点火设置
    function updateIgnitionSettings() {
        const selectedType = fuelTypeSelect.value;
        const maxAmount = inventory[selectedType];
        const currentAmount = parseInt(fuelAmountInput.value) || 1;
        
        // 更新最大数量
        maxAmountText.textContent = `（最大：${maxAmount}）`;
        fuelAmountInput.max = maxAmount;
        
        // 确保数量在合理范围内
        if (currentAmount > maxAmount) {
            fuelAmountInput.value = maxAmount;
        }
        
        // 计算预计燃烧时间
        const burnTimePerFuel = getBurnTimePerFuel(selectedType);
        const totalBurnTime = burnTimePerFuel * parseInt(fuelAmountInput.value) || 1;
        const minutes = Math.floor(totalBurnTime / 60);
        const seconds = totalBurnTime % 60;
        estimatedTimeText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // 确认点火
    function confirmIgnition() {
        const selectedType = fuelTypeSelect.value;
        const amount = parseInt(fuelAmountInput.value) || 1;
        
        if (amount <= 0 || amount > inventory[selectedType]) {
            alert('请输入有效的燃料数量！');
            return;
        }
        
        // 执行点火
        igniteFurnace(selectedType, amount);
        
        // 移除点火面板
        ignitionPanel.remove();
    }
}

// 初始化默认燃料数量 - 移到DOM加载完成后调用

// 获取单个燃料的燃烧时间
function getBurnTimePerFuel(fuelType) {
    switch (fuelType) {
        case '煤矿': return 10; // 10秒/个
        case '煤炭': return 20; // 20秒/个
        case '燃料': return 40; // 40秒/个
        case '超导燃料': return 80; // 80秒/个
        default: return 0;
    }
}

// 获取燃料的加热速度
function getFuelHeatingSpeed(fuelType) {
    // 升温速度=热值*50%/每秒
    const heatValue = getFuelValue(fuelType);
    // 定时器每100ms执行一次，每次增加 (heatingSpeed / 10) 的温度
    // 所以 heatingSpeed = （热值 * 0.5） * 10 = 热值 * 5
    return heatValue * 5;
}

// 获取燃料的最大温度
function getFuelMaxTemperature(fuelType) {
    switch (fuelType) {
        case '煤矿': return 150; // 150℃
        case '煤炭': return 250; // 250℃
        case '燃料': return 300; // 300℃
        case '超导燃料': return 500; // 500℃
        default: return 0;
    }
}

// 点火功能
function igniteFurnace(fuelType, amount) {
    // 检查燃料库存
    const currentInventory = gameData.furnace.fuel.inventory[fuelType];
    if (currentInventory < amount) {
        alert('燃料不足！');
        return;
    }
    
    // 计算燃烧时间和最大温度
    const burnTimePerFuel = getBurnTimePerFuel(fuelType);
    const heatingSpeed = getFuelHeatingSpeed(fuelType);
    const maxTemperature = getFuelMaxTemperature(fuelType);
    
    const totalBurnTime = burnTimePerFuel * amount;
    
    // 更新燃料状态
    gameData.furnace.fuel.isBurning = true;
    gameData.furnace.fuel.burningType = fuelType;
    gameData.furnace.fuel.burningAmount = amount;
    gameData.furnace.fuel.remainingBurnTime = totalBurnTime;
    gameData.furnace.fuel.totalBurnTime = totalBurnTime;
    gameData.furnace.fuel.maxTemperature = maxTemperature;
    
    // 消耗燃料
    gameData.furnace.fuel.inventory[fuelType] -= amount;
    
    // 启动温度更新定时器
    startTemperatureUpdate();
    
    addMessage(`开始燃烧${amount}个${fuelType}，预计燃烧${totalBurnTime}秒！`);
    updateFurnaceUI();
    saveGame();
}

// 熄火功能
function extinguishFurnace() {
    // 检查是否正在燃烧
    if (!gameData.furnace.fuel.isBurning) {
        alert('熔炉没有在燃烧！');
        return;
    }
    
    // 停止燃烧
    gameData.furnace.fuel.isBurning = false;
    
    // 计算剩余燃烧时间对应的燃料量
    const burnTimePerFuel = getBurnTimePerFuel(gameData.furnace.fuel.burningType);
    const remainingFuelAmount = Math.ceil(gameData.furnace.fuel.remainingBurnTime / burnTimePerFuel);
    
    // 返还剩余燃料
    if (remainingFuelAmount > 0) {
        gameData.furnace.fuel.inventory[gameData.furnace.fuel.burningType] += remainingFuelAmount;
        addMessage(`停止燃烧，返还${remainingFuelAmount}个${gameData.furnace.fuel.burningType}！`);
    }
    
    // 重置燃烧状态
    gameData.furnace.fuel.remainingBurnTime = 0;
    gameData.furnace.fuel.totalBurnTime = 0;
    gameData.furnace.fuel.burningAmount = 0;
    gameData.furnace.fuel.burningType = null;
    
    addMessage('熔炉已熄火，温度开始下降...');
    updateFurnaceUI();
    saveGame();
}

// 取出剩余燃料功能
function takeOutRemainingFuel() {
    // 检查温度是否为0
    if (gameData.furnace.fuel.temperature > 0) {
        alert(`熔炉温度过高（${Math.round(gameData.furnace.fuel.temperature)}℃），请等待温度降至0℃后再取出燃料！`);
        return;
    }
    
    // 检查是否有剩余燃料
    let hasFuel = false;
    for (const [fuelType, amount] of Object.entries(gameData.furnace.fuel.inventory)) {
        if (amount > 0) {
            hasFuel = true;
            break;
        }
    }
    
    if (!hasFuel) {
        alert('熔炉中没有剩余燃料！');
        return;
    }
    
    // 取出所有剩余燃料
    let message = '取出剩余燃料：';
    for (const [fuelType, amount] of Object.entries(gameData.furnace.fuel.inventory)) {
        if (amount > 0) {
            addToBackpack(fuelType, amount);
            message += `${fuelType}×${amount} `;
            gameData.furnace.fuel.inventory[fuelType] = 0;
        }
    }
    
    addMessage(message.trim());
    updateFurnaceUI();
    updateBackpackDisplay();
    saveGame();
}

// 启动温度更新定时器
function startTemperatureUpdate() {
    // 清除现有的定时器
    if (gameData.furnace.fuel.temperatureTimer) {
        clearInterval(gameData.furnace.fuel.temperatureTimer);
    }
    
    // 设置新的定时器，每100ms更新一次温度
    gameData.furnace.fuel.temperatureTimer = setInterval(() => {
        updateFurnaceTemperature();
    }, 100);
}

// 更新熔炉温度
function updateFurnaceTemperature() {
    const fuel = gameData.furnace.fuel;
    
    if (fuel.isBurning) {
        // 燃烧中
        const heatingSpeed = getFuelHeatingSpeed(fuel.burningType);
        
        // 计算当前燃料的最大温度
        const currentMaxTemp = getFuelMaxTemperature(fuel.burningType);
        
        // 温度调节逻辑：
        // 1. 如果当前温度低于最大温度，继续升温
        // 2. 如果当前温度高于最大温度，开始降温（模拟热量散失）
        if (fuel.temperature < currentMaxTemp) {
            // 升温
            fuel.temperature = Math.min(fuel.temperature + (heatingSpeed / 10), currentMaxTemp);
        } else if (fuel.temperature > currentMaxTemp) {
            // 降温：从高级燃料切换到低级燃料时，温度会自然降到新燃料的最大温度
            fuel.temperature = Math.max(fuel.temperature - (fuel.coolingSpeed / 10), currentMaxTemp);
        }
        
        // 减少剩余燃烧时间
        fuel.remainingBurnTime -= 0.1;
        // 四舍五入到一位小数，减少浮点数精度问题
        fuel.remainingBurnTime = Math.round(fuel.remainingBurnTime * 10) / 10;
        
        // 检查燃烧是否结束
        if (fuel.remainingBurnTime <= 0) {
            // 检查是否还有相同类型的燃料库存
            const currentFuelType = fuel.burningType;
            if (currentFuelType && fuel.inventory[currentFuelType] > 0) {
                // 消耗一个燃料，继续燃烧相同类型
                fuel.inventory[currentFuelType] -= 1;
                
                // 计算新的燃烧时间
                const burnTimePerFuel = getBurnTimePerFuel(currentFuelType);
                fuel.remainingBurnTime = burnTimePerFuel;
                fuel.totalBurnTime = burnTimePerFuel;
                fuel.burningAmount = 1;
                
                addMessage(`自动续燃料：消耗1个${currentFuelType}，继续燃烧${burnTimePerFuel}秒！`);
            } else {
                // 没有更多当前类型的燃料，直接停止燃烧
                // 不自动切换其他类型的燃料，需要手动点火
                fuel.isBurning = false;
                fuel.burningType = null;
                fuel.burningAmount = 0;
                fuel.remainingBurnTime = 0;
                fuel.totalBurnTime = 0;
                
                addMessage('燃料燃烧结束！');
            }
        }
    } else {
        // 未燃烧，降温
        if (fuel.temperature > 0) {
            // 降温逻辑：直接降到0，不管库存中有什么燃料
            fuel.temperature = Math.max(fuel.temperature - (fuel.coolingSpeed / 10), 0);
        } else {
            // 温度已降至0，清除定时器
            if (fuel.temperatureTimer) {
                clearInterval(fuel.temperatureTimer);
                fuel.temperatureTimer = null;
            }
        }
    }
    
    updateFurnaceUI();
    saveGame();
}

function getFurnaceUpgradeMaterials(level) {
    const materials = {
        1: { '石矿': 5, '石灰': 5 },
        2: { '石灰': 10, '铜铁合金': 3 },
        3: { '石灰': 20, '铜钴合金': 5 },
        4: { '铜钴合金': 10, '铜镍合金': 5 },
        5: { '铜镍合金': 10, '铜银合金': 5 }
    };
    return materials[level] || {};
}

function hasEnoughMaterials(materials) {
    for (const [material, amount] of Object.entries(materials)) {
        if (!hasEnoughItem(material, amount)) {
            return false;
        }
    }
    return true;
}

// 移除了启动自动制作函数

// 停止自动制作
// 旧的stopAutoCraft函数已被删除，保留新的支持多位置的版本

// 检查所有合金位是否空闲
function areAllAlloyPositionsIdle() {
    if (!gameData.furnace.alloyPositions) {
        return true;
    }
    
    for (let i = 1; i <= 5; i++) {
        const position = gameData.furnace.alloyPositions[i];
        // 检查手动制作是否在进行中
        if (position && position.crafting && position.crafting.inProgress) {
            return false;
        }
        // 检查自动制作是否启用
        if (position && position.autoCraft && position.autoCraft.enabled) {
            return false;
        }
    }
    return true;
}

// 移除重复的extinguishFurnace函数，只保留一个完整版本
// 熄火功能已在10512行定义

// 移除了自动制作定时器回调函数

function updateFurnaceUI() {
    try {
        // 只在DOM元素存在时才执行UI更新
        const smeltBtn = document.getElementById('smelt-stone');
        const alloyBtn = document.getElementById('make-alloy');
        const furnaceLevel = document.getElementById('furnace-level');
        const craftFurnaceBtn = document.getElementById('craft-furnace');
        const upgradeFurnaceBtn = document.getElementById('upgrade-furnace');
        
        if (!upgradeFurnaceBtn) {
            const localFurnaceLevel = document.getElementById('furnace-level');
            if (localFurnaceLevel) {
                const upgradeBtn = document.createElement('button');
                upgradeBtn.id = 'upgrade-furnace';
                upgradeBtn.textContent = '升级熔炉';
                upgradeBtn.style.marginLeft = '10px';
                upgradeBtn.style.padding = '2px 8px';
                upgradeBtn.style.fontSize = '0.8em';
                upgradeBtn.style.backgroundColor = '#4CAF50';
                upgradeBtn.style.color = 'white';
                upgradeBtn.style.border = 'none';
                upgradeBtn.style.borderRadius = '3px';
                upgradeBtn.style.cursor = 'pointer';
                localFurnaceLevel.parentNode.insertBefore(upgradeBtn, localFurnaceLevel.nextSibling);
                upgradeBtn.addEventListener('click', upgradeFurnace);
            }
        }
        
        if (gameData.furnace.crafted) {
            // 检查元素是否存在后再设置属性
            if (smeltBtn) {
                smeltBtn.disabled = false;
            }
            if (alloyBtn) {
                alloyBtn.disabled = false; // 移除禁用状态，在点击事件中检查等级
            }
            if (furnaceLevel) {
                furnaceLevel.textContent = gameData.furnace.level;
            }
            if (craftFurnaceBtn) {
                craftFurnaceBtn.style.display = 'none'; // 熔炉制作完成后隐藏按钮
            }
            
            // 只有在smeltBtn或alloyBtn存在时才更新燃料UI
            if (smeltBtn || alloyBtn) {
                updateFurnaceFuelUI();
            }
            
            const upgradeBtn = document.getElementById('upgrade-furnace');
            if (upgradeBtn) {
                const nextLevel = gameData.furnace.level + 1;
                const materials = getFurnaceUpgradeMaterials(nextLevel);
                if (Object.keys(materials).length > 0) {
                    let materialsText = '';
                    for (const [material, amount] of Object.entries(materials)) {
                        materialsText += `${material}×${amount} `;
                    }
                    upgradeBtn.textContent = `升级熔炉到${nextLevel}级 (需要: ${materialsText})`;
                    upgradeBtn.disabled = false;
                    upgradeBtn.style.backgroundColor = '#4CAF50';
                    upgradeBtn.style.color = 'white';
                    upgradeBtn.style.border = 'none';
                    upgradeBtn.style.borderRadius = '3px';
                    upgradeBtn.style.cursor = 'pointer';
                } else {
                    upgradeBtn.textContent = '熔炉已达到最高等级';
                    upgradeBtn.disabled = true;
                    upgradeBtn.style.backgroundColor = '#cccccc';
                    upgradeBtn.style.color = 'white';
                    upgradeBtn.style.border = 'none';
                    upgradeBtn.style.borderRadius = '3px';
                    upgradeBtn.style.cursor = 'not-allowed';
                }
            }
            
            // 显示炼制进度
            const craftingStatus = document.getElementById('crafting-status');
            // 确保crafting对象存在
            if (!gameData.furnace.crafting) {
                gameData.furnace.crafting = {
                    inProgress: false,
                    type: null,
                    recipe: null,
                    amount: 1,
                    totalTime: 0,
                    remainingTime: 0,
                    timer: null,
                    extraData: null
                };
            }
            
            // 生成炼制状态HTML
            let craftingHTML = '';
            
            // 显示全局熔炼状态
            if (gameData.furnace.crafting.inProgress) {
                const remainingTime = gameData.furnace.crafting.remainingTime;
                const totalTime = gameData.furnace.crafting.totalTime;
                const recipe = gameData.furnace.crafting.recipe;
                const progress = Math.floor(((totalTime - remainingTime) / totalTime) * 100);
                
                craftingHTML += `
                    <div style="margin-bottom: 5px;"><strong>融石：</strong>正在炼制：${recipe}</div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <div style="width: 150px; height: 10px; background-color: #f0f0f0; border-radius: 5px; overflow: hidden;">
                            <div style="width: ${progress}%; height: 100%; background-color: #4CAF50; transition: width 0.5s ease;"></div>
                        </div>
                        <span style="font-size: 0.8em; color: #666;">${remainingTime}秒</span>
                    </div>
                `;
            } else {
                craftingHTML += '<div style="margin-bottom: 10px;"><strong>融石：</strong>当前没有正在进行的炼制</div>';
            }
            
            // 显示每个合金位置的状态
            for (let position = 1; position <= 5; position++) {
                const positionData = gameData.furnace.alloyPositions[position];
                if (positionData && positionData.crafting) {
                    const crafting = positionData.crafting;
                    craftingHTML += `
                        <div style="margin-bottom: 5px;"><strong>合金${position}：</strong>`;
                    
                    if (crafting.inProgress) {
                        const remainingTime = crafting.remainingTime;
                        const totalTime = crafting.totalTime;
                        const recipe = crafting.recipe;
                        const progress = Math.floor(((totalTime - remainingTime) / totalTime) * 100);
                        
                        craftingHTML += `正在炼制：${recipe}</div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <div style="width: 150px; height: 10px; background-color: #f0f0f0; border-radius: 5px; overflow: hidden;">
                                <div style="width: ${progress}%; height: 100%; background-color: #4CAF50; transition: width 0.5s ease;"></div>
                            </div>
                            <span style="font-size: 0.8em; color: #666;">${remainingTime}秒</span>
                        </div>`;
                    } else {
                        craftingHTML += '当前没有正在进行的炼制</div>';
                    }
                }
            }
            
            if (craftingStatus) {
                craftingStatus.innerHTML = craftingHTML;
                craftingStatus.style.color = '#4CAF50';
            } else {
                // 创建炼制状态显示元素
                const furnaceLevelEl = document.getElementById('furnace-level');
                if (furnaceLevelEl && furnaceLevelEl.parentNode) {
                    const statusDiv = document.createElement('div');
                    statusDiv.id = 'crafting-status';
                    statusDiv.style.marginTop = '5px';
                    statusDiv.style.fontSize = '0.8em';
                    statusDiv.innerHTML = craftingHTML;
                    statusDiv.style.color = '#4CAF50';
                    
                    furnaceLevelEl.parentNode.appendChild(statusDiv);
                }
            }
            
            // 移除了自动制作状态显示
        } else {
            // 检查元素是否存在后再设置属性
            if (smeltBtn) {
                smeltBtn.disabled = true;
            }
            if (alloyBtn) {
                alloyBtn.disabled = true;
            }
            if (furnaceLevel) {
                furnaceLevel.textContent = '未制作';
            }
            if (craftFurnaceBtn) {
                craftFurnaceBtn.textContent = '制作熔炉 (石矿20)';
                craftFurnaceBtn.disabled = false;
                craftFurnaceBtn.style.display = 'inline-block'; // 熔炉未制作时显示按钮
            }
            
            const upgradeBtn = document.getElementById('upgrade-furnace');
            if (upgradeBtn) {
                upgradeBtn.textContent = '需要先制作熔炉';
                upgradeBtn.disabled = true;
                upgradeBtn.style.backgroundColor = '#cccccc';
                upgradeBtn.style.color = 'white';
                upgradeBtn.style.border = 'none';
                upgradeBtn.style.borderRadius = '3px';
                upgradeBtn.style.cursor = 'not-allowed';
            }
        }
    } catch (error) {
        console.error('updateFurnaceUI 错误:', error);
        // 错误处理：忽略错误，避免游戏崩溃
    }
}

// 更新融石属性显示
function updateSmeltInfo(amount = 1) {
    const smeltInfoBody = document.getElementById('smelt-info-body');
    const smeltRecipeSelect = document.getElementById('smelt-recipe');
    if (!smeltInfoBody || !smeltRecipeSelect) return;
    
    const selectedRecipe = smeltRecipeSelect.value;
    
    // 从配方系统中查找对应的融石配方
    const recipe = smeltRecipes.find(r => r.name === selectedRecipe);
    
    if (!recipe) {
        smeltInfoBody.innerHTML = '<p>无效的配方</p>';
        return;
    }
    
    // 获取所需原料的当前数量
    let materialsInfo = '';
    let canCraft = true;
    let materialsHTML = '';
    
    for (const [material, requiredAmount] of Object.entries(recipe.input)) {
        // 获取背包中的材料数量
        let currentAmount = 0;
        for (const itemName of Object.keys(gameData.backpack.items)) {
            const baseItemName = itemName.split('_')[0];
            if (baseItemName === material) {
                currentAmount += gameData.backpack.items[itemName];
            }
        }
        
        const totalRequired = requiredAmount * amount;
        const materialColor = currentAmount >= totalRequired ? '#4CAF50' : '#f44336';
        materialsHTML += `<div class="smelt-material" style="color: ${materialColor};">
                            ${material}：${currentAmount}/${totalRequired}
                        </div>`;
        
        if (currentAmount < totalRequired) {
            canCraft = false;
        }
    }
    
    // 获取产出信息
    let outputHTML = '';
    for (const [outputItem, outputAmount] of Object.entries(recipe.output)) {
        outputHTML += `<div class="smelt-output">
                        产出：${outputItem} × ${outputAmount * amount}
                    </div>`;
    }
    
    // 检查配方解锁条件
    const progress = getRecipeUnlockProgress(recipe);
    const unlockCondition = getRecipeUnlockConditionDescription(recipe);
    
    // 构建配方信息HTML
    let unlockHTML = '';
    if (!progress.unlocked) {
        unlockHTML = `
            <div class="recipe-unlock-info" style="margin-top: 10px; padding: 10px; background-color: #fff3e0; border: 1px solid #ffcc80; border-radius: 5px;">
                <div class="recipe-unlock-condition">解锁条件：${unlockCondition}</div>
                <div class="recipe-unlock-progress">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>解锁进度</span>
                        <span>${progress.progress}/${progress.total}</span>
                    </div>
                    <div style="width: 100%; height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${(progress.progress / progress.total) * 100}%; height: 100%; background-color: #ff9800; border-radius: 4px;"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 构建最终的HTML
    const smeltInfoHTML = `
        <div class="smelt-recipe-info">
            <div class="smelt-recipe-name" style="font-weight: bold; margin-bottom: 10px;">${recipe.name}</div>
            <div class="smelt-recipe-description" style="margin-bottom: 15px; color: #666;">${recipe.description}</div>
            
            <div class="smelt-materials-section">
                <h4>所需材料</h4>
                ${materialsHTML}
            </div>
            
            <div class="smelt-output-section" style="margin-top: 15px;">
                <h4>产出</h4>
                ${outputHTML}
            </div>
            
            ${unlockHTML}
        </div>
    `;
    
    smeltInfoBody.innerHTML = smeltInfoHTML;
}

// 填充融石数量选择
function populateSmeltStoneAmounts() {
    // 初始更新融石属性
    updateSmeltInfo(1);
    
    // 添加配方选择的事件监听器
    const smeltRecipeSelect = document.getElementById('smelt-recipe');
    if (smeltRecipeSelect) {
        smeltRecipeSelect.onchange = function() {
            const smeltAmountInput = document.getElementById('smelt-amount');
            const amount = smeltAmountInput ? parseInt(smeltAmountInput.value) || 1 : 1;
            updateSmeltInfo(amount);
        };
    }
    
    // 添加制作数量输入框的事件监听器
    const smeltAmountInput = document.getElementById('smelt-amount');
    if (smeltAmountInput) {
        smeltAmountInput.onchange = function() {
            const inputAmount = parseInt(this.value) || 1;
            updateSmeltInfo(inputAmount);
        };
    }
}

// 填充合金类型选择下拉菜单
function populateAlloyTypes(position = 1) {
    const alloyTypeSelect = document.getElementById(`alloy-type-${position}`);
    if (!alloyTypeSelect) return;
    
    // 清空现有选项
    alloyTypeSelect.innerHTML = '';
    
    // 添加已解锁的合金选项
    for (const [alloyName, alloyData] of Object.entries(alloyRecipes)) {
        if (hasAlloyRecipe(alloyName)) {
            const option = document.createElement('option');
            option.value = alloyName;
            option.textContent = alloyName;
            alloyTypeSelect.appendChild(option);
        }
    }
    
    // 移除旧的事件监听器，避免累积
    alloyTypeSelect.onchange = null;
    
    // 添加合金类型选择的事件监听器，传递位置参数
    alloyTypeSelect.onchange = () => updateAlloyInfo(position);
    
    // 初始更新合金属性
    updateAlloyInfo(position);
}

// 更新合金属性显示
function updateAlloyInfo(position = 1) {
    const alloyTypeSelect = document.getElementById(`alloy-type-${position}`);
    const alloyInfoBody = document.getElementById(`alloy-info-body-${position}`);
    if (!alloyTypeSelect || !alloyInfoBody) return;
    
    const selectedAlloy = alloyTypeSelect.value;
    if (!selectedAlloy) {
        alloyInfoBody.innerHTML = '<p>请选择一个合金</p>';
        return;
    }
    
    const alloyData = alloyRecipes[selectedAlloy];
    if (!alloyData) {
        alloyInfoBody.innerHTML = '<p>无效的合金类型</p>';
        return;
    }
    
    // 获取合金所需等级
    const requiredLevel = getRequiredLevelForAlloy(selectedAlloy);
    
    // 构建材料信息，包括当前数量和所需数量
    let materialsHTML = '';
    for (const [material, amount] of Object.entries(alloyData.materials)) {
        const materialCount = getItemCount(material);
        const materialColor = materialCount >= amount ? '#4CAF50' : '#f44336';
        materialsHTML += `<div class="alloy-material" style="color: ${materialColor};">
                            ${material}：${materialCount}/${amount}
                        </div>`;
    }
    
    // 计算背包材料可制作的最大合金数量
    let maxCraftable = Infinity;
    for (const [material, amount] of Object.entries(alloyData.materials)) {
        const materialCount = getItemCount(material);
        const craftable = Math.floor(materialCount / amount);
        maxCraftable = Math.min(maxCraftable, craftable);
    }
    maxCraftable = Math.max(0, maxCraftable);
    
    // 检查配方解锁条件
    const progress = getRecipeUnlockProgress(alloyData);
    const unlockCondition = getRecipeUnlockConditionDescription(alloyData);
    
    // 获取合金所需温度
    const requiredTemperature = alloyData.temperature || 0;
    
    // 构建配方解锁信息
    let unlockHTML = '';
    if (!progress.unlocked) {
        unlockHTML = `
            <div class="recipe-unlock-info" style="margin-top: 10px; padding: 10px; background-color: #fff3e0; border: 1px solid #ffcc80; border-radius: 5px;">
                <div class="recipe-unlock-condition">解锁条件：${unlockCondition}</div>
                <div class="recipe-unlock-progress">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>解锁进度</span>
                        <span>${progress.progress}/${progress.total}</span>
                    </div>
                    <div style="width: 100%; height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${(progress.progress / progress.total) * 100}%; height: 100%; background-color: #ff9800; border-radius: 4px;"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 获取合金所需时间
    const craftingTime = alloyData.time || 0;
    
    const alloyInfoHTML = `
        <div class="alloy-name">${selectedAlloy}</div>
        <div class="alloy-materials-section" style="margin-top: 10px;">
            <h4>所需材料</h4>
            ${materialsHTML}
        </div>
        <div class="alloy-requirements" style="margin-top: 10px;">
            <h4>制作要求</h4>
            <div class="alloy-level">需要等级：${requiredLevel}</div>
            <div class="alloy-temperature">需要温度：${requiredTemperature}℃</div>
            <div class="alloy-time">所需时间：${craftingTime}秒</div>
            <div class="alloy-craftable">可制作数量：${maxCraftable}</div>
        </div>
        <div class="alloy-description" style="margin-top: 10px;">${alloyData.description}</div>
        ${unlockHTML}
    `;
    
    alloyInfoBody.innerHTML = alloyInfoHTML;
}

function smeltStone(amount = 1) {
    if (!gameData.furnace.crafted) {
        alert('请先制作熔炉！');
        return;
    }
    
    const smeltRecipeSelect = document.getElementById('smelt-recipe');
    if (!smeltRecipeSelect) {
        alert('无法获取配方选择！');
        return;
    }
    
    const selectedRecipe = smeltRecipeSelect.value;
    
    if (selectedRecipe === '石灰') {
        // 制作石灰
        const furnaceLevel = gameData.furnace.level;
        let stoneCost = 10 * amount;
        let limeOutput = 1 * amount;
    
    // 1. 先检查材料是否足够（不实际消耗）
    if (!hasEnoughItem('石矿', stoneCost)) {
        alert(`材料不足！需要石矿${stoneCost}`);
        return;
    }
    
    // 2. 检查背包空间是否足够
    const itemEntries = Object.entries(gameData.backpack.items);
    let hasSpace = false;
    for (const [name, count] of itemEntries) {
        const baseName = name.split('_')[0];
        if (baseName === '石灰' && count < gameData.backpack.currentStackSize) {
            hasSpace = true;
            break;
        }
    }
    if (!hasSpace && itemEntries.length < gameData.backpack.capacity) {
        hasSpace = true;
    }
    if (!hasSpace) {
        alert('背包已满，无法融石！');
        return;
    }
    
    // 3. 所有检查通过后，才消耗材料
    if (!consumeItem('石矿', stoneCost)) {
        alert(`材料不足！需要石矿${stoneCost}`);
        return;
    }
    
    for (let i = 0; i < limeOutput; i++) {
        addToBackpack('石灰');
    }
    
    let message = `制作成功！获得石灰*${limeOutput}！`;
    
    addMessage(message);
    } else if (selectedRecipe === '煤炭') {
        // 制作煤炭
        const coalOreCost = 1 * amount;
        const coalOutput = 2 * amount;
        
        // 1. 先检查材料是否足够（不实际消耗）
        if (!hasEnoughItem('煤矿', coalOreCost)) {
            alert(`材料不足！需要煤矿${coalOreCost}`);
            return;
        }
        
        // 2. 检查背包空间是否足够
        const itemEntries = Object.entries(gameData.backpack.items);
        let hasSpace = false;
        for (const [name, count] of itemEntries) {
            const baseName = name.split('_')[0];
            if (baseName === '煤炭' && count < gameData.backpack.currentStackSize) {
                hasSpace = true;
                break;
            }
        }
        if (!hasSpace && itemEntries.length < gameData.backpack.capacity) {
            hasSpace = true;
        }
        if (!hasSpace) {
            alert('背包已满，无法制作煤炭！');
            return;
        }
        
        // 3. 所有检查通过后，才消耗材料
        if (!consumeItem('煤矿', coalOreCost)) {
            alert(`材料不足！需要煤矿${coalOreCost}`);
            return;
        }
        
        for (let i = 0; i < coalOutput; i++) {
            addToBackpack('煤炭');
        }
        
        let message = `制作成功！获得煤炭*${coalOutput}！`;
        addMessage(message);
    } else if (selectedRecipe === '银质粉末') {
        // 制作银质粉末
        const silverOreCost = 10 * amount;
        const silverPowderOutput = 1 * amount;
        
        // 1. 先检查材料是否足够（不实际消耗）
        if (!hasEnoughItem('银矿', silverOreCost)) {
            alert(`材料不足！需要银矿${silverOreCost}`);
            return;
        }
        
        // 2. 检查背包空间是否足够
        const itemEntries = Object.entries(gameData.backpack.items);
        let hasSpace = false;
        for (const [name, count] of itemEntries) {
            const baseName = name.split('_')[0];
            if (baseName === '银质粉末' && count < gameData.backpack.currentStackSize) {
                hasSpace = true;
                break;
            }
        }
        if (!hasSpace && itemEntries.length < gameData.backpack.capacity) {
            hasSpace = true;
        }
        if (!hasSpace) {
            alert('背包已满，无法制作银质粉末！');
            return;
        }
        
        // 3. 所有检查通过后，才消耗材料
        if (!consumeItem('银矿', silverOreCost)) {
            alert(`材料不足！需要银矿${silverOreCost}`);
            return;
        }
        
        for (let i = 0; i < silverPowderOutput; i++) {
            addToBackpack('银质粉末');
        }
        
        let message = `制作成功！获得银质粉末*${silverPowderOutput}！`;
        addMessage(message);
    } else if (selectedRecipe === '白金粉末') {
        // 制作白金粉末
        const platinumOreCost = 10 * amount;
        const platinumPowderOutput = 1 * amount;
        
        // 1. 先检查材料是否足够（不实际消耗）
        if (!hasEnoughItem('白金矿', platinumOreCost)) {
            alert(`材料不足！需要白金矿${platinumOreCost}`);
            return;
        }
        
        // 2. 检查背包空间是否足够
        const itemEntries = Object.entries(gameData.backpack.items);
        let hasSpace = false;
        for (const [name, count] of itemEntries) {
            const baseName = name.split('_')[0];
            if (baseName === '白金粉末' && count < gameData.backpack.currentStackSize) {
                hasSpace = true;
                break;
            }
        }
        if (!hasSpace && itemEntries.length < gameData.backpack.capacity) {
            hasSpace = true;
        }
        if (!hasSpace) {
            alert('背包已满，无法制作白金粉末！');
            return;
        }
        
        // 3. 所有检查通过后，才消耗材料
        if (!consumeItem('白金矿', platinumOreCost)) {
            alert(`材料不足！需要白金矿${platinumOreCost}`);
            return;
        }
        
        for (let i = 0; i < platinumPowderOutput; i++) {
            addToBackpack('白金粉末');
        }
        
        let message = `制作成功！获得白金粉末*${platinumPowderOutput}！`;
        addMessage(message);
    }
    
    updateBackpackDisplay();
    updateFurnaceUI();
    updateMessages();
    saveGame();
}

// 制作指定类型的合金
function makeAlloy(alloyName, amount = 1, position = 1) {
    if (!gameData.furnace.crafted) {
        alert('请先制作熔炉！');
        return;
    }
    
    // 检查是否获得了配方
    if (!hasAlloyRecipe(alloyName)) {
        alert('你还没有获得这个合金的配方！');
        return;
    }
    
    // 检查温度是否足够
    const alloyData = alloyRecipes[alloyName];
    if (alloyData && alloyData.temperature) {
        if (gameData.furnace.fuel.temperature < alloyData.temperature) {
            alert(`熔炉温度不足！需要${alloyData.temperature}℃，当前只有${gameData.furnace.fuel.temperature}℃。请添加燃料提升温度！`);
            return;
        }
    }
    
    const requiredLevel = getRequiredLevelForAlloy(alloyName);
    if (gameData.player.level < requiredLevel) {
        alert(`等级不足！需要${requiredLevel}级才能制作${alloyName}`);
        return;
    }
    
    if (!alloyData) {
        alert('无效的合金类型！');
        return;
    }
    
    // 检查材料是否足够
    for (const [material, materialAmount] of Object.entries(alloyData.materials)) {
        const totalAmount = materialAmount * amount;
        if (!hasAlloyRecipe(alloyName)) {
            alert('你还没有获得这个合金的配方！');
            return;
        }
        if (!hasEnoughItem(material, totalAmount)) {
            alert(`材料不足！需要${material}${totalAmount}`);
            return;
        }
    }
    
    // 消耗材料
    for (const [material, materialAmount] of Object.entries(alloyData.materials)) {
        const totalAmount = materialAmount * amount;
        consumeItem(material, totalAmount);
    }
    
    // 获取炼制时间，默认为1秒
    // 单个合金的制作时间
    const baseCraftingTime = alloyData.time || 1;
    // 总制作时间 = 单个时间 * 数量
    const craftingTime = baseCraftingTime * amount;
    
    // 计算合金经验值：两个材料的经验总和再加上150%，乘以制作数量
    let totalExp = 0;
    for (const [material, materialAmount] of Object.entries(alloyData.materials)) {
        const mineral = minerals.find(m => m.name === material);
        if (mineral) {
            totalExp += mineral.exp * materialAmount;
        }
    }
    // 加上150%的加成
    const baseAlloyExp = Math.floor(totalExp * 2.5); // 100% + 150% = 250%
    const totalAlloyExp = baseAlloyExp * amount;
    
    // 应用金手套经验加成
    const alloyExpWithBonus = applyGoldenGloveExpBonus(totalAlloyExp);
    
    // 确保合金位置存在
    if (!gameData.furnace.alloyPositions[position]) {
        gameData.furnace.alloyPositions[position] = {
            crafting: {
                inProgress: false,
                type: null,
                recipe: null,
                amount: 1,
                totalTime: 0,
                remainingTime: 0,
                timer: null,
                extraData: null
            },
            autoCraft: {
                enabled: false,
                recipe: null,
                amount: 1,
                total: 0,
                made: 0
            }
        };
    }
    
    // 检查该位置是否已经在进行制作
    const positionCrafting = gameData.furnace.alloyPositions[position].crafting;
    if (positionCrafting.inProgress) {
        alert(`位置${position}已被占用，请选择其他合金位置！`);
        return;
    }
    
    // 保存炼制相关数据到特定位置
    positionCrafting.inProgress = true;
    positionCrafting.type = 'alloy';
    positionCrafting.recipe = alloyName;
    positionCrafting.amount = amount;
    positionCrafting.totalTime = craftingTime;
    positionCrafting.remainingTime = craftingTime;
    
    // 保存额外数据，用于炼制完成时使用
    positionCrafting.extraData = {
        alloyExpWithBonus: alloyExpWithBonus,
        position: position
    };
    
    // 开始炼制进度定时器
    startCraftingTimer(position);
    
    // 生成消耗材料的消息
    let consumeMessage = '';
    for (const [material, materialAmount] of Object.entries(alloyData.materials)) {
        consumeMessage += `${material}-${materialAmount * amount}, `;
    }
    consumeMessage = consumeMessage.slice(0, -2);
    
    addMessage(`开始制作${alloyName}，需要${craftingTime}秒...`);
    
    updateFurnaceUI();
    saveGame();
}

// 开始炼制进度定时器
function startCraftingTimer(position = null) {
    // 如果没有指定位置，处理全局熔炼
    if (position === null) {
        // 确保crafting对象存在
        if (!gameData.furnace.crafting) {
            gameData.furnace.crafting = {
                inProgress: false,
                type: null,
                recipe: null,
                amount: 1,
                totalTime: 0,
                remainingTime: 0,
                timer: null,
                extraData: null
            };
            return;
        }
        
        // 清除现有的定时器（如果存在）
        if (gameData.furnace.crafting.timer) {
            clearInterval(gameData.furnace.crafting.timer);
        }
        
        // 设置新的定时器，每秒更新一次进度
        gameData.furnace.crafting.timer = setInterval(() => {
            // 确保crafting对象在定时器回调中仍然存在
            if (!gameData.furnace.crafting) {
                clearInterval(gameData.furnace.crafting.timer);
                return;
            }
            
            // 更新剩余时间
            gameData.furnace.crafting.remainingTime -= 1;
            
            // 检查炼制是否完成
            if (gameData.furnace.crafting.remainingTime <= 0) {
                completeCrafting();
            } else {
                // 更新UI显示
                updateFurnaceUI();
            }
        }, 1000);
    } else {
        // 处理特定位置的合金制作
        const positionData = gameData.furnace.alloyPositions[position];
        if (!positionData || !positionData.crafting) {
            return;
        }
        
        const crafting = positionData.crafting;
        
        // 清除现有的定时器（如果存在）
        if (crafting.timer) {
            clearInterval(crafting.timer);
        }
        
        // 设置新的定时器，每秒更新一次进度
        crafting.timer = setInterval(() => {
            // 确保crafting对象在定时器回调中仍然存在且正在进行
            if (!positionData.crafting || !positionData.crafting.inProgress) {
                clearInterval(crafting.timer);
                crafting.timer = null;
                return;
            }
            
            // 获取当前合金所需温度
            const alloyName = positionData.crafting.recipe;
            const alloyData = alloyRecipes[alloyName];
            const requiredTemperature = alloyData.temperature || 0;
            const currentTemperature = gameData.furnace.fuel.temperature;
            
            // 只有当温度足够时，才更新剩余时间（继续制作）
            if (currentTemperature >= requiredTemperature) {
                // 更新剩余时间
                positionData.crafting.remainingTime -= 1;
                
                // 检查炼制是否完成
                if (positionData.crafting.remainingTime <= 0) {
                    completeCrafting(position);
                }
            }
            
            // 更新UI显示，无论是否暂停
            updateFurnaceUI();
        }, 1000);
    }
}

// 完成炼制
function completeCrafting(position = null) {
    let craftingData, alloyName, amount, extraData, alloyData;
    
    // 如果指定了位置，处理该位置的合金制作完成
    if (position !== null) {
        const positionData = gameData.furnace.alloyPositions[position];
        if (!positionData || !positionData.crafting || !positionData.crafting.inProgress) {
            return;
        }
        
        // 清除定时器
        if (positionData.crafting.timer) {
            clearInterval(positionData.crafting.timer);
            positionData.crafting.timer = null;
        }
        
        craftingData = positionData.crafting;
        alloyName = craftingData.recipe;
        amount = craftingData.amount;
        extraData = craftingData.extraData;
        alloyData = alloyRecipes[alloyName];
        
        if (!alloyData) {
            // 重置该位置的炼制状态
            positionData.crafting.inProgress = false;
            positionData.crafting.type = null;
            positionData.crafting.recipe = null;
            positionData.crafting.amount = 1;
            positionData.crafting.totalTime = 0;
            positionData.crafting.remainingTime = 0;
            positionData.crafting.extraData = null;
            return;
        }
    } else {
        // 处理全局熔炼完成
        // 确保crafting对象存在
        if (!gameData.furnace.crafting) {
            gameData.furnace.crafting = {
                inProgress: false,
                type: null,
                recipe: null,
                amount: 1,
                totalTime: 0,
                remainingTime: 0,
                timer: null,
                extraData: null
            };
            return;
        }
        
        // 清除定时器
        if (gameData.furnace.crafting.timer) {
            clearInterval(gameData.furnace.crafting.timer);
            gameData.furnace.crafting.timer = null;
        }
        
        if (!gameData.furnace.crafting.inProgress) {
            return;
        }
        
        craftingData = gameData.furnace.crafting;
        alloyName = craftingData.recipe;
        amount = craftingData.amount;
        extraData = craftingData.extraData;
        alloyData = alloyRecipes[alloyName];
        
        if (!alloyData) {
            // 重置炼制状态
            gameData.furnace.crafting.inProgress = false;
            gameData.furnace.crafting.type = null;
            gameData.furnace.crafting.recipe = null;
            gameData.furnace.crafting.amount = 1;
            gameData.furnace.crafting.totalTime = 0;
            gameData.furnace.crafting.remainingTime = 0;
            gameData.furnace.crafting.extraData = null;
            return;
        }
    }
    
    // 给玩家和工具添加经验
    gameData.player.exp += extraData.alloyExpWithBonus;
    // 检查并处理经验值溢出
    checkLevelUp();
    
    // 只有当工具经验值未满时才添加经验值
    let pickaxeGainedExp = 0;
    if (gameData.tools.pickaxe.level < 50) {
        const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
        if (gameData.tools.pickaxe.exp < pickaxeNextExp) {
            gameData.tools.pickaxe.exp += extraData.alloyExpWithBonus;
            pickaxeGainedExp = extraData.alloyExpWithBonus;
        }
    }
    
    let cartGainedExp = 0;
    if (gameData.tools.cart.crafted && gameData.tools.cart.level < 50) {
        const cartNextExp = gameData.tools.cart.nextExp || 50;
        if (gameData.tools.cart.exp < cartNextExp) {
            gameData.tools.cart.exp += extraData.alloyExpWithBonus;
            cartGainedExp = extraData.alloyExpWithBonus;
        }
    }
    
    let headlightGainedExp = 0;
    if (gameData.tools.headlight.crafted && gameData.tools.headlight.level < 50) {
        const headlightNextExp = gameData.tools.headlight.nextExp || 50;
        if (gameData.tools.headlight.exp < headlightNextExp) {
            gameData.tools.headlight.exp += extraData.alloyExpWithBonus;
            headlightGainedExp = extraData.alloyExpWithBonus;
        }
    }
    addGainedExp(extraData.alloyExpWithBonus);
    checkLevelUp();
    
    // 制作合金
    for (let i = 0; i < amount; i++) {
        addToBackpack(alloyName);
    }
    
    // 如果配方尚未解锁，使用配方物品进行解锁
    if (!gameData.unlockedRecipes[alloyName]) {
        unlockAlloyRecipe(alloyName);
    }
    
    // 合金制作产生渣类：从材料中提取金属成分，固定获得对应渣类
    const metalMaterials = ['铜矿', '铁矿', '银矿', '金矿', '白金矿'];
    for (const [material, materialAmount] of Object.entries(alloyData.materials)) {
        if (metalMaterials.includes(material)) {
            // 使用简化的渣类名称（去掉"矿"字）
            const residue = material.replace('矿', '') + '渣';
            // 每个金属材料固定产生1-3个渣类
            const residueAmount = Math.floor(Math.random() * 3) + 1;
            addToBackpack(residue, residueAmount);
            addMessage(`合金制作获得：${residue} × ${residueAmount}`);
        }
    }
    
    // 生成消耗材料的消息
    let consumeMessage = '';
    for (const [material, materialAmount] of Object.entries(alloyData.materials)) {
        consumeMessage += `${material}-${materialAmount * amount}, `;
    }
    consumeMessage = consumeMessage.slice(0, -2);
    
    // 生成工具经验消息
    let toolExpMessage = '';
    const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
    if (gameData.tools.pickaxe.exp < pickaxeNextExp && gameData.tools.pickaxe.level < 50) {
        toolExpMessage += `采矿锄经验*${extraData.alloyExpWithBonus}, `;
    }
    
    if (gameData.tools.cart && gameData.tools.cart.crafted) {
        const cartNextExp = gameData.tools.cart.nextExp || 50;
        if (gameData.tools.cart.exp < cartNextExp && gameData.tools.cart.level < 50) {
            toolExpMessage += `矿车经验*${extraData.alloyExpWithBonus}, `;
        }
    }
    
    if (gameData.tools.headlight && gameData.tools.headlight.crafted) {
        const headlightNextExp = gameData.tools.headlight.nextExp || 50;
        if (gameData.tools.headlight.exp < headlightNextExp && gameData.tools.headlight.level < 50) {
            toolExpMessage += `头灯经验*${extraData.alloyExpWithBonus}, `;
        }
    }
    
    toolExpMessage = toolExpMessage.slice(0, -2);
    
    // 生成完整消息
    let fullMessage = `合金制作成功！获得${alloyName}×${amount}，${consumeMessage}`;
    if (toolExpMessage) {
        fullMessage += `，${toolExpMessage}`;
    }
    fullMessage += `，经验*${extraData.alloyExpWithBonus}！`;
    
    addMessage(fullMessage);
    
    // 重置炼制状态
    if (position !== null) {
        // 重置特定位置的炼制状态
        const positionData = gameData.furnace.alloyPositions[position];
        positionData.crafting.inProgress = false;
        positionData.crafting.type = null;
        positionData.crafting.recipe = null;
        positionData.crafting.amount = 1;
        positionData.crafting.totalTime = 0;
        positionData.crafting.remainingTime = 0;
        positionData.crafting.extraData = null;
        
        // 检查该位置的自动制作是否需要继续
        if (positionData.autoCraft.enabled) {
            executeAutoCraft(position);
        }
    } else {
        // 重置全局炼制状态
        gameData.furnace.crafting.inProgress = false;
        gameData.furnace.crafting.type = null;
        gameData.furnace.crafting.recipe = null;
        gameData.furnace.crafting.amount = 1;
        gameData.furnace.crafting.totalTime = 0;
        gameData.furnace.crafting.remainingTime = 0;
        gameData.furnace.crafting.extraData = null;
    }
    
    updateBackpackDisplay();
    updateFurnaceUI();
    updateMessages();
    updateUI(); // 更新UI以显示经验值变化
    saveGame();
}

function getFuelReduction(level) {
    if (level === 2) return 10;
    if (level === 3) return 15;
    if (level === 4) return 25;
    if (level === 5) return 45;
    return 0;
}

function getBurnTimeIncrease(level) {
    if (level === 3) return 30;
    if (level === 4) return 50;
    if (level === 5) return 100;
    return 0;
}

// 熔炉配方全局变量
let smeltRecipes = [];
let alloyRecipes = {};

// 加载熔炉配方
function loadFurnaceRecipes() {
    // 直接使用默认配方，避免CORS错误
    useDefaultFurnaceRecipes();
    
    // 更新UI
    updateFurnaceUI();
    
    // 检查并自动解锁满足条件的配方
    checkAndUnlockAllRecipes();
    
    console.log('Furnace recipes loaded successfully (using default recipes)');
}

// 使用默认配方
function useDefaultFurnaceRecipes() {
    console.log('Using default furnace recipes');
    
    // 默认融石配方
    smeltRecipes = [
        {
            "id": "lime",
            "name": "石灰",
            "input": {"石矿": 10},
            "output": {"石灰": 1},
            "fuelCost": 10,
            "minLevel": 0,
            "unlockCondition": {"type": "level", "value": 0},
            "description": "将石矿熔炼成石灰"
        },
        {
            "id": "coal",
            "name": "煤炭",
            "input": {"煤矿": 1},
            "output": {"煤炭": 2},
            "fuelCost": 5,
            "minLevel": 0,
            "unlockCondition": {"type": "level", "value": 0},
            "description": "将煤矿提炼成煤炭"
        },
        {
            "id": "silverPowder",
            "name": "银质粉末",
            "input": {"银矿": 10},
            "output": {"银质粉末": 1},
            "fuelCost": 10,
            "minLevel": 15,
            "unlockCondition": {"type": "level", "value": 15},
            "description": "将银矿研磨成银质粉末"
        },
        {
            "id": "platinumPowder",
            "name": "白金粉末",
            "input": {"白金矿": 10},
            "output": {"白金粉末": 1},
            "fuelCost": 10,
            "minLevel": 30,
            "unlockCondition": {"type": "level", "value": 30},
            "description": "将白金矿研磨成白金粉末"
        }
    ];
    
    // 默认合金配方
    alloyRecipes = {
        '铝矿': {
            materials: { '钴矿': 2, '镍矿': 2, '铜矿': 1 },
            description: '用于制作磁铁的特殊矿物',
            time: 3, // 炼制时间：3秒
            temperature: 150 // 需要温度：150℃
        },
        '铜铁合金': {
            materials: { '铜矿': 2, '铁矿': 2 },
            description: '用于熔炉升级和高级工具制作',
            unlockCondition: { type: 'level', value: 10 },
            time: 5, // 炼制时间：5秒
            temperature: 150 // 需要温度：150℃
        },
        '铜钴合金': {
            materials: { '铜矿': 2, '钴矿': 2 },
            description: '用于高级熔炉升级',
            unlockCondition: { type: 'level', value: 20 },
            time: 8, // 炼制时间：8秒
            temperature: 300 // 需要温度：300℃
        },
        '铜镍合金': {
            materials: { '铜矿': 2, '镍矿': 2 },
            description: '用于顶级熔炉升级',
            unlockCondition: { type: 'level', value: 30 },
            time: 12, // 炼制时间：12秒
            temperature: 300 // 需要温度：300℃
        },
        '铜银合金': {
            materials: { '铜矿': 2, '银矿': 2 },
            description: '用于终极熔炉升级',
            unlockCondition: { type: 'level', value: 40 },
            time: 15, // 炼制时间：15秒
            temperature: 500 // 需要温度：500℃
        },
        '金砖': {
            materials: { '金矿': 10 },
            description: '用于徽章升级的高级材料',
            unlockCondition: { type: 'level', value: 45 },
            time: 20, // 炼制时间：20秒
            temperature: 500 // 需要温度：500℃
        }
    };
    
    // 更新UI
    updateFurnaceUI();
}

// 检查玩家是否可以解锁配方
function canUnlockRecipe(recipe) {
    if (!recipe.unlockCondition) {
        return true;
    }
    
    const condition = recipe.unlockCondition;
    
    switch (condition.type) {
        case 'level':
            return gameData.player.level >= condition.value;
        case 'item':
            return hasEnoughItem(condition.item, condition.amount || 1);
        case 'recipe':
            return hasAlloyRecipe(condition.recipe);
        default:
            return true;
    }
}

// 获取配方解锁进度
function getRecipeUnlockProgress(recipe) {
    if (!recipe.unlockCondition) {
        return { progress: 1, total: 1, unlocked: true };
    }
    
    const condition = recipe.unlockCondition;
    
    switch (condition.type) {
        case 'level':
            return {
                progress: gameData.player.level,
                total: condition.value,
                unlocked: gameData.player.level >= condition.value
            };
        case 'item':
            const currentAmount = gameData.backpack.items[condition.item] || 0;
            return {
                progress: currentAmount,
                total: condition.amount || 1,
                unlocked: currentAmount >= (condition.amount || 1)
            };
        default:
            return { progress: 1, total: 1, unlocked: true };
    }
}

// 获取配方解锁条件描述
function getRecipeUnlockConditionDescription(recipe) {
    if (!recipe.unlockCondition) {
        return '无解锁条件';
    }
    
    const condition = recipe.unlockCondition;
    
    switch (condition.type) {
        case 'level':
            return `玩家等级达到 ${condition.value} 级`;
        case 'item':
            return `拥有 ${condition.item} × ${condition.amount || 1}`;
        case 'recipe':
            return `已解锁 ${condition.recipe} 配方`;
        default:
            return '未知解锁条件';
    }
}

// 检查玩家是否拥有指定合金的配方
function hasAlloyRecipe(alloyName) {
    // 金砖不需要配方，直接可以制作
    if (alloyName === '金砖') {
        return true;
    }
    
    // 检查是否已解锁该配方
    if (gameData.unlockedRecipes[alloyName]) {
        return true;
    }
    
    // 检查背包中是否有对应的配方物品
    for (const itemName of Object.keys(gameData.backpack.items)) {
        const baseItemName = itemName.split('_')[0];
        if (baseItemName === `${alloyName}配方`) {
            return true;
        }
    }
    
    // 检查配方是否满足解锁条件
    const alloyData = alloyRecipes[alloyName];
    if (alloyData && canUnlockRecipe(alloyData)) {
        return true;
    }
    
    return false;
}

// 移除了融石自动制作系统核心函数

// 解锁配方（使用配方物品）
function unlockAlloyRecipe(alloyName) {
    // 找到并消耗一个配方物品
    for (const itemName of Object.keys(gameData.backpack.items)) {
        const baseItemName = itemName.split('_')[0];
        if (baseItemName === `${alloyName}配方`) {
            gameData.backpack.items[itemName]--;
            if (gameData.backpack.items[itemName] <= 0) {
                delete gameData.backpack.items[itemName];
            }
            // 解锁配方
            gameData.unlockedRecipes[alloyName] = true;
            addMessage(`成功解锁${alloyName}配方！现在可以无限制作该合金了！`);
            return true;
        }
    }
    return false;
}

// 检查并自动解锁所有满足条件的配方
function checkAndUnlockAllRecipes() {
    let unlockedAny = false;
    
    // 检查融石配方
    smeltRecipes.forEach(recipe => {
        if (canUnlockRecipe(recipe) && !gameData.unlockedRecipes[recipe.id]) {
            gameData.unlockedRecipes[recipe.id] = true;
            addMessage(`恭喜！已自动解锁融石配方：${recipe.name}！`);
            unlockedAny = true;
        }
    });
    
    // 检查合金配方
    for (const [alloyName, alloyData] of Object.entries(alloyRecipes)) {
        if (canUnlockRecipe(alloyData) && !gameData.unlockedRecipes[alloyName]) {
            gameData.unlockedRecipes[alloyName] = true;
            addMessage(`恭喜！已自动解锁合金配方：${alloyName}！`);
            unlockedAny = true;
        }
    }
    
    // 如果有配方被解锁，更新UI
    if (unlockedAny) {
        updateFurnaceUI();
    }
    
    return unlockedAny;
}

function openAlloyCraftPanel() {
    let panelHTML = '<h3>制作合金</h3><div class="alloy-craft-list">';
    
    // 检查是否有任何配方
    let hasRecipes = false;
    
    for (const [alloy, data] of Object.entries(alloyRecipes)) {
        // 只显示玩家已获得配方的合金
        if (hasAlloyRecipe(alloy)) {
            hasRecipes = true;
            let materialsText = '';
            for (const [material, amount] of Object.entries(data.materials)) {
                materialsText += `${material}×${amount} `;
            }
            let sourceText = '';
            let levelText = '';
            const requiredLevel = getRequiredLevelForAlloy(alloy);
            switch (alloy) {
                case '铝矿':
                    sourceText = '配方出处：任务获得';
                    levelText = `需要等级：${requiredLevel}`;
                    break;
                case '铜铁合金':
                    sourceText = '配方出处：挖铁矿随机获得';
                    levelText = `需要等级：${requiredLevel}`;
                    break;
                case '铜钴合金':
                    sourceText = '配方出处：挖钴矿随机获得';
                    levelText = `需要等级：${requiredLevel}`;
                    break;
                case '铜镍合金':
                    sourceText = '配方出处：挖镍矿随机获得';
                    levelText = `需要等级：${requiredLevel}`;
                    break;
                case '铜银合金':
                    sourceText = '配方出处：挖银矿随机获得';
                    levelText = `需要等级：${requiredLevel}`;
                    break;
                case '金砖':
                    sourceText = '配方出处：挖金矿随机获得';
                    levelText = `需要等级：${requiredLevel}`;
                    break;
            }
            panelHTML += `
                <div class="alloy-craft-item">
                    <h4>${alloy}</h4>
                    <p>${data.description}</p>
                    <p>材料：${materialsText}</p>
                    <p class="level-info">${levelText}</p>
                    <p class="source-info">${sourceText}</p>
                    <button onclick="craftAlloy('${alloy}')">制作</button>
                </div>
            `;
        }
    }
    
    // 如果没有配方，显示提示信息
    if (!hasRecipes) {
        panelHTML += '<div class="no-recipes">' +
            '<p>你还没有获得任何合金配方！</p>' +
            '<p>挖铁矿有几率获得铜铁合金配方，挖钴矿有几率获得铜钴合金配方，以此类推。</p>' +
            '</div>';
    }
    
    panelHTML += '</div>';
    let panel = document.getElementById('alloy-craft-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'alloy-craft-panel';
        panel.className = 'alloy-craft-panel';
        document.querySelector('.furnace').appendChild(panel);
    }
    panel.innerHTML = panelHTML;
    panel.style.display = 'block';
}

function craftAlloy(alloyName) {
    // 直接调用makeAlloy函数，使用默认位置1
    makeAlloy(alloyName, 1, 1);
}

function getRequiredLevelForAlloy(alloyName) {
    // 合金制作的等级限制降低至10级，与头灯的解锁等级一致
    // 同时与所需最低等级矿物的解锁等级保持一致
    const levelRequirements = {
        '铜铁合金': 10,  // 铁的解锁等级是10级
        '铜钴合金': 15,  // 铜的解锁等级是15级
        '铜镍合金': 15,  // 铜的解锁等级是15级
        '铜银合金': 15   // 铜的解锁等级是15级
    };
    return levelRequirements[alloyName] || 10;
}

function saveGame() {
    localStorage.setItem(`miningGame-${currentSaveSlot}`, JSON.stringify(gameData));
}

function loadGame() {
    const savedData = localStorage.getItem(`miningGame-${currentSaveSlot}`);
    if (savedData) {
        try {
            gameData = JSON.parse(savedData);
            ensureGameDataIntegrity();
        } catch (error) {
            console.error('从本地存储加载游戏失败:', error);
            initDefaultGameData();
        }
    } else {
        initDefaultGameData();
    }
    
    // 确保商店数据完整性
    if (!gameData.shop.lastRefresh) {
        gameData.shop.lastRefresh = Date.now();
    }
    if (!gameData.shop.items) {
        gameData.shop.items = [];
    }
    
    // 强制修复关键属性
    console.log('加载前 - 加工台状态:', gameData.workshop.unlocked);
    console.log('加载前 - 商店状态:', gameData.shop.unlocked);
    
    // 强制修复加工台状态
    if (gameData.workshop.unlocked !== true && gameData.workshop.unlocked !== false) {
        gameData.workshop.unlocked = false;
    }
    
    // 检查加工台是否需要升级，确保电池系统正确更新
    checkWorkshopUpgrade();
    
    // 强制修复商店状态
    if (gameData.shop.unlocked !== true && gameData.shop.unlocked !== false) {
        gameData.shop.unlocked = false;
    }
    
    // 强制修复商店等级
    if (gameData.shop.level === undefined) {
        gameData.shop.level = 0;
    }
    
    console.log('加载后 - 加工台状态:', gameData.workshop.unlocked);
    console.log('加载后 - 商店状态:', gameData.shop.unlocked);
    
    calculateBackpackStats();
    generateBackpack();
    generateExpansionSlots();
    updateBackpackDisplay();
    updateTempBackpackDisplay();
    
    // 立即检查和更新所有UI
    updateWorkshopUI();
    checkShopUnlock();
    updateShopUI();
    updateUI();
    
    // 延迟检查商店解锁状态，确保所有数据都已初始化完成
    setTimeout(() => {
        // 检查商店解锁状态
        checkShopUnlock();
        // 只有当商店已解锁但完全没有物品时，才刷新物品
        // 避免每次页面加载都刷新商店
        // 确保不会因为空数组而导致的刷新
        if (gameData.shop.unlocked && gameData.shop.items.length === 0 && (!gameData.shop.lastRefresh || Date.now() - gameData.shop.lastRefresh > 300000)) {
            // 延迟刷新，确保其他初始化完成后再刷新
            // 使用较长的延迟，避免与其他刷新冲突
            setTimeout(() => {
                // 再次检查，确保没有其他地方已经刷新了物品
                if (gameData.shop.unlocked && gameData.shop.items.length === 0 && (!gameData.shop.lastRefresh || Date.now() - gameData.shop.lastRefresh > 300000)) {
                    refreshShopItems();
                }
            }, 2000);
        } else if (gameData.shop.unlocked && gameData.shop.items.length > 0) {
            // 商店已解锁且有物品，直接渲染，不刷新
            renderShopItems();
        }
    }, 500);
}

function ensureGameDataIntegrity() {
    if (!gameData.gainedInfo) {
        gameData.gainedInfo = {
            exp: 0,
            gold: 0,
            minerals: 0,
            cloth: 0
        };
    }
    if (!gameData.messages) {
        gameData.messages = [];
    }
    // 确保玩家数据完整
    if (!gameData.player) {
        gameData.player = {
            level: 1,
            exp: 0,
            nextExp: 100,
            gold: 0
        };
    } else {
        // 确保玩家等级、经验和金币字段存在
        if (gameData.player.level === undefined || gameData.player.level === null) {
            gameData.player.level = 1;
        }
        if (gameData.player.exp === undefined || gameData.player.exp === null) {
            gameData.player.exp = 0;
        }
        if (gameData.player.nextExp === undefined || gameData.player.nextExp === null) {
            gameData.player.nextExp = 100;
        }
        if (gameData.player.gold === undefined || gameData.player.gold === null || isNaN(gameData.player.gold)) {
            gameData.player.gold = 0;
        }
        
        // 处理经验值超过升级阈值的情况
        let originalLevel = gameData.player.level;
        while (gameData.player.exp >= gameData.player.nextExp) {
            gameData.player.exp -= gameData.player.nextExp;
            gameData.player.level++;
            gameData.player.nextExp = Math.floor(gameData.player.nextExp * 1.5);
        }
        
        // 如果等级有变化，将修复后的数据保存到本地存储
        if (originalLevel !== gameData.player.level) {
            localStorage.setItem(`miningGame-${currentSaveSlot}`, JSON.stringify(gameData));
        }
    }
    // 确保插片制作系统数据存在，兼容旧存档
    if (!gameData.slotCrafting) {
        gameData.slotCrafting = {
            level: 1,
            exp: 0,
            maxExp: 400,
            itemsCrafted: 0,
            maxLevel: 6
        };
    }
    if (!gameData.tools) {
        gameData.tools = {
            pickaxe: {
                level: 0,
                exp: 0,
                nextExp: 50,
                slots: []
            },
            cart: {
                crafted: false,
                level: 0,
                exp: 0,
                nextExp: 50,
                slots: []
            },
            headlight: {
                crafted: false,
                level: 0,
                exp: 0,
                nextExp: 50,
                slots: []
            }
        };
    } else {
        // 确保采矿锄属性完整
        if (!gameData.tools.pickaxe) {
            gameData.tools.pickaxe = {
                level: 0,
                exp: 0,
                nextExp: 50,
                slots: [null, null, null]
            };
        } else {
            if (gameData.tools.pickaxe.level === undefined) {
                gameData.tools.pickaxe.level = 0;
            }
            if (gameData.tools.pickaxe.exp === undefined) {
                gameData.tools.pickaxe.exp = 0;
            }
            if (gameData.tools.pickaxe.nextExp === undefined) {
                gameData.tools.pickaxe.nextExp = 50;
            }
            if (gameData.tools.pickaxe.slots === undefined) {
                gameData.tools.pickaxe.slots = [null, null, null];
            }
        }
        
        // 确保矿车属性完整
        if (!gameData.tools.cart) {
            gameData.tools.cart = {
                crafted: false,
                level: 0,
                exp: 0,
                nextExp: 50,
                slots: [null, null, null]
            };
        } else {
            if (gameData.tools.cart.crafted === undefined) {
                gameData.tools.cart.crafted = false;
            }
            if (gameData.tools.cart.level === undefined) {
                gameData.tools.cart.level = 0;
            }
            if (gameData.tools.cart.exp === undefined) {
                gameData.tools.cart.exp = 0;
            }
            if (gameData.tools.cart.nextExp === undefined) {
                gameData.tools.cart.nextExp = 50;
            }
            if (gameData.tools.cart.slots === undefined) {
                gameData.tools.cart.slots = [null, null, null];
            }
        }
        
        // 确保头灯属性完整
        if (!gameData.tools.headlight) {
            gameData.tools.headlight = {
                crafted: false,
                level: 0,
                exp: 0,
                nextExp: 50,
                slots: [null, null, null]
            };
        } else {
            if (gameData.tools.headlight.crafted === undefined) {
                gameData.tools.headlight.crafted = false;
            }
            if (gameData.tools.headlight.level === undefined) {
                gameData.tools.headlight.level = 0;
            }
            if (gameData.tools.headlight.exp === undefined) {
                gameData.tools.headlight.exp = 0;
            }
            if (gameData.tools.headlight.nextExp === undefined) {
                gameData.tools.headlight.nextExp = 50;
            }
            if (gameData.tools.headlight.slots === undefined) {
                gameData.tools.headlight.slots = [null, null, null];
            }
        }
    }
    // 确保矿工协会和矿工属性完整
    if (!gameData.minersGuild) {
        gameData.minersGuild = {
            unlocked: false,
            miners: [],
            storage: {},
            autoMining: {
                enabled: false,
                selectedMineral: null,
                interval: 60,
                lastMiningTime: 0
            },
            commissionRate: 0,
            maxMiners: 5,
            badgeSystem: {
                currentLevel: 0,
                maxLevel: 10,
                upgradeMaterials: [
                    { level: 1, materials: { '银质粉末': 100, '磁铁': 100 } },
                    { level: 2, materials: { '银质粉末': 150, '磁铁': 150 } },
                    { level: 3, materials: { '白金粉末': 200, '磁铁': 200 } },
                    { level: 4, materials: { '白金粉末': 250, '磁铁': 250 } },
                    { level: 5, materials: { '白金粉末': 250, '磁铁': 250, '金砖': 20 } },
                    { level: 6, materials: { '金砖': 50, 'pickaxeTicket': 10, 'cartTicket': 10, 'headlightTicket': 10 } },
                    { level: 7, materials: { '金砖': 100, 'pickaxeTicket': 50, 'cartTicket': 50, 'headlightTicket': 50 } },
                    { level: 8, materials: { '水晶簇': 100, 'toolSlot1': 150 } },
                    { level: 9, materials: { '水晶簇': 150, 'toolSlot1': 450 } },
                    { level: 10, materials: { 'forgeDelegate': true, 'magicEquipment': true } }
                ],
                efficiencyBonuses: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
            }
        };
    }
    // 确保金手套属性存在
    if (!gameData.goldenGlove) {
        gameData.goldenGlove = {
            active: false,
            endTime: 0
        };
    }
    // 确保所有矿工都有intimacy属性，并将超过5级的矿工强制降回5级
    if (gameData.minersGuild && gameData.minersGuild.miners) {
        gameData.minersGuild.miners.forEach(miner => {
            if (miner.intimacy === undefined) {
                miner.intimacy = 0;
            }
            
            // 强制将超过5级的矿工降回5级
            if (miner.level > 5) {
                miner.level = 5;
                miner.exp = 0;
                miner.nextExp = Math.floor(miner.nextExp * 1.5);
            }
            
            // 确保技能数组存在
            if (!miner.abilities) {
                miner.abilities = [];
            }
            
            // 转换技能名称为中文
            for (let i = 0; i < miner.abilities.length; i++) {
                switch (miner.abilities[i]) {
                    case 'fastMining':
                        miner.abilities[i] = '快速挖矿';
                        break;
                    case 'doubleDrop':
                        miner.abilities[i] = '双倍掉落';
                        break;
                    case 'expertMiner':
                        miner.abilities[i] = '专家矿工';
                        break;
                }
            }
            
            // 确保效率属性存在
            if (!miner.efficiency) {
                const hasMinerTitle = miner.name.includes('矿工') || miner.name.includes('挖矿者') || miner.name.includes('掘金者') || miner.name.includes('矿夫') || miner.name.includes('矿师') || miner.name.includes('老矿工');
                miner.efficiency = hasMinerTitle ? 1.3 : 1.0;
            }
        });
    }
    // 确保熔炉燃料系统属性存在
    if (!gameData.furnace) {
        gameData.furnace = {
            crafted: false,
            level: 0,
            fuel: {
                // 基本状态
                isBurning: false,
                temperature: 0,
                maxTemperature: 0,
                coolingSpeed: 10,
                
                // 燃料库存 - 按类型存储，每种上限99
                inventory: {
                    '煤矿': 0,
                    '燃料': 0,
                    '超导燃料': 0
                },
                
                // 当前燃烧状态
                burningType: null,
                burningAmount: 0,
                remainingBurnTime: 0,
                totalBurnTime: 0,
                
                // 温度更新定时器
                temperatureTimer: null
            },
            autoCraft: {
                enabled: false,
                type: null,
                recipe: null,
                amount: 1,
                total: 0,
                made: 0,
                interval: 5,
                timer: null
            },
            // 合金位置 - 每个位置独立的制作状态
            alloyPositions: {
                1: {
                    autoCraft: {
                        enabled: false,
                        recipe: null,
                        amount: 1,
                        total: 0,
                        made: 0,
                        interval: 5,
                        timer: null
                    },
                    crafting: {
                        inProgress: false,
                        type: null,
                        recipe: null,
                        amount: 1,
                        totalTime: 0,
                        remainingTime: 0,
                        timer: null,
                        extraData: null
                    }
                },
                2: {
                    autoCraft: {
                        enabled: false,
                        recipe: null,
                        amount: 1,
                        total: 0,
                        made: 0,
                        interval: 5,
                        timer: null
                    },
                    crafting: {
                        inProgress: false,
                        type: null,
                        recipe: null,
                        amount: 1,
                        totalTime: 0,
                        remainingTime: 0,
                        timer: null,
                        extraData: null
                    }
                },
                3: {
                    autoCraft: {
                        enabled: false,
                        recipe: null,
                        amount: 1,
                        total: 0,
                        made: 0,
                        interval: 5,
                        timer: null
                    },
                    crafting: {
                        inProgress: false,
                        type: null,
                        recipe: null,
                        amount: 1,
                        totalTime: 0,
                        remainingTime: 0,
                        timer: null,
                        extraData: null
                    }
                },
                4: {
                    autoCraft: {
                        enabled: false,
                        recipe: null,
                        amount: 1,
                        total: 0,
                        made: 0,
                        interval: 5,
                        timer: null
                    },
                    crafting: {
                        inProgress: false,
                        type: null,
                        recipe: null,
                        amount: 1,
                        totalTime: 0,
                        remainingTime: 0,
                        timer: null,
                        extraData: null
                    }
                },
                5: {
                    autoCraft: {
                        enabled: false,
                        recipe: null,
                        amount: 1,
                        total: 0,
                        made: 0,
                        interval: 5,
                        timer: null
                    },
                    crafting: {
                        inProgress: false,
                        type: null,
                        recipe: null,
                        amount: 1,
                        totalTime: 0,
                        remainingTime: 0,
                        timer: null,
                        extraData: null
                    }
                }
            }
        };
    } else {
        // 确保合金位置属性存在
        if (!gameData.furnace.alloyPositions) {
            gameData.furnace.alloyPositions = {
                1: {
                    autoCraft: {
                        enabled: false,
                        recipe: null,
                        amount: 1,
                        total: 0,
                        made: 0,
                        interval: 5,
                        timer: null
                    },
                    crafting: {
                        inProgress: false,
                        type: null,
                        recipe: null,
                        amount: 1,
                        totalTime: 0,
                        remainingTime: 0,
                        timer: null,
                        extraData: null
                    }
                },
                2: {
                    autoCraft: {
                        enabled: false,
                        recipe: null,
                        amount: 1,
                        total: 0,
                        made: 0,
                        interval: 5,
                        timer: null
                    },
                    crafting: {
                        inProgress: false,
                        type: null,
                        recipe: null,
                        amount: 1,
                        totalTime: 0,
                        remainingTime: 0,
                        timer: null,
                        extraData: null
                    }
                },
                3: {
                    autoCraft: {
                        enabled: false,
                        recipe: null,
                        amount: 1,
                        total: 0,
                        made: 0,
                        interval: 5,
                        timer: null
                    },
                    crafting: {
                        inProgress: false,
                        type: null,
                        recipe: null,
                        amount: 1,
                        totalTime: 0,
                        remainingTime: 0,
                        timer: null,
                        extraData: null
                    }
                },
                4: {
                    autoCraft: {
                        enabled: false,
                        recipe: null,
                        amount: 1,
                        total: 0,
                        made: 0,
                        interval: 5,
                        timer: null
                    },
                    crafting: {
                        inProgress: false,
                        type: null,
                        recipe: null,
                        amount: 1,
                        totalTime: 0,
                        remainingTime: 0,
                        timer: null,
                        extraData: null
                    }
                },
                5: {
                    autoCraft: {
                        enabled: false,
                        recipe: null,
                        amount: 1,
                        total: 0,
                        made: 0,
                        interval: 5,
                        timer: null
                    },
                    crafting: {
                        inProgress: false,
                        type: null,
                        recipe: null,
                        amount: 1,
                        totalTime: 0,
                        remainingTime: 0,
                        timer: null,
                        extraData: null
                    }
                }
            };
        } else {
            // 确保每个合金位置的属性完整
            for (let i = 1; i <= 5; i++) {
                if (!gameData.furnace.alloyPositions[i]) {
                    gameData.furnace.alloyPositions[i] = {
                        autoCraft: {
                            enabled: false,
                            recipe: null,
                            amount: 1,
                            total: 0,
                            made: 0,
                            interval: 5,
                            timer: null
                        },
                        crafting: {
                            inProgress: false,
                            type: null,
                            recipe: null,
                            amount: 1,
                            totalTime: 0,
                            remainingTime: 0,
                            timer: null,
                            extraData: null
                        }
                    };
                } else {
                    // 确保crafting属性存在
                    if (!gameData.furnace.alloyPositions[i].crafting) {
                        gameData.furnace.alloyPositions[i].crafting = {
                            inProgress: false,
                            type: null,
                            recipe: null,
                            amount: 1,
                            totalTime: 0,
                            remainingTime: 0,
                            timer: null,
                            extraData: null
                        };
                    }
                }
            }
        }
    }
    
    // 处理燃料相关的初始化
    if (!gameData.furnace.fuel) {
            gameData.furnace.fuel = {
                // 基本状态
                isBurning: false,
                temperature: 0,
                maxTemperature: 0,
                coolingSpeed: 10,
                
                // 燃料库存 - 按类型存储，每种上限99
                inventory: {
                    '煤矿': 0,
                    '燃料': 0,
                    '超导燃料': 0
                },
                
                // 当前燃烧状态
                burningType: null,
                burningAmount: 0,
                remainingBurnTime: 0,
                totalBurnTime: 0,
                
                // 温度更新定时器
                temperatureTimer: null
            };
        } else {
            // 确保燃料系统的所有属性都存在
            if (gameData.furnace.fuel.isBurning === undefined) gameData.furnace.fuel.isBurning = false;
            if (gameData.furnace.fuel.temperature === undefined) gameData.furnace.fuel.temperature = 0;
            if (gameData.furnace.fuel.maxTemperature === undefined) gameData.furnace.fuel.maxTemperature = 0;
            if (gameData.furnace.fuel.coolingSpeed === undefined) gameData.furnace.fuel.coolingSpeed = 10;
            
            // 确保库存存在
            if (gameData.furnace.fuel.inventory === undefined) {
                gameData.furnace.fuel.inventory = {
                    '煤矿': 0,
                    '煤炭': 0,
                    '燃料': 0,
                    '超导燃料': 0
                };
            } else {
                // 确保所有燃料类型都存在
                if (gameData.furnace.fuel.inventory['煤矿'] === undefined) gameData.furnace.fuel.inventory['煤矿'] = 0;
                if (gameData.furnace.fuel.inventory['煤炭'] === undefined) gameData.furnace.fuel.inventory['煤炭'] = 0;
                if (gameData.furnace.fuel.inventory['燃料'] === undefined) gameData.furnace.fuel.inventory['燃料'] = 0;
                if (gameData.furnace.fuel.inventory['超导燃料'] === undefined) gameData.furnace.fuel.inventory['超导燃料'] = 0;
            }
            
            // 确保燃烧状态属性存在
            if (gameData.furnace.fuel.burningType === undefined) gameData.furnace.fuel.burningType = null;
            if (gameData.furnace.fuel.burningAmount === undefined) gameData.furnace.fuel.burningAmount = 0;
            if (gameData.furnace.fuel.remainingBurnTime === undefined) gameData.furnace.fuel.remainingBurnTime = 0;
            if (gameData.furnace.fuel.totalBurnTime === undefined) gameData.furnace.fuel.totalBurnTime = 0;
            if (gameData.furnace.fuel.temperatureTimer === undefined) gameData.furnace.fuel.temperatureTimer = null;
            
            // 移除旧属性
            delete gameData.furnace.fuel.type;
            delete gameData.furnace.fuel.amount;
            delete gameData.furnace.fuel.maxAmount;
            delete gameData.furnace.fuel.burnTime;
            delete gameData.furnace.fuel.maxBurnTime;
            delete gameData.furnace.fuel.heatingSpeed;
            delete gameData.furnace.fuel.fuelQueue;
            delete gameData.furnace.fuel.currentFuelIndex;
        }
        
        // 移除了自动制作系统属性初始化
    
    // 确保头灯有lastGoldConsume属性
    if (gameData.tools.headlight && !gameData.tools.headlight.lastGoldConsume) {
        gameData.tools.headlight.lastGoldConsume = Date.now();
    }
    // 确保矿车属性完整
    if (gameData.tools.cart) {
        if (gameData.tools.cart.active === undefined) {
            gameData.tools.cart.active = true;
        }
        if (gameData.tools.cart.fuelType === undefined) {
            gameData.tools.cart.fuelType = 'coal';
        }
        if (gameData.tools.cart.fuelCapacity === undefined) {
            gameData.tools.cart.fuelCapacity = 50;
        }
        if (gameData.tools.cart.currentFuel === undefined) {
            gameData.tools.cart.currentFuel = 0;
        }
        if (gameData.tools.cart.nextExp === undefined) {
            gameData.tools.cart.nextExp = 50;
        }
    }
    // 确保头灯属性完整
    if (gameData.tools.headlight) {
        if (gameData.tools.headlight.active === undefined) {
            gameData.tools.headlight.active = true;
        }
        if (gameData.tools.headlight.lastGoldConsume === undefined) {
            gameData.tools.headlight.lastGoldConsume = Date.now();
        }
        if (gameData.tools.headlight.nextExp === undefined) {
            gameData.tools.headlight.nextExp = 50;
        }
        if (gameData.tools.headlight.optimized === undefined) {
            gameData.tools.headlight.optimized = false;
        }
        if (gameData.tools.headlight.fuelType === undefined) {
            gameData.tools.headlight.fuelType = 'gold';
        }
        if (gameData.tools.headlight.batteryEnergy === undefined) {
            gameData.tools.headlight.batteryEnergy = 0;
        }
        if (gameData.tools.headlight.maxBatteryEnergy === undefined) {
            gameData.tools.headlight.maxBatteryEnergy = 300;
        }
        if (gameData.tools.headlight.lastBatteryUpdate === undefined) {
            gameData.tools.headlight.lastBatteryUpdate = Date.now();
        }
    }
    // 确保矿车属性完整
    if (gameData.tools.cart) {
        if (gameData.tools.cart.optimized === undefined) {
            gameData.tools.cart.optimized = false;
        }
    }
    if (!gameData.furnace) {
        gameData.furnace = {
            crafted: false,
            level: 0
        };
    }
    if (!gameData.backpack) {
        gameData.backpack = {
            capacity: 10,
            baseCapacity: 10,
            items: {},
            expansionSlots: [],
            maxExpansionSlots: 12,
            baseStackSize: 20,
            currentStackSize: 20
        };
    }
    if (!gameData.miningCount) {
        gameData.miningCount = {};
    }
    if (!gameData.unlockedRecipes) {
        gameData.unlockedRecipes = {};
    }
    if (!gameData.tempBackpack) {
        gameData.tempBackpack = {
            items: {}
        };
    }
    if (!gameData.backpack.baseCapacity) {
        gameData.backpack.baseCapacity = 10;
    }
    if (!gameData.backpack.baseStackSize) {
        gameData.backpack.baseStackSize = 20;
    }
    if (!gameData.backpack.expansionSlots) {
        gameData.backpack.expansionSlots = [];
    }
    // 确保物品过滤设置存在
    if (!gameData.filterSettings) {
        gameData.filterSettings = {};
    }
    // 强制设置maxExpansionSlots为12，无论旧存档中是什么值
    gameData.backpack.maxExpansionSlots = 12;
    while (gameData.backpack.expansionSlots.length < gameData.backpack.maxExpansionSlots) {
        gameData.backpack.expansionSlots.push(null);
    }
    // 确保商店系统存在
    if (!gameData.shop) {
        gameData.shop = {
            unlocked: false,
            level: 0,
            refreshTime: 180, // 3分钟自动刷新
            currentTime: 0,
            items: [],
            lastRefresh: Date.now(),
            manualRefreshCost: 1000,
            // 已解锁的图纸（制作过一次后不再刷出）
            unlockedBlueprints: {
                '加工台图纸': false,
                '电池图纸': false,
                '燃料配方': false
            }
        };
    }
    // 确保商店系统的属性存在
    if (gameData.shop.unlocked === undefined) {
        gameData.shop.unlocked = false;
    }
    if (gameData.shop.level === undefined) {
        gameData.shop.level = 0;
    }
    if (gameData.shop.upgradeCosts === undefined) {
        gameData.shop.upgradeCosts = [100000, 500000, 1000000]; // 1→2级:10万, 2→3级:50万, 3→4级:100万
    }
    if (gameData.shop.freeRefreshes === undefined) {
        gameData.shop.freeRefreshes = 0;
    }
    if (gameData.shop.maxFreeRefreshes === undefined) {
        gameData.shop.maxFreeRefreshes = 50;
    }
    if (gameData.shop.lastFreeRefreshTime === undefined) {
        gameData.shop.lastFreeRefreshTime = Date.now();
    }
    if (gameData.shop.neededItem === undefined) {
        gameData.shop.neededItem = null;
    }
    if (gameData.shop.autoPurchaseItems === undefined) {
        gameData.shop.autoPurchaseItems = [];
    }
    if (gameData.shop.autoPurchaseDiscounts === undefined) {
        gameData.shop.autoPurchaseDiscounts = false;
    }
    if (gameData.shop.items === undefined) {
        gameData.shop.items = [];
    }
    if (gameData.shop.lastRefresh === undefined) {
        gameData.shop.lastRefresh = Date.now();
    }
    if (gameData.shop.manualRefreshCost === undefined) {
        gameData.shop.manualRefreshCost = 1000;
    }
    if (gameData.shop.unlockedBlueprints === undefined) {
        gameData.shop.unlockedBlueprints = {
            '加工台图纸': false,
            '电池图纸': false,
            '燃料配方': false
        };
    }
    // 确保加工台系统存在
    if (!gameData.workshop) {
        gameData.workshop = {
            unlocked: false,
            batterySlot: 0,
            batteryEnergy: 0,
            maxBatteryEnergy: 50,
            itemsCrafted: 0
        };
    }
    // 确保加工台系统的属性存在
    if (gameData.workshop.unlocked === undefined) {
        gameData.workshop.unlocked = false;
    }
    if (gameData.workshop.batterySlot === undefined) {
        gameData.workshop.batterySlot = 0;
    }
    if (gameData.workshop.batteryEnergy === undefined) {
        gameData.workshop.batteryEnergy = 0;
    }
    if (gameData.workshop.maxBatteryEnergy === undefined) {
        gameData.workshop.maxBatteryEnergy = 50;
    }
    if (gameData.workshop.itemsCrafted === undefined) {
        gameData.workshop.itemsCrafted = 0;
    }
    
    // 修复旧版本中可能存在的Infinity值
    if (gameData.workshop.batterySlot === Infinity) {
        gameData.workshop.batterySlot = 200; // 5级加工台最大电池槽
    }
    if (gameData.workshop.maxBatteryEnergy === Infinity) {
        gameData.workshop.maxBatteryEnergy = 10000; // 200个电池 * 50点能量/电池
    }
    
    // 确保特殊事件系统存在
    if (!gameData.specialEvents) {
        gameData.specialEvents = {
            npcCopperPurchase: {
                triggered: false,
                completed: false,
                requiredAmount: 9999,
                declineCount: 0,
                reward: {
                    type: 'badge',
                    name: '初级矿工徽章'
                }
            }
        };
    } else if (!gameData.specialEvents.npcCopperPurchase) {
        gameData.specialEvents.npcCopperPurchase = {
            triggered: false,
            completed: false,
            requiredAmount: 9999,
            declineCount: 0,
            reward: {
                type: 'badge',
                name: '初级矿工徽章'
            }
        };
    }
    
    // 确保徽章系统存在
    if (!gameData.badges) {
        gameData.badges = {
            hasMinersBadge: false,
            badgeLevel: 0
        };
    }
}

function initDefaultGameData() {
    gameData = {
        player: {
            level: 1,
            exp: 0,
            nextExp: 50,
            gold: 0
        },
        gainedInfo: {
            exp: 0,
            gold: 0,
            minerals: 0,
            cloth: 0
        },
        messages: [],
        tools: {
            pickaxe: {
                level: 0,
                exp: 0,
                nextExp: 50
            },
            cart: {
                crafted: false,
                level: 0,
                exp: 0,
                nextExp: 50
            },
            headlight: {
                crafted: false,
                level: 0,
                exp: 0,
                nextExp: 50
            }
        },
        furnace: {
            crafted: false,
            level: 0,
            fuel: {
                // 基本状态
                isBurning: false,
                temperature: 0,
                maxTemperature: 0,
                coolingSpeed: 10,
                
                // 燃料库存 - 按类型存储，每种上限99
                inventory: {
                    '煤矿': 0,
                    '燃料': 0,
                    '超导燃料': 0
                },
                
                // 当前燃烧状态
                burningType: null,
                burningAmount: 0,
                remainingBurnTime: 0,
                totalBurnTime: 0,
                
                // 温度更新定时器
                temperatureTimer: null
            }
        },
        backpack: {
        capacity: 10,
        baseCapacity: 10,
        items: {},
        expansionSlots: [],
        maxExpansionSlots: 12,
        baseStackSize: 20,
        currentStackSize: 20
    },
        tempBackpack: {
            items: {}
        },
        unlockedRecipes: {},
        miningCount: {},
        selectedMineral: null,
        // 金手套系统
        goldenGlove: {
            active: false,
            endTime: 0
        },
        // 商店系统
        shop: {
            unlocked: false,
            level: 0,
            upgradeCosts: [100000, 500000, 1000000], // 1→2级:10万, 2→3级:50万, 3→4级:100万
            freeRefreshes: 0,
            lastFreeRefreshTime: Date.now(),
            neededItem: null,
            autoPurchaseItems: [],
            refreshTime: 180, // 3分钟自动刷新
            currentTime: 0,
            items: [],
            lastRefresh: Date.now(),
            manualRefreshCost: 1000,
            // 已解锁的图纸（制作过一次后不再刷出）
            unlockedBlueprints: {
                '加工台图纸': false,
                '电池图纸': false,
                '燃料配方': false
            }
        },
        // 加工台系统
        workshop: {
            unlocked: false,
            batterySlot: 0,
            batteryEnergy: 0,
            maxBatteryEnergy: 50,
            itemsCrafted: 0
        }
    };
    while (gameData.backpack.expansionSlots.length < gameData.backpack.maxExpansionSlots) {
        gameData.backpack.expansionSlots.push(null);
    }
}

function exportGameData() {
    const jsonStr = JSON.stringify(gameData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `miningGame-${currentSaveSlot}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addMessage('游戏数据已导出！');
    updateMessages();
}

function importGameData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                if (importedData && importedData.player && importedData.tools && importedData.backpack) {
                    gameData = importedData;
                    ensureGameDataIntegrity();
                    checkLevelUp();
                    updateUI();
                    generateMineralGrid();
                    generateBackpack();
                    generateExpansionSlots();
                    updateFurnaceUI();
                    updateGainedInfo();
                    updateMessages();
                    saveGame();
                    addMessage('游戏数据已导入！');
                    updateMessages();
                } else {
                    alert('无效的游戏数据文件！');
                }
            } catch (error) {
                console.error('导入游戏数据失败:', error);
                alert('导入游戏数据失败，请检查文件格式！');
            }
        };
        reader.readAsText(file);
    });
    input.click();
}

function updateDisassemblePanel() {
    const disassembleItemSelect = document.getElementById('disassemble-item');
    disassembleItemSelect.innerHTML = '';
    const expansionsInBackpack = [];
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        const baseName = itemName.split('_')[0];
        if (baseName in backpackExpansions) {
            if (!expansionsInBackpack.includes(baseName)) {
                expansionsInBackpack.push(baseName);
            }
        }
    }
    expansionsInBackpack.forEach(expansionName => {
        const option = document.createElement('option');
        option.value = expansionName;
        option.textContent = expansionName;
        disassembleItemSelect.appendChild(option);
    });
}

// 更新过滤面板
function updateFilterPanel() {
    const filterItemSelect = document.getElementById('filter-item');
    filterItemSelect.innerHTML = '';
    
    // 定义所有可获得的物品列表
    const allAvailableItems = [];
    
    // 添加所有矿物
    minerals.forEach(mineral => {
        allAvailableItems.push(mineral.name);
    });
    
    // 添加其他可获得的物品
    const otherItems = ['棉布', '织布', '粗麻布', '尼龙布', '加工台图纸', '电池图纸', '燃料配方', '电池', '燃料', '木材', '金手套', '铜铁合金', '铜钴合金', '铜镍合金', '铜银合金', '石灰', '煤炭', '铜铁合金配方', '铜钴合金配方', '铜镍合金配方', '铜银合金配方'];
    otherItems.forEach(item => {
        allAvailableItems.push(item);
    });
    
    // 添加背包中已有的物品
    const backpackItems = Object.keys(gameData.backpack.items);
    backpackItems.forEach(itemName => {
        const baseItemName = itemName.split('_')[0];
        if (!allAvailableItems.includes(baseItemName)) {
            allAvailableItems.push(baseItemName);
        }
    });
    
    // 添加临时背包中已有的物品
    const tempItems = Object.keys(gameData.tempBackpack.items);
    tempItems.forEach(itemName => {
        const baseItemName = itemName.split('_')[0];
        if (!allAvailableItems.includes(baseItemName)) {
            allAvailableItems.push(baseItemName);
        }
    });
    
    // 获取已设置过滤的物品
    const filteredItems = Object.keys(gameData.filterSettings);
    
    // 合并所有物品，去重
    const allItems = [...new Set([...allAvailableItems, ...filteredItems])];
    
    // 添加选项
    allItems.forEach(itemName => {
        const option = document.createElement('option');
        option.value = itemName;
        option.textContent = itemName;
        filterItemSelect.appendChild(option);
    });
    
    // 更新过滤设置显示
    updateFilterSettingsDisplay();
}

// 更新过滤设置显示
function updateFilterSettingsDisplay() {
    const filterSettingsDiv = document.getElementById('filter-settings');
    if (!filterSettingsDiv) return;
    
    if (Object.keys(gameData.filterSettings).length === 0) {
        filterSettingsDiv.innerHTML = '<p>暂无过滤设置</p>';
        return;
    }
    
    let html = '<h4>当前过滤设置：</h4>';
    for (const [itemName, minAmount] of Object.entries(gameData.filterSettings)) {
        html += `<p>${itemName}: 保留至少 ${minAmount} 个</p>`;
    }
    filterSettingsDiv.innerHTML = html;
}

// 应用过滤设置
function applyFilter() {
    const filterItemSelect = document.getElementById('filter-item');
    const filterMinAmountInput = document.getElementById('filter-min-amount');
    
    const selectedItem = filterItemSelect.value;
    const minAmount = parseInt(filterMinAmountInput.value) || 0;
    
    if (!selectedItem) {
        alert('请选择要过滤的物品！');
        return;
    }
    
    // 保存过滤设置
    gameData.filterSettings[selectedItem] = minAmount;
    
    // 应用过滤，自动出售多余的物品
    executeFilter();
    
    // 更新过滤设置显示
    updateFilterSettingsDisplay();
    
    // 显示成功消息
    addMessage(`已设置 ${selectedItem} 的最小保留数量为 ${minAmount}`);
    updateMessages();
    
    // 确保UI更新
    updateUI();
    updateBackpackDisplay();
    saveGame();
}

// 移除过滤设置
function removeFilter() {
    const filterItemSelect = document.getElementById('filter-item');
    const selectedItem = filterItemSelect.value;
    
    if (!selectedItem) {
        alert('请选择要移除的过滤物品！');
        return;
    }
    
    // 检查该物品是否有过滤设置
    if (gameData.filterSettings[selectedItem] !== undefined) {
        // 移除过滤设置
        delete gameData.filterSettings[selectedItem];
        
        // 更新过滤设置显示
        updateFilterSettingsDisplay();
        
        // 显示成功消息
        addMessage(`已移除 ${selectedItem} 的过滤设置`);
        updateMessages();
        
        // 确保UI更新
        updateUI();
        saveGame();
    } else {
        // 该物品没有过滤设置，不显示错误提示，直接返回
        return;
    }
}

// 执行过滤，自动出售多余的物品
function executeFilter() {
    // 遍历所有过滤设置
    for (const [itemName, minAmount] of Object.entries(gameData.filterSettings)) {
        // 计算背包中该物品的总数量
        let totalCount = 0;
        for (const [backpackItemName, count] of Object.entries(gameData.backpack.items)) {
            const baseName = backpackItemName.split('_')[0];
            if (baseName === itemName) {
                totalCount += count;
            }
        }
        
        // 计算需要出售的数量
        if (totalCount > minAmount) {
            const sellAmount = totalCount - minAmount;
            // 自动出售多余的物品
            sellItemAutomatically(itemName, sellAmount);
        }
    }
}

// 自动出售物品
function sellItemAutomatically(itemName, amount) {
    let totalSold = 0;
    let totalEarned = 0;
    
    // 遍历背包中的物品
    for (const [backpackItemName, count] of Object.entries(gameData.backpack.items)) {
        const baseName = backpackItemName.split('_')[0];
        if (baseName === itemName) {
            // 计算可以从这个堆叠中出售的数量
            const sellFromStack = Math.min(count, amount - totalSold);
            if (sellFromStack > 0) {
                // 计算出售价格，检查谨慎矿工效果
                let itemPrice = getItemPrice(itemName);
                // 检查是否有谨慎地矿工效果
                if (gameData.activeEffects && gameData.activeEffects.carefulMiner && gameData.activeEffects.carefulMiner.active) {
                    itemPrice *= 2;
                }
                const stackEarned = sellFromStack * itemPrice;
                totalEarned += stackEarned;
                
                // 减少背包中的物品数量
                gameData.backpack.items[backpackItemName] -= sellFromStack;
                if (gameData.backpack.items[backpackItemName] <= 0) {
                    delete gameData.backpack.items[backpackItemName];
                }
                
                totalSold += sellFromStack;
            }
            
            if (totalSold >= amount) {
                break;
            }
        }
    }
    
    // 更新金币
    if (totalSold > 0) {
        gameData.player.gold += totalEarned;
        
        // 记录自动出售信息
        ensureGainedInfoExists();
        gameData.gainedInfo.autoSell.gold += totalEarned;
        if (gameData.gainedInfo.autoSell.items[itemName]) {
            gameData.gainedInfo.autoSell.items[itemName] += totalSold;
        } else {
            gameData.gainedInfo.autoSell.items[itemName] = totalSold;
        }
        
        // 显示出售消息
        addMessage(`自动出售 ${itemName} × ${totalSold}，获得 ${totalEarned} 金币`);
        updateMessages();
        
        // 更新UI
        updateUI();
        updateBackpackDisplay();
        updateGainedInfo(); // 更新获得信息显示
        saveGame();
    }
}

// 检查物品是否为消耗品
function isConsumable(itemName) {
    const consumables = ['电池', '燃料'];
    return consumables.includes(itemName);
}

// 获取物品价格
function getItemPrice(itemName) {
    // 检查是否是配方物品
    if (itemName.includes('配方')) {
        // 提取合金名称
        const alloyName = itemName.replace('配方', '');
        // 根据合金类型设置配方价格
        switch (alloyName) {
            case '铜铁合金':
                return 1000;
            case '铜钴合金':
                return 5000;
            case '铜镍合金':
                return 8000;
            case '铜银合金':
                return 10000;
            default:
                return 500;
        }
    }
    
    // 检查是否是矿物
    const mineral = minerals.find(m => m.name === itemName);
    if (mineral) {
        return mineral.price;
    }
    
    // 检查是否是其他物品
    switch (itemName) {
        // 材料类物品
        case '棉布': return 1;
        case '织布': return 2;
        case '粗麻布': return 3;
        case '尼龙布': return 5;
        case '硫磺': return 10;
        
        // 合金类物品
        case '铜铁合金': return 54;
        case '铜钴合金': return 78;
        case '铜镍合金': return 87;
        case '铜银合金': return 96;
        case '金砖': return 660; // 制作成本：金矿×10=440金币，售价为成本的1.5倍，与其他合金定价策略一致
        case '铝矿': return 50; // 铝矿售价为50金币，与其他高级合金价格保持一致
        
        // 消耗品（基于制作成本和商店价格的合理比例）
        case '电池': return 15;
        case '燃料': return 20;
        case '扎啤': return 100;
        
        // 特殊物品（商店购买类，出售价格为购买价格的50%-70%）
        case '旅行背包': return 5000; // 商店售价10000金币的50%
        case '金手套': return 7000; // 商店售价10000金币的70%
        
        // 不可出售物品（工具类、背包制作材料等）保持默认0
        default: return 0;
    }
}

// 商店系统相关函数
function checkShopUnlock() {
    console.log('检查商店解锁 - 当前状态:', gameData.shop.unlocked);
    
    // 强制修复商店状态
    if (gameData.shop.unlocked !== true && gameData.shop.unlocked !== false) {
        gameData.shop.unlocked = false;
        console.log('强制修复商店状态为:', gameData.shop.unlocked);
    }
    
    if (gameData.player.level >= 10 && !gameData.shop.unlocked) {
        gameData.shop.unlocked = true;
        console.log('解锁商店');
        updateShopUI();
        refreshShopItems();
        addMessage('商店已解锁！现在可以购买各种物品和图纸。');
        updateMessages();
    }
    
    // 确保商店解锁后有初始物品
    if (gameData.shop.unlocked && (!gameData.shop.items || gameData.shop.items.length === 0)) {
        console.log('商店已解锁但无物品，刷新物品');
        refreshShopItems();
    }
    
    // 确保商店UI正确显示，无论商店状态是否变化
    // 修复商店界面不显示的问题
    console.log('更新商店UI - 当前状态:', gameData.shop.unlocked);
    updateShopUI();
}

function updateShopUI() {
    const shopElement = document.getElementById('shop');
    const shopItemsElement = document.getElementById('shop-items');
    const shopLevelElement = document.getElementById('shop-level');
    
    if (shopLevelElement) {
        shopLevelElement.textContent = gameData.shop.level + 1;
    }
    
    if (gameData.shop.unlocked) {
        shopElement.style.display = 'block';
        
        // 添加商店升级UI
        const shopInfoElement = shopElement.querySelector('.shop-info');
        if (shopInfoElement) {
            // 检查是否已经添加了升级UI
            let upgradeUI = shopInfoElement.querySelector('.shop-upgrade');
            if (!upgradeUI) {
                upgradeUI = document.createElement('div');
                upgradeUI.className = 'shop-upgrade';
                upgradeUI.style.marginTop = '10px';
                upgradeUI.style.padding = '10px';
                upgradeUI.style.backgroundColor = '#f9f9f9';
                upgradeUI.style.borderRadius = '5px';
                upgradeUI.style.border = '1px solid #ddd';
                shopInfoElement.appendChild(upgradeUI);
            }
            
            // 更新升级UI
            const currentLevel = gameData.shop.level;
            let upgradeHTML = '';
            
            if (currentLevel < 3) {
                const nextLevel = currentLevel + 1;
                // 确保upgradeCosts数组存在且有足够长度
                if (!gameData.shop.upgradeCosts || gameData.shop.upgradeCosts.length <= currentLevel) {
                    gameData.shop.upgradeCosts = [100000, 500000, 1000000]; // 1→2级:10万, 2→3级:50万, 3→4级:100万
                }
                const upgradeCost = gameData.shop.upgradeCosts[currentLevel];
                upgradeHTML = `
                    <div class="upgrade-info">
                        <span>升级到${nextLevel}级需要: ${upgradeCost.toLocaleString()}金币</span>
                        <button id="upgrade-shop" style="margin-left: 10px; padding: 5px 10px;">升级商店</button>
                    </div>
                `;
            } else {
                upgradeHTML = '<div class="upgrade-info">商店已达到最高等级</div>';
            }
            
            // 添加免费刷新次数显示
            if (currentLevel >= 1) {
                upgradeHTML += `
                    <div class="free-refreshes" style="margin-top: 5px;">
            <span>免费刷新次数: ${gameData.shop.freeRefreshes}/${gameData.shop.maxFreeRefreshes}</span>
            ${currentLevel >= 1 ? '<button id="use-free-refresh" style="margin-left: 10px; padding: 5px 10px;">使用免费刷新</button>' : ''}
        </div>
                `;
            }
            
            
            
            // 添加并排布局容器
            upgradeHTML += `
                <div class="shop-layout" style="margin-top: 15px; display: flex; gap: 10px; width: 100%;">
                    <!-- 左侧：功能区域（宽度减少一半） -->
                    <div class="shop-functions" style="flex: 0.5; padding: 10px; background-color: #f9f9f9; border-radius: 5px; border: 1px solid #ddd;">
            `
            
            // 添加3级商店功能
            if (currentLevel >= 2) {
                upgradeHTML += `
                    <div class="needed-item-section" style="margin-top: 10px;">
                        <h4>我需要的功能</h4>
                        <div style="margin-top: 5px;">
                            <label for="needed-item-select">选择商品:</label>
                            <select id="needed-item-select">
                                <option value="">-- 请选择 --</option>
                                <option value="加工台图纸">加工台图纸</option>
                                <option value="电池图纸">电池图纸</option>
                                <option value="燃料配方">燃料配方</option>
                                <option value="棉布">棉布</option>
                                <option value="电池">电池</option>
                                <option value="燃料">燃料</option>
                                <option value="木材">木材</option>
                                <option value="金手套">金手套</option>
                                <option value="石矿">石矿</option>
                                <option value="煤矿">煤矿</option>
                            </select>
                            <button id="set-needed-item" style="margin-left: 10px; padding: 5px 10px;">设置</button>
                        </div>
                        <div style="margin-top: 5px; font-size: 0.9em; color: #666;">
                            下次出现时概率增加40%，价格为300%
                        </div>
                    </div>
                `;
            }
            
            // 添加4级商店功能
            if (currentLevel >= 3) {
                upgradeHTML += `
                    <div class="auto-purchase-section" style="margin-top: 10px;">
                        <h4>自动采购功能</h4>
                        <div style="margin-top: 5px;">
                            <label for="auto-item-1">选择物品 (最多2种):</label><br>
                            <input type="checkbox" id="auto-item-1" value="加工台图纸"> 加工台图纸<br>
                            <input type="checkbox" id="auto-item-2" value="电池图纸"> 电池图纸<br>
                            <input type="checkbox" id="auto-item-3" value="燃料配方"> 燃料配方<br>
                            <input type="checkbox" id="auto-item-4" value="棉布"> 棉布<br>
                            <input type="checkbox" id="auto-item-5" value="电池"> 电池<br>
                            <input type="checkbox" id="auto-item-6" value="燃料"> 燃料<br>
                            <input type="checkbox" id="auto-item-7" value="木材"> 木材<br>
                            <input type="checkbox" id="auto-item-8" value="金手套"> 金手套<br>
                            <input type="checkbox" id="auto-item-9" value="石矿"> 石矿<br>
                            <input type="checkbox" id="auto-item-10" value="煤矿"> 煤矿<br>
                            <div style="margin-top: 10px;">
                                <input type="checkbox" id="auto-purchase-discounts" ${gameData.shop.autoPurchaseDiscounts ? 'checked' : ''}>
                                <label for="auto-purchase-discounts">同时购买打折优惠物品</label>
                            </div>
                            <button id="set-auto-purchase" style="margin-top: 10px; padding: 5px 10px;">设置自动采购</button>
                        </div>
                        <div style="margin-top: 5px; font-size: 0.9em; color: #666;">
                            商店中出现非涨价物品时自动购买
                        </div>
                        <div style="margin-top: 5px; font-size: 0.9em; color: #333;">
                            当前选择: ${gameData.shop.autoPurchaseItems.length > 0 ? gameData.shop.autoPurchaseItems.join(', ') : '无'}
                        </div>
                        <div style="margin-top: 5px; font-size: 0.9em; color: #333;">
                            自动购买打折物品: ${gameData.shop.autoPurchaseDiscounts ? '是' : '否'}
                        </div>
                    </div>
                `;
            }
            
            // 添加当前需求物品状态显示
            if (gameData.shop.neededItem) {
                upgradeHTML += `
                    <div class="needed-item-status" style="margin-top: 10px; padding: 10px; background-color: #f0f8ff; border-radius: 5px; border: 1px solid #add8e6;">
                        <h4>当前需求</h4>
                        <div style="margin-top: 5px;">
                            <p style="color: #0066cc;">下次出现${gameData.shop.neededItem}概率增加40%，价格为300%</p>
                        </div>
                    </div>
                `;
            }
            
            // 关闭左侧功能区域并添加右侧商店物品区域
            upgradeHTML += `
                    </div>
                    <!-- 右侧：商店物品区域（宽度减少一半） -->
                    <div class="shop-items-container" style="flex: 0.5; padding: 10px; background-color: #f9f9f9; border-radius: 5px; border: 1px solid #ddd;">
                        <h4>商店物品</h4>
                        <div id="shop-items-inline" style="margin-top: 10px;">
                            ${renderShopItemsInline()}
                        </div>
                    </div>
                </div>
            `;
            
            upgradeUI.innerHTML = upgradeHTML;
            
            // 添加事件监听器
            const upgradeShopBtn = document.getElementById('upgrade-shop');
            if (upgradeShopBtn) {
                upgradeShopBtn.addEventListener('click', upgradeShop);
            }
            
            const useFreeRefreshBtn = document.getElementById('use-free-refresh');
            if (useFreeRefreshBtn) {
                useFreeRefreshBtn.addEventListener('click', useFreeRefresh);
            }
            
            const setNeededItemBtn = document.getElementById('set-needed-item');
            if (setNeededItemBtn) {
                setNeededItemBtn.addEventListener('click', setNeededItem);
            }
            
            const setAutoPurchaseBtn = document.getElementById('set-auto-purchase');
            if (setAutoPurchaseBtn) {
                setAutoPurchaseBtn.addEventListener('click', setAutoPurchase);
            }
            
            // 添加购买按钮事件监听器 - 修复事件叠加问题
            setTimeout(() => {
                // 先移除所有旧的点击事件（使用onclick方式避免事件叠加）
                document.querySelectorAll('.buy-item').forEach(button => {
                    // 移除旧的点击事件处理
                    button.onclick = null;
                    
                    // 添加新的点击事件处理
                    button.onclick = function() {
                        const itemName = this.getAttribute('data-item');
                        const price = parseInt(this.getAttribute('data-price'));
                        buyShopItem(itemName, price);
                    };
                });
            }, 100);
        }
        
        // 直接渲染物品，避免延迟导致的闪烁
        // renderShopItems(); // 移除，因为已经在新布局中内联渲染
    } else {
        shopElement.style.display = 'none';
    }
}

// 升级商店
function upgradeShop() {
    const currentLevel = gameData.shop.level;
    if (currentLevel >= 3) {
        alert('商店已达到最高等级');
        return;
    }
    
    const upgradeCost = gameData.shop.upgradeCosts[currentLevel];
    if (gameData.player.gold < upgradeCost) {
        alert('金币不足，无法升级商店');
        return;
    }
    
    // 扣除金币
    gameData.player.gold -= upgradeCost;
    
    // 提升商店等级
    gameData.shop.level++;
    
    // 显示升级成功消息
    addMessage(`商店成功升级到${gameData.shop.level + 1}级！`);
    
    // 更新UI
    updateUI();
    updateShopUI();
}

// 使用免费刷新
function useFreeRefresh() {
    if (gameData.shop.freeRefreshes <= 0) {
        alert('没有免费刷新次数');
        return;
    }
    
    // 减少免费刷新次数
    gameData.shop.freeRefreshes--;
    
    // 刷新商店物品（传递false表示免费刷新）
    refreshShopItems(false, true);
    
    // 显示刷新成功消息
    addMessage('使用了一次免费刷新！');
    
    // 更新UI
    updateShopUI();
}

// 设置需要的物品
function setNeededItem() {
    const selectElement = document.getElementById('needed-item-select');
    const neededItem = selectElement.value;
    
    gameData.shop.neededItem = neededItem;
    
    if (neededItem) {
        addMessage(`已设置需要的物品: ${neededItem}`);
    } else {
        addMessage('已取消需要的物品设置');
    }
    
    // 更新UI
    updateShopUI();
}

// 设置自动采购物品
function setAutoPurchase() {
    const itemCheckboxes = document.querySelectorAll('.auto-purchase-section input[type="checkbox"]:not(#auto-purchase-discounts)');
    const discountCheckbox = document.getElementById('auto-purchase-discounts');
    const selectedItems = [];
    
    itemCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedItems.push(checkbox.value);
        }
    });
    
    if (selectedItems.length > 2) {
        alert('最多只能选择2种物品');
        return;
    }
    
    gameData.shop.autoPurchaseItems = selectedItems;
    gameData.shop.autoPurchaseDiscounts = discountCheckbox ? discountCheckbox.checked : false;
    
    if (selectedItems.length > 0) {
        let message = `已设置自动采购物品: ${selectedItems.join(', ')}`;
        if (gameData.shop.autoPurchaseDiscounts) {
            message += '，包括打折优惠物品';
        }
        addMessage(message);
    } else {
        addMessage('已取消自动采购设置');
    }
    
    // 更新UI
    updateShopUI();
}

function renderShopItems() {
    const shopItemsElement = document.getElementById('shop-items');
    if (!shopItemsElement) return;
    
    if (gameData.shop.items.length === 0) {
        if (gameData.shop.unlocked) {
            // 检查是否是首次加载或真的需要刷新
            // 只有当items不存在、lastRefresh不存在、或者超过5分钟未刷新时才刷新
            // 确保不会因为空数组而导致的刷新
            const shouldRefresh = (!gameData.shop.items || gameData.shop.items === null) || (!gameData.shop.lastRefresh || gameData.shop.lastRefresh === 0) || (Date.now() - gameData.shop.lastRefresh > 300000);
            
            if (shouldRefresh) {
                shopItemsElement.innerHTML = '<p>商店正在刷新，请稍候...</p>';
                // 延迟刷新，避免与其他刷新冲突
                setTimeout(() => {
                    // 再次检查，确保没有其他地方已经刷新了物品
                    if (gameData.shop.unlocked && (!gameData.shop.items || gameData.shop.items.length === 0)) {
                        refreshShopItems();
                    }
                }, 1000);
            } else {
                // 如果不需要刷新，显示空商店消息
                shopItemsElement.innerHTML = '<p>商店暂时没有物品，请稍后再来查看。</p>';
            }
        } else {
            shopItemsElement.innerHTML = '<p>商店未解锁，玩家等级达到10级后开启</p>';
        }
        return;
    }
    
    shopItemsElement.innerHTML = '';
    gameData.shop.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'shop-item';
        
        // 检查是否是优惠产品或涨价产品
        let itemHTML = '';
        if (item.isDiscount) {
            itemHTML = `
                <div class="shop-item-name" style="color: red;">${item.name} <span style="color: red;">${item.discountText}</span></div>
                <div class="shop-item-price" style="color: red;">价格: ${Math.floor(item.price)}金币</div>
                <button class="buy-item" data-item="${item.name}" data-price="${Math.floor(item.price)}">购买</button>
            `;
        } else if (item.isPriceIncrease) {
            itemHTML = `
                <div class="shop-item-name" style="color: blue;">${item.name} <span style="color: blue;">${item.priceIncreaseText}</span></div>
                <div class="shop-item-price" style="color: blue;">价格: ${Math.floor(item.price)}金币</div>
                <button class="buy-item" data-item="${item.name}" data-price="${Math.floor(item.price)}">购买</button>
            `;
        } else if (item.name === '旅行背包') {
            // 旅行背包显示为亮金色
            itemHTML = `
                <div class="shop-item-name" style="color: gold; text-shadow: 0 0 10px gold;">${item.name}</div>
                <div class="shop-item-price" style="color: gold;">价格: ${Math.floor(item.price)}金币</div>
                <button class="buy-item" data-item="${item.name}" data-price="${Math.floor(item.price)}">购买</button>
            `;
        } else {
            itemHTML = `
                <div class="shop-item-name">${item.name}</div>
                <div class="shop-item-price">价格: ${Math.floor(item.price)}金币</div>
                <button class="buy-item" data-item="${item.name}" data-price="${Math.floor(item.price)}">购买</button>
            `;
        }
        
        itemElement.innerHTML = itemHTML;
        shopItemsElement.appendChild(itemElement);
    });
    
    // 添加购买按钮事件监听器 - 修复事件叠加问题
    document.querySelectorAll('.buy-item').forEach(button => {
        // 移除旧的点击事件处理
        button.onclick = null;
        
        // 添加新的点击事件处理
        button.onclick = function() {
            const itemName = this.getAttribute('data-item');
            const price = parseInt(this.getAttribute('data-price'));
            buyShopItem(itemName, price);
        };
    });
}

// 内联渲染商店物品（用于在功能区域旁边显示）
function renderShopItemsInline() {
    let html = '';
    
    if (gameData.shop.items.length === 0) {
        if (gameData.shop.unlocked) {
            html = '<p>商店暂时没有物品，请稍后再来查看。</p>';
        } else {
            html = '<p>商店未解锁，玩家等级达到10级后开启</p>';
        }
        return html;
    }
    
    gameData.shop.items.forEach(item => {
        // 检查是否是优惠产品或涨价产品
        if (item.isDiscount) {
            html += `
                <div class="shop-item" style="margin-bottom: 10px; padding: 8px; background-color: #fff; border-radius: 3px; border: 1px solid #ddd;">
                    <div class="shop-item-name" style="color: red;">${item.name} <span style="color: red;">${item.discountText}</span></div>
                    <div class="shop-item-price" style="color: red;">价格: ${Math.floor(item.price)}金币</div>
                    <button class="buy-item" data-item="${item.name}" data-price="${Math.floor(item.price)}" style="margin-top: 5px; padding: 3px 6px;">购买</button>
                </div>
            `;
        } else if (item.isPriceIncrease) {
            html += `
                <div class="shop-item" style="margin-bottom: 10px; padding: 8px; background-color: #fff; border-radius: 3px; border: 1px solid #ddd;">
                    <div class="shop-item-name" style="color: blue;">${item.name} <span style="color: blue;">${item.priceIncreaseText}</span></div>
                    <div class="shop-item-price" style="color: blue;">价格: ${Math.floor(item.price)}金币</div>
                    <button class="buy-item" data-item="${item.name}" data-price="${Math.floor(item.price)}" style="margin-top: 5px; padding: 3px 6px;">购买</button>
                </div>
            `;
        } else if (item.name === '旅行背包') {
            // 旅行背包显示为亮金色
            html += `
                <div class="shop-item" style="margin-bottom: 10px; padding: 8px; background-color: #fff; border-radius: 3px; border: 1px solid #ddd;">
                    <div class="shop-item-name" style="color: gold; text-shadow: 0 0 10px gold;">${item.name}</div>
                    <div class="shop-item-price" style="color: gold;">价格: ${Math.floor(item.price)}金币</div>
                    <button class="buy-item" data-item="${item.name}" data-price="${Math.floor(item.price)}" style="margin-top: 5px; padding: 3px 6px;">购买</button>
                </div>
            `;
        } else {
            html += `
                <div class="shop-item" style="margin-bottom: 10px; padding: 8px; background-color: #fff; border-radius: 3px; border: 1px solid #ddd;">
                    <div class="shop-item-name">${item.name}</div>
                    <div class="shop-item-price">价格: ${Math.floor(item.price)}金币</div>
                    <button class="buy-item" data-item="${item.name}" data-price="${Math.floor(item.price)}" style="margin-top: 5px; padding: 3px 6px;">购买</button>
                </div>
            `;
        }
    });
    
    return html;
}

function buyShopItem(itemName, price) {
    // 找到物品在商店列表中的索引 - 使用 Math.floor 比较价格，因为显示时已取整
    const itemIndex = gameData.shop.items.findIndex(item => item.name === itemName && Math.floor(item.price) === price);
    
    if (gameData.player.gold >= price && itemIndex !== -1) {
        // 扣除金币
        gameData.player.gold -= price;
        
        // 处理物品添加
        let baseItemName = itemName;
        if (itemName.includes('*')) {
            // 处理批量物品，如"棉布*10"
            const [name, amountStr] = itemName.split('*');
            baseItemName = name;
            const amount = parseInt(amountStr);
            for (let i = 0; i < amount; i++) {
                addToBackpack(baseItemName);
            }
        } else {
            // 处理单个物品
            addToBackpack(itemName);
        }
        
        // 图纸类物品处理
        if (baseItemName === '加工台图纸') {
            // 加工台图纸需要保留在背包中，只有在实际使用时才标记为已解锁
            addMessage(`购买了${baseItemName}！`);
        } else if (baseItemName === '电池图纸' || baseItemName === '燃料配方') {
            // 电池图纸和燃料配方是解锁制作权限的，购买后立即标记为已解锁
            gameData.shop.unlockedBlueprints[baseItemName] = true;
            addMessage(`成功解锁${baseItemName}！`);
        }
        
        // 从商店列表中移除购买的物品
        gameData.shop.items.splice(itemIndex, 1);
        
        // 更新UI
        updateUI();
        updateBackpackDisplay();
        updateShopUI(); // 确保商店UI也更新
        
        addMessage(`购买成功：${itemName} (${price}金币)`);
        updateMessages();
        
        // 保存游戏数据
        saveGame();
    } else {
        addMessage('金币不足或物品不存在，无法购买！');
        updateMessages();
    }
}

function refreshShopItems(isManualRefresh = false, isFreeRefresh = false) {
    if (!gameData.shop.unlocked) return;
    
    // 检查是否有谨慎地矿工效果
    const hasCarefulMinerEffect = gameData.activeEffects && gameData.activeEffects.carefulMiner && gameData.activeEffects.carefulMiner.active;
    
    const items = [];
    const itemCount = Math.floor(Math.random() * 3) + 3; // 3-5个物品
    
    // 生成5的倍数数量（1-100）
    function generateRandomAmount() {
        // 5的倍数，最小1，最大100
        const options = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100];
        return options[Math.floor(Math.random() * options.length)];
    }
    
    // 物品池：分离物品名和基础价格
    const itemPool = [
        { baseName: '加工台图纸', basePrice: 1000, probability: 0.1, isBlueprint: true },
        { baseName: '电池图纸', basePrice: 1000, probability: 0.1, isBlueprint: true },
        { baseName: '燃料配方', basePrice: 1000, probability: 0.1, isBlueprint: true },
        { baseName: '棉布', basePrice: 4, probability: 0.2 },
        { baseName: '电池', basePrice: 350, probability: 0.05 },
        { baseName: '燃料', basePrice: 300, probability: 0.05 },
        { baseName: '木材', basePrice: 10, probability: 0.3 },
        { baseName: '金手套', basePrice: 10000, probability: 0.2, isSpecial: true, effect: 'expBoost' },
        { baseName: '扎啤', basePrice: 200, probability: 0.2, isSpecial: true, effect: 'intimacyBoost' }
    ];
    
    // 添加旅行背包到物品池（可通过商店购买获得）
    // 确保不会连续出现2次旅行背包
    if (!gameData.shop.lastHadTravelBackpack) {
        itemPool.push({ baseName: '旅行背包', basePrice: 10000, probability: 0.05, isSpecial: true });
    }
    
    // 添加已解锁的矿物（只保留石矿和煤矿）
    minerals.forEach(mineral => {
        if (gameData.player.level >= mineral.minLevel && (mineral.name === '石矿' || mineral.name === '煤矿')) {
            itemPool.push({
                baseName: mineral.name,
                basePrice: mineral.price * 2, // 出售价值的200%
                probability: 0.2
            });
        }
    });
    
    // 添加燃料和电池的优惠产品（10%几率），免费刷新时不添加
    if (!isFreeRefresh && Math.random() < 0.1) {
        // 随机选择添加一种或两种优惠产品，但确保每种最多只添加一次
        const addFuelDiscount = Math.random() < 0.6; // 60%几率添加燃料优惠
        const addBatteryDiscount = Math.random() < 0.6; // 60%几率添加电池优惠
        
        // 检查并添加燃料优惠
        if (addFuelDiscount) {
            itemPool.push({
                baseName: '燃料',
                basePrice: 300 * 0.5, // 300*50%优惠
                probability: 1,
                isDiscount: true,
                discountText: '优惠50%！'
            });
        }
        
        // 检查并添加电池优惠
        if (addBatteryDiscount) {
            itemPool.push({
                baseName: '电池',
                basePrice: 350 * 0.5, // 350*50%优惠
                probability: 1,
                isDiscount: true,
                discountText: '优惠50%！'
            });
        }
    }
    
    // 添加已解锁的合金
    for (const [alloyName, alloyData] of Object.entries(alloyRecipes)) {
        // 检查玩家是否达到合金制作的等级要求
        const requiredLevel = getRequiredLevelForAlloy(alloyName);
        if (gameData.player.level >= requiredLevel) {
            // 根据合金类型设置价格，使用出售价格的200%作为单个价格
            let singleAlloyPrice = 20;
            switch (alloyName) {
                case '铜铁合金':
                    singleAlloyPrice = 54 * 2; // 出售价格54 * 2
                    break;
                case '铜钴合金':
                    singleAlloyPrice = 78 * 2; // 出售价格78 * 2
                    break;
                case '铜镍合金':
                    singleAlloyPrice = 87 * 2; // 出售价格87 * 2
                    break;
                case '铜银合金':
                    singleAlloyPrice = 96 * 2; // 出售价格96 * 2
                    break;
                case '金砖':
                    singleAlloyPrice = 660 * 2; // 出售价格660 * 2
                    break;
                case '铝矿':
                    singleAlloyPrice = 50 * 2; // 调整铝矿价格
                    break;
            }
            itemPool.push({
                baseName: alloyName,
                basePrice: singleAlloyPrice,
                probability: 0.15
            });
        }
    }
    
    // 生成物品
    for (let i = 0; i < itemCount; i++) {
        // 过滤掉已解锁的图纸
        const availableItems = itemPool.filter(item => {
            if (item.isBlueprint) {
                // 检查图纸是否已解锁
                // 对于加工台图纸，只有在加工台已解锁时才过滤
                if (item.baseName === '加工台图纸') {
                    return !gameData.workshop.unlocked;
                }
                return !gameData.shop.unlockedBlueprints[item.baseName];
            }
            // 确保在同一次刷新时不会同时出现2个以上的旅行背包
            if (item.baseName === '旅行背包') {
                const hasTravelBackpack = items.some(existingItem => existingItem.baseName === '旅行背包');
                if (hasTravelBackpack) {
                    return false;
                }
            }
            return true;
        });
        
        if (availableItems.length > 0) {
            // 优先检查是否有优惠产品
            const discountItems = availableItems.filter(item => item.isDiscount);
            
            // 如果有谨慎地矿工效果，只选择打折物品
            if (hasCarefulMinerEffect) {
                if (discountItems.length > 0) {
                    // 从打折物品中随机选择
                    const randomIndex = Math.floor(Math.random() * discountItems.length);
                    const selectedItem = discountItems[randomIndex];
                    // 生成随机数量，特殊物品（如旅行背包）数量固定为1
                    const amount = selectedItem.isBlueprint || selectedItem.isSpecial ? 1 : generateRandomAmount();
                    // 计算总价
                    const totalPrice = selectedItem.basePrice * amount;
                    items.push({ 
                        baseName: selectedItem.baseName,
                        name: `${selectedItem.baseName}*${amount}`,
                        amount: amount,
                        price: totalPrice,
                        isDiscount: selectedItem.isDiscount,
                        discountText: selectedItem.discountText
                    });
                } else {
                    // 如果没有打折物品，创建一个打折物品
                    const randomIndex = Math.floor(Math.random() * availableItems.length);
                    const selectedItem = availableItems[randomIndex];
                    // 生成随机数量，特殊物品（如旅行背包）数量固定为1
                    const amount = selectedItem.isBlueprint || selectedItem.isSpecial ? 1 : generateRandomAmount();
                    // 创建打折物品（价格减半）
                    const totalPrice = selectedItem.basePrice * amount * 0.5;
                    items.push({ 
                        baseName: selectedItem.baseName,
                        name: `${selectedItem.baseName}*${amount}`,
                        amount: amount,
                        price: totalPrice,
                        isDiscount: true,
                        discountText: '优惠50%！'
                    });
                }
            } else if (discountItems.length > 0 && Math.random() < 0.5) {
                // 50%的概率选择优惠产品
                const randomIndex = Math.floor(Math.random() * discountItems.length);
                const selectedItem = discountItems[randomIndex];
                // 生成随机数量，特殊物品（如旅行背包）数量固定为1
                const amount = selectedItem.isBlueprint || selectedItem.isSpecial ? 1 : generateRandomAmount();
                // 计算总价
                const totalPrice = selectedItem.basePrice * amount;
                items.push({ 
                    baseName: selectedItem.baseName,
                    name: `${selectedItem.baseName}*${amount}`,
                    amount: amount,
                    price: totalPrice,
                    isDiscount: selectedItem.isDiscount,
                    discountText: selectedItem.discountText
                });
            } else {
                // 优先选择加工台图纸（如果可用）
                const workshopBlueprint = availableItems.find(item => item.baseName === '加工台图纸');
                if (workshopBlueprint && Math.random() < 0.3) {
                    // 30%的概率选择加工台图纸
                    items.push({ 
                        baseName: workshopBlueprint.baseName,
                        name: workshopBlueprint.baseName,
                        amount: 1,
                        price: workshopBlueprint.basePrice 
                    });
                } else {
                    // 应用3级商店的"我需要的功能"
                    let selectedItem = null;
                    
                    if (gameData.shop.level >= 2 && gameData.shop.neededItem) {
                        // 为需要的物品增加概率
                        const [neededBaseName] = gameData.shop.neededItem.split('*');
                        const neededItem = availableItems.find(item => item.baseName === neededBaseName);
                        if (neededItem && Math.random() < 0.4) { // 40%概率选择需要的物品
                            selectedItem = neededItem;
                        }
                    }
                    
                    // 如果没有选中需要的物品，随机选择
                    if (!selectedItem) {
                        const randomIndex = Math.floor(Math.random() * availableItems.length);
                        selectedItem = availableItems[randomIndex];
                    }
                
                // 生成随机数量，特殊物品（如旅行背包）数量固定为1
                const amount = selectedItem.isBlueprint || selectedItem.isSpecial ? 1 : generateRandomAmount();
                // 为非优惠产品添加随机打折或涨价
                let finalItem = { ...selectedItem };
                let totalPrice = selectedItem.basePrice * amount;
                
                // 旅行背包不参与打折优惠
                if (finalItem.baseName !== '旅行背包') {
                    // 应用3级商店的价格调整
                    if (gameData.shop.level >= 2 && gameData.shop.neededItem) {
                        const [neededBaseName] = gameData.shop.neededItem.split('*');
                        if (finalItem.baseName === neededBaseName) {
                            // 价格为300%
                            totalPrice = finalItem.basePrice * amount * 3;
                            finalItem.isPriceIncrease = true;
                            finalItem.priceIncreaseText = '需求价格！';
                        }
                    } else if (!finalItem.isDiscount && !isFreeRefresh) {
                        const randomEvent = Math.random();
                        if (randomEvent < 0.1) { // 10%几率打折
                            totalPrice = finalItem.basePrice * amount * 0.5;
                            finalItem.isDiscount = true;
                            finalItem.discountText = '优惠50%！';
                        } else if (randomEvent < 0.2) { // 10%几率涨价
                            totalPrice = finalItem.basePrice * amount * 1.5;
                            finalItem.isPriceIncrease = true;
                            finalItem.priceIncreaseText = '涨价50%！';
                        }
                    }
                }
                
                // 创建最终物品对象并推入数组
                items.push({
                    baseName: finalItem.baseName,
                    name: `${finalItem.baseName}*${amount}`,
                    amount: amount,
                    price: totalPrice,
                    isBlueprint: finalItem.isBlueprint,
                    isDiscount: finalItem.isDiscount,
                    discountText: finalItem.discountText,
                    isPriceIncrease: finalItem.isPriceIncrease,
                    priceIncreaseText: finalItem.priceIncreaseText,
                    isSpecial: finalItem.isSpecial,
                    effect: finalItem.effect
                });
                }
            }
        }
    }
    
    // 确保至少有3个物品
    while (items.length < 3) {
        const availableItems = itemPool.filter(item => {
            if (item.isBlueprint) {
                // 检查图纸是否已解锁
                // 对于加工台图纸，只有在加工台已解锁时才过滤
                if (item.baseName === '加工台图纸') {
                    return !gameData.workshop.unlocked;
                }
                return !gameData.shop.unlockedBlueprints[item.baseName];
            }
            return true;
        });
        
        if (availableItems.length > 0) {
            // 优先检查是否有优惠产品
            const discountItems = availableItems.filter(item => item.isDiscount);
            
            // 如果有谨慎地矿工效果，只选择打折物品
            if (hasCarefulMinerEffect) {
                if (discountItems.length > 0) {
                    // 从打折物品中随机选择
                    const randomIndex = Math.floor(Math.random() * discountItems.length);
                    const selectedItem = discountItems[randomIndex];
                    // 生成随机数量，特殊物品（如旅行背包）数量固定为1
                    const amount = selectedItem.isBlueprint || selectedItem.isSpecial ? 1 : generateRandomAmount();
                    // 计算总价
                    const totalPrice = selectedItem.basePrice * amount;
                    items.push({ 
                        baseName: selectedItem.baseName,
                        name: `${selectedItem.baseName}*${amount}`,
                        amount: amount,
                        price: totalPrice,
                        isDiscount: selectedItem.isDiscount,
                        discountText: selectedItem.discountText
                    });
                } else {
                    // 如果没有打折物品，创建一个打折物品
                    const randomIndex = Math.floor(Math.random() * availableItems.length);
                    const selectedItem = availableItems[randomIndex];
                    // 生成随机数量，特殊物品（如旅行背包）数量固定为1
                    const amount = selectedItem.isBlueprint || selectedItem.isSpecial ? 1 : generateRandomAmount();
                    // 计算总价
                    const totalPrice = selectedItem.basePrice * amount * 0.5;
                    // 创建打折物品（价格减半）
                    items.push({ 
                        baseName: selectedItem.baseName,
                        name: `${selectedItem.baseName}*${amount}`,
                        amount: amount,
                        price: totalPrice,
                        isDiscount: true,
                        discountText: '优惠50%！'
                    });
                }
            } else if (discountItems.length > 0 && Math.random() < 0.5) {
                // 50%的概率选择优惠产品
                const randomIndex = Math.floor(Math.random() * discountItems.length);
                const selectedItem = discountItems[randomIndex];
                // 生成随机数量，特殊物品（如旅行背包）数量固定为1
                const amount = selectedItem.isBlueprint || selectedItem.isSpecial ? 1 : generateRandomAmount();
                // 计算总价
                const totalPrice = selectedItem.basePrice * amount;
                items.push({ 
                    baseName: selectedItem.baseName,
                    name: `${selectedItem.baseName}*${amount}`,
                    amount: amount,
                    price: totalPrice,
                    isDiscount: selectedItem.isDiscount,
                    discountText: selectedItem.discountText
                });
            } else {
                // 优先选择加工台图纸（如果可用）
                const workshopBlueprint = availableItems.find(item => item.baseName === '加工台图纸');
                if (workshopBlueprint && Math.random() < 0.3) {
                    // 30%的概率选择加工台图纸
                    items.push({ 
                        baseName: workshopBlueprint.baseName,
                        name: workshopBlueprint.baseName,
                        amount: 1,
                        price: workshopBlueprint.basePrice 
                    });
                } else {
                    // 否则随机选择
                    const randomIndex = Math.floor(Math.random() * availableItems.length);
                    let selectedItem = availableItems[randomIndex];
                    
                    // 生成随机数量，特殊物品（如旅行背包）数量固定为1
                    const amount = selectedItem.isBlueprint || selectedItem.isSpecial ? 1 : generateRandomAmount();
                    // 为非优惠产品添加随机打折或涨价
                    let finalItem = { ...selectedItem };
                    let totalPrice = selectedItem.basePrice * amount;
                    
                    // 旅行背包不参与打折优惠
                    if (finalItem.baseName !== '旅行背包') {
                        if (!finalItem.isDiscount) {
                            const randomEvent = Math.random();
                            if (randomEvent < 0.1) { // 10%几率打折
                                totalPrice = finalItem.basePrice * amount * 0.5;
                                finalItem.isDiscount = true;
                                finalItem.discountText = '优惠50%！';
                            } else if (randomEvent < 0.2) { // 10%几率涨价
                                totalPrice = finalItem.basePrice * amount * 1.5;
                                finalItem.isPriceIncrease = true;
                                finalItem.priceIncreaseText = '涨价50%！';
                            }
                        }
                    }
                    
                    items.push({
                        baseName: finalItem.baseName,
                        name: `${finalItem.baseName}*${amount}`,
                        amount: amount,
                        price: totalPrice,
                        isBlueprint: finalItem.isBlueprint,
                        isDiscount: finalItem.isDiscount,
                        discountText: finalItem.discountText,
                        isPriceIncrease: finalItem.isPriceIncrease,
                        priceIncreaseText: finalItem.priceIncreaseText,
                        isSpecial: finalItem.isSpecial,
                        effect: finalItem.effect
                    });
                }
            }
        } else {
            // 如果没有可用物品，添加一个基础物品（棉布）作为默认物品
            items.push({
                baseName: '棉布',
                name: '棉布*100',
                amount: 100,
                price: 4 * 100, // 基础价格4 * 数量100
                probability: 0.2
            });
        }
    }
    
    // 最终保险：确保物品数组至少有3个物品，防止手动刷新后不显示物品
    while (items.length < 3) {
        // 直接添加基础物品，绕过过滤逻辑
        items.push({
            baseName: '棉布',
            name: '棉布*100',
            amount: 100,
            price: 4 * 100, // 基础价格4 * 数量100
            probability: 0.2
        });
    }
    
    gameData.shop.items = items;
    // 只有自动刷新时才重置lastRefresh时间，手动刷新不重置
    if (!isManualRefresh) {
        gameData.shop.lastRefresh = Date.now();
    }
    
    // 更新旅行背包出现状态，用于确保不会连续出现2次
    gameData.shop.lastHadTravelBackpack = items.some(item => item.name === '旅行背包');
    
    // 检查是否有旅行背包，如果有则显示特殊消息
    if (items.some(item => item.name === '旅行背包')) {
        // 创建网页提示
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '50%';
        notification.style.left = '50%';
        notification.style.transform = 'translate(-50%, -50%)';
        notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        notification.style.color = 'gold';
        notification.style.padding = '30px';
        notification.style.borderRadius = '10px';
        notification.style.fontSize = '24px';
        notification.style.fontWeight = 'bold';
        notification.style.zIndex = '9999';
        notification.style.textAlign = 'center';
        notification.style.boxShadow = '0 0 30px gold';
        notification.textContent = '！！！请注意，发现隐藏道具！！！';
        document.body.appendChild(notification);
        
        // 3秒后移除提示
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // 应用4级商店的"自动采购功能"
    // 手动刷新时不立即执行自动采购，让玩家有机会查看和选择物品
    if (gameData.shop.level >= 3 && !isManualRefresh) {
        const itemsToRemove = [];
        items.forEach((item, index) => {
            // 检查是否是非涨价物品
            if (!item.isPriceIncrease) {
                // 提取物品基础名称（去除数量部分）
                let itemBaseName = item.name;
                if (itemBaseName.includes('*')) {
                    itemBaseName = itemBaseName.split('*')[0];
                }
                
                // 检查是否是玩家选择的自动采购物品（通过基础名称匹配）
                const isAutoPurchaseItem = gameData.shop.autoPurchaseItems.some(autoItem => {
                    let autoBaseName = autoItem;
                    if (autoBaseName.includes('*')) {
                        autoBaseName = autoBaseName.split('*')[0];
                    }
                    return autoBaseName === itemBaseName;
                });
                
                if (isAutoPurchaseItem) {
                    // 检查是否是打折物品，如果是则需要用户开启了自动购买打折物品选项
                    if (!item.isDiscount || gameData.shop.autoPurchaseDiscounts) {
                        // 检查金币是否足够
                        if (gameData.player.gold >= item.price) {
                            // 自动购买
                            gameData.player.gold -= item.price;
                            
                            // 处理物品添加
                            let baseItemName = item.name;
                            if (baseItemName.includes('*')) {
                                // 处理批量物品，如"棉布*10"
                                const [name, amountStr] = baseItemName.split('*');
                                baseItemName = name;
                                const amount = parseInt(amountStr);
                                for (let i = 0; i < amount; i++) {
                                    addToBackpack(baseItemName);
                                }
                            } else {
                                // 处理单个物品
                                addToBackpack(baseItemName);
                            }
                            
                            // 记录要移除的物品索引
                            itemsToRemove.push(index);
                            
                            // 显示自动购买消息
                            addMessage(`自动购买了: ${item.name}，消耗${Math.floor(item.price)}金币`);
                        }
                    }
                }
                
                // 自动购买所有打折产品（如果开启了该选项）
                if (gameData.shop.autoPurchaseDiscounts && item.isDiscount && !item.isPriceIncrease && gameData.player.gold >= item.price) {
                    // 检查该物品是否已经被标记为移除
                    if (!itemsToRemove.includes(index)) {
                        // 自动购买
                        gameData.player.gold -= item.price;
                        
                        // 处理物品添加
                        let baseItemName = item.name;
                        if (baseItemName.includes('*')) {
                            // 处理批量物品，如"棉布*10"
                            const [name, amountStr] = baseItemName.split('*');
                            baseItemName = name;
                            const amount = parseInt(amountStr);
                            for (let i = 0; i < amount; i++) {
                                addToBackpack(baseItemName);
                            }
                        } else {
                            // 处理单个物品
                            addToBackpack(baseItemName);
                        }
                        
                        // 记录要移除的物品索引
                        itemsToRemove.push(index);
                        
                        // 显示自动购买消息
                        addMessage(`自动购买了打折物品: ${item.name}，消耗${Math.floor(item.price)}金币`);
                    }
                }
            }
        });
        
        // 从后向前移除物品，避免索引混乱
        itemsToRemove.sort((a, b) => b - a).forEach(index => {
            items.splice(index, 1);
        });
    }
    
    renderShopItems();
    updateShopCountdown();
    updateShopUI();
}

function updateShopCountdown() {
    const countdownElement = document.getElementById('shop-countdown');
    const progressElement = document.getElementById('shop-progress');
    if (!countdownElement || !progressElement) return;
    
    const now = Date.now();
    const elapsed = (now - gameData.shop.lastRefresh) / 1000;
    const remaining = Math.max(0, gameData.shop.refreshTime - elapsed);
    
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const progress = (elapsed / gameData.shop.refreshTime) * 100;
    progressElement.style.width = `${Math.min(progress, 100)}%`;
    
    // 检查2级商店的免费刷新次数
    if (gameData.shop.level >= 1) { // 1级商店对应等级0，2级商店对应等级1
        // 使用maxFreeRefreshes作为免费刷新上限
        if (gameData.shop.freeRefreshes < gameData.shop.maxFreeRefreshes) {
            const freeRefreshElapsed = (now - gameData.shop.lastFreeRefreshTime) / 1000;
            if (freeRefreshElapsed >= 600) { // 10分钟 = 600秒（增加一倍）
                // 增加免费刷新次数
                gameData.shop.freeRefreshes++;
                
                // 更新最后免费刷新时间
                gameData.shop.lastFreeRefreshTime = now;
                
                // 显示获得免费刷新次数的消息
                addMessage('商店自动获得了一次免费刷新次数！');
                
                // 更新商店UI
                updateShopUI();
            }
        }
    }
    
    if (remaining <= 0) {
        refreshShopItems();
    }
}

// 手动刷新商店
function manualRefreshShop() {
    if (gameData.player.gold >= gameData.shop.manualRefreshCost) {
        gameData.player.gold -= gameData.shop.manualRefreshCost;
        refreshShopItems(true); // 传递true表示手动刷新（使用金币）
        updateUI();
        updateShopUI(); // 确保商店UI更新，显示新物品
        addMessage(`手动刷新商店成功，消耗1000金币`);
        updateMessages();
    } else {
        addMessage('金币不足，无法手动刷新商店！');
        updateMessages();
    }
}

// 加工台配方数据
const workshopRecipes = {
    '铜铁合金线': {
        materials: {
            '铜铁合金': 1
        },
        energy: 1,
        description: '用于制作电池的基础材料',
        unlocked: true
    },
    '水晶簇': {
        materials: {
            '水晶矿': 10
        },
        energy: 1,
        description: '用于徽章升级的高级材料',
        unlocked: true
    },
    '电池': {
        materials: {
            '铜铁合金': 5,
            '铜铁合金线': 20,
            '棉布': 10
        },
        energy: 1,
        description: '为加工台提供能量，1个电池提供50点能量',
        unlocked: function() {
            return gameData.shop.unlockedBlueprints['电池图纸'];
        }
    },
    '燃料': {
        materials: {
            '煤矿': 10,
            '铜渣': 2
        },
        energy: 1,
        description: '用于熔炉和矿车的基础燃料',
        unlocked: true
    },
    '优化头灯': {
        materials: {
            '铜铁合金': 1,
            '铜矿': 10,
            '尼龙布': 10
        },
        energy: 1,
        description: '提高头灯效率，减少能量消耗',
        unlocked: true
    },
    '高效助燃剂': {
        materials: {
            '铁矿': 5,
            '银渣': 3,
            '石灰': 2
        },
        energy: 1,
        description: '用于制作高级燃料的助燃剂，能大幅提升燃料的热值和燃烧效率',
        unlocked: true
    },
    '超导燃料': {
        materials: {
            '燃料': 5,
            '高效助燃剂': 3
        },
        energy: 1,
        description: '高级燃料，提供极高温度，适合制作所有合金',
        unlocked: true
    },
    '优化矿车': {
        materials: {
            '铜铁合金': 1,
            '铁矿': 15,
            '木材': 10
        },
        energy: 1,
        description: '提高矿车容量，增加单次采矿量',
        unlocked: true
    },
    '磁铁': {
        materials: {
            '铝矿': 1,
            '镍矿': 1,
            '钴矿': 1,
            '铁矿': 1
        },
        energy: 1,
        description: '用于徽章升级的特殊材料',
        unlocked: function() {
            return gameData.unlockedRecipes && gameData.unlockedRecipes['磁铁配方'];
        }
    },
    // 基础工具插片（仅用于徽章升级）
    'toolSlot1': {
        materials: {
            '磁铁': 5,
            '工具插片碎片': 10
        },
        energy: 1,
        description: '基础工具插片，用于徽章升级和制作各种工具插片',
        unlocked: true
    },
    // 头灯插片
    'headlightSlot': {
        materials: {
            'toolSlot1': 1,
            '电池': 1,
            'headlightTicket': 1
        },
        energy: 1,
        description: '头灯专用插片，用于提升头灯性能',
        unlocked: true
    },
    // 矿车插片
    'cartSlot': {
        materials: {
            'toolSlot1': 1,
            '燃料': 1,
            'cartTicket': 1
        },
        energy: 1,
        description: '矿车专用插片，用于提升矿车性能',
        unlocked: true
    },
    // 采矿锄插片
    'pickaxeSlot': {
        materials: {
            'toolSlot1': 1,
            '磁铁': 1,
            'pickaxeTicket': 1
        },
        energy: 1,
        description: '采矿锄专用插片，用于提升采矿锄性能',
        unlocked: true
    }
};

// 加工台系统相关函数
// 更新加工台UI
function updateWorkshopUI() {
    const workshopElement = document.getElementById('workshop');
    const workshopStatusElement = document.getElementById('workshop-status');
    const workshopItemsElement = document.getElementById('workshop-items');
    const unlockWorkshopBtn = document.getElementById('unlock-workshop');
    
    // 保存当前选择状态
    let selectedRecipe = '铜铁合金线';
    let craftQuantity = 1;
    const existingRecipeSelect = document.getElementById('recipe-select');
    const existingQuantityInput = document.getElementById('craft-quantity');
    if (existingRecipeSelect) {
        selectedRecipe = existingRecipeSelect.value;
    }
    if (existingQuantityInput) {
        craftQuantity = parseInt(existingQuantityInput.value) || 1;
    }
    
    if (workshopStatusElement) {
        if (gameData.workshop.unlocked) {
            // 确保加工台等级存在
            if (!gameData.workshop.level) {
                gameData.workshop.level = 1;
            }
            
            // 获取当前制作物品数量
            const itemsCrafted = gameData.workshop.itemsCrafted || 0;
            
            // 计算升级进度和下一级效果
            let nextLevelItems = 0;
            let nextLevelEffect = '';
            let progress = 0;
            let total = 0;
            
            switch (gameData.workshop.level) {
                case 1:
                    nextLevelItems = 300;
                    nextLevelEffect = '解锁2个电池仓，最大电池能量增加到100';
                    progress = itemsCrafted;
                    total = 300;
                    break;
                case 2:
                    nextLevelItems = 500;
                    nextLevelEffect = '解锁3个电池仓，最大电池能量增加到150';
                    progress = itemsCrafted;
                    total = 500;
                    break;
                case 3:
                    nextLevelItems = 700;
                    nextLevelEffect = '解锁4个电池仓，最大电池能量增加到200';
                    progress = itemsCrafted;
                    total = 700;
                    break;
                case 4:
                    nextLevelItems = 900;
                    nextLevelEffect = '解锁无上限电池仓，可以无限添加电池';
                    progress = itemsCrafted;
                    total = 900;
                    break;
                case 5:
                    nextLevelEffect = '已达到最高等级';
                    progress = 900;
                    total = 900;
                    break;
            }
            
            // 计算进度百分比
            const progressPercent = Math.min(100, Math.round((progress / total) * 100));
            
            // 更新状态显示为等级信息，下一级效果显示在第二行
            workshopStatusElement.innerHTML = `等级: ${gameData.workshop.level}  升级进度: 制造物品数量${progress}/${total} (${progressPercent}%)<br>下一级效果: ${nextLevelEffect}`;
        } else {
            workshopStatusElement.textContent = '(未解锁)';
        }
    }
    
    if (workshopItemsElement) {
        if (gameData.workshop.unlocked) {
            workshopItemsElement.innerHTML = `
                <p>加工台已解锁！现在可以制作中级物品和优化工具。</p>
                <div class="workshop-battery">
                    <h3>电池系统</h3>
                    <div class="battery-info">
                    <p>电池槽: ${Math.ceil(gameData.workshop.batteryEnergy / 50)}/${gameData.workshop.level === 5 ? 200 : (gameData.workshop.level === 4 ? 4 : (gameData.workshop.level === 3 ? 3 : (gameData.workshop.level === 2 ? 2 : 1)))}</p>
                    <p>电池能量: ${gameData.workshop.batteryEnergy}/${gameData.workshop.level === 5 ? 10000 : (gameData.workshop.level === 4 ? 200 : (gameData.workshop.level === 3 ? 150 : (gameData.workshop.level === 2 ? 100 : 50)))}</p>
                    <div class="battery-progress">
                        <div class="battery-progress-bar" style="width: 100%"></div>
                    </div>
                    <button id="install-battery">安装电池 (1个电池提供50点能量)</button>
                </div>
                </div>
                <div class="workshop-crafting">
                    <h3>物品制作</h3>
                    <div class="crafting-controls">
                    <div class="recipe-select">
                        <label for="recipe-select">选择配方:</label>
                        <select id="recipe-select">
                            <option value="铜铁合金线">铜铁合金线</option>
                            <option value="水晶簇">水晶簇</option>
                            <option value="电池">电池</option>
                            <option value="燃料">燃料</option>
                            <option value="高效助燃剂">高效助燃剂</option>
                            <option value="超导燃料">超导燃料</option>
                            <option value="优化头灯">优化头灯</option>
                            <option value="优化矿车">优化矿车</option>
                            <option value="磁铁">磁铁</option>
                        </select>
                    </div>
                        <div class="quantity-input">
                            <label for="craft-quantity">制作数量:</label>
                            <input type="number" id="craft-quantity" min="1" max="50" value="1">
                        </div>
                        <button id="craft-item">开始制作</button>
                    </div>
                    <div class="recipe-info" id="recipe-info">
                        <h4>配方信息</h4>
                        <div id="recipe-details">
                            请选择一个配方查看详细信息
                        </div>
                    </div>
                </div>
                <div class="workshop-stats">
                    <h3>加工台状态</h3>
                    <p>已制作物品: ${gameData.workshop.itemsCrafted}</p>
                </div>
            `;
            
            // 恢复选择状态
            const newRecipeSelect = document.getElementById('recipe-select');
            const newQuantityInput = document.getElementById('craft-quantity');
            if (newRecipeSelect) {
                newRecipeSelect.value = selectedRecipe;
            }
            if (newQuantityInput) {
                newQuantityInput.value = craftQuantity;
            }
            
            // 添加加工台功能按钮的事件监听器
            document.getElementById('install-battery')?.addEventListener('click', installBattery);
            document.getElementById('craft-item')?.addEventListener('click', craftWorkshopItem);
            document.getElementById('recipe-select')?.addEventListener('change', updateRecipeInfo);
            document.getElementById('craft-quantity')?.addEventListener('input', updateRecipeInfo);
            
            // 初始化配方信息
            updateRecipeInfo();
        } else {
            // 获取当前材料数量
            const level = gameData.player.level;
            const blueprintCount = getCurrentItemCount('加工台图纸');
            const woodCount = getCurrentItemCount('木材');
            const linenCount = getCurrentItemCount('粗麻布');
            const alloyCount = getCurrentItemCount('铜铁合金');
            const limeCount = getCurrentItemCount('石灰');
            const batteryCount = getCurrentItemCount('电池');
            
            // 检查是否满足条件
            const levelOk = level >= 15;
            const blueprintOk = blueprintCount >= 1;
            const woodOk = woodCount >= 20;
            const linenOk = linenCount >= 20;
            const alloyOk = alloyCount >= 30;
            const limeOk = limeCount >= 50;
            const batteryOk = batteryCount >= 1;
            
            // 生成材料列表HTML
            let materialsHTML = `
                <p>加工台未解锁，需要以下材料：</p>
                <ul>
                    <li style="color: ${levelOk ? 'green' : 'red'}">等级15 (当前: ${level})</li>
                    <li style="color: ${blueprintOk ? 'green' : 'red'}">加工台图纸 (需要: 1, 当前: ${blueprintCount})</li>
                    <li style="color: ${woodOk ? 'green' : 'red'}">木材 (需要: 20, 当前: ${woodCount})</li>
                    <li style="color: ${linenOk ? 'green' : 'red'}">粗麻布 (需要: 20, 当前: ${linenCount})</li>
                    <li style="color: ${alloyOk ? 'green' : 'red'}">铜铁合金 (需要: 30, 当前: ${alloyCount})</li>
                    <li style="color: ${limeOk ? 'green' : 'red'}">石灰 (需要: 50, 当前: ${limeCount})</li>
                    <li style="color: ${batteryOk ? 'green' : 'red'}">电池 (需要: 1, 当前: ${batteryCount})</li>
                </ul>
            `;
            
            workshopItemsElement.innerHTML = materialsHTML;
        }
    }
    
    // 更新加工台等级信息
    const workshopLevelInfo = document.getElementById('workshop-level-info');
    if (workshopLevelInfo) {
        if (gameData.workshop.unlocked) {
            workshopLevelInfo.style.display = 'block';
            
            // 确保加工台等级存在
            if (!gameData.workshop.level) {
                gameData.workshop.level = 1;
            }
            
            // 获取当前制作物品数量
            const itemsCrafted = gameData.workshop.itemsCrafted || 0;
            
            // 计算升级进度和下一级效果
            let nextLevelItems = 0;
            let nextLevelEffect = '';
            let progress = 0;
            let total = 0;
            
            switch (gameData.workshop.level) {
                case 1:
                    nextLevelItems = 300;
                    nextLevelEffect = '解锁2个电池仓，最大电池能量增加到100';
                    progress = itemsCrafted;
                    total = 300;
                    break;
                case 2:
                    nextLevelItems = 500;
                    nextLevelEffect = '解锁3个电池仓，最大电池能量增加到150';
                    progress = itemsCrafted;
                    total = 500;
                    break;
                case 3:
                    nextLevelItems = 700;
                    nextLevelEffect = '解锁4个电池仓，最大电池能量增加到200';
                    progress = itemsCrafted;
                    total = 700;
                    break;
                case 4:
                    nextLevelItems = 900;
                    nextLevelEffect = '解锁无上限电池仓，可以无限添加电池';
                    progress = itemsCrafted;
                    total = 900;
                    break;
                case 5:
                    nextLevelEffect = '已达到最高等级';
                    progress = 900;
                    total = 900;
                    break;
            }
            
            // 计算进度百分比
            const progressPercent = Math.min(100, Math.round((progress / total) * 100));
            
            // 更新等级信息显示
            const workshopLevelElement = document.getElementById('workshop-level');
            const workshopProgressElement = document.getElementById('workshop-progress');
            const workshopProgressPercentElement = document.getElementById('workshop-progress-percent');
            const workshopNextLevelElement = document.getElementById('workshop-next-level');
            
            if (workshopLevelElement) workshopLevelElement.textContent = gameData.workshop.level;
            if (workshopProgressElement) workshopProgressElement.textContent = `${progress}/${total}`;
            if (workshopProgressPercentElement) workshopProgressPercentElement.textContent = `${progressPercent}%`;
            if (workshopNextLevelElement) workshopNextLevelElement.textContent = nextLevelEffect;
        } else {
            workshopLevelInfo.style.display = 'none';
        }
    }
    
    if (unlockWorkshopBtn) {
        if (gameData.workshop.unlocked) {
            unlockWorkshopBtn.style.display = 'none'; // 解锁后隐藏按钮
        } else {
            unlockWorkshopBtn.textContent = '解锁加工台 (需要等级15和加工台图纸)';
            unlockWorkshopBtn.disabled = false;
            unlockWorkshopBtn.style.display = 'inline-block'; // 未解锁时显示按钮
        }
    }
}

// 获取当前物品数量的辅助函数
function getCurrentItemCount(itemName) {
    let count = 0;
    for (const [name, itemCount] of Object.entries(gameData.backpack.items)) {
        const baseName = name.split('_')[0];
        if (baseName === itemName) {
            count += itemCount;
        }
    }
    return count;
}

function unlockWorkshop() {
    if (gameData.player.level >= 15 && hasEnoughItem('加工台图纸', 1) && !gameData.workshop.unlocked) {
        // 消耗加工台图纸
        consumeItem('加工台图纸', 1);
        
        // 消耗其他材料
        const materials = {
            '木材': 20,
            '粗麻布': 20,
            '铜铁合金': 30,
            '石灰': 50,
            '电池': 1
        };
        
        let canCraft = true;
        let missingMaterials = [];
        for (const [material, amount] of Object.entries(materials)) {
            if (!hasEnoughItem(material, amount)) {
                canCraft = false;
                missingMaterials.push(`${material}: ${amount}`);
            }
        }
        
        if (canCraft) {
            for (const [material, amount] of Object.entries(materials)) {
                consumeItem(material, amount);
            }
            
            gameData.workshop.unlocked = true;
            // 强制设置电池槽为1
            gameData.workshop.batterySlot = 1;
            // 确保其他电池系统属性正确设置
            gameData.workshop.batteryEnergy = 0;
            gameData.workshop.maxBatteryEnergy = 50;
            // 标记加工台图纸为已解锁，避免商店再次刷新
            gameData.shop.unlockedBlueprints['加工台图纸'] = true;
            addMessage('加工台已解锁！现在可以制作中级物品和优化工具。');
            addMessage('加工台图纸已使用并标记为已解锁，商店将不再刷新此图纸。');
            addMessage('加工台已配备电池槽，可安装电池供能！');
            addMessage('1个电池可提供50点能量，每制作1个物品消耗1点能量。');
            updateMessages();
            updateBackpackDisplay();
            updateWorkshopUI(); // 更新加工台UI
            saveGame(); // 保存游戏状态
        } else {
            // 恢复加工台图纸
            addToBackpack('加工台图纸');
            addMessage(`材料不足，无法解锁加工台！缺少: ${missingMaterials.join(', ')}`);
            updateMessages();
        }
    } else if (gameData.player.level < 15) {
        addMessage('等级不足，需要等级15才能解锁加工台！');
        updateMessages();
    } else if (!hasEnoughItem('加工台图纸', 1)) {
        addMessage('缺少加工台图纸，无法解锁加工台！');
        updateMessages();
    } else if (gameData.workshop.unlocked) {
        // 确保加工台已解锁但电池槽为0的情况也能正常工作
        if (gameData.workshop.batterySlot === 0) {
            gameData.workshop.batterySlot = 1;
            addMessage('加工台电池槽已修复！现在可以安装电池供能。');
            updateWorkshopUI();
            saveGame();
        } else {
            addMessage('加工台已经解锁了！');
        }
        updateMessages();
    }
}

// 制作铜铁合金线
function craftBatteryWire() {
    // 检查电池能量
    if (!hasEnoughBatteryEnergy(1)) {
        addMessage('电池能量不足，无法制作铜铁合金线！');
        updateMessages();
        return;
    }
    
    const materials = {
        '铜铁合金': 1
    };
    
    let canCraft = true;
    for (const [material, amount] of Object.entries(materials)) {
        if (!hasEnoughItem(material, amount)) {
            canCraft = false;
            break;
        }
    }
    
    if (canCraft) {
        for (const [material, amount] of Object.entries(materials)) {
            consumeItem(material, amount);
        }
        
        // 消耗电池能量
        consumeBatteryEnergy(1);
        
        // 将铜铁合金线添加到背包中
        addToBackpack('铜铁合金线');
        
        // 更新加工台状态
        gameData.workshop.itemsCrafted++;
        
        addMessage('铜铁合金线制作成功！');
        updateMessages();
        updateBackpackDisplay();
        updateWorkshopUI();
    } else {
        addMessage('材料不足，无法制作铜铁合金线！');
        updateMessages();
    }
}

// 检查电池能量是否足够
function hasEnoughBatteryEnergy(amount) {
    // 检查是否有电池槽
    if (gameData.workshop.batterySlot <= 0) {
        return false;
    }
    // 检查能量是否足够
    return gameData.workshop.batteryEnergy >= amount;
}

// 消耗电池能量
function consumeBatteryEnergy(amount) {
    gameData.workshop.batteryEnergy -= amount;
    // 如果能量不足，检查是否有备用电池
    if (gameData.workshop.batteryEnergy < 0) {
        gameData.workshop.batteryEnergy = 0;
    }
    // 更新加工台UI
    updateWorkshopUI();
}

// 材料名称映射（英文到中文）
const materialNameMap = {
    'toolSlot1': '基础工具插片',
    'pickaxeSlot': '采矿锄插片',
    'cartSlot': '矿车插片',
    'headlightSlot': '头灯插片',
    'pickaxeTicket': '矿锄等级提升券',
    'cartTicket': '矿车等级提升券',
    'headlightTicket': '头灯等级提升券',
    'forgeDelegate': '锻造委托',
    'magicEquipment': '魔法装备'
};

// 材料获得方法
const materialSources = {
    '木材': '商店购买',
    '煤炭': '熔炉制作（煤矿*1 → 煤炭*2）',
    '硫磺': '挖铜矿随机获得',
    '铜铁合金': '熔炉制作（铜矿*2 + 铁矿*2）',
    '铜铁合金线': '加工台制作（铜铁合金*1）',
    '棉布': '挖石矿随机获得',
    '铜矿': '等级15级以上开采',
    '尼龙布': '挖铜矿随机获得',
    '铁矿': '等级10级以上开采',
    '粗麻布': '挖煤矿随机获得',
    '工具插片碎片': '4级及以上矿工工作时5%概率获得',
    'toolSlot1': '加工台制作（磁铁*5 + 工具插片碎片*10）',
    '铝矿': '加工台制作（钴矿*2 + 镍矿*2 + 铜矿*1）',
    '镍矿': '直接从镍矿脉开采获得',
    '钴矿': '直接从钴矿脉开采获得',
    '石矿': '等级1级以上开采',
    '煤矿': '等级5级以上开采',
    '银矿': '等级20级以上开采',
    '白金矿': '等级25级以上开采',
    '金矿': '等级30级以上开采',
    '水晶矿': '等级35级以上开采',
    '织布': '挖铁矿随机获得',
    '银质粉末': '加工台制作（银矿*1）',
    '白金粉末': '加工台制作（白金矿*1）',
    '金砖': '加工台制作（金矿*1）',
    'pickaxeTicket': '4级及以上矿工工作时5%概率获得',
    'cartTicket': '4级及以上矿工工作时5%概率获得',
    'headlightTicket': '4级及以上矿工工作时5%概率获得',
    '水晶簇': '加工台制作（水晶矿*1）',
    '磁铁': '加工台制作（铝矿*1 + 镍矿*1 + 钴矿*1 + 铁矿*1）',
    '燃料': '加工台制作（煤矿*10 + 铜渣*2）',
    '铜渣': '开采铜矿30%概率获得，或合金制作产生',
    '银渣': '开采银矿30%概率获得，或合金制作产生',
    '石灰': '熔炉制作（石矿*1）',
    '高效助燃剂': '加工台制作（铁矿*5 + 银渣*3 + 石灰*2）',
    '超导燃料': '加工台制作（燃料*5 + 高效助燃剂*3）',
    '铜矿渣': '铜渣的别名，开采铜矿30%概率获得，或合金制作产生',
    '棉布包': '加工台制作（棉布*20）',
    '织布包': '加工台制作（织布*20）',
    '粗麻布包': '加工台制作（粗麻布*20）',
    '尼龙布包': '加工台制作（尼龙布*20）',
    '旅行背包': '加工台制作（尼龙布*30 + 木材*10）',
    'forgeDelegate': '完成特殊任务获得',
    'magicEquipment': '完成特殊任务获得',
    '皮革': '商店购买',
    '布料': '商店购买',
    '魔法水晶': '商店购买',
    '龙鳞': '完成高级任务获得',
    '布': '商店购买',
    '链甲': '商店购买',
    '板甲': '商店购买',
    '燃料': '加工台制作（煤矿*10 + 铜渣*2）',
    '铜渣': '开采铜矿30%概率获得，或合金制作产生',
    '银渣': '开采银矿30%概率获得，或合金制作产生',
    '石灰': '熔炉制作（石矿*1）',
    '高效助燃剂': '加工台制作（铁矿*5 + 银渣*3 + 石灰*2）',
    '超导燃料': '加工台制作（燃料*5 + 高效助燃剂*3）'
};

// 更新配方信息显示
function updateRecipeInfo() {
    const recipeSelect = document.getElementById('recipe-select');
    const recipeDetails = document.getElementById('recipe-details');
    
    if (recipeSelect && recipeDetails) {
        const selectedRecipe = recipeSelect.value;
        const recipe = workshopRecipes[selectedRecipe];
        
        if (recipe) {
            // 计算总能量需求
        const quantityInput = document.getElementById('craft-quantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        let totalEnergyRequired;
        if (selectedRecipe === '铜铁合金线') {
            // 制作合金线时消耗的能量和消耗的合金数量一样多
            const copperIronAlloyNeeded = quantity / 10;
            totalEnergyRequired = copperIronAlloyNeeded;
        } else {
            // 其他物品按正常方式计算能量需求
            totalEnergyRequired = recipe.energy * quantity;
        }
            
            // 生成材料列表HTML
            let materialsHTML = '<ul>';
            if (selectedRecipe === '铜铁合金线') {
                // 特殊处理铜铁合金线的材料显示
                if (quantity < 10) {
                    materialsHTML += `<li style="color: red">铜铁合金线每次最少制作10个！</li>`;
                } else if (quantity % 10 !== 0) {
                    materialsHTML += `<li style="color: red">铜铁合金线的制作数量必须是10的倍数！</li>`;
                } else {
                const copperIronAlloyNeeded = quantity / 10;
                const currentAmount = getCurrentItemCount('铜铁合金');
                const hasEnough = currentAmount >= copperIronAlloyNeeded;
                const source = materialSources['铜铁合金'] || '未知';
                materialsHTML += `<li style="color: ${hasEnough ? 'green' : 'red'}">铜铁合金: ${copperIronAlloyNeeded} (当前: ${currentAmount}) <span style="font-size: 0.8em; color: #666;">(${source})</span></li>`;
                materialsHTML += `<li style="color: blue">每10个铜铁合金线消耗1个铜铁合金</li>`;
                materialsHTML += `<li style="color: blue">消耗能量: ${copperIronAlloyNeeded} (与消耗的合金数量相同)</li>`;
            }
            } else {
                // 普通配方的材料显示
                for (const [material, amount] of Object.entries(recipe.materials)) {
                    const requiredAmount = amount * quantity;
                    const currentAmount = getCurrentItemCount(material);
                    const hasEnough = currentAmount >= requiredAmount;
                    const source = materialSources[material] || '未知';
                    // 将英文材料名称转换为中文
                    const materialName = materialNameMap[material] || material;
                    materialsHTML += `<li style="color: ${hasEnough ? 'green' : 'red'}">${materialName}: ${requiredAmount} (当前: ${currentAmount}) <span style="font-size: 0.8em; color: #666;">(${source})</span></li>`;
                }
            }
            materialsHTML += '</ul>';
            
            // 生成配方信息HTML
            const recipeTitle = materialNameMap[selectedRecipe] || selectedRecipe;
            recipeDetails.innerHTML = `
                <h5>${recipeTitle}</h5>
                <p>${recipe.description}</p>
                <h6>所需材料:</h6>
                ${materialsHTML}
                <p>能量需求: ${totalEnergyRequired} (当前能量: ${gameData.workshop.batteryEnergy})</p>
            `;
        } else {
            recipeDetails.innerHTML = '<p>请选择一个配方查看详细信息</p>';
        }
    }
}

// 加工台物品制作函数
function craftWorkshopItem() {
    const recipeSelect = document.getElementById('recipe-select');
    const quantityInput = document.getElementById('craft-quantity');
    
    if (recipeSelect && quantityInput) {
        const selectedRecipe = recipeSelect.value;
        const quantity = parseInt(quantityInput.value);
        const recipe = workshopRecipes[selectedRecipe];
        
        if (recipe) {
            // 特殊处理铜铁合金线
            let actualQuantity = quantity;
            let actualMaterials = recipe.materials;
            
            if (selectedRecipe === '铜铁合金线') {
                // 每次最少制作10个，且数量必须是10的倍数
                if (quantity < 10) {
                    addMessage('铜铁合金线每次最少制作10个！');
                    updateMessages();
                    return;
                }
                if (quantity % 10 !== 0) {
                    addMessage('铜铁合金线的制作数量必须是10的倍数！');
                    updateMessages();
                    return;
                }
                
                // 每10个铜铁合金线消耗1个铜铁合金
                const copperIronAlloyNeeded = quantity / 10;
                actualMaterials = {
                    '铜铁合金': copperIronAlloyNeeded
                };
            } else if (selectedRecipe === '煤炭') {
                // 制作煤炭最小熟练为2，且数量必须为2的倍数
                if (gameData.tools.pickaxe.level < 2) {
                    addMessage('制作煤炭需要采矿锄等级2！');
                    updateMessages();
                    return;
                }
                if (quantity < 2) {
                    addMessage('制作煤炭每次最少制作2个！');
                    updateMessages();
                    return;
                }
                if (quantity % 2 !== 0) {
                    addMessage('制作煤炭的数量必须是2的倍数！');
                    updateMessages();
                    return;
                }
                
                // 1个煤矿产出2个煤炭，所以需要的煤矿数量是quantity/2
                const coalOreNeeded = quantity / 2;
                actualMaterials = {
                    '煤矿': coalOreNeeded
                };
            } else {
                // 其他物品：根据制作数量计算材料需求
                let calculatedMaterials = {};
                for (const [material, baseAmount] of Object.entries(recipe.materials)) {
                    calculatedMaterials[material] = baseAmount * quantity;
                }
                actualMaterials = calculatedMaterials;
            }
            
            // 检查电池能量
            let totalEnergyRequired;
            if (selectedRecipe === '铜铁合金线') {
                // 制作合金线时消耗的能量和消耗的合金数量一样多
                const copperIronAlloyNeeded = Math.ceil(quantity / 10);
                totalEnergyRequired = copperIronAlloyNeeded;
            } else {
                // 其他物品按正常方式计算能量需求
                totalEnergyRequired = recipe.energy * actualQuantity;
            }
            if (!hasEnoughBatteryEnergy(totalEnergyRequired)) {
                addMessage(`电池能量不足，需要${totalEnergyRequired}点能量！`);
                updateMessages();
                return;
            }
            
            // 先检查工具是否已经优化过（针对优化头灯和优化矿车）
            if (selectedRecipe === '优化头灯' || selectedRecipe === '优化矿车') {
                if (selectedRecipe === '优化头灯') {
                    // 检查是否已经优化过
                    if (gameData.tools.headlight.optimized) {
                        addMessage('头灯已经优化过了，只能优化一次！');
                        updateMessages();
                        return;
                    }
                } else if (selectedRecipe === '优化矿车') {
                    // 检查是否已经优化过
                    if (gameData.tools.cart.optimized) {
                        addMessage('矿车已经优化过了，只能优化一次！');
                        updateMessages();
                        return;
                    }
                }
            }
            
            // 检查材料
            let canCraft = true;
            let missingMaterials = [];
            for (const [material, amount] of Object.entries(actualMaterials)) {
                if (!hasEnoughItem(material, amount)) {
                    canCraft = false;
                    missingMaterials.push(`${material}: ${amount}`);
                }
            }
            
            if (canCraft) {
                // 消耗材料
                let consumeSuccess = true;
                for (const [material, amount] of Object.entries(actualMaterials)) {
                    if (!consumeItem(material, amount)) {
                        consumeSuccess = false;
                        break;
                    }
                }
                
                if (!consumeSuccess) {
                    addMessage(`材料不足，无法制作${selectedRecipe}！`);
                    updateMessages();
                    return;
                }
                
                // 消耗电池能量
                consumeBatteryEnergy(totalEnergyRequired);
                
                // 添加制作的物品到背包
                if (selectedRecipe === '优化头灯' || selectedRecipe === '优化矿车') {
                    // 工具优化不需要添加物品到背包，而是直接更新工具状态
                    if (selectedRecipe === '优化头灯') {
                        gameData.tools.headlight.optimized = true; // 标记为已优化
                        gameData.tools.headlight.batterySlot = true; // 解锁电池仓
                        addMessage('头灯优化成功！解锁电池仓1个。');
                    } else if (selectedRecipe === '优化矿车') {
                        gameData.tools.cart.optimized = true; // 标记为已优化
                        gameData.tools.cart.fuelTank = true; // 解锁燃料箱
                        addMessage('矿车优化成功！解锁燃料箱1个。');
                    }
                } else {
                    // 添加物品到背包
                    for (let i = 0; i < actualQuantity; i++) {
                        addToBackpack(selectedRecipe);
                    }
                    addMessage(`${selectedRecipe}制作成功！`);
                }
                
                // 更新加工台状态
                gameData.workshop.itemsCrafted += actualQuantity;
                
                // 检查加工台是否需要升级
                checkWorkshopUpgrade();
                
                updateMessages();
                updateBackpackDisplay();
                updateWorkshopUI();
                updateUI(); // 自动更新工具状态显示
                saveGame();
            } else {
                addMessage(`材料不足，无法制作${selectedRecipe}！缺少: ${missingMaterials.join(', ')}`);
                updateMessages();
            }
        }
    }
}

// 检查加工台是否需要升级
function checkWorkshopUpgrade() {
    const itemsCrafted = gameData.workshop.itemsCrafted;
    
    // 确保加工台等级属性存在
    if (!gameData.workshop.level) {
        gameData.workshop.level = 1;
    }
    
    // 检查是否达到升级条件
    if (itemsCrafted >= 900 && gameData.workshop.level < 5) {
        // 升级到5级：200个电池仓
        gameData.workshop.level = 5;
        gameData.workshop.batterySlot = 200;
        gameData.workshop.maxBatteryEnergy = 200 * 50; // 200个电池 * 50点能量/电池 = 10000点能量
        addMessage('加工台升级到5级！解锁200个电池仓，可以添加最多200个电池！');
    } else if (itemsCrafted >= 700 && gameData.workshop.level < 4) {
        // 升级到4级：4个电池仓，200电池能量
        gameData.workshop.level = 4;
        gameData.workshop.batterySlot = 4;
        gameData.workshop.maxBatteryEnergy = 200;
        addMessage('加工台升级到4级！解锁4个电池仓，最大电池能量增加到200！');
    } else if (itemsCrafted >= 500 && gameData.workshop.level < 3) {
        // 升级到3级：3个电池仓，150电池能量
        gameData.workshop.level = 3;
        gameData.workshop.batterySlot = 3;
        gameData.workshop.maxBatteryEnergy = 150;
        addMessage('加工台升级到3级！解锁3个电池仓，最大电池能量增加到150！');
    } else if (itemsCrafted >= 300 && gameData.workshop.level < 2) {
        // 升级到2级：2个电池仓，100电池能量
        gameData.workshop.level = 2;
        gameData.workshop.batterySlot = 2;
        gameData.workshop.maxBatteryEnergy = 100;
        addMessage('加工台升级到2级！解锁2个电池仓，最大电池能量增加到100！');
    }
}

// 添加燃料到矿车燃料舱
function addCartFuel() {
    if (gameData.tools.cart && gameData.tools.cart.crafted) {
        // 检查是否有走丢的矿车效果
        const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
        if (hasLostCartEffect) {
            alert('矿车走丢了！暂时无法添加燃料。');
            return;
        }
        if (!gameData.tools.cart.optimized) {
            alert('矿车尚未优化！需要先在加工台优化矿车才能添加燃料。');
            return;
        }
        const fuelType = gameData.tools.cart.fuelType || 'coal';
        const fuelItem = fuelType === 'coal' ? '煤矿' : '燃料';
        
        // 检查背包中是否有燃料
        if (hasEnoughItem(fuelItem, 1)) {
            // 计算可以添加的燃料量
            const fuelCapacity = gameData.tools.cart.fuelCapacity || 50;
            const currentFuel = gameData.tools.cart.currentFuel || 0;
            const fuelNeeded = fuelCapacity - currentFuel;
            
            if (fuelNeeded > 0) {
                // 消耗1个燃料
                consumeItem(fuelItem, 1);
                
                // 根据燃料类型添加相应的燃料量
                let fuelToAdd = 1;
                if (fuelType === 'fuel') {
                    fuelToAdd = 50; // 高级燃料提供50次消耗
                }
                
                // 更新燃料舱
                gameData.tools.cart.currentFuel = Math.min(currentFuel + fuelToAdd, fuelCapacity);
                
                // 恢复矿车使用状态
                if (!gameData.tools.cart.active) {
                    gameData.tools.cart.active = true;
                    addMessage('矿车已恢复使用！');
                }
                
                addMessage(`成功添加${fuelItem}到燃料舱！当前燃料：${gameData.tools.cart.currentFuel}/${fuelCapacity}`);
                updateMessages();
                updateUI();
                saveGame();
            } else {
                addMessage('燃料舱已满，无法添加更多燃料！');
                updateMessages();
            }
        } else {
            addMessage(`背包中没有${fuelItem}！`);
            updateMessages();
        }
    } else {
        alert('矿车尚未制作！');
    }
}

// 安装电池到加工台
function installBattery() {
    // 检查并修复电池槽
    if (gameData.workshop.batterySlot <= 0) {
        gameData.workshop.batterySlot = 1;
        addMessage('加工台电池槽已修复！现在可以安装电池供能。');
        updateMessages();
        saveGame();
    }
    
    if (hasEnoughItem('电池', 1)) {
        // 根据加工台等级计算正确的电池槽和最大能量
        const correctBatterySlot = gameData.workshop.level === 5 ? 200 : 
                                   gameData.workshop.level === 4 ? 4 : 
                                   gameData.workshop.level === 3 ? 3 : 
                                   gameData.workshop.level === 2 ? 2 : 1;
        const correctMaxEnergy = gameData.workshop.level === 5 ? 10000 : 
                                gameData.workshop.level === 4 ? 200 : 
                                gameData.workshop.level === 3 ? 150 : 
                                gameData.workshop.level === 2 ? 100 : 50;
        
        // 检查当前安装的电池数量是否超过最大电池槽
        const currentBatteries = Math.ceil(gameData.workshop.batteryEnergy / 50);
        if (currentBatteries >= correctBatterySlot) {
            addMessage('电池槽已满，无法安装更多电池！');
            updateMessages();
            return;
        }
        
        // 检查当前能量是否已满
        if (gameData.workshop.batteryEnergy >= correctMaxEnergy) {
            addMessage('电池能量已满，无法安装更多电池！');
            updateMessages();
            return;
        }
        
        // 消耗电池
        consumeItem('电池', 1);
        // 增加能量
        const energyToAdd = 50; // 1个电池提供50点能量
        gameData.workshop.batteryEnergy = Math.min(gameData.workshop.batteryEnergy + energyToAdd, correctMaxEnergy);
        addMessage('电池安装成功！获得50点能量。');
        updateMessages();
        updateBackpackDisplay();
        updateWorkshopUI();
        saveGame();
    } else {
        addMessage('没有足够的电池！');
        updateMessages();
    }
}

// 电池和燃料系统相关函数
function craftBattery() {
    // 检查电池能量
    if (!hasEnoughBatteryEnergy(1)) {
        addMessage('电池能量不足，无法制作电池！');
        updateMessages();
        return;
    }
    
    if (!gameData.shop.unlockedBlueprints['电池图纸']) {
        addMessage('未解锁电池图纸，无法制作电池！');
        updateMessages();
        return;
    }
    
    const materials = {
        '铜铁合金': 5,
        '铜铁合金线': 20,
        '棉布': 10
    };
    
    let canCraft = true;
    for (const [material, amount] of Object.entries(materials)) {
        if (!hasEnoughItem(material, amount)) {
            canCraft = false;
            break;
        }
    }
    
    if (canCraft) {
        for (const [material, amount] of Object.entries(materials)) {
            consumeItem(material, amount);
        }
        
        // 消耗电池能量
        consumeBatteryEnergy(1);
        
        // 将电池添加到背包中
        addToBackpack('电池');
        
        // 更新加工台状态
        gameData.workshop.itemsCrafted++;
        
        addMessage('电池制作成功！');
        updateMessages();
        updateBackpackDisplay();
        updateWorkshopUI();
    } else {
        addMessage('材料不足，无法制作电池！');
        updateMessages();
    }
}

function craftFuel() {
    // 检查电池能量
    if (!hasEnoughBatteryEnergy(1)) {
        addMessage('电池能量不足，无法制作燃料！');
        updateMessages();
        return;
    }
    
    if (!gameData.shop.unlockedBlueprints['燃料配方']) {
        addMessage('未解锁燃料配方，无法制作燃料！');
        updateMessages();
        return;
    }
    
    const materials = {
        '木材': 10,
        '棉布': 10,
        '煤矿': 5
    };
    
    let canCraft = true;
    for (const [material, amount] of Object.entries(materials)) {
        if (!hasEnoughItem(material, amount)) {
            canCraft = false;
            break;
        }
    }
    
    if (canCraft) {
        for (const [material, amount] of Object.entries(materials)) {
            consumeItem(material, amount);
        }
        
        // 消耗电池能量
        consumeBatteryEnergy(1);
        
        // 将燃料添加到背包中
        addToBackpack('燃料');
        
        // 更新加工台状态
        gameData.workshop.itemsCrafted++;
        
        addMessage('燃料制作成功！');
        updateMessages();
        updateBackpackDisplay();
        updateWorkshopUI();
    } else {
        addMessage('材料不足，无法制作燃料！');
        updateMessages();
    }
}

// 工具优化相关函数
function optimizeTool(toolName) {
    if (toolName === 'headlight') {
        // 优化头灯
        const materials = {
            '铜铁合金': 1,
            '铜矿': 10,
            '尼龙布': 10
        };
        
        let canOptimize = true;
        for (const [material, amount] of Object.entries(materials)) {
            if (!gameData.backpack.items[material] || gameData.backpack.items[material] < amount) {
                canOptimize = false;
                break;
            }
        }
        
        if (canOptimize) {
            for (const [material, amount] of Object.entries(materials)) {
                gameData.backpack.items[material] -= amount;
                if (gameData.backpack.items[material] <= 0) {
                    delete gameData.backpack.items[material];
                }
            }
            
            // 标记头灯已优化
            gameData.tools.headlight.optimized = true;
            addMessage('头灯优化成功！解锁电池仓1个。');
            updateMessages();
            generateBackpack();
            updateUI(); // 自动更新工具状态显示
        } else {
            addMessage('材料不足，无法优化头灯！');
            updateMessages();
        }
    } else if (toolName === 'cart') {
        // 优化矿车
        const materials = {
            '铜铁合金': 1,
            '铁矿': 15,
            '木材': 10
        };
        
        let canOptimize = true;
        for (const [material, amount] of Object.entries(materials)) {
            if (!gameData.backpack.items[material] || gameData.backpack.items[material] < amount) {
                canOptimize = false;
                break;
            }
        }
        
        if (canOptimize) {
            for (const [material, amount] of Object.entries(materials)) {
                gameData.backpack.items[material] -= amount;
                if (gameData.backpack.items[material] <= 0) {
                    delete gameData.backpack.items[material];
                }
            }
            
            // 标记矿车已优化
            gameData.tools.cart.optimized = true;
            addMessage('矿车优化成功！解锁燃料箱1个。');
            updateMessages();
            generateBackpack();
            updateUI(); // 自动更新工具状态显示
        } else {
            addMessage('材料不足，无法优化矿车！');
            updateMessages();
        }
    }
}

// 消耗品不可出售的限制
function isConsumable(itemName) {
    const consumables = ['电池', '燃料', '木材'];
    return consumables.includes(itemName);
}

// 更新商店倒计时
setInterval(updateShopCountdown, 1000);

// 添加商店刷新按钮事件监听器
document.addEventListener('DOMContentLoaded', function() {
    const refreshShopBtn = document.getElementById('refresh-shop');
    if (refreshShopBtn) {
        refreshShopBtn.addEventListener('click', manualRefreshShop);
    }
});

// 安装电池到头灯电池仓
function installHeadlightBattery() {
    if (gameData.tools.headlight && gameData.tools.headlight.crafted && gameData.tools.headlight.optimized) {
        // 确保头灯属性完整
        if (!gameData.tools.headlight.fuelType) gameData.tools.headlight.fuelType = 'gold';
        if (!gameData.tools.headlight.batteryEnergy) gameData.tools.headlight.batteryEnergy = 0;
        if (!gameData.tools.headlight.maxBatteryEnergy) gameData.tools.headlight.maxBatteryEnergy = 300;
        if (!gameData.tools.headlight.lastBatteryUpdate) gameData.tools.headlight.lastBatteryUpdate = Date.now();
        
        // 检查背包中是否有电池
        if (hasEnoughItem('电池', 1)) {
            // 计算可以添加的电池能量
            const energyNeeded = gameData.tools.headlight.maxBatteryEnergy - gameData.tools.headlight.batteryEnergy;
            
            if (energyNeeded > 0) {
                // 消耗1个电池
                consumeItem('电池', 1);
                
                // 1个电池提供300秒能量
                let energyToAdd = 300;
                
                // 更新电池能量
                gameData.tools.headlight.batteryEnergy = Math.min(gameData.tools.headlight.batteryEnergy + energyToAdd, gameData.tools.headlight.maxBatteryEnergy);
                gameData.tools.headlight.lastBatteryUpdate = Date.now();
                
                // 恢复头灯使用状态
                if (!gameData.tools.headlight.active) {
                    gameData.tools.headlight.active = true;
                    addMessage('头灯已恢复使用！');
                }
                
                addMessage(`成功安装电池到头灯电池仓！当前能量：${gameData.tools.headlight.batteryEnergy}/${gameData.tools.headlight.maxBatteryEnergy}秒`);
                updateMessages();
                updateUI();
                saveGame();
            } else {
                addMessage('电池仓能量已满，无法安装更多电池！');
                updateMessages();
            }
        } else {
            addMessage('背包中没有电池！');
            updateMessages();
        }
    } else if (!gameData.tools.headlight || !gameData.tools.headlight.crafted) {
        alert('头灯尚未制作！');
    } else if (!gameData.tools.headlight.optimized) {
        alert('头灯尚未优化，无法安装电池！');
    }
}

// 更新工具的倒计时和进度条
function updateToolProgress() {
    // 更新头灯
    if (gameData.tools.headlight && gameData.tools.headlight.crafted && gameData.tools.headlight.active) {
        // 确保头灯属性完整
        if (!gameData.tools.headlight.fuelType) gameData.tools.headlight.fuelType = 'gold';
        if (!gameData.tools.headlight.batteryEnergy) gameData.tools.headlight.batteryEnergy = 0;
        if (!gameData.tools.headlight.lastGoldConsume) gameData.tools.headlight.lastGoldConsume = Date.now();
        if (!gameData.tools.headlight.lastBatteryUpdate) gameData.tools.headlight.lastBatteryUpdate = Date.now();
        
        if (gameData.tools.headlight.fuelType === 'battery') {
            // 检查是否有闪电蓄能效果
            const hasLightningCharge = gameData.activeEffects && gameData.activeEffects.lightningCharge && gameData.activeEffects.lightningCharge.active;
            
            // 更新电池能量
            const now = Date.now();
            const timeSinceLast = now - gameData.tools.headlight.lastBatteryUpdate;
            gameData.tools.headlight.lastBatteryUpdate = now;
            
            if (hasLightningCharge) {
                // 闪电蓄能效果：持续为电池充电，不消耗能量
                // 确保头灯属性完整
                if (!gameData.tools.headlight.maxBatteryEnergy) gameData.tools.headlight.maxBatteryEnergy = 300;
                
                // 每秒钟充电10点能量
                const chargeAmount = (timeSinceLast / 1000) * 10;
                gameData.tools.headlight.batteryEnergy = Math.min(
                    gameData.tools.headlight.maxBatteryEnergy,
                    gameData.tools.headlight.batteryEnergy + chargeAmount
                );
            } else {
                // 正常情况：消耗电池能量
                gameData.tools.headlight.batteryEnergy = Math.max(0, gameData.tools.headlight.batteryEnergy - (timeSinceLast / 1000));
            }
            
            // 检查电池能量是否耗尽
            if (gameData.tools.headlight.batteryEnergy <= 0) {
                // 尝试从背包中自动添加电池
                if (hasEnoughItem('电池', 1)) {
                    // 消耗背包中的电池
                    consumeItem('电池', 1);
                    // 添加300秒能量到电池仓
                    gameData.tools.headlight.batteryEnergy = 300;
                    // 更新电池更新时间
                    gameData.tools.headlight.lastBatteryUpdate = now;
                    addMessage('电池能量耗尽，已自动从背包中添加电池！');
                    updateMessages();
                    updateUI();
                    saveGame();
                } else {
                    // 背包中也没有电池，自动停用头灯
                    gameData.tools.headlight.active = false;
                    addMessage('电池能量耗尽，背包中也没有电池，头灯已自动停止使用！请添加电池。');
                    updateMessages();
                    updateUI();
                    saveGame();
                }
            }
        }
    }
    
    // 更新矿车
    if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.active) {
        // 矿车的燃料消耗已经在采矿时处理
        // 这里只需要确保状态正确
    }
}

// 更新工具的UI元素
function updateToolUI() {
    // 更新头灯UI
    if (gameData.tools.headlight && gameData.tools.headlight.crafted && gameData.tools.headlight.active) {
        // 确保头灯属性完整
        if (!gameData.tools.headlight.fuelType) gameData.tools.headlight.fuelType = 'gold';
        if (!gameData.tools.headlight.batteryEnergy) gameData.tools.headlight.batteryEnergy = 0;
        if (!gameData.tools.headlight.lastGoldConsume) gameData.tools.headlight.lastGoldConsume = Date.now();
        if (!gameData.tools.headlight.lastBatteryUpdate) gameData.tools.headlight.lastBatteryUpdate = Date.now();
        if (!gameData.tools.headlight.maxBatteryEnergy) gameData.tools.headlight.maxBatteryEnergy = 300;
        
        // 更新UI
        const headlightCountdown = document.getElementById('headlight-fuel-countdown');
        const headlightProgress = document.getElementById('headlight-fuel-progress');
        if (headlightCountdown && headlightProgress) {
            if (gameData.tools.headlight.fuelType === 'battery') {
                headlightCountdown.textContent = `${Math.round(gameData.tools.headlight.batteryEnergy)}秒`;
                const progressPercentage = (gameData.tools.headlight.batteryEnergy / gameData.tools.headlight.maxBatteryEnergy) * 100;
                headlightProgress.style.width = `${Math.max(0, progressPercentage)}%`;
            } else {
                const now = Date.now();
                const lastConsume = gameData.tools.headlight.lastGoldConsume || now;
                const timeSinceLast = now - lastConsume;
                const currentTimeLeft = Math.max(0, 30000 - timeSinceLast);
                const goldCount = gameData.player.gold;
                const totalTimeLeft = Math.floor(goldCount / 10) * 30;
                headlightCountdown.textContent = `${Math.round(currentTimeLeft / 1000)}秒 / 总可用: ${totalTimeLeft}秒`;
                const progressPercentage = (currentTimeLeft / 30000) * 100;
                headlightProgress.style.width = `${Math.max(0, progressPercentage)}%`;
            }
        }
    } else {
        // 头灯未激活时，重置UI
        const headlightCountdown = document.getElementById('headlight-fuel-countdown');
        const headlightProgress = document.getElementById('headlight-fuel-progress');
        if (headlightCountdown && headlightProgress) {
            headlightCountdown.textContent = '0秒';
            headlightProgress.style.width = '0%';
        }
    }
    
    // 检查背包中是否有金手套，显示开启按钮
    const hasGoldenGlove = hasEnoughItem('金手套', 1);
    const pickaxeUpgradeBtn = document.getElementById('upgrade-pickaxe');
    
    // 移除旧的开启金手套按钮
    const oldGoldenGloveBtn = document.getElementById('activate-golden-glove-btn');
    if (oldGoldenGloveBtn) {
        oldGoldenGloveBtn.remove();
    }
    
    // 添加新的开启金手套按钮
    if (hasGoldenGlove && pickaxeUpgradeBtn) {
        const goldenGloveBtn = document.createElement('button');
        goldenGloveBtn.id = 'activate-golden-glove-btn';
        goldenGloveBtn.textContent = '开启金手套';
        goldenGloveBtn.style.marginLeft = '10px';
        goldenGloveBtn.style.padding = '5px 10px';
        goldenGloveBtn.style.backgroundColor = '#ffd700';
        goldenGloveBtn.style.color = '#856404';
        goldenGloveBtn.style.border = '1px solid #ffc107';
        goldenGloveBtn.style.borderRadius = '3px';
        goldenGloveBtn.style.cursor = 'pointer';
        goldenGloveBtn.addEventListener('click', () => {
            // 消耗一个金手套
            consumeItem('金手套', 1);
            // 激活金手套效果
            activateGoldenGlove();
            // 更新UI
            updateUI();
            updateBackpackDisplay();
        });
        pickaxeUpgradeBtn.parentNode.appendChild(goldenGloveBtn);
    }
    
    // 更新矿车UI
    if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.active) {
        // 确保矿车属性完整
        if (!gameData.tools.cart.fuelType) gameData.tools.cart.fuelType = 'coal';
        if (!gameData.tools.cart.currentFuel) gameData.tools.cart.currentFuel = 0;
        if (!gameData.tools.cart.fuelCapacity) gameData.tools.cart.fuelCapacity = 50;
        
        // 更新UI
        const cartCountdown = document.getElementById('cart-fuel-countdown');
        const cartProgress = document.getElementById('cart-fuel-progress');
        if (cartCountdown && cartProgress) {
            if (gameData.tools.cart.fuelType === 'fuel') {
                // 高级燃料模式
                cartCountdown.textContent = `${gameData.tools.cart.currentFuel}次`;
                const progressPercentage = (gameData.tools.cart.currentFuel / gameData.tools.cart.fuelCapacity) * 100;
                cartProgress.style.width = `${Math.max(0, progressPercentage)}%`;
            } else {
                // 煤矿模式
                // 计算背包中的煤矿数量
                let coalCount = 0;
                for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
                    const baseName = itemName.split('_')[0];
                    if (baseName === '煤矿') {
                        coalCount += count;
                    }
                }
                for (const [itemName, count] of Object.entries(gameData.tempBackpack.items)) {
                    const baseName = itemName.split('_')[0];
                    if (baseName === '煤矿') {
                        coalCount += count;
                    }
                }
                cartCountdown.textContent = `${coalCount}个`;
                const progressPercentage = Math.min(100, (coalCount / 50) * 100); // 假设50个煤矿为满
                cartProgress.style.width = `${Math.max(0, progressPercentage)}%`;
            }
        }
    } else {
        // 矿车未激活时，重置UI
        const cartCountdown = document.getElementById('cart-fuel-countdown');
        const cartProgress = document.getElementById('cart-fuel-progress');
        if (cartCountdown && cartProgress) {
            cartCountdown.textContent = '0';
            cartProgress.style.width = '0%';
        }
    }
}

// 金手套相关函数
function activateGoldenGlove() {
    const now = Date.now();
    if (gameData.goldenGlove.active) {
        // 时间可叠加
        gameData.goldenGlove.endTime += 3 * 60 * 1000; // 增加3分钟
    } else {
        // 首次激活
        gameData.goldenGlove.active = true;
        gameData.goldenGlove.endTime = now + 3 * 60 * 1000; // 3分钟后结束
    }
    
    addMessage('金手套效果激活！3分钟内获得经验提高1000%！');
    updateGoldenGloveUI();
    saveGame();
}

function updateGoldenGloveUI() {
    // 检查金手套效果是否激活
    const now = Date.now();
    if (gameData.goldenGlove.active && now < gameData.goldenGlove.endTime) {
        const remainingTime = gameData.goldenGlove.endTime - now;
        const totalTime = 3 * 60 * 1000;
        const progress = 100 - (remainingTime / totalTime) * 100;
        
        // 创建或更新金手套进度条
        let progressContainer = document.getElementById('golden-glove-progress');
        if (!progressContainer) {
            progressContainer = document.createElement('div');
            progressContainer.id = 'golden-glove-progress';
            progressContainer.style.marginTop = '10px';
            progressContainer.style.padding = '10px';
            progressContainer.style.backgroundColor = '#fff3cd';
            progressContainer.style.border = '1px solid #ffeeba';
            progressContainer.style.borderRadius = '5px';
            
            const pickaxeUpgradeBtn = document.getElementById('upgrade-pickaxe');
            if (pickaxeUpgradeBtn) {
                pickaxeUpgradeBtn.parentNode.appendChild(progressContainer);
            }
        }
        
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        
        progressContainer.innerHTML = `
            <div style="font-weight: bold; color: #856404;">金手套效果</div>
            <div style="color: #856404;">经验获得提高1000%！</div>
            <div style="margin-top: 5px; height: 10px; background-color: #fff;">
                <div style="height: 100%; width: ${progress}%; background-color: #ffd700; transition: width 1s linear;"></div>
            </div>
            <div style="margin-top: 5px; font-size: 12px; color: #856404;">
                剩余时间: ${minutes}:${seconds.toString().padStart(2, '0')}
            </div>
        `;
    } else {
        // 效果结束，移除进度条
        const progressContainer = document.getElementById('golden-glove-progress');
        if (progressContainer) {
            progressContainer.remove();
        }
        gameData.goldenGlove.active = false;
        saveGame();
    }
}

// 应用金手套经验加成
function applyGoldenGloveExpBonus(baseExp) {
    if (gameData.goldenGlove.active && Date.now() < gameData.goldenGlove.endTime) {
        return baseExp * 11; // 1000%加成，即11倍经验
    }
    return baseExp;
}

// 显示存钱罐发现弹窗
function showPiggyBankPopup() {
    // 再次检查是否有活跃的存钱罐效果，确保有效果时不显示新的弹窗
    const hasActiveEffect = gameData.activeEffects && Object.values(gameData.activeEffects).some(effect => effect.active);
    if (hasActiveEffect) {
        return; // 如果有活跃效果，不再显示新的存钱罐
    }
    
    // 检查是否已经有存钱罐弹窗显示
    if (document.querySelector('.piggy-bank-popup')) {
        return; // 如果已经有弹窗，不再重复创建
    }
    
    // 检查页面是否可见
    if (document.hidden) {
        // 如果页面不可见，延迟显示弹窗，直到页面可见
        // 先检查是否已经有visibilitychange事件监听器，避免堆叠
        const existingListener = document.querySelector('.piggy-bank-visibility-listener');
        if (existingListener) {
            return; // 如果已经有监听器，不再重复添加
        }
        
        // 添加一个标记，防止重复添加事件监听器
        const listenerMarker = document.createElement('div');
        listenerMarker.className = 'piggy-bank-visibility-listener';
        listenerMarker.style.display = 'none';
        document.body.appendChild(listenerMarker);
        
        const checkVisibility = () => {
            if (!document.hidden) {
                // 页面可见后，再次检查是否有活跃效果
                const hasActiveEffect = gameData.activeEffects && Object.values(gameData.activeEffects).some(effect => effect.active);
                if (!hasActiveEffect) {
                    // 只有在没有活跃效果时才显示弹窗
                    createAndShowPopup();
                }
                // 无论是否显示弹窗，都移除事件监听和标记
                document.removeEventListener('visibilitychange', checkVisibility);
                listenerMarker.remove();
            }
        };
        
        // 添加页面可见性变化事件监听
        document.addEventListener('visibilitychange', checkVisibility);
        return;
    }
    
    // 页面可见，直接创建并显示弹窗
    createAndShowPopup();
}

// 实际创建和显示弹窗的辅助函数
function createAndShowPopup() {
    // 创建弹窗容器
    const popup = document.createElement('div');
    popup.className = 'piggy-bank-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '30px';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
    popup.style.zIndex = '10000';
    popup.style.textAlign = 'center';
    popup.style.minWidth = '300px';
    popup.style.pointerEvents = 'auto'; // 确保弹窗可以接收点击事件
    
    // 弹窗内容
    popup.innerHTML = `
        <h2 style="margin-top: 0; color: #333;">发现存钱罐！</h2>
        <p style="margin-bottom: 20px; color: #666;">你在挖掘铜矿时发现了一个神秘的存钱罐，是否要打开它？</p>
        <div style="margin-bottom: 15px; font-size: 14px; color: #999;">(1分钟内未选择将自动选择不打开)</div>
        <div style="display: flex; justify-content: space-around; gap: 10px;">
            <button class="open-piggy-btn" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">打开</button>
            <button class="leave-piggy-btn" style="padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">不打开</button>
        </div>
    `;
    
    // 添加到文档
    document.body.appendChild(popup);
    
    // 设置1分钟定时器，自动选择不打开
    const timer = setTimeout(() => {
        // 不打开存钱罐，获得谨慎地矿工效果
        applyCarefulMinerEffect();
        // 先移除弹窗，再更新UI，确保渲染正确
        popup.remove();
        // 使用setTimeout确保UI更新在DOM渲染周期中执行
        setTimeout(() => {
            generateMineralGrid();
            updateUI();
            
            // 如果有正在进行的连续采矿，恢复其UI显示
            if (continuousMining && currentContinuousMineral) {
                // 延迟一小段时间，确保DOM已经更新
                setTimeout(() => {
                    // 重新查找矿物元素和进度条
                    const mineralEl = document.querySelector(`[data-name="${currentContinuousMineral}"]`);
                    if (mineralEl) {
                        const mineBtn = mineralEl.querySelector('.mine-btn');
                        const continuousBtn = mineralEl.querySelector('.continuous-mine-btn');
                        const progressContainer = mineralEl.querySelector('.progress-container');
                        const progressFill = mineralEl.querySelector('.progress-fill');
                        const countdown = mineralEl.querySelector('.countdown');
                        
                        if (mineBtn && continuousBtn && progressContainer && progressFill && countdown) {
                            // 更新按钮状态
                            mineBtn.disabled = true;
                            continuousBtn.textContent = '停止连续开采';
                            continuousBtn.disabled = false;
                            
                            // 显示进度容器
                            progressContainer.style.display = 'block';
                            
                            // 重新计算加速效果
                            const mineral = minerals.find(m => m.name === currentContinuousMineral);
                            if (mineral) {
                                // 检查是否有丢失矿锄效果
                                const hasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
                                const pickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
                                let pickaxeBonus = 0;
                                
                                if (!hasLostPickaxeEffect) {
                                    if (pickaxeLevel < 40) {
                                        // 40级以前：每5级一个阶段，每个阶段增加9%的加速效果
                                        const stage = Math.min(8, Math.floor(pickaxeLevel / 5) + 1);
                                        pickaxeBonus = stage * 0.09;
                                    } else {
                                        // 40级以后：每级增加0.5%的加速效果
                                        const baseBonus = 0.72; // 40级时的基础加速效果（8个阶段 × 9%）
                                        const additionalBonus = (pickaxeLevel - 39) * 0.005;
                                        pickaxeBonus = baseBonus + additionalBonus;
                                    }
                                    
                                    // 最高加速效果限制在90%
                                    pickaxeBonus = Math.min(0.9, pickaxeBonus);
                                }
                                const actualTime = mineral.baseTime * (1 - pickaxeBonus);
                                
                                // 更新进度条和倒计时
                                const progress = Math.min(100, (continuousElapsedTime / (actualTime * 1000)) * 100);
                                const remaining = Math.max(0, actualTime - (continuousElapsedTime / 1000));
                                progressFill.style.width = `${progress}%`;
                                countdown.textContent = `${remaining.toFixed(2)}s`;
                            }
                        }
                    }
                }, 100);
            }
        }, 0);
    }, 60000); // 1分钟 = 60000毫秒
    
    // 通用清理函数
    function cleanup() {
        clearTimeout(timer);
        popup.remove();
    }
    
    // 在当前弹窗中查找按钮，而不是在整个文档中查找
    const openBtn = popup.querySelector('.open-piggy-btn');
    const leaveBtn = popup.querySelector('.leave-piggy-btn');
    
    // 使用onclick事件，避免事件监听堆叠
    openBtn.onclick = function() {
        // 打开存钱罐
        openPiggyBank();
        // 先关闭弹窗，再更新UI，确保渲染正确
        cleanup();
        // 使用setTimeout确保UI更新在DOM渲染周期中执行
        setTimeout(() => {
            generateMineralGrid();
            updateUI();
            
            // 如果有正在进行的连续采矿，恢复其UI显示
            if (continuousMining && currentContinuousMineral) {
                // 延迟一小段时间，确保DOM已经更新
                setTimeout(() => {
                    // 重新查找矿物元素和进度条
                    const mineralEl = document.querySelector(`[data-name="${currentContinuousMineral}"]`);
                    if (mineralEl) {
                        const mineBtn = mineralEl.querySelector('.mine-btn');
                        const continuousBtn = mineralEl.querySelector('.continuous-mine-btn');
                        const progressContainer = mineralEl.querySelector('.progress-container');
                        const progressFill = mineralEl.querySelector('.progress-fill');
                        const countdown = mineralEl.querySelector('.countdown');
                        
                        if (mineBtn && continuousBtn && progressContainer && progressFill && countdown) {
                            // 更新按钮状态
                            mineBtn.disabled = true;
                            continuousBtn.textContent = '停止连续开采';
                            continuousBtn.disabled = false;
                            
                            // 显示进度容器
                            progressContainer.style.display = 'block';
                            
                            // 重新计算加速效果
                            const mineral = minerals.find(m => m.name === currentContinuousMineral);
                            if (mineral) {
                                // 检查是否有丢失矿锄效果
                                const hasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
                                const pickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
                                let pickaxeBonus = 0;
                                
                                if (!hasLostPickaxeEffect) {
                                    if (pickaxeLevel < 40) {
                                        // 40级以前：每5级一个阶段，每个阶段增加9%的加速效果
                                        const stage = Math.min(8, Math.floor(pickaxeLevel / 5) + 1);
                                        pickaxeBonus = stage * 0.09;
                                    } else {
                                        // 40级以后：每级增加0.5%的加速效果
                                        const baseBonus = 0.72; // 40级时的基础加速效果（8个阶段 × 9%）
                                        const additionalBonus = (pickaxeLevel - 39) * 0.005;
                                        pickaxeBonus = baseBonus + additionalBonus;
                                    }
                                    
                                    // 最高加速效果限制在90%
                                    pickaxeBonus = Math.min(0.9, pickaxeBonus);
                                }
                                const actualTime = mineral.baseTime * (1 - pickaxeBonus);
                                
                                // 更新进度条和倒计时
                                const progress = Math.min(100, (continuousElapsedTime / (actualTime * 1000)) * 100);
                                const remaining = Math.max(0, actualTime - (continuousElapsedTime / 1000));
                                progressFill.style.width = `${progress}%`;
                                countdown.textContent = `${remaining.toFixed(2)}s`;
                            }
                        }
                    }
                }, 100);
            }
        }, 0);
    };
    
    leaveBtn.onclick = function() {
        // 不打开存钱罐，获得谨慎地矿工效果
        applyCarefulMinerEffect();
        // 先关闭弹窗，再更新UI，确保渲染正确
        cleanup();
        // 使用setTimeout确保UI更新在DOM渲染周期中执行
        setTimeout(() => {
            generateMineralGrid();
            updateUI();
            
            // 如果有正在进行的连续采矿，恢复其UI显示
            if (continuousMining && currentContinuousMineral) {
                // 延迟一小段时间，确保DOM已经更新
                setTimeout(() => {
                    // 重新查找矿物元素和进度条
                    const mineralEl = document.querySelector(`[data-name="${currentContinuousMineral}"]`);
                    if (mineralEl) {
                        const mineBtn = mineralEl.querySelector('.mine-btn');
                        const continuousBtn = mineralEl.querySelector('.continuous-mine-btn');
                        const progressContainer = mineralEl.querySelector('.progress-container');
                        const progressFill = mineralEl.querySelector('.progress-fill');
                        const countdown = mineralEl.querySelector('.countdown');
                        
                        if (mineBtn && continuousBtn && progressContainer && progressFill && countdown) {
                            // 更新按钮状态
                            mineBtn.disabled = true;
                            continuousBtn.textContent = '停止连续开采';
                            continuousBtn.disabled = false;
                            
                            // 显示进度容器
                            progressContainer.style.display = 'block';
                            
                            // 重新计算加速效果
                            const mineral = minerals.find(m => m.name === currentContinuousMineral);
                            if (mineral) {
                                // 检查是否有丢失矿锄效果
                                const hasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
                                const pickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
                                let pickaxeBonus = 0;
                                
                                if (!hasLostPickaxeEffect) {
                                    if (pickaxeLevel < 40) {
                                        // 40级以前：每5级一个阶段，每个阶段增加9%的加速效果
                                        const stage = Math.min(8, Math.floor(pickaxeLevel / 5) + 1);
                                        pickaxeBonus = stage * 0.09;
                                    } else {
                                        // 40级以后：每级增加0.5%的加速效果
                                        const baseBonus = 0.72; // 40级时的基础加速效果（8个阶段 × 9%）
                                        const additionalBonus = (pickaxeLevel - 39) * 0.005;
                                        pickaxeBonus = baseBonus + additionalBonus;
                                    }
                                    
                                    // 最高加速效果限制在90%
                                    pickaxeBonus = Math.min(0.9, pickaxeBonus);
                                }
                                const actualTime = mineral.baseTime * (1 - pickaxeBonus);
                                
                                // 更新进度条和倒计时
                                const progress = Math.min(100, (continuousElapsedTime / (actualTime * 1000)) * 100);
                                const remaining = Math.max(0, actualTime - (continuousElapsedTime / 1000));
                                progressFill.style.width = `${progress}%`;
                                countdown.textContent = `${remaining.toFixed(2)}s`;
                            }
                        }
                    }
                }, 100);
            }
        }, 0);
    };
}

// 打开存钱罐，随机获得一种效果
function openPiggyBank() {
    const random = Math.random();
    const now = Date.now();
    
    if (random < 0.2) {
        // 第一种：随机获得1~5000金币
        const goldAmount = Math.floor(Math.random() * 5000) + 1;
        gameData.player.gold += goldAmount;
        showEffectNotification(`恭喜获得金币奖励！获得 ${goldAmount} 金币。`);
        addMessage(`获得金币奖励：${goldAmount} 金币！`);
    } else if (random < 0.4) {
        // 第二种：获得5分钟铁匠祝福效果，提升所有配方的爆率5%
        gameData.activeEffects.blacksmithBlessing = {
            active: true,
            startTime: now,
            endTime: now + 5 * 60 * 1000,
            description: '铁匠祝福效果，所有配方的爆率+5%'
        };
        showEffectNotification('恭喜获得祝福效果：铁匠祝福效果，该效果使所有配方的爆率提升5%，持续5分钟。');
        addMessage('获得铁匠祝福效果：所有配方的爆率+5%，持续5分钟！');
        // 立即更新矿物列表，显示铁匠祝福效果
        generateMineralGrid();
        
        // 如果有正在进行的连续采矿，恢复其UI显示
        if (continuousMining && currentContinuousMineral) {
            // 延迟一小段时间，确保DOM已经更新
            setTimeout(() => {
                // 重新查找矿物元素和进度条
                const mineralEl = document.querySelector(`[data-name="${currentContinuousMineral}"]`);
                if (mineralEl) {
                    const mineBtn = mineralEl.querySelector('.mine-btn');
                    const continuousBtn = mineralEl.querySelector('.continuous-mine-btn');
                    const progressContainer = mineralEl.querySelector('.progress-container');
                    const progressFill = mineralEl.querySelector('.progress-fill');
                    const countdown = mineralEl.querySelector('.countdown');
                    
                    if (mineBtn && continuousBtn && progressContainer && progressFill && countdown) {
                        // 更新按钮状态
                        mineBtn.disabled = true;
                        continuousBtn.textContent = '停止连续开采';
                        continuousBtn.disabled = false;
                        
                        // 显示进度容器
                        progressContainer.style.display = 'block';
                        
                        // 重新计算加速效果
                        const mineral = minerals.find(m => m.name === currentContinuousMineral);
                        if (mineral) {
                            // 检查是否有丢失矿锄效果
                            const hasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
                            const pickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
                            let pickaxeBonus = 0;
                            
                            if (!hasLostPickaxeEffect) {
                                if (pickaxeLevel < 40) {
                                    const stage = Math.min(8, Math.floor(pickaxeLevel / 5) + 1);
                                    pickaxeBonus = stage * 0.09;
                                } else {
                                    const baseBonus = 0.72;
                                    const additionalBonus = (pickaxeLevel - 39) * 0.005;
                                    pickaxeBonus = baseBonus + additionalBonus;
                                }
                                pickaxeBonus = Math.min(0.9, pickaxeBonus);
                            }
                            
                            const actualTime = mineral.baseTime * (1 - pickaxeBonus);
                            
                            // 更新进度条和倒计时
                            const progress = Math.min(100, (continuousElapsedTime / (actualTime * 1000)) * 100);
                            const remaining = Math.max(0, actualTime - (continuousElapsedTime / 1000));
                            progressFill.style.width = `${progress}%`;
                            countdown.textContent = `${remaining.toFixed(2)}s`;
                        }
                    }
                }
            }, 100);
        }
        
        updateUI();
    } else if (random < 0.6) {
        // 第三种：丢失矿锄效果，矿锄的效果强制消失1分钟
        gameData.activeEffects.lostPickaxe = {
            active: true,
            startTime: now,
            endTime: now + 1 * 60 * 1000,
            description: '丢失矿锄效果，矿锄的效果强制消失1分钟'
        };
        showEffectNotification('获得负面效果：丢失矿锄效果，该效果使矿锄的效果强制消失1分钟。', true);
        addMessage('获得丢失矿锄效果：矿锄的效果强制消失1分钟！');
    } else if (random < 0.8) {
        // 第四种：走丢的矿车效果，矿车的效果强制消失1分钟
        gameData.activeEffects.lostCart = {
            active: true,
            startTime: now,
            endTime: now + 1 * 60 * 1000,
            description: '走丢的矿车效果，矿车的效果强制消失1分钟'
        };
        showEffectNotification('获得负面效果：走丢的矿车效果，该效果使矿车的效果强制消失1分钟。', true);
        addMessage('获得走丢的矿车效果：矿车的效果强制消失1分钟！');
    } else {
        // 第五种：闪电蓄能，持续为电池充电且不消耗能量，头灯无消耗运作1分钟
        gameData.activeEffects.lightningCharge = {
            active: true,
            startTime: now,
            endTime: now + 1 * 60 * 1000,
            description: '闪电蓄能效果，持续为电池充电且不消耗能量，头灯无消耗运作1分钟'
        };
        showEffectNotification('恭喜获得祝福效果：闪电蓄能效果，该效果持续为电池充电且不消耗能量，头灯无消耗运作1分钟。');
        addMessage('获得闪电蓄能效果：持续为电池充电且不消耗能量，头灯无消耗运作1分钟！');
    }
    
    // 保存游戏数据
    saveGame();
}

// 应用谨慎地矿工效果
function applyCarefulMinerEffect() {
    const now = Date.now();
    
    // 1分钟内所出售的物品售价翻倍，商店中只会刷出打折物品
    gameData.activeEffects.carefulMiner = {
        active: true,
        startTime: now,
        endTime: now + 1 * 60 * 1000,
        description: '谨慎地矿工效果，出售物品售价翻倍，商店只刷出打折物品'
    };
    
    showEffectNotification('获得谨慎地矿工效果：1分钟内所出售的物品售价翻倍，商店中只会刷出打折物品。');
    addMessage('获得谨慎地矿工效果：出售物品售价翻倍，商店只刷出打折物品，持续1分钟！');
    
    // 保存游戏数据
    saveGame();
}

// 检查活跃效果是否过期
function checkActiveEffects() {
    if (!gameData.activeEffects) return;
    
    const now = Date.now();
    let effectsExpired = false;
    
    // 遍历所有效果，检查是否过期
    for (const effectName in gameData.activeEffects) {
        const effect = gameData.activeEffects[effectName];
        if (effect.active && effect.endTime && now > effect.endTime) {
            // 效果过期
            effect.active = false;
            effectsExpired = true;
            showEffectNotification(`效果已结束：${effect.description}`);
            addMessage(`效果已结束：${effect.description}`);
        }
    }
    
    // 如果有效果过期，保存游戏数据
    if (effectsExpired) {
        saveGame();
    }
}

// 设置定时器定期检查效果
setInterval(checkActiveEffects, 1000); // 每秒检查一次

// 显示效果生效时的网页提示
function showEffectNotification(message, isNegative = false) {
    // 创建提示元素
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = isNegative ? '#f44336' : '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '10000';
    notification.style.fontSize = '14px';
    notification.style.maxWidth = '300px';
    notification.style.wordWrap = 'break-word';
    notification.style.animation = 'slideIn 0.3s ease-out';
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // 3秒后移除提示
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
}

// 修改定时器，同时更新进度和UI
setInterval(() => {
    updateToolProgress();
    updateToolUI();
    updateGoldenGloveUI();
    updateActiveEffects();
    updateEffectsUI();
}, 1000); // 每秒更新一次

// 更新活跃效果
function updateActiveEffects() {
    const now = Date.now();
    let effectsChanged = false;
    
    if (!gameData.activeEffects) return;
    
    // 检查所有活跃效果是否过期
    for (const [effectName, effect] of Object.entries(gameData.activeEffects)) {
        if (effect.active && now > effect.endTime) {
            effect.active = false;
            addMessage(`${effect.description} 效果已结束！`);
            effectsChanged = true;
        }
    }
    
    // 移除已结束的效果
    for (const [effectName, effect] of Object.entries(gameData.activeEffects)) {
        if (!effect.active) {
            delete gameData.activeEffects[effectName];
            effectsChanged = true;
        }
    }
    
    // 如果效果发生变化，更新UI
    if (effectsChanged) {
        // 更新矿物网格，确保采矿时间和效果正确显示
        generateMineralGrid();
        
        // 如果有正在进行的连续采矿，恢复其UI显示
        if (continuousMining && currentContinuousMineral) {
            // 延迟一小段时间，确保DOM已经更新
            setTimeout(() => {
                // 重新查找矿物元素和进度条
                const mineralEl = document.querySelector(`[data-name="${currentContinuousMineral}"]`);
                if (mineralEl) {
                    const mineBtn = mineralEl.querySelector('.mine-btn');
                    const continuousBtn = mineralEl.querySelector('.continuous-mine-btn');
                    const progressContainer = mineralEl.querySelector('.progress-container');
                    const progressFill = mineralEl.querySelector('.progress-fill');
                    const countdown = mineralEl.querySelector('.countdown');
                    
                    if (mineBtn && continuousBtn && progressContainer && progressFill && countdown) {
                        // 更新按钮状态
                        mineBtn.disabled = true;
                        continuousBtn.textContent = '停止连续开采';
                        continuousBtn.disabled = false;
                        
                        // 显示进度容器
                        progressContainer.style.display = 'block';
                        
                        // 重新计算加速效果
                        const mineral = minerals.find(m => m.name === currentContinuousMineral);
                        if (mineral) {
                            // 检查是否有丢失矿锄效果
                            const hasLostPickaxeEffect = gameData.activeEffects && gameData.activeEffects.lostPickaxe && gameData.activeEffects.lostPickaxe.active;
                            const pickaxeLevel = gameData.tools.pickaxe ? gameData.tools.pickaxe.level : 0;
                            let pickaxeBonus = 0;
                            
                            if (!hasLostPickaxeEffect) {
                                if (pickaxeLevel < 40) {
                                    const stage = Math.min(8, Math.floor(pickaxeLevel / 5) + 1);
                                    pickaxeBonus = stage * 0.09;
                                } else {
                                    const baseBonus = 0.72;
                                    const additionalBonus = (pickaxeLevel - 39) * 0.005;
                                    pickaxeBonus = baseBonus + additionalBonus;
                                }
                                pickaxeBonus = Math.min(0.9, pickaxeBonus);
                            }
                            
                            const actualTime = mineral.baseTime * (1 - pickaxeBonus);
                            
                            // 更新进度条和倒计时
                            const progress = Math.min(100, (continuousElapsedTime / (actualTime * 1000)) * 100);
                            const remaining = Math.max(0, actualTime - (continuousElapsedTime / 1000));
                            progressFill.style.width = `${progress}%`;
                            countdown.textContent = `${remaining.toFixed(2)}s`;
                        }
                    }
                }
            }, 100);
        }
        
        // 更新UI
        updateUI();
        saveGame();
    }
}

// 在玩家信息边上显示效果倒计时和进度条
function updateEffectsUI() {
    const now = Date.now();
    
    if (!gameData.activeEffects) return;
    
    // 找到玩家信息区域
    const playerInfoContainer = document.querySelector('.player-info');
    if (!playerInfoContainer) return;
    
    // 清除现有的效果UI
    const existingEffectsUI = document.getElementById('active-effects-ui');
    if (existingEffectsUI) {
        existingEffectsUI.remove();
    }
    
    // 检查是否有活跃效果
    const activeEffects = Object.values(gameData.activeEffects).filter(effect => effect.active);
    if (activeEffects.length === 0) return;
    
    // 创建效果UI容器
    const effectsUIContainer = document.createElement('div');
    effectsUIContainer.id = 'active-effects-ui';
    effectsUIContainer.style.marginTop = '15px';
    effectsUIContainer.style.padding = '10px';
    effectsUIContainer.style.backgroundColor = '#f8f9fa';
    effectsUIContainer.style.border = '1px solid #dee2e6';
    effectsUIContainer.style.borderRadius = '5px';
    
    // 添加标题
    const title = document.createElement('h4');
    title.textContent = '活跃效果';
    title.style.marginTop = '0';
    title.style.marginBottom = '10px';
    title.style.fontSize = '14px';
    effectsUIContainer.appendChild(title);
    
    // 添加每个效果的进度条
    activeEffects.forEach(effect => {
        const effectContainer = document.createElement('div');
        effectContainer.style.marginBottom = '10px';
        
        const effectName = document.createElement('div');
        effectName.textContent = effect.description;
        effectName.style.fontSize = '12px';
        effectName.style.marginBottom = '5px';
        effectContainer.appendChild(effectName);
        
        const progressBarContainer = document.createElement('div');
        progressBarContainer.style.height = '8px';
        progressBarContainer.style.backgroundColor = '#e9ecef';
        progressBarContainer.style.borderRadius = '4px';
        progressBarContainer.style.overflow = 'hidden';
        
        const progressBar = document.createElement('div');
        const remainingTime = effect.endTime - now;
        const totalTime = effect.endTime - effect.startTime;
        const progress = 100 - (remainingTime / totalTime) * 100;
        
        progressBar.style.height = '100%';
        progressBar.style.width = `${progress}%`;
        progressBar.style.backgroundColor = '#4CAF50';
        progressBar.style.transition = 'width 1s linear';
        
        progressBarContainer.appendChild(progressBar);
        effectContainer.appendChild(progressBarContainer);
        
        const timeRemaining = document.createElement('div');
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        timeRemaining.textContent = `剩余时间: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        timeRemaining.style.fontSize = '10px';
        timeRemaining.style.marginTop = '3px';
        timeRemaining.style.color = '#6c757d';
        effectContainer.appendChild(timeRemaining);
        
        effectsUIContainer.appendChild(effectContainer);
    });
    
    // 添加到玩家信息区域
    playerInfoContainer.appendChild(effectsUIContainer);
}

// 计算采矿锄的加速效果
function calculatePickaxeBonus(level) {
    let bonus = 0;
    
    if (level < 40) {
        // 40级以前：每5级一个阶段，每个阶段增加9%的加速效果
        const stage = Math.min(8, Math.floor(level / 5) + 1);
        bonus = stage * 9;
    } else {
        // 40级以后：每级增加0.5%的加速效果
        const baseBonus = 72; // 40级时的基础加速效果（8个阶段 × 9%）
        const additionalBonus = (level - 39) * 0.5;
        bonus = baseBonus + additionalBonus;
    }
    
    // 最高加速效果限制在90%
    return Math.min(90, bonus).toFixed(1);
}

window.addEventListener('DOMContentLoaded', initGame);

