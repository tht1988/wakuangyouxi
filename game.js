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
            unlockTickets: 0 // 等级提升券数量
        },
        cart: {
            crafted: false,
            level: 0,
            exp: 0,
            fuelTank: false, // 燃料箱解锁状态
            optimized: false, // 优化标记，只能优化一次
            maxLevel: 50, // 初始等级上限
            unlockTickets: 0 // 等级提升券数量
        },
        headlight: {
            crafted: false,
            level: 0,
            exp: 0,
            batterySlot: false, // 电池仓解锁状态
            optimized: false, // 优化标记，只能优化一次
            maxLevel: 50, // 初始等级上限
            unlockTickets: 0 // 等级提升券数量
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
                { level: 1, materials: { '铜矿': 100, '金币': 5000 } },
                { level: 2, materials: { '铁矿': 150, '金币': 10000 } },
                { level: 3, materials: { '钴矿': 200, '金币': 20000 } },
                { level: 4, materials: { '镍矿': 250, '金币': 30000 } },
                { level: 5, materials: { '银矿': 300, '金币': 50000 } },
                { level: 6, materials: { '白金矿': 350, '金币': 80000 } },
                { level: 7, materials: { '金矿': 400, '金币': 120000 } },
                { level: 8, materials: { '水晶矿': 450, '金币': 180000 } },
                { level: 9, materials: { '水晶矿': 500, '金币': 250000 } },
                { level: 10, materials: { '水晶矿': 600, '金币': 350000 } }
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
        materials: {},
        effect: { stackSize: 500 },
        type: 'stack',
        isSpecial: true
    }
};

// 合并同类型矿物，将所有带后缀的矿物合并到基础矿物中
function mergeSameTypeItems() {
    const mergedItems = {};
    
    // 遍历所有物品，合并同类型矿物
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        const baseName = itemName.split('_')[0];
        if (!mergedItems[baseName]) {
            mergedItems[baseName] = 0;
        }
        mergedItems[baseName] += count;
    }
    
    // 清空原物品列表
    gameData.backpack.items = {};
    
    // 重新添加合并后的物品
    for (const [baseName, totalCount] of Object.entries(mergedItems)) {
        gameData.backpack.items[baseName] = totalCount;
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
    
    // 检查特殊事件
    checkSpecialEvents();
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
                    <div style="font-size: 0.8em; color: #ff6f00; margin-bottom: 5px;">使用后等级上限提升至 ${tool.maxLevel + 10} 级</div>
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

// 启动任务刷新定时器
function startQuestRefreshTimer() {
    // 每10秒检查一次任务刷新
    setInterval(() => {
        if (gameData.questHall.unlocked) {
            const now = Date.now();
            if (now - gameData.questHall.lastRefreshTime >= gameData.questHall.refreshInterval) {
                refreshQuests();
            }
        }
    }, 10000);
}

// 自动挖矿变量
let autoMiningInterval = null;

// 启动自动挖矿
function startAutoMining() {
    if (!gameData.minersGuild.autoMining.enabled) {
        return;
    }
    
    // 清除现有的定时器
    if (autoMiningInterval) {
        clearInterval(autoMiningInterval);
    }
    
    // 直接设置20秒的定时器，从当前时间开始计时，不立即执行
    const interval = gameData.minersGuild.autoMining.interval * 1000;
    autoMiningInterval = setInterval(() => {
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
    // 获取所有正在工作的矿工
    const workingMiners = gameData.minersGuild.miners.filter(miner => miner.working && miner.assignedMineral);
    
    if (workingMiners.length === 0) {
        return;
    }
    
    // 遍历所有工作中的矿工
    workingMiners.forEach(miner => {
        const mineralName = miner.assignedMineral;
        const mineral = minerals.find(m => m.name === mineralName);
        
        if (!mineral) {
            return;
        }
        
        // 检查玩家等级是否足够
        if (gameData.player.level < mineral.minLevel) {
            return;
        }
        
        // 计算挖矿奖励
        const rewards = calculateMiningRewards(mineral, miner);
        
        // 应用矿工佣金
        applyMinerCommission(rewards);
        
        // 将奖励存入协会仓库
        for (const [item, amount] of Object.entries(rewards.items)) {
            if (!gameData.minersGuild.storage[item]) {
                gameData.minersGuild.storage[item] = 0;
            }
            gameData.minersGuild.storage[item] += amount;
        }
        
        // 添加经验
        gameData.player.exp += rewards.exp;
        
        // 为矿工添加经验（如果经验未满）
        if (miner.exp < miner.nextExp) {
            const minerExpGain = Math.floor(rewards.exp * 0.5); // 矿工获得玩家经验的50%
            miner.exp += minerExpGain;
            if (miner.exp >= miner.nextExp) {
                addMessage(`${miner.name} 的经验已满，等待升级！`);
            }
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
        
        // 更新仓库界面（如果仓库界面已打开）
        const storageItemsDiv = document.getElementById('storage-items');
        if (storageItemsDiv) {
            updateStorageUI();
        }
    });
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
    
    // 应用双倍掉落能力
    if (miner.abilities.includes('doubleDrop')) {
        amount = Math.floor(amount * 2);
    }
    
    // 添加矿物本身
    rewards.items[mineral.name] = amount;
    
    // 处理副产物
    if (mineral.drops) {
        mineral.drops.forEach(drop => {
            // 应用双倍掉落能力到副产物
            let dropChance = drop.chance;
            if (miner.abilities.includes('doubleDrop')) {
                dropChance = Math.min(1.0, dropChance * 2);
            }
            
            if (Math.random() < dropChance) {
                if (!rewards.items[drop.name]) {
                    rewards.items[drop.name] = 0;
                }
                rewards.items[drop.name]++;
                
                // 双倍掉落能力可能让副产物也掉落多个
                if (miner.abilities.includes('doubleDrop') && Math.random() < 0.5) {
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
                    { level: 1, materials: { '铜矿': 100, '金币': 5000 } },
                    { level: 2, materials: { '铁矿': 150, '金币': 10000 } },
                    { level: 3, materials: { '钴矿': 200, '金币': 20000 } },
                    { level: 4, materials: { '镍矿': 250, '金币': 30000 } },
                    { level: 5, materials: { '银矿': 300, '金币': 50000 } },
                    { level: 6, materials: { '白金矿': 350, '金币': 80000 } },
                    { level: 7, materials: { '金矿': 400, '金币': 120000 } },
                    { level: 8, materials: { '水晶矿': 450, '金币': 180000 } },
                    { level: 9, materials: { '水晶矿': 500, '金币': 250000 } },
                    { level: 10, materials: { '水晶矿': 600, '金币': 350000 } }
                ],
                efficiencyBonuses: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
            }
        };
    } else if (!gameData.minersGuild.badgeSystem) {
        // 确保badgeSystem属性存在
        gameData.minersGuild.badgeSystem = {
            currentLevel: 0,
            maxLevel: 10,
            upgradeMaterials: [
                { level: 1, materials: { '铜矿': 100, '金币': 5000 } },
                { level: 2, materials: { '铁矿': 150, '金币': 10000 } },
                { level: 3, materials: { '钴矿': 200, '金币': 20000 } },
                { level: 4, materials: { '镍矿': 250, '金币': 30000 } },
                { level: 5, materials: { '银矿': 300, '金币': 50000 } },
                { level: 6, materials: { '白金矿': 350, '金币': 80000 } },
                { level: 7, materials: { '金矿': 400, '金币': 120000 } },
                { level: 8, materials: { '水晶矿': 450, '金币': 180000 } },
                { level: 9, materials: { '水晶矿': 500, '金币': 250000 } },
                { level: 10, materials: { '水晶矿': 600, '金币': 350000 } }
            ],
            efficiencyBonuses: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
        };
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
                                        const playerHas = item === '金币' ? gameData.player.gold : (gameData.backpack.items[item] || 0);
                                        const enough = playerHas >= amount;
                                        materialsHTML += `
                                            <div class="material-item">
                                                <span class="material-name">${item}：</span>
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
            statusText = miner.working ? `工作中 (${miner.assignedMineral}矿)` : `已派遣到${miner.assignedMineral}矿`;
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
    panel.innerHTML = `
        <div class="miner-details-panel">
            <div class="miner-details-header">
                <h3>${miner.name} - 详细信息</h3>
                <button onclick="this.closest('.miner-details-overlay').remove()" class="close-btn">×</button>
            </div>
            <div class="miner-details-content">
                <div class="detail-item">
                    <span class="detail-label">等级：</span>
                    <span class="detail-value">lv${miner.level}</span>
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
                    <span class="detail-value">${miner.assignedMineral ? (miner.working ? `工作中 (${miner.assignedMineral}矿)` : `已派遣到${miner.assignedMineral}矿`) : '空闲'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">升级成本：</span>
                    <span class="detail-value">${upgradeCost}金币</span>
                </div>
                ${miner.abilities.length > 0 ? `
                    <div class="detail-item">
                        <span class="detail-label">技能：</span>
                        <span class="detail-value">${miner.abilities.join(', ')}</span>
                    </div>
                ` : ''}
            </div>
            <div class="miner-details-footer">
                <button onclick="drinkBeerWithMiner(${index}); this.closest('.miner-details-overlay').remove()" class="beer-btn" title="请矿工喝扎啤，增加亲密度">
                    <img src="images/${Math.random() > 0.5 ? '044e604164b39247048e79d69f7efc8b' : '75b81ddea31ad33c19f5f9544f4a9c18'}.jpg" alt="喝扎啤" style="width: 40px; height: 40px; vertical-align: middle; margin-right: 5px;">
                    喝扎啤
                </button>
                <button onclick="upgradeMiner(${index}); this.closest('.miner-details-overlay').remove()" class="upgrade-btn">升级矿工</button>
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
            padding: 8px 16px;
            background: linear-gradient(45deg, #e74c3c 0%, #c0392b 100%);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            font-size: 1.2em;
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
        addMessage('背包中没有扎啤，无法请矿工喝扎啤！');
        addMessage('请先在商店购买扎啤。');
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
    
    // 添加消息
    addMessage(`你请${miner.name}喝了一杯扎啤，你们似乎更熟悉了一些。`);
    
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

// 创建喝啤酒对话面板
function createBeerDialoguePanel(minerName, dialogueOptions) {
    // 随机选择一个对话
    const randomDialogue = dialogueOptions[Math.floor(Math.random() * dialogueOptions.length)];
    
    // 创建对话面板
    const panel = document.createElement('div');
    panel.className = 'beer-dialogue-overlay';
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
        .beer-dialogue-panel {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 500px;
            animation: slideIn 0.3s ease-out;
        }
        .beer-dialogue-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: linear-gradient(90deg, #2c3e50 0%, #34495e 100%);
            color: white;
            border-radius: 12px 12px 0 0;
        }
        .beer-dialogue-header h3 {
            margin: 0;
            font-size: 1.5em;
            font-weight: 600;
        }
        .beer-dialogue-close {
            padding: 8px 16px;
            background: linear-gradient(45deg, #e74c3c 0%, #c0392b 100%);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        .beer-dialogue-close:hover {
            background: linear-gradient(45deg, #c0392b 0%, #a93226 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
        }
        .beer-dialogue-content {
            padding: 30px;
            background: white;
            border-radius: 0 0 12px 12px;
        }
        .miner-name {
            font-size: 1.2em;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
        }
        .miner-dialogue {
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
        <div class="beer-dialogue-panel">
            <div class="beer-dialogue-header">
                <h3>与${minerName}喝扎啤</h3>
                <button class="beer-dialogue-close" onclick="this.closest('.beer-dialogue-overlay').remove()">关闭</button>
            </div>
            <div class="beer-dialogue-content">
                <div class="miner-name">${minerName}：</div>
                <div class="miner-dialogue">${randomDialogue}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
}

// 合并同类型矿物，将所有带后缀的矿物合并到基础矿物中
function mergeSameTypeItems() {
    const mergedItems = {};
    
    // 遍历所有物品，合并同类型矿物
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        const baseName = itemName.split('_')[0];
        if (!mergedItems[baseName]) {
            mergedItems[baseName] = 0;
        }
        mergedItems[baseName] += count;
    }
    
    // 清空原物品列表
    gameData.backpack.items = {};
    
    // 重新添加合并后的物品
    for (const [baseName, totalCount] of Object.entries(mergedItems)) {
        gameData.backpack.items[baseName] = totalCount;
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
    
    // 计算升级成本
    const upgradeCost = 500 * Math.pow(2, miner.level - 1);
    
    // 检查经验值
    if (miner.exp < miner.nextExp) {
        addMessage(`矿工 ${miner.name} 经验值不足，无法升级！`);
        return;
    }
    
    // 计算所需亲密度（每级需求上升，达到200后不再限制）
    const requiredIntimacy = Math.min(200, Math.floor(50 * Math.pow(1.2, miner.level - 1)));
    
    // 检查亲密度
    if (miner.intimacy < requiredIntimacy) {
        addMessage(`矿工 ${miner.name} 亲密度不足，需要${requiredIntimacy}点亲密度才能升级！`);
        return;
    }
    
    if (gameData.player.gold < upgradeCost) {
        addMessage('金币不足，无法升级矿工！');
        return;
    }
    
    // 扣除金币
    gameData.player.gold -= upgradeCost;
    
    // 升级矿工
    miner.level += 1;
    miner.exp = 0;
    miner.nextExp = Math.floor(miner.nextExp * 1.5);
    
    // 增加效率
    miner.efficiency = 1.0 + (miner.level * 0.1);
    
    // 解锁能力
    unlockMinerAbility(miner);
    
    addMessage(`成功升级矿工 ${miner.name} 到 ${miner.level} 级，花费${upgradeCost}金币！`);
    
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
    
    // 不同等级解锁不同能力
    if (level === 5 && !miner.abilities.includes('fastMining')) {
        miner.abilities.push('fastMining');
        addMessage(`矿工获得了快速挖矿能力！`);
    } else if (level === 10 && !miner.abilities.includes('doubleDrop')) {
        miner.abilities.push('doubleDrop');
        addMessage(`矿工获得了双倍掉落能力！`);
    } else if (level === 15 && !miner.abilities.includes('autoCollect')) {
        miner.abilities.push('autoCollect');
        addMessage(`矿工获得了自动收集能力！`);
    } else if (level === 20 && !miner.abilities.includes('expertMiner')) {
        miner.abilities.push('expertMiner');
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
    
    // 应用能力加成
    if (miner.abilities.includes('fastMining')) {
        efficiency *= 1.2; // 快速挖矿：+20%效率
    }
    if (miner.abilities.includes('expertMiner')) {
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
function generateQuests() {
    const availableItems = getAvailableItems();
    
    if (availableItems.length === 0) return;
    
    const newQuests = [];
    const maxQuests = gameData.questHall.maxQuests;
    
    while (newQuests.length < maxQuests) {
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
    addMessage('任务大厅已刷新！');
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
    } else if (quest.reward.type === 'recipe') {
        if (!gameData.unlockedRecipes[quest.reward.value]) {
            gameData.unlockedRecipes[quest.reward.value] = true;
            addMessage(`任务完成！获得${quest.reward.value}！`);
        } else {
            addMessage(`任务完成！但你已经拥有该配方了。`);
        }
    } else if (quest.reward.type === 'ticket') {
        const toolType = quest.reward.tool;
        const amount = quest.reward.amount || 1;
        
        if (gameData.unlockTickets[toolType] !== undefined) {
            gameData.unlockTickets[toolType] += amount;
            gameData.tools[toolType].unlockTickets += amount;
            addMessage(`任务完成！获得${amount}张${getToolName(toolType)}等级提升券！`);
        }
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
    
    // 提升等级上限（每次使用提升券增加10级上限）
    const newMaxLevel = currentMaxLevel + 10;
    
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
    
    // 显示刷新时间
    const timeLeft = Math.max(0, Math.ceil((gameData.questHall.lastRefreshTime + gameData.questHall.refreshInterval - Date.now()) / 1000));
    html += `<div class="quest-refresh-time">下次刷新: ${timeLeft}秒</div>`;
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
        // 调试信息：显示矿锄等级和计算出的实际时间
        console.log(`矿锄等级: ${pickaxeLevel}, 加速效果: ${(pickaxeBonus * 100).toFixed(2)}%, 基础时间: ${mineral.baseTime}s, 实际时间: ${actualTime.toFixed(2)}s`);
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
            const displayName = itemName.split('_')[0];
            slot.innerHTML = `
                <div class="item-name">${displayName}</div>
                <div class="item-count">${count}/${gameData.backpack.currentStackSize}</div>
            `;
            // 添加点击事件监听器
            slot.onclick = () => handleItemClick(itemName, displayName);
        }
    });
    document.getElementById('backpack-capacity').textContent = items.length;
    document.getElementById('backpack-max').textContent = gameData.backpack.capacity;
    const backpackTitle = document.querySelector('.backpack h2');
    backpackTitle.innerHTML = `背包 (容量: <span id="backpack-capacity">${items.length}</span>/<span id="backpack-max">${gameData.backpack.capacity}</span>) <span class="stack-size">(堆叠: ${gameData.backpack.currentStackSize})</span>`;
    showItemTotals();
}

// 处理背包物品点击
function handleItemClick(itemName, displayName) {
    // 如果是扎啤，显示使用界面
    if (displayName === '扎啤') {
        showUseBeerDialog(itemName);
    }
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
        addMessage('背包中没有扎啤！');
        return;
    }
    
    // 消耗1个扎啤
    consumeItem(itemName, 1);
    
    // 提升亲密度50点
    miner.intimacy = (miner.intimacy || 0) + 50;
    
    addMessage(`成功使用扎啤，提升了${miner.name}的亲密度50点，当前亲密度：${miner.intimacy}！`);
    
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
            // 调试信息：显示矿锄等级和计算出的实际时间
            console.log(`矿锄等级: ${pickaxeLevel}, 加速效果: ${(pickaxeBonus * 100).toFixed(2)}%, 基础时间: ${mineral.baseTime}s, 实际时间: ${actualTime.toFixed(2)}s`);
            
            // 计算在后台完成的采矿次数
            const completedMines = Math.floor(elapsedTime / actualTime);
            
            // 执行完成的采矿次数
            for (let i = 0; i < completedMines && continuousMining; i++) {
                completeMining(mineral);
            }
            
            // 计算剩余时间，更新当前采矿进度
            const remainingTime = elapsedTime % actualTime;
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

function completeMining(mineral) {
    if (!gameData.miningCount) {
        gameData.miningCount = {};
    }
    if (!continuousMining) {
        gameData.miningCount[mineral.name] = (gameData.miningCount[mineral.name] || 0) + 1;
    }
    // 应用金手套经验加成
    const expWithBonus = applyGoldenGloveExpBonus(mineral.exp);
    gameData.player.exp += expWithBonus;
    
    // 只有当工具经验值未满时才添加经验值
    let pickaxeGainedExp = 0;
    if (gameData.tools.pickaxe.level < 50) {
        const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
        if (gameData.tools.pickaxe.exp < pickaxeNextExp) {
            const toolExpWithBonus = applyGoldenGloveExpBonus(mineral.exp);
            gameData.tools.pickaxe.exp += toolExpWithBonus;
            pickaxeGainedExp = toolExpWithBonus;
        }
    }
    
    let cartGainedExp = 0;
    if (gameData.tools.cart.crafted && gameData.tools.cart.level < 50) {
        const cartNextExp = gameData.tools.cart.nextExp || 50;
        if (gameData.tools.cart.exp < cartNextExp) {
            const toolExpWithBonus = applyGoldenGloveExpBonus(mineral.exp);
            gameData.tools.cart.exp += toolExpWithBonus;
            cartGainedExp = toolExpWithBonus;
        }
    }
    
    let headlightGainedExp = 0;
    if (gameData.tools.headlight.crafted && gameData.tools.headlight.level < 50) {
        const headlightNextExp = gameData.tools.headlight.nextExp || 50;
        if (gameData.tools.headlight.exp < headlightNextExp) {
            const toolExpWithBonus = applyGoldenGloveExpBonus(mineral.exp);
            gameData.tools.headlight.exp += toolExpWithBonus;
            headlightGainedExp = toolExpWithBonus;
        }
    }
    
    addGainedExp(expWithBonus);
    checkLevelUp();
    // 检查工具状态和消耗
    if (!gameData.tools.cart) gameData.tools.cart = { crafted: false, active: true, fuelType: 'coal', fuelCapacity: 50, currentFuel: 0 }; // fuelType: 'coal' 或 'fuel'
    if (!gameData.tools.headlight) gameData.tools.headlight = { crafted: false, active: true };
    
    // 矿车加成：增加采矿数量，消耗燃料
    // 检查是否有走丢的矿车效果
    const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
    
    let baseAmount = 1;
    if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.active && !hasLostCartEffect) {
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
                addMessage('煤矿不足，矿车已自动停止使用！请添加煤矿。');
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
                        addMessage('燃料舱燃料不足，已自动从背包中添加燃料！');
                    } else {
                        // 燃料不足，尝试切换到煤矿
                        if (hasEnoughItem('煤矿', 1)) {
                            // 切换到煤矿作为燃料
                            gameData.tools.cart.fuelType = 'coal';
                            consumeItem('煤矿', 1);
                            // 矿车每5级提升1个采矿数量
                            const cartBonus = Math.floor(gameData.tools.cart.level / 5);
                            baseAmount = 1 + cartBonus;
                            addMessage('燃料不足，已自动切换到煤矿作为燃料！');
                        } else {
                            // 煤矿也不足，自动停用矿车
                            gameData.tools.cart.active = false;
                            addMessage('燃料和煤矿都不足，矿车已自动停止使用！请添加燃料或煤矿。');
                        }
                    }
                }
            } else {
                // 矿车未优化，自动停用矿车
                gameData.tools.cart.active = false;
                addMessage('矿车尚未优化！需要先在加工台优化矿车才能使用高级燃料。');
            }
        }
    }
    
    // 添加基础矿物
    for (let i = 0; i < baseAmount; i++) {
        addToBackpack(mineral.name);
        addGainedMineral();
        // 为矿车额外提供的矿物添加经验
        if (i > 0) {
            // 应用金手套经验加成
            const bonusExp = applyGoldenGloveExpBonus(mineral.exp);
            gameData.player.exp += bonusExp;
            addGainedExp(bonusExp);
            
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
        const higherLevelChance = 0.1 + (gameData.tools.headlight.level * 0.01);
        if (Math.random() < higherLevelChance) {
            // 生成高一级矿物
            const mineralLevels = ['石矿', '煤矿', '铁矿', '铜矿', '钴矿', '镍矿', '银矿', '白金矿', '金矿', '水晶矿'];
            const currentIndex = mineralLevels.indexOf(mineral.name);
            if (currentIndex < mineralLevels.length - 1) {
                const higherMineral = mineralLevels[currentIndex + 1];
                // 根据燃料类型决定高一级矿物的数量
                const higherAmount = fuelType === 'battery' ? 5 : Math.floor(Math.random() * 2) + 1;
                for (let i = 0; i < higherAmount; i++) {
                    addToBackpack(higherMineral);
                    addGainedMineral();
                    // 为头灯额外提供的矿物添加经验
                    const higherMineralData = minerals.find(m => m.name === higherMineral);
                    if (higherMineralData) {
                        // 应用金手套经验加成
                            const bonusExp = applyGoldenGloveExpBonus(higherMineralData.exp);
                            gameData.player.exp += bonusExp;
                            addGainedExp(bonusExp);
                            
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
    
    // 计算总经验值
    let totalExp = mineral.exp; // 基础矿物经验
    
    // 已经在前面声明过hasLostCartEffect变量，直接使用即可
    
    // 矿车额外矿物经验（只有当矿车激活且没有走丢的矿车效果时才计算）
    let cartBonus = 0;
    if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.active && !hasLostCartEffect) {
        const fuelType = gameData.tools.cart.fuelType || 'coal';
        if (fuelType === 'coal') {
            cartBonus = 1 + Math.floor(gameData.tools.cart.level / 5);
        } else {
            // 使用高级燃料时，额外加5
            cartBonus = 1 + Math.floor(gameData.tools.cart.level / 5) + 5;
        }
        totalExp += mineral.exp * cartBonus;
    }
    
    // 头灯额外矿物经验
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
                    headlightExtraExp = higherMineralData.exp * higherAmount;
                    totalExp += headlightExtraExp;
                }
            }
        }
    }
    
    // 应用金手套经验加成到显示的经验值
    totalExp = applyGoldenGloveExpBonus(totalExp);
    
    const obtainedDrops = [];
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
    const miningMessage = generateMiningMessage(mineral, obtainedDrops, headlightGoldConsumed, totalExp);
    addMessage(miningMessage);
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

// 升级徽章
function upgradeBadge() {
    const badgeSystem = gameData.minersGuild.badgeSystem;
    const currentLevel = badgeSystem.currentLevel;
    
    // 检查是否已达到最高等级
    if (currentLevel >= badgeSystem.maxLevel) {
        addMessage('徽章已达到最高等级！');
        return;
    }
    
    // 获取下一级所需材料
    const nextLevel = currentLevel + 1;
    const upgradeData = badgeSystem.upgradeMaterials.find(data => data.level === nextLevel);
    
    if (!upgradeData) {
        addMessage('升级数据错误！');
        return;
    }
    
    // 检查材料是否足够
    if (!hasEnoughMaterials(upgradeData.materials)) {
        addMessage('材料不足，无法升级徽章！');
        return;
    }
    
    // 扣除材料
    deductMaterials(upgradeData.materials);
    
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
        } else {
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
        } else {
            gameData.backpack.items[item] -= amount;
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
        miner.efficiency = efficiencyBonus;
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
        if (upgradeData && currentLevel < badgeSystem.maxLevel) {
            for (const [item, amount] of Object.entries(upgradeData.materials)) {
                const playerHas = item === '金币' ? gameData.player.gold : (gameData.backpack.items[item] || 0);
                const enough = playerHas >= amount;
                materialsHTML += `
                    <div class="material-item">
                        <span class="material-name">${item}：</span>
                        <span class="material-amount ${enough ? 'enough' : 'not-enough'}">${playerHas}/${amount}</span>
                    </div>
                `;
            }
        }
        
        badgeSection.innerHTML = `
            <h4>徽章升级</h4>
            <div class="badge-info">
                <div class="badge-level">当前徽章等级：${currentLevel}/${badgeSystem.maxLevel}</div>
                <div class="badge-efficiency">矿工效率加成：${((badgeSystem.efficiencyBonuses[currentLevel] - 1) * 100).toFixed(0)}%</div>
            </div>
            ${currentLevel < badgeSystem.maxLevel ? `
                <div class="upgrade-materials">
                    <h5>升级所需材料：</h5>
                    ${materialsHTML}
                </div>
                <button onclick="upgradeBadge()" class="upgrade-btn">升级徽章</button>
            ` : `
                <div class="max-level">徽章已达到最高等级！</div>
            `}
        `;
    }
}

function addToBackpack(itemName) {
    calculateBackpackStats();
    const currentStackSize = gameData.backpack.currentStackSize;
    let added = false;
    
    // 尝试添加到现有堆叠
    for (const [name, count] of Object.entries(gameData.backpack.items)) {
        const baseName = name.split('_')[0];
        if (baseName === itemName && count < currentStackSize) {
            gameData.backpack.items[name]++;
            added = true;
            break;
        }
    }
    
    // 如果没有添加到现有堆叠，尝试创建新堆叠
    if (!added) {
        const itemCount = Object.keys(gameData.backpack.items).length;
        if (itemCount < gameData.backpack.capacity) {
            // 背包还有空槽位，直接创建新物品（使用基础名称）
            gameData.backpack.items[itemName] = (gameData.backpack.items[itemName] || 0) + 1;
            added = true;
        } else {
            // 背包满了，放入临时背包
            addToTempBackpack(itemName);
            return;
        }
    }
    
    // 记录详细获得信息
    ensureGainedInfoExists();
    if (gameData.gainedInfo.detailed[itemName]) {
        gameData.gainedInfo.detailed[itemName]++;
    } else {
        gameData.gainedInfo.detailed[itemName] = 1;
    }
    
    // 更新背包显示
    updateBackpackDisplay();
    
    // 如果获得的是铜矿，检查NPC购买铜矿事件
    if (itemName === '铜矿') {
        checkSpecialEvents();
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
    while (gameData.player.exp >= gameData.player.nextExp) {
        gameData.player.exp -= gameData.player.nextExp;
        gameData.player.level++;
        gameData.player.nextExp = Math.floor(gameData.player.nextExp * 1.5);
        addMessage(`玩家升级到 ${gameData.player.level} 级！`);
        
        // 检查任务大厅解锁
        checkQuestHallUnlock();
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
        for (const [name, count] of Object.entries(itemsCopy)) {
            const baseName = name.split('_')[0];
            if (baseName === itemName) {
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
    addMessage(`背包已满，${itemName}已放入临时背包！`);
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
    
    // 添加背包类型选项
    for (const [type, data] of Object.entries(backpackExpansions)) {
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
        html += `<div class="total-item">${name}: ${count}</div>`;
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
        html += `<div class="detailed-gained-item">${itemName}: ${count}</div>`;
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

function addGainedMineral() {
    ensureGainedInfoExists();
    gameData.gainedInfo.minerals += 1;
    updateGainedInfo();
}

function addGainedCloth() {
    ensureGainedInfoExists();
    gameData.gainedInfo.cloth += 1;
    updateGainedInfo();
}

function addMessage(message) {
    gameData.messages.unshift(message);
    if (gameData.messages.length > 10) {
        gameData.messages.pop();
    }
    updateMessages();
}

function updateMessages() {
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
    gameData.messages.forEach(msg => {
        const messageEl = document.createElement('div');
        messageEl.className = 'message-item';
        messageEl.textContent = msg;
        container.appendChild(messageEl);
    });
}

function generateMiningMessage(mineral, drops, headlightGoldConsumed = false, totalExp = null) {
    let message = '恭喜获得：';
    
    // 检查是否有走丢的矿车效果
    const hasLostCartEffect = gameData.activeEffects && gameData.activeEffects.lostCart && gameData.activeEffects.lostCart.active;
    
    // 计算矿物数量，考虑矿车加成
    let baseAmount = 1;
    let cartBonus = 0;
    let cartConsume = 0;
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
    const totalAmount = baseAmount + cartBonus;
    
    // 显示矿物数量，包括加成说明
    if (cartBonus > 0) {
        message += `${mineral.name}*${totalAmount}（基础*${baseAmount}+矿车*${cartBonus}）, `;
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
    return message;
}

function addEventListeners() {
    // 清空重置按钮事件监听器
    document.getElementById('reset-gained-info')?.addEventListener('click', resetGainedInfo);
    
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
        const alloyDropdown = document.getElementById('alloy-dropdown');
        // 隐藏合金下拉菜单
        alloyDropdown.style.display = 'none';
        // 切换融石下拉菜单的显示状态
        smeltDropdown.style.display = smeltDropdown.style.display === 'none' ? 'block' : 'none';
        // 填充融石数量选择
        populateSmeltStoneAmounts();
    });
    
    // 显示/隐藏合金下拉菜单
    document.getElementById('make-alloy').addEventListener('click', () => {
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
        const alloyDropdown = document.getElementById('alloy-dropdown');
        // 隐藏融石下拉菜单
        smeltDropdown.style.display = 'none';
        // 切换合金下拉菜单的显示状态
        alloyDropdown.style.display = alloyDropdown.style.display === 'none' ? 'block' : 'none';
        // 填充合金类型选择
        populateAlloyTypes();
    });
    
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
    
    // 确认合金
    document.getElementById('confirm-alloy').addEventListener('click', () => {
        const alloyTypeSelect = document.getElementById('alloy-type');
        const alloyAmountInput = document.getElementById('alloy-amount');
        const selectedAlloy = alloyTypeSelect.value;
        const amount = parseInt(alloyAmountInput.value);
        if (selectedAlloy && amount > 0) {
            makeAlloy(selectedAlloy, amount);
        } else {
            alert('请选择合金类型并输入制作数量');
        }
        // 无论是否成功，都隐藏下拉菜单
        document.getElementById('alloy-dropdown').style.display = 'none';
    });
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
    document.getElementById('export-btn').addEventListener('click', exportGameData);
    document.getElementById('import-btn').addEventListener('click', importGameData);
    
    // 工具升级按钮
    document.getElementById('upgrade-pickaxe').addEventListener('click', () => upgradeTool('pickaxe'));
    document.getElementById('upgrade-cart').addEventListener('click', () => upgradeTool('cart'));
    
    // 矿车燃料类型选择事件监听器
    document.getElementById('cart-fuel-type').addEventListener('change', function() {
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
    
    // 头灯燃料类型选择事件监听器
    document.getElementById('headlight-fuel-type').addEventListener('change', function() {
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
    
    // 添加燃料按钮事件监听器
    document.getElementById('add-cart-fuel').addEventListener('click', addCartFuel);
    document.getElementById('install-headlight-battery').addEventListener('click', installHeadlightBattery);
    document.getElementById('upgrade-headlight').addEventListener('click', () => upgradeTool('headlight'));
    
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
    updateSellPanel();
}

function consumeItem(itemName, amount) {
    let remaining = amount;
    
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
    const fuelAmount = parseInt(document.getElementById('furnace-fuel-amount').value) || 1;
    
    if (!consumeItem(fuelType, fuelAmount)) {
        alert(`材料不足！需要${fuelType}${fuelAmount}`);
        return;
    }
    
    // 计算添加的燃料量和燃烧时间
    const fuelValue = getFuelValue(fuelType);
    const addedFuel = fuelAmount * fuelValue;
    const maxFuel = gameData.furnace.fuel.maxAmount;
    
    // 计算燃烧时间（秒）
    const burnTimePerFuel = getBurnTimePerFuel(fuelType);
    const addedBurnTime = fuelAmount * burnTimePerFuel * getFurnaceBurnTimeMultiplier();
    
    // 更新燃料量
    gameData.furnace.fuel.amount = Math.min(gameData.furnace.fuel.amount + addedFuel, maxFuel);
    gameData.furnace.fuel.type = fuelType;
    
    // 更新燃烧时间
    gameData.furnace.fuel.burnTime = Math.min(gameData.furnace.fuel.burnTime + addedBurnTime, 3600); // 最大燃烧时间1小时
    gameData.furnace.fuel.maxBurnTime = gameData.furnace.fuel.burnTime;
    
    addMessage(`添加了${fuelAmount}个${fuelType}作为燃料！`);
    updateFurnaceUI();
    saveGame();
    
    // 更新默认燃料数量
    updateDefaultFuelAmount();
}

function updateDefaultFuelAmount() {
    const fuelType = document.getElementById('furnace-fuel-type').value;
    const currentFuelAmount = gameData.furnace.fuel.amount;
    const maxFuelAmount = gameData.furnace.fuel.maxAmount;
    const fuelValue = getFuelValue(fuelType);
    
    // 计算需要多少燃料才能达到最大热值
    const neededFuelAmount = Math.ceil((maxFuelAmount - currentFuelAmount) / fuelValue);
    const defaultAmount = Math.max(1, neededFuelAmount);
    
    // 更新输入框的值
    document.getElementById('furnace-fuel-amount').value = defaultAmount;
}

function getFuelValue(fuelType) {
    switch (fuelType) {
        case '煤矿': return 10;
        case '燃料': return 20;
        default: return 0;
    }
}

function getBurnTimePerFuel(fuelType) {
    switch (fuelType) {
        case '煤矿': return 60; // 1分钟
        case '燃料': return 180; // 3分钟
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

function getFurnaceFuelConsumptionMultiplier() {
    const level = gameData.furnace.level;
    switch (level) {
        case 1: return 1;
        case 2: return 0.9;
        case 3: return 0.85;
        case 4: return 0.8;
        case 5: return 0.7;
        default: return 1;
    }
}

function consumeFurnaceFuel() {
    if (!gameData.furnace.crafted || gameData.furnace.fuel.burnTime <= 0) {
        return;
    }
    
    // 每秒消耗1点燃烧时间
    gameData.furnace.fuel.burnTime = Math.max(0, gameData.furnace.fuel.burnTime - 1);
    
    // 当燃烧时间减少时，同步减少燃料量
    if (gameData.furnace.fuel.maxBurnTime > 0) {
        const fuelRatio = gameData.furnace.fuel.burnTime / gameData.furnace.fuel.maxBurnTime;
        gameData.furnace.fuel.amount = Math.max(0, Math.round(gameData.furnace.fuel.maxAmount * fuelRatio));
    }
    
    // 如果燃料耗尽
    if (gameData.furnace.fuel.burnTime <= 0) {
        gameData.furnace.fuel.amount = 0;
        gameData.furnace.fuel.type = null;
        addMessage('熔炉燃料耗尽！');
    }
    
    updateFurnaceUI();
}

// 每秒钟消耗燃料
setInterval(consumeFurnaceFuel, 1000);

function updateFurnaceFuelUI() {
    const fuelAmountDisplay = document.getElementById('furnace-fuel-amount-display');
    const fuelMaxDisplay = document.getElementById('furnace-fuel-max');
    const burnTimeDisplay = document.getElementById('furnace-burn-time');
    const fuelProgress = document.getElementById('furnace-fuel-progress');
    
    if (fuelAmountDisplay) {
        fuelAmountDisplay.textContent = gameData.furnace.fuel.amount;
    }
    if (fuelMaxDisplay) {
        fuelMaxDisplay.textContent = gameData.furnace.fuel.maxAmount;
    }
    if (burnTimeDisplay) {
        const minutes = Math.floor(gameData.furnace.fuel.burnTime / 60);
        const seconds = gameData.furnace.fuel.burnTime % 60;
        burnTimeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    if (fuelProgress) {
        const progress = gameData.furnace.fuel.maxBurnTime > 0 ? 
            (gameData.furnace.fuel.burnTime / gameData.furnace.fuel.maxBurnTime) * 100 : 0;
        fuelProgress.style.width = `${progress}%`;
    }
}

// 初始化燃料系统UI
updateFurnaceFuelUI();
// 初始化默认燃料数量
updateDefaultFuelAmount();

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

function updateFurnaceUI() {
    const smeltBtn = document.getElementById('smelt-stone');
    const alloyBtn = document.getElementById('make-alloy');
    const furnaceLevel = document.getElementById('furnace-level');
    const craftFurnaceBtn = document.getElementById('craft-furnace');
    const upgradeFurnaceBtn = document.getElementById('upgrade-furnace');
    if (!upgradeFurnaceBtn) {
        const furnaceLevel = document.getElementById('furnace-level');
        if (furnaceLevel) {
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
            furnaceLevel.parentNode.insertBefore(upgradeBtn, furnaceLevel.nextSibling);
            upgradeBtn.addEventListener('click', upgradeFurnace);
        }
    }
    if (gameData.furnace.crafted) {
        smeltBtn.disabled = false;
        alloyBtn.disabled = false; // 移除禁用状态，在点击事件中检查等级
        furnaceLevel.textContent = gameData.furnace.level;
        craftFurnaceBtn.textContent = '熔炉已制作';
        craftFurnaceBtn.disabled = true;
        
        // 更新燃料系统UI
        updateFurnaceFuelUI();
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
    } else {
        smeltBtn.disabled = true;
        alloyBtn.disabled = true;
        furnaceLevel.textContent = '未制作';
        craftFurnaceBtn.textContent = '制作熔炉 (石矿20)';
        craftFurnaceBtn.disabled = false;
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
}

// 更新融石属性显示
function updateSmeltInfo(amount = 1) {
    const smeltInfoBody = document.getElementById('smelt-info-body');
    const smeltRecipeSelect = document.getElementById('smelt-recipe');
    if (!smeltInfoBody || !smeltRecipeSelect) return;
    
    const selectedRecipe = smeltRecipeSelect.value;
    
    if (selectedRecipe === '石灰') {
        // 获取背包中的石矿数量
        let stoneCount = 0;
        for (const itemName of Object.keys(gameData.backpack.items)) {
            const baseItemName = itemName.split('_')[0];
            if (baseItemName === '石矿') {
                stoneCount += gameData.backpack.items[itemName];
            }
        }
        
        // 计算石灰所需材料
        const stoneCost = 10 * amount;
        const limeOutput = 1 * amount;
        
        // 构建石灰属性HTML
        const smeltInfoHTML = `
            <div class="smelt-materials">原料数量：石矿${stoneCount}个</div>
            <div class="smelt-cost">材料：石矿*${stoneCost}</div>
            <div class="smelt-output">产出：石灰*${limeOutput}</div>
        `;
        
        smeltInfoBody.innerHTML = smeltInfoHTML;
    } else if (selectedRecipe === '煤炭') {
        // 获取背包中的煤矿数量
        let coalOreCount = 0;
        for (const itemName of Object.keys(gameData.backpack.items)) {
            const baseItemName = itemName.split('_')[0];
            if (baseItemName === '煤矿') {
                coalOreCount += gameData.backpack.items[itemName];
            }
        }
        
        // 计算煤炭所需材料
        const coalOreCost = 1 * amount;
        const coalOutput = 2 * amount;
        
        // 构建煤炭属性HTML
        const smeltInfoHTML = `
            <div class="smelt-materials">原料数量：煤矿${coalOreCount}个</div>
            <div class="smelt-cost">材料：煤矿*${coalOreCost}</div>
            <div class="smelt-output">产出：煤炭*${coalOutput}</div>
        `;
        
        smeltInfoBody.innerHTML = smeltInfoHTML;
    }
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
function populateAlloyTypes() {
    const alloyTypeSelect = document.getElementById('alloy-type');
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
    
    // 添加合金类型选择的事件监听器
    alloyTypeSelect.onchange = updateAlloyInfo;
    
    // 初始更新合金属性
    updateAlloyInfo();
}

// 更新合金属性显示
function updateAlloyInfo() {
    const alloyTypeSelect = document.getElementById('alloy-type');
    const alloyInfoBody = document.getElementById('alloy-info-body');
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
    
    // 获取合金配方出处
    let recipeSource = '';
    switch (selectedAlloy) {
        case '铜铁合金':
            recipeSource = '挖铁矿随机获得';
            break;
        case '铜钴合金':
            recipeSource = '挖钴矿随机获得';
            break;
        case '铜镍合金':
            recipeSource = '挖镍矿随机获得';
            break;
        case '铜银合金':
            recipeSource = '挖银矿随机获得';
            break;
        default:
            recipeSource = '未知';
    }
    
    // 构建合金属性HTML
    let materialsHTML = '';
    for (const [material, amount] of Object.entries(alloyData.materials)) {
        materialsHTML += `${material}×${amount} `;
    }
    
    // 计算背包材料可制作的最大合金数量
    let maxCraftable = Infinity;
    for (const [material, amount] of Object.entries(alloyData.materials)) {
        const materialCount = getItemCount(material);
        const craftable = Math.floor(materialCount / amount);
        maxCraftable = Math.min(maxCraftable, craftable);
    }
    maxCraftable = Math.max(0, maxCraftable);
    
    const alloyInfoHTML = `
        <div class="alloy-name">${selectedAlloy}</div>
        <div class="alloy-materials">材料：${materialsHTML}</div>
        <div class="alloy-level">需要等级：${requiredLevel}</div>
        <div class="alloy-source">配方出处：${recipeSource}</div>
        <div class="alloy-description">${alloyData.description}</div>
        <div class="alloy-craftable">可制作数量：${maxCraftable}</div>
    `;
    
    alloyInfoBody.innerHTML = alloyInfoHTML;
}

function smeltStone(amount = 1) {
    if (!gameData.furnace.crafted) {
        alert('请先制作熔炉！');
        return;
    }
    
    // 检查燃料
    if (gameData.furnace.fuel.burnTime <= 0) {
        alert('熔炉燃料不足！请添加燃料后再试。');
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
    if (furnaceLevel >= 2) {
        message += ` (燃料消耗减少${getFuelReduction(furnaceLevel)}%)`;
    }
    if (furnaceLevel >= 3) {
        message += ` (燃烧时间延长${getBurnTimeIncrease(furnaceLevel)}%)`;
    }
    
    // 消耗燃料
    const fuelConsumption = Math.ceil(10 * amount * getFurnaceFuelConsumptionMultiplier());
    gameData.furnace.fuel.burnTime = Math.max(0, gameData.furnace.fuel.burnTime - fuelConsumption);
    
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
        
        // 消耗燃料
        const fuelConsumption = Math.ceil(5 * amount * getFurnaceFuelConsumptionMultiplier());
        gameData.furnace.fuel.burnTime = Math.max(0, gameData.furnace.fuel.burnTime - fuelConsumption);
        
        let message = `制作成功！获得煤炭*${coalOutput}！`;
        addMessage(message);
    }
    
    updateBackpackDisplay();
    updateFurnaceUI();
    updateMessages();
    saveGame();
}

// 制作指定类型的合金
function makeAlloy(alloyName, amount = 1) {
    if (!gameData.furnace.crafted) {
        alert('请先制作熔炉！');
        return;
    }
    
    // 检查燃料
    if (gameData.furnace.fuel.burnTime <= 0) {
        alert('熔炉燃料不足！请添加燃料后再试。');
        return;
    }
    
    // 检查是否获得了配方
    if (!hasAlloyRecipe(alloyName)) {
        alert('你还没有获得这个合金的配方！');
        return;
    }
    
    const requiredLevel = getRequiredLevelForAlloy(alloyName);
    if (gameData.player.level < requiredLevel) {
        alert(`等级不足！需要${requiredLevel}级才能制作${alloyName}`);
        return;
    }
    
    const alloyData = alloyRecipes[alloyName];
    if (!alloyData) {
        alert('无效的合金类型！');
        return;
    }
    
    // 检查材料是否足够
    for (const [material, materialAmount] of Object.entries(alloyData.materials)) {
        const totalAmount = materialAmount * amount;
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
    
    // 给玩家和工具添加经验
    gameData.player.exp += alloyExpWithBonus;
    
    // 只有当工具经验值未满时才添加经验值
    let pickaxeGainedExp = 0;
    if (gameData.tools.pickaxe.level < 50) {
        const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
        if (gameData.tools.pickaxe.exp < pickaxeNextExp) {
            gameData.tools.pickaxe.exp += alloyExpWithBonus;
            pickaxeGainedExp = alloyExpWithBonus;
        }
    }
    
    let cartGainedExp = 0;
    if (gameData.tools.cart.crafted && gameData.tools.cart.level < 50) {
        const cartNextExp = gameData.tools.cart.nextExp || 50;
        if (gameData.tools.cart.exp < cartNextExp) {
            gameData.tools.cart.exp += alloyExpWithBonus;
            cartGainedExp = alloyExpWithBonus;
        }
    }
    
    let headlightGainedExp = 0;
    if (gameData.tools.headlight.crafted && gameData.tools.headlight.level < 50) {
        const headlightNextExp = gameData.tools.headlight.nextExp || 50;
        if (gameData.tools.headlight.exp < headlightNextExp) {
            gameData.tools.headlight.exp += alloyExpWithBonus;
            headlightGainedExp = alloyExpWithBonus;
        }
    }
    addGainedExp(alloyExpWithBonus);
    checkLevelUp();
    
    // 制作合金
    for (let i = 0; i < amount; i++) {
        addToBackpack(alloyName);
    }
    
    // 如果配方尚未解锁，使用配方物品进行解锁
    if (!gameData.unlockedRecipes[alloyName]) {
        unlockAlloyRecipe(alloyName);
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
        toolExpMessage += `采矿锄经验*${alloyExpWithBonus}, `;
    }
    
    if (gameData.tools.cart && gameData.tools.cart.crafted) {
        const cartNextExp = gameData.tools.cart.nextExp || 50;
        if (gameData.tools.cart.exp < cartNextExp && gameData.tools.cart.level < 50) {
            toolExpMessage += `矿车经验*${alloyExpWithBonus}, `;
        }
    }
    
    if (gameData.tools.headlight && gameData.tools.headlight.crafted) {
        const headlightNextExp = gameData.tools.headlight.nextExp || 50;
        if (gameData.tools.headlight.exp < headlightNextExp && gameData.tools.headlight.level < 50) {
            toolExpMessage += `头灯经验*${alloyExpWithBonus}, `;
        }
    }
    
    toolExpMessage = toolExpMessage.slice(0, -2);
    
    // 消耗燃料
    const fuelConsumption = Math.ceil(20 * amount * getFurnaceFuelConsumptionMultiplier());
    gameData.furnace.fuel.burnTime = Math.max(0, gameData.furnace.fuel.burnTime - fuelConsumption);
    
    // 生成完整消息
    let fullMessage = `合金制作成功！获得${alloyName}×${amount}，${consumeMessage}`;
    if (toolExpMessage) {
        fullMessage += `，${toolExpMessage}`;
    }
    fullMessage += `，经验*${alloyExpWithBonus}！`;
    
    addMessage(fullMessage);
    
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

const alloyRecipes = {
    '铜铁合金': {
        materials: { '铜矿': 2, '铁矿': 2 },
        description: '用于熔炉升级和高级工具制作'
    },
    '铜钴合金': {
        materials: { '铜矿': 2, '钴矿': 2 },
        description: '用于高级熔炉升级'
    },
    '铜镍合金': {
        materials: { '铜矿': 2, '镍矿': 2 },
        description: '用于顶级熔炉升级'
    },
    '铜银合金': {
        materials: { '铜矿': 2, '银矿': 2 },
        description: '用于终极熔炉升级'
    }
};

// 检查玩家是否拥有指定合金的配方
function hasAlloyRecipe(alloyName) {
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
    return false;
}

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
    const recipe = alloyRecipes[alloyName];
    if (!recipe) return;
    
    // 检查临时背包是否有物品
    if (hasTempItems()) {
        alert('临时背包中有物品，请先处理临时背包中的物品！');
        return;
    }
    
    // 检查是否获得了配方
    if (!hasAlloyRecipe(alloyName)) {
        alert('你还没有获得这个合金的配方！');
        return;
    }
    
    const requiredLevel = getRequiredLevelForAlloy(alloyName);
    if (gameData.player.level < requiredLevel) {
        alert(`等级不足！需要${requiredLevel}级才能制作${alloyName}`);
        return;
    }
    
    for (const [material, amount] of Object.entries(recipe.materials)) {
        if (!hasEnoughItem(material, amount)) {
            alert(`材料不足！需要${amount}个${material}`);
            return;
        }
    }
    
    // 消耗材料
    for (const [material, amount] of Object.entries(recipe.materials)) {
        consumeItem(material, amount);
    }
    
    // 如果配方尚未解锁，使用配方物品进行解锁
    if (!gameData.unlockedRecipes[alloyName]) {
        unlockAlloyRecipe(alloyName);
    }
    
    // 计算合金经验值：两个材料的经验总和再加上150%
    let totalExp = 0;
    for (const [material, amount] of Object.entries(recipe.materials)) {
        const mineral = minerals.find(m => m.name === material);
        if (mineral) {
            totalExp += mineral.exp * amount;
        }
    }
    // 加上150%的加成
    const alloyExp = Math.floor(totalExp * 2.5); // 100% + 150% = 250%
    
    // 给玩家和工具添加经验
    gameData.player.exp += alloyExp;
    
    // 只有当工具经验值未满时才添加经验值
    let pickaxeGainedExp = 0;
    if (gameData.tools.pickaxe.level < 50) {
        const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
        if (gameData.tools.pickaxe.exp < pickaxeNextExp) {
            gameData.tools.pickaxe.exp += alloyExp;
            pickaxeGainedExp = alloyExp;
        }
    }
    
    let cartGainedExp = 0;
    if (gameData.tools.cart.crafted && gameData.tools.cart.level < 50) {
        const cartNextExp = gameData.tools.cart.nextExp || 50;
        if (gameData.tools.cart.exp < cartNextExp) {
            gameData.tools.cart.exp += alloyExp;
            cartGainedExp = alloyExp;
        }
    }
    
    let headlightGainedExp = 0;
    if (gameData.tools.headlight.crafted && gameData.tools.headlight.level < 50) {
        const headlightNextExp = gameData.tools.headlight.nextExp || 50;
        if (gameData.tools.headlight.exp < headlightNextExp) {
            gameData.tools.headlight.exp += alloyExp;
            headlightGainedExp = alloyExp;
        }
    }
    addGainedExp(alloyExp);
    checkLevelUp();
    
    // 添加合金到背包
    addToBackpack(alloyName);
    
    // 生成消耗材料的消息
    let consumeMessage = '';
    for (const [material, amount] of Object.entries(recipe.materials)) {
        consumeMessage += `${material}-${amount}, `;
    }
    consumeMessage = consumeMessage.slice(0, -2);
    
    // 生成工具经验消息
    let toolExpMessage = '';
    const pickaxeNextExp = gameData.tools.pickaxe.nextExp || 50;
    if (gameData.tools.pickaxe.exp < pickaxeNextExp && gameData.tools.pickaxe.level < 50) {
        toolExpMessage += `采矿锄经验*${alloyExp}, `;
    }
    
    if (gameData.tools.cart && gameData.tools.cart.crafted) {
        const cartNextExp = gameData.tools.cart.nextExp || 50;
        if (gameData.tools.cart.exp < cartNextExp && gameData.tools.cart.level < 50) {
            toolExpMessage += `矿车经验*${alloyExp}, `;
        }
    }
    
    if (gameData.tools.headlight && gameData.tools.headlight.crafted) {
        const headlightNextExp = gameData.tools.headlight.nextExp || 50;
        if (gameData.tools.headlight.exp < headlightNextExp && gameData.tools.headlight.level < 50) {
            toolExpMessage += `头灯经验*${alloyExp}, `;
        }
    }
    
    toolExpMessage = toolExpMessage.slice(0, -2);
    
    // 生成完整消息
    let fullMessage = `合金制作成功！获得${alloyName}*1，${consumeMessage}`;
    if (toolExpMessage) {
        fullMessage += `，${toolExpMessage}`;
    }
    fullMessage += `，经验*${alloyExp}！`;
    
    addMessage(fullMessage);
    updateUI();
    updateBackpackDisplay();
    openAlloyCraftPanel();
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
    if (!gameData.tools) {
        gameData.tools = {
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
        };
    } else {
        // 确保采矿锄属性完整
        if (!gameData.tools.pickaxe) {
            gameData.tools.pickaxe = {
                level: 0,
                exp: 0,
                nextExp: 50
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
                upgradeMaterials: [],
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
    // 确保所有矿工都有intimacy属性
    if (gameData.minersGuild && gameData.minersGuild.miners) {
        gameData.minersGuild.miners.forEach(miner => {
            if (miner.intimacy === undefined) {
                miner.intimacy = 0;
            }
        });
    }
    // 确保熔炉燃料系统属性存在
    if (!gameData.furnace) {
        gameData.furnace = {
            crafted: false,
            level: 0,
            fuel: {
                type: null,
                amount: 0,
                maxAmount: 100,
                burnTime: 0,
                maxBurnTime: 0
            }
        };
    } else if (!gameData.furnace.fuel) {
        gameData.furnace.fuel = {
            type: null,
            amount: 0,
            maxAmount: 100,
            burnTime: 0,
            maxBurnTime: 0
        };
    } else {
        // 确保燃料系统的所有属性都存在
        if (gameData.furnace.fuel.type === undefined) gameData.furnace.fuel.type = null;
        if (gameData.furnace.fuel.amount === undefined) gameData.furnace.fuel.amount = 0;
        if (gameData.furnace.fuel.maxAmount === undefined) gameData.furnace.fuel.maxAmount = 100;
        if (gameData.furnace.fuel.burnTime === undefined) gameData.furnace.fuel.burnTime = 0;
        if (gameData.furnace.fuel.maxBurnTime === undefined) gameData.furnace.fuel.maxBurnTime = 0;
    }
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
                type: null,
                amount: 0,
                maxAmount: 100,
                burnTime: 0,
                maxBurnTime: 0
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
        case '棉布': return 1;
        case '织布': return 2;
        case '粗麻布': return 3;
        case '尼龙布': return 5;
        case '硫磺': return 10;
        case '铜铁合金': return 54;
        case '铜钴合金': return 78;
        case '铜镍合金': return 87;
        case '铜银合金': return 96;
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
    
    // 物品池
    const itemPool = [
        { name: '加工台图纸', price: 1000, probability: 0.1, isBlueprint: true },
        { name: '电池图纸', price: 1000, probability: 0.1, isBlueprint: true },
        { name: '燃料配方', price: 1000, probability: 0.1, isBlueprint: true },
        { name: '棉布*100', price: 400, probability: 0.2 },
        { name: '电池*1', price: 350, probability: 0.05 },
        { name: '燃料*1', price: 300, probability: 0.05 },
        { name: '木材*100', price: 1000, probability: 0.3 },
        { name: '金手套', price: 10000, probability: 0.2, isSpecial: true, effect: 'expBoost' },
        { name: '扎啤*1', price: 200, probability: 0.2, isSpecial: false, effect: 'intimacyBoost' }
    ];
    
    // 手动刷新（使用金币）时，添加旅行背包到物品池
    // 确保不会连续出现2次旅行背包
    if (isManualRefresh && !gameData.shop.lastHadTravelBackpack) {
        itemPool.push({ name: '旅行背包', price: 10000, probability: 0.01, isSpecial: true, isHidden: true });
    }
    
    // 添加已解锁的矿物（只保留石矿和煤矿）
    minerals.forEach(mineral => {
        if (gameData.player.level >= mineral.minLevel && (mineral.name === '石矿' || mineral.name === '煤矿')) {
            itemPool.push({
                name: `${mineral.name}*100`,
                price: mineral.price * 2 * 100, // 出售价值的200%，乘以数量100
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
                name: '燃料*5',
                price: 300 * 5 * 0.5, // 300*5*50%
                probability: 1,
                isDiscount: true,
                discountText: '优惠50%！'
            });
        }
        
        // 检查并添加电池优惠
        if (addBatteryDiscount) {
            itemPool.push({
                name: '电池*5',
                price: 350 * 5 * 0.5, // 350*5*50%
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
            // 根据合金类型设置价格，使用出售价格的200%作为单个价格，然后乘以数量
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
            }
            const amount = 5; // 合金数量
            const totalPrice = singleAlloyPrice * amount;
            itemPool.push({
                name: `${alloyName}*${amount}`, // 合金数量
                price: totalPrice,
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
                if (item.name === '加工台图纸') {
                    return !gameData.workshop.unlocked;
                }
                return !gameData.shop.unlockedBlueprints[item.name];
            }
            // 确保在同一次刷新时不会同时出现2个以上的旅行背包
            if (item.name === '旅行背包') {
                const hasTravelBackpack = items.some(existingItem => existingItem.name === '旅行背包');
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
                    items.push({ 
                        name: selectedItem.name, 
                        price: selectedItem.price,
                        isDiscount: selectedItem.isDiscount,
                        discountText: selectedItem.discountText
                    });
                } else {
                    // 如果没有打折物品，创建一个打折物品
                    const randomIndex = Math.floor(Math.random() * availableItems.length);
                    const selectedItem = availableItems[randomIndex];
                    
                    // 创建打折物品（价格减半）
                    items.push({ 
                        name: selectedItem.name, 
                        price: selectedItem.price * 0.5,
                        isDiscount: true,
                        discountText: '优惠50%！'
                    });
                }
            } else if (discountItems.length > 0 && Math.random() < 0.5) {
                // 50%的概率选择优惠产品
                const randomIndex = Math.floor(Math.random() * discountItems.length);
                const selectedItem = discountItems[randomIndex];
                items.push({ 
                    name: selectedItem.name, 
                    price: selectedItem.price,
                    isDiscount: selectedItem.isDiscount,
                    discountText: selectedItem.discountText
                });
            } else {
                // 优先选择加工台图纸（如果可用）
                const workshopBlueprint = availableItems.find(item => item.name === '加工台图纸');
                if (workshopBlueprint && Math.random() < 0.3) {
                    // 30%的概率选择加工台图纸
                    items.push({ name: workshopBlueprint.name, price: workshopBlueprint.price });
                } else {
                    // 应用3级商店的"我需要的功能"
                    let selectedItem = null;
                    
                    if (gameData.shop.level >= 2 && gameData.shop.neededItem) {
                        // 为需要的物品增加概率
                        const neededItem = availableItems.find(item => {
                            const [itemBaseName] = item.name.split('*');
                            const [neededBaseName] = gameData.shop.neededItem.split('*');
                            return itemBaseName === neededBaseName;
                        });
                        if (neededItem && Math.random() < 0.4) { // 40%概率选择需要的物品
                            selectedItem = neededItem;
                        }
                    }
                    
                    // 如果没有选中需要的物品，随机选择
                    if (!selectedItem) {
                        const randomIndex = Math.floor(Math.random() * availableItems.length);
                        selectedItem = availableItems[randomIndex];
                    }
                
                // 为非优惠产品添加随机打折或涨价
                let finalItem = { ...selectedItem };
                
                // 旅行背包不参与打折优惠
                if (finalItem.name !== '旅行背包') {
                    // 应用3级商店的价格调整
                    if (gameData.shop.level >= 2 && gameData.shop.neededItem) {
                        const [finalItemBaseName] = finalItem.name.split('*');
                        const [neededBaseName] = gameData.shop.neededItem.split('*');
                        if (finalItemBaseName === neededBaseName) {
                            // 价格为300%
                            finalItem.price = finalItem.price * 3;
                            finalItem.isPriceIncrease = true;
                            finalItem.priceIncreaseText = '需求价格！';
                        }
                    } else if (!finalItem.isDiscount && !isFreeRefresh) {
                        const randomEvent = Math.random();
                        if (randomEvent < 0.1) { // 10%几率打折
                            finalItem.price = finalItem.price * 0.5;
                            finalItem.isDiscount = true;
                            finalItem.discountText = '优惠50%！';
                        } else if (randomEvent < 0.2) { // 10%几率涨价
                            finalItem.price = finalItem.price * 1.5;
                            finalItem.isPriceIncrease = true;
                            finalItem.priceIncreaseText = '涨价50%！';
                        }
                    }
                }
                
                items.push(finalItem);
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
                if (item.name === '加工台图纸') {
                    return !gameData.workshop.unlocked;
                }
                return !gameData.shop.unlockedBlueprints[item.name];
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
                    items.push({ 
                        name: selectedItem.name, 
                        price: selectedItem.price,
                        isDiscount: selectedItem.isDiscount,
                        discountText: selectedItem.discountText
                    });
                } else {
                    // 如果没有打折物品，创建一个打折物品
                    const randomIndex = Math.floor(Math.random() * availableItems.length);
                    const selectedItem = availableItems[randomIndex];
                    
                    // 创建打折物品（价格减半）
                    items.push({ 
                        name: selectedItem.name, 
                        price: selectedItem.price * 0.5,
                        isDiscount: true,
                        discountText: '优惠50%！'
                    });
                }
            } else if (discountItems.length > 0 && Math.random() < 0.5) {
                // 50%的概率选择优惠产品
                const randomIndex = Math.floor(Math.random() * discountItems.length);
                const selectedItem = discountItems[randomIndex];
                items.push({ 
                    name: selectedItem.name, 
                    price: selectedItem.price,
                    isDiscount: selectedItem.isDiscount,
                    discountText: selectedItem.discountText
                });
            } else {
                // 优先选择加工台图纸（如果可用）
                const workshopBlueprint = availableItems.find(item => item.name === '加工台图纸');
                if (workshopBlueprint && Math.random() < 0.3) {
                    // 30%的概率选择加工台图纸
                    items.push({ name: workshopBlueprint.name, price: workshopBlueprint.price });
                } else {
                    // 否则随机选择
                    const randomIndex = Math.floor(Math.random() * availableItems.length);
                    let selectedItem = availableItems[randomIndex];
                    
                    // 为非优惠产品添加随机打折或涨价
                    let finalItem = { ...selectedItem };
                    if (!finalItem.isDiscount) {
                        const randomEvent = Math.random();
                        if (randomEvent < 0.1) { // 10%几率打折
                            finalItem.price = finalItem.price * 0.5;
                            finalItem.isDiscount = true;
                            finalItem.discountText = '优惠50%！';
                        } else if (randomEvent < 0.2) { // 10%几率涨价
                            finalItem.price = finalItem.price * 1.5;
                            finalItem.isPriceIncrease = true;
                            finalItem.priceIncreaseText = '涨价50%！';
                        }
                    }
                    
                    items.push(finalItem);
                }
            }
        } else {
            // 如果没有可用物品，添加一个基础物品（棉布*100）作为默认物品
            items.push({
                name: '棉布*100',
                price: 400,
                probability: 0.2
            });
        }
    }
    
    // 最终保险：确保物品数组至少有3个物品，防止手动刷新后不显示物品
    while (items.length < 3) {
        // 直接添加基础物品，绕过过滤逻辑
        items.push({
            name: '棉布*100',
            price: 400,
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
            '木材': 1,
            '煤炭': 1,
            '硫磺': 5
        },
        energy: 1,
        description: '用于熔炉的高级燃料',
        unlocked: function() {
            return gameData.shop.unlockedBlueprints['燃料配方'];
        }
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
    '优化矿车': {
        materials: {
            '铜铁合金': 1,
            '铁矿': 15,
            '木材': 10
        },
        energy: 1,
        description: '提高矿车容量，增加单次采矿量',
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
                                <option value="电池">电池</option>
                                <option value="燃料">燃料</option>
                                <option value="优化头灯">优化头灯</option>
                                <option value="优化矿车">优化矿车</option>
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
            unlockWorkshopBtn.textContent = '加工台已解锁';
            unlockWorkshopBtn.disabled = true;
        } else {
            unlockWorkshopBtn.textContent = '解锁加工台 (需要等级15和加工台图纸)';
            unlockWorkshopBtn.disabled = false;
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
    '粗麻布': '挖煤矿随机获得'
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
                    materialsHTML += `<li style="color: ${hasEnough ? 'green' : 'red'}">${material}: ${requiredAmount} (当前: ${currentAmount}) <span style="font-size: 0.8em; color: #666;">(${source})</span></li>`;
                }
            }
            materialsHTML += '</ul>';
            
            // 生成配方信息HTML
            recipeDetails.innerHTML = `
                <h5>${selectedRecipe}</h5>
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

