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
            fuelTank: false, // 燃料箱解锁状态
            optimized: false // 优化标记，只能优化一次
        },
        headlight: {
            crafted: false,
            level: 0,
            exp: 0,
            batterySlot: false, // 电池仓解锁状态
            optimized: false // 优化标记，只能优化一次
        }
    },
    furnace: {
        crafted: false,
        level: 0
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

const backpackExpansions = {
    '棉布包': {
        name: '棉布包',
        description: '增加1堆叠数量',
        materials: { '棉布': 50 },
        effect: { stackSize: 1 },
        type: 'stack'
    },
    '织布包': {
        name: '织布包',
        description: '增加5堆叠数量',
        materials: { '棉布': 30, '织布': 30 },
        effect: { stackSize: 5 },
        type: 'stack'
    },
    '粗麻布包': {
        name: '粗麻布包',
        description: '增加15堆叠数量',
        materials: { '织布': 30, '粗麻布': 30 },
        effect: { stackSize: 15 },
        type: 'stack'
    },
    '尼龙布包': {
        name: '尼龙布包',
        description: '增加10格数和20堆叠数量',
        materials: { '尼龙布': 50, '棉布包': 3, '织布包': 3, '粗麻布包': 3 },
        effect: { capacity: 10, stackSize: 20 },
        type: 'both'
    }
};

const minerals = [
    {
        name: "石矿",
        minLevel: 0,
        maxLevel: 5,
        baseTime: 5,
        exp: 1,
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
        exp: 3,
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
        exp: 12,
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
        exp: 18,
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
        exp: 22,
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
        exp: 25,
        price: 18,
        toolReq: 15
    },
    {
        name: "银矿",
        minLevel: 30,
        maxLevel: 35,
        baseTime: 28,
        exp: 29,
        price: 21,
        toolReq: 15
    },
    {
        name: "白金矿",
        minLevel: 35,
        maxLevel: 40,
        baseTime: 33,
        exp: 31,
        price: 25,
        toolReq: 20
    },
    {
        name: "金矿",
        minLevel: 40,
        maxLevel: 45,
        baseTime: 38,
        exp: 35,
        price: 29,
        toolReq: 25
    },
    {
        name: "水晶矿",
        minLevel: 45,
        maxLevel: Infinity,
        baseTime: 41,
        exp: 40,
        price: 35,
        toolReq: 25
    }
];

let saveSlots = [];
let currentSaveSlot = "save1";

function initSaveSystem() {
    const keys = Object.keys(localStorage);
    saveSlots = keys.filter(key => key.startsWith("miningGame-save"));
    if (saveSlots.length === 0) {
        saveSlots.push("save1");
        saveGame();
    }
    updateSaveSlotsUI();
}

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
        // 采矿锄加速效果：每级减少6%的采矿时间，最高减少40%
        const pickaxeBonus = Math.min(0.4, gameData.tools.pickaxe.level * 0.06);
        const actualTime = mineral.baseTime * (1 - pickaxeBonus);
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
        switch (mineral.name) {
            case '铁矿':
                recipeHTML = '<div class="mineral-recipe">合金配方: 铜铁合金配方 (10%)</div>';
                break;
            case '钴矿':
                recipeHTML = '<div class="mineral-recipe">合金配方: 铜钴合金配方 (1%)</div>';
                break;
            case '镍矿':
                recipeHTML = '<div class="mineral-recipe">合金配方: 铜镍合金配方 (0.1%)</div>';
                break;
            case '银矿':
                recipeHTML = '<div class="mineral-recipe">合金配方: 铜银合金配方 (0.01%)</div>';
                break;
        }
        
        mineralEl.innerHTML = `
            <div class="mineral-name">${mineral.name}</div>
            <div class="mineral-level">需求等级: ${mineral.minLevel}+</div>
            ${dropsHTML}
            ${expHTML}
            ${recipeHTML}
            <div class="mineral-time">开采时间: ${actualTime.toFixed(2)}秒</div>
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
        }
    });
    document.getElementById('backpack-capacity').textContent = items.length;
    document.getElementById('backpack-max').textContent = gameData.backpack.capacity;
    const backpackTitle = document.querySelector('.backpack h2');
    backpackTitle.innerHTML = `背包 (容量: <span id="backpack-capacity">${items.length}</span>/<span id="backpack-max">${gameData.backpack.capacity}</span>) <span class="stack-size">(堆叠: ${gameData.backpack.currentStackSize})</span>`;
    showItemTotals();
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
    const pickaxeBonus = Math.min(0.4, gameData.tools.pickaxe.level * 0.06);
    const actualTime = mineral.baseTime * (1 - pickaxeBonus);
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
            const pickaxeBonus = Math.min(0.4, gameData.tools.pickaxe.level * 0.06);
            const actualTime = mineral.baseTime * (1 - pickaxeBonus);
            
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
    const pickaxeBonus = Math.min(0.4, gameData.tools.pickaxe.level * 0.06);
    const actualTime = mineral.baseTime * (1 - pickaxeBonus);
    const interval = 100;
    progressFill.style.width = '0%';
    countdown.textContent = `${actualTime.toFixed(2)}s`;
    continuousProgressInterval = setInterval(() => {
        continuousElapsedTime += interval;
        const progress = Math.min(100, (continuousElapsedTime / (actualTime * 1000)) * 100);
        const remaining = Math.max(0, actualTime - (continuousElapsedTime / 1000));
        progressFill.style.width = `${progress}%`;
        countdown.textContent = `${remaining.toFixed(2)}s`;
    }, interval);
    // 定义一个函数来处理连续采矿
    function startNextMining() {
        const currentMineral = minerals.find(m => m.name === currentContinuousMineral);
        if (currentMineral && continuousMining) {
            // 重新计算加速效果，确保等级提升后效果立即生效
            const pickaxeBonus = Math.min(0.4, gameData.tools.pickaxe.level * 0.06);
            const currentActualTime = currentMineral.baseTime * (1 - pickaxeBonus);
            
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
                                const updatedPickaxeBonus = Math.min(0.4, gameData.tools.pickaxe.level * 0.06);
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
    // 停止连续采矿后更新矿物网格，确保开采时间的显示是最新的
    generateMineralGrid();
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
    let baseAmount = 1;
    if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.active) {
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
                        // 背包中也没有燃料，尝试切换到煤矿
                        if (hasEnoughItem('煤矿', 1)) {
                            // 切换到煤矿作为燃料类型
                            gameData.tools.cart.fuelType = 'coal';
                            // 消耗煤矿
                            consumeItem('煤矿', 1);
                            // 矿车每5级提升1个采矿数量
                            const cartBonus = Math.floor(gameData.tools.cart.level / 5);
                            baseAmount = 1 + cartBonus;
                            addMessage('燃料不足，已自动切换到煤矿作为燃料！');
                        } else {
                            // 背包中也没有煤矿，自动停用矿车
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
        // 检查燃料类型
        const fuelType = gameData.tools.headlight.fuelType || 'gold';
        
        if (fuelType === 'gold') {
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
        } else if (fuelType === 'battery') {
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
                    // 背包中也没有电池，尝试切换到金币
                    if (gameData.player.gold >= 10) {
                        // 切换到金币作为燃料类型
                        gameData.tools.headlight.fuelType = 'gold';
                        // 消耗10金币
                        gameData.player.gold -= 10;
                        // 更新金币消耗时间
                        gameData.tools.headlight.lastGoldConsume = Date.now();
                        addMessage('电池不足，已自动切换到金币作为燃料！');
                    } else {
                        // 背包中也没有电池，金币也不足，自动停用头灯
                        gameData.tools.headlight.active = false;
                        addMessage('电池能量不足，背包中也没有电池，金币也不足，头灯已自动停止使用！请添加电池或金币。');
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
    
    // 铜铁合金配方：挖铁矿随机获得（概率10%）
    if (mineral.name === '铁矿') {
        if (Math.random() < 0.1) {
            addToBackpack('铜铁合金配方');
            addMessage('恭喜获得铜铁合金配方！');
        }
    }
    
    // 铜钴合金配方：挖钴矿随机获得（概率1%）
    if (mineral.name === '钴矿') {
        if (Math.random() < 0.01) {
            addToBackpack('铜钴合金配方');
            addMessage('恭喜获得铜钴合金配方！');
        }
    }
    
    // 铜镍合金配方：挖镍矿随机获得（概率0.1%）
    if (mineral.name === '镍矿') {
        if (Math.random() < 0.001) {
            addToBackpack('铜镍合金配方');
            addMessage('恭喜获得铜镍合金配方！');
        }
    }
    
    // 铜银合金配方：挖银矿随机获得（概率0.01%）
    if (mineral.name === '银矿') {
        if (Math.random() < 0.0001) {
            addToBackpack('铜银合金配方');
            addMessage('恭喜获得铜银合金配方！');
        }
    }
    
    // 计算总经验值
    let totalExp = mineral.exp; // 基础矿物经验
    
    // 矿车额外矿物经验（只有当矿车激活时才计算）
    let cartBonus = 0;
    if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.active) {
        cartBonus = 1 + Math.floor(gameData.tools.cart.level / 5);
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
        if (itemCount >= gameData.backpack.capacity) {
            // 背包满了，放入临时背包
            addToTempBackpack(itemName);
            return;
        }
        
        // 找到可用的新物品名称
        let suffix = 1;
        let newItemName = itemName;
        while (gameData.backpack.items[newItemName]) {
            suffix++;
            newItemName = `${itemName}_${suffix}`;
        }
        
        // 添加新物品
        gameData.backpack.items[newItemName] = 1;
        added = true;
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
        
        // 15级以上的需求，每级增加2个铜铁合金，金币为前一级的150%
        if (level > 15) {
            const baseLevel = 15;
            const baseRequirements = requirements[baseLevel];
            const additionalLevel = level - baseLevel;
            const materials = { ...baseRequirements.materials };
            materials['铜铁合金'] = baseRequirements.materials['铜铁合金'] + (additionalLevel * 2);
            const gold = Math.floor(baseRequirements.gold * Math.pow(1.5, additionalLevel));
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
        
        // 10级以上的需求，每级增加2个铜钴合金，金币为前一级的150%
        if (level > 10) {
            const baseLevel = 10;
            const baseRequirements = requirements[baseLevel];
            const additionalLevel = level - baseLevel;
            const materials = { ...baseRequirements.materials };
            materials['铜钴合金'] = baseRequirements.materials['铜钴合金'] + (additionalLevel * 2);
            const gold = Math.floor(baseRequirements.gold * Math.pow(1.5, additionalLevel));
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
        
        // 10级以上的需求，每级增加2个铜银合金，金币为前一级的150%
        if (level > 10) {
            const baseLevel = 10;
            const baseRequirements = requirements[baseLevel];
            const additionalLevel = level - baseLevel;
            const materials = { ...baseRequirements.materials };
            materials['铜银合金'] = baseRequirements.materials['铜银合金'] + (additionalLevel * 2);
            const gold = Math.floor(baseRequirements.gold * Math.pow(1.5, additionalLevel));
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
    if (tool.level >= 50) {
        alert(`${toolName}已达到最高等级！`);
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
            current: `当前效果: 采矿速度提升 ${Math.min(50, gameData.tools.pickaxe.level * 1)}%`,
            next: gameData.tools.pickaxe.level < 50 ? `下一级: 采矿速度提升 ${Math.min(50, (gameData.tools.pickaxe.level + 1) * 1)}%` : '已达到最高等级',
            upgrade: gameData.tools.pickaxe.level < 50 ? `升级需求: ${getNextLevelRequirements('pickaxe')}` : ''
        },
        cart: {
            name: '矿车',
            description: '增加采矿数量，消耗燃料',
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
            description: '增加高一级矿物发现几率，消耗燃料',
            current: gameData.tools.headlight.crafted ? (gameData.tools.headlight.fuelType === 'battery' ? `当前效果: 高一级矿物几率+${10 + gameData.tools.headlight.level * 1}%，数量为：5，使用电池作为燃料` : `当前效果: 高一级矿物几率+${10 + gameData.tools.headlight.level * 1}%，使用金币作为燃料`) : '未制作',
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
    
    const cartText = gameData.tools.cart.crafted 
        ? `lv${gameData.tools.cart.level} (${gameData.tools.cart.exp || 0}/${gameData.tools.cart.nextExp || 50}) ${gameData.tools.cart.active ? '(使用中)' : '(已暂停)'}` 
        : '未制作';
    document.getElementById('cart-status').textContent = cartText;
    
    // 设置矿车燃料类型选择
    const cartFuelTypeSelect = document.getElementById('cart-fuel-type');
    const addCartFuelBtn = document.getElementById('add-cart-fuel');
    if (cartFuelTypeSelect) {
        if (gameData.tools.cart.crafted) {
            if (gameData.tools.cart.optimized) {
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
        if (gameData.tools.cart.crafted && gameData.tools.cart.optimized) {
            addCartFuelBtn.disabled = false;
        } else {
            addCartFuelBtn.disabled = true;
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
    
    // 检查商店解锁条件，确保商店界面能够正确显示
    checkShopUnlock();
    
    // 更新加工台UI，确保加工台界面能够正确显示
    updateWorkshopUI();
    
    // 更新工具详细说明
    updateToolDescriptions(toolDescriptions);
}

function updateToolDescriptions(descriptions) {
    const toolsInfo = document.querySelector('.tools-info');
    let descriptionHTML = '<h3>工具效果说明</h3>';
    
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
    
    // 移除旧的说明，添加新的说明
    const existingDescription = toolsInfo.querySelector('.tool-description-container');
    if (existingDescription) {
        existingDescription.remove();
    }
    
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'tool-description-container';
    descriptionContainer.style.marginTop = '10px';
    descriptionContainer.style.padding = '10px';
    descriptionContainer.style.backgroundColor = '#f9f9f9';
    descriptionContainer.style.borderRadius = '5px';
    descriptionContainer.style.border = '1px solid #ddd';
    descriptionContainer.innerHTML = descriptionHTML;
    
    toolsInfo.appendChild(descriptionContainer);
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
    
    // 计算矿物数量，考虑矿车加成
    let baseAmount = 1;
    let cartBonus = 0;
    let cartConsume = 0;
    if (gameData.tools.cart && gameData.tools.cart.crafted && gameData.tools.cart.active) {
        // 检查煤矿数量
        if (hasEnoughItem('煤矿', 1)) {
            // 矿车每5级提升1个采矿数量
            cartBonus = Math.floor(gameData.tools.cart.level / 5);
            cartConsume = 1; // 矿车消耗1煤矿
        }
    }
    const totalAmount = baseAmount + cartBonus;
    
    // 显示矿物数量，包括加成说明
    if (cartBonus > 0) {
        message += `${mineral.name}*${totalAmount}（基础*${baseAmount}+矿车*${cartBonus}）, `;
        if (cartConsume > 0) {
            message += `煤矿-${cartConsume}（矿车消耗）, `;
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
        // 检查是否是矿物
        const mineral = minerals.find(m => m.name === baseItemName);
        if (mineral) {
            price = mineral.price;
        } else {
            // 检查是否是合金
            if (alloyRecipes[baseItemName]) {
                // 为合金设置价格：两个材料的价格总和再加上50%，确保玩家制作合金后出售能够获得利润
                switch (baseItemName) {
                    case '铜铁合金':
                        // 铜矿(11) + 铁矿(7) = 18 * 1.5 = 27 → 修正：(11+7)*2=36 * 1.5=54
                        price = 54;
                        break;
                    case '铜钴合金':
                        // 铜矿(11) + 钴矿(15) = 26 * 1.5 = 39 → 修正：(11+15)*2=52 * 1.5=78
                        price = 78;
                        break;
                    case '铜镍合金':
                        // 铜矿(11) + 镍矿(18) = 29 * 1.5 = 43.5 → 44 → 修正：(11+18)*2=58 * 1.5=87
                        price = 87;
                        break;
                    case '铜银合金':
                        // 铜矿(11) + 银矿(21) = 32 * 1.5 = 48 → 修正：(11+21)*2=64 * 1.5=96
                        price = 96;
                        break;
                    default:
                        price = 20;
                }
            } else {
                // 其他物品默认价格
                price = 1;
            }
        }
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
    
    // 计算总价并增加金币
    const totalPrice = price * amount;
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
    addMessage(`熔炉升级成功！现在是${nextLevel}级！`);
    updateUI();
    updateBackpackDisplay();
    updateFurnaceUI();
    updateMessages();
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
    }
    
    updateBackpackDisplay();
    updateMessages();
    saveGame();
}

// 制作指定类型的合金
function makeAlloy(alloyName, amount = 1) {
    if (!gameData.furnace.crafted) {
        alert('请先制作熔炉！');
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
    
    // 生成完整消息
    let fullMessage = `合金制作成功！获得${alloyName}×${amount}，${consumeMessage}`;
    if (toolExpMessage) {
        fullMessage += `，${toolExpMessage}`;
    }
    fullMessage += `，经验*${alloyExpWithBonus}！`;
    
    addMessage(fullMessage);
    
    updateBackpackDisplay();
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
    }
    // 确保金手套属性存在
    if (!gameData.goldenGlove) {
        gameData.goldenGlove = {
            active: false,
            endTime: 0
        };
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
            level: 0
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
    
    // 获取背包中的所有物品
    const itemsInBackpack = [];
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        const baseName = itemName.split('_')[0];
        if (!itemsInBackpack.includes(baseName)) {
            itemsInBackpack.push(baseName);
        }
    }
    
    // 获取已设置过滤的物品
    const filteredItems = Object.keys(gameData.filterSettings);
    
    // 合并所有物品，去重
    const allItems = [...new Set([...itemsInBackpack, ...filteredItems])];
    
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
    if (!gameData.filterSettings[selectedItem]) {
        alert('该物品没有过滤设置！');
        return;
    }
    
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
                // 计算出售价格
                const itemPrice = getItemPrice(itemName);
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
                        <span>免费刷新次数: ${gameData.shop.freeRefreshes}</span>
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
                                <option value="棉布*100">棉布*100</option>
                                <option value="电池*1">电池*1</option>
                                <option value="燃料*1">燃料*1</option>
                                <option value="木材*100">木材*100</option>
                                <option value="金手套">金手套</option>
                                <option value="石矿*100">石矿*100</option>
                                <option value="煤矿*100">煤矿*100</option>
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
                            <label>选择物品 (最多2种):</label><br>
                            <input type="checkbox" id="auto-item-1" value="加工台图纸"> 加工台图纸<br>
                            <input type="checkbox" id="auto-item-2" value="电池图纸"> 电池图纸<br>
                            <input type="checkbox" id="auto-item-3" value="燃料配方"> 燃料配方<br>
                            <input type="checkbox" id="auto-item-4" value="棉布*100"> 棉布*100<br>
                            <input type="checkbox" id="auto-item-5" value="电池*1"> 电池*1<br>
                            <input type="checkbox" id="auto-item-6" value="燃料*1"> 燃料*1<br>
                            <input type="checkbox" id="auto-item-7" value="木材*100"> 木材*100<br>
                            <input type="checkbox" id="auto-item-8" value="金手套"> 金手套<br>
                            <input type="checkbox" id="auto-item-9" value="石矿*100"> 石矿*100<br>
                            <input type="checkbox" id="auto-item-10" value="煤矿*100"> 煤矿*100<br>
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
            
            // 添加购买按钮事件监听器
            setTimeout(() => {
                document.querySelectorAll('.buy-item').forEach(button => {
                    button.addEventListener('click', function() {
                        const itemName = this.getAttribute('data-item');
                        const price = parseInt(this.getAttribute('data-price'));
                        buyShopItem(itemName, price);
                    });
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
    
    // 刷新商店物品
    refreshShopItems();
    
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
    
    // 添加购买按钮事件监听器
    document.querySelectorAll('.buy-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            const price = parseInt(this.getAttribute('data-price'));
            buyShopItem(itemName, price);
        });
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
    // 找到物品在商店列表中的索引
    const itemIndex = gameData.shop.items.findIndex(item => item.name === itemName && item.price === price);
    
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
        
        // 金手套购买后放入背包
        if (itemName === '金手套') {
            addToBackpack('金手套');
        }
        
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

function refreshShopItems() {
    if (!gameData.shop.unlocked) return;
    
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
        { name: '金手套', price: 10000, probability: 0.2, isSpecial: true, effect: 'expBoost' }
    ];
    
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
    
    // 添加燃料和电池的优惠产品（10%几率）
    if (Math.random() < 0.1) {
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
            return true;
        });
        
        if (availableItems.length > 0) {
            // 优先检查是否有优惠产品
            const discountItems = availableItems.filter(item => item.isDiscount);
            if (discountItems.length > 0 && Math.random() < 0.5) {
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
                        const neededItem = availableItems.find(item => item.name === gameData.shop.neededItem);
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
                
                // 应用3级商店的价格调整
                if (gameData.shop.level >= 2 && gameData.shop.neededItem && finalItem.name === gameData.shop.neededItem) {
                    // 价格为300%
                    finalItem.price = finalItem.price * 3;
                    finalItem.isPriceIncrease = true;
                    finalItem.priceIncreaseText = '需求价格！';
                } else if (!finalItem.isDiscount) {
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
            if (discountItems.length > 0 && Math.random() < 0.5) {
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
            break;
        }
    }
    
    gameData.shop.items = items;
    gameData.shop.lastRefresh = Date.now();
    
    // 应用4级商店的"自动采购功能"
    if (gameData.shop.level >= 3) {
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
        const freeRefreshElapsed = (now - gameData.shop.lastFreeRefreshTime) / 1000;
        if (freeRefreshElapsed >= 300) { // 5分钟 = 300秒
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
    
    if (remaining <= 0) {
        refreshShopItems();
    }
}

// 手动刷新商店
function manualRefreshShop() {
    if (gameData.player.gold >= gameData.shop.manualRefreshCost) {
        gameData.player.gold -= gameData.shop.manualRefreshCost;
        refreshShopItems();
        updateUI();
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
                        <p>电池槽: ${gameData.workshop.batterySlot}/${gameData.workshop.batterySlot === Infinity ? '无上限' : gameData.workshop.batterySlot}</p>
                        <p>电池能量: ${gameData.workshop.batteryEnergy}/${gameData.workshop.maxBatteryEnergy}</p>
                        <div class="battery-progress">
                            <div class="battery-progress-bar" style="width: ${(gameData.workshop.batteryEnergy / gameData.workshop.maxBatteryEnergy) * 100}%"></div>
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
        // 升级到5级：无上限电池仓
        gameData.workshop.level = 5;
        gameData.workshop.batterySlot = Infinity;
        gameData.workshop.maxBatteryEnergy = Infinity;
        addMessage('加工台升级到5级！解锁无上限电池仓，可以无限添加电池！');
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
        // 检查当前能量是否已满（只在非无限能量时检查）
        if (gameData.workshop.maxBatteryEnergy !== Infinity && gameData.workshop.batteryEnergy >= gameData.workshop.maxBatteryEnergy) {
            addMessage('电池能量已满，无法安装更多电池！');
            updateMessages();
            return;
        }
        
        // 消耗电池
        consumeItem('电池', 1);
        // 增加能量
        const energyToAdd = 50; // 1个电池提供50点能量
        if (gameData.workshop.maxBatteryEnergy === Infinity) {
            // 无限能量：直接增加
            gameData.workshop.batteryEnergy += energyToAdd;
        } else {
            // 有限能量：不超过最大值
            gameData.workshop.batteryEnergy = Math.min(gameData.workshop.batteryEnergy + energyToAdd, gameData.workshop.maxBatteryEnergy);
        }
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
            // 更新电池能量
            const now = Date.now();
            const timeSinceLast = now - gameData.tools.headlight.lastBatteryUpdate;
            gameData.tools.headlight.batteryEnergy = Math.max(0, gameData.tools.headlight.batteryEnergy - (timeSinceLast / 1000));
            gameData.tools.headlight.lastBatteryUpdate = now;
            
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

// 修改定时器，同时更新进度和UI
setInterval(() => {
    updateToolProgress();
    updateToolUI();
    updateGoldenGloveUI();
}, 1000); // 每秒更新一次

window.addEventListener('DOMContentLoaded', initGame);

