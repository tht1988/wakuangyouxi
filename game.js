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
            exp: 0
        },
        headlight: {
            crafted: false,
            level: 0,
            exp: 0
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
        maxExpansionSlots: 10,
        baseStackSize: 20,
        currentStackSize: 20
    },
    miningCount: {},
    selectedMineral: null
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
            { name: "尼龙布", chance: 0.2 }
        ]
    },
    {
        name: "钴矿",
        minLevel: 20,
        maxLevel: 25,
        baseTime: 20,
        exp: 22,
        price: 15,
        toolReq: 5
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
    generateMineralGrid();
    generateBackpack();
    generateExpansionSlots();
    updateUI();
    updateFurnaceUI();
    updateGainedInfo();
    updateMessages();
    addEventListeners();
}

function generateMineralGrid() {
    const grid = document.getElementById('mineral-grid');
    grid.innerHTML = '';
    minerals.forEach(mineral => {
        const mineralEl = document.createElement('div');
        mineralEl.className = 'mineral';
        mineralEl.dataset.name = mineral.name;
        const pickaxeBonus = Math.min(0.4, gameData.tools.pickaxe.level * 0.05);
        const actualTime = mineral.baseTime * (1 - pickaxeBonus);
        const canMine = gameData.player.level >= mineral.minLevel && 
                       gameData.player.level <= mineral.maxLevel &&
                       (!mineral.toolReq || gameData.tools.pickaxe.level >= mineral.toolReq);
        const isCurrentlyMining = continuousMining && currentContinuousMineral === mineral.name;
        let continuousBtnText = '';
        let continuousBtnDisabled = !canMine;
        const isContinuousUnlocked = gameData.miningCount[mineral.name] >= 10;
        if (isCurrentlyMining) {
            continuousBtnText = '停止连续开采';
            continuousBtnDisabled = false;
        } else if (isContinuousUnlocked) {
            continuousBtnText = '连续开采 (已解锁)';
            continuousBtnDisabled = false;
        } else {
            continuousBtnText = `连续开采 (${gameData.miningCount[mineral.name] || 0}/10)`;
            continuousBtnDisabled = !canMine || (gameData.miningCount[mineral.name] || 0) < 10;
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
        mineralEl.innerHTML = `
            <div class="mineral-name">${mineral.name}</div>
            <div class="mineral-level">需求等级: ${mineral.minLevel}-${mineral.maxLevel}</div>
            ${dropsHTML}
            <div class="mineral-time">开采时间: ${actualTime.toFixed(1)}秒</div>
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
    for (const [itemName, count] of Object.entries(gameData.backpack.items)) {
        const baseName = itemName.split('_')[0];
        if (baseName in backpackExpansions) {
            if (!expansionsInBackpack.includes(baseName)) {
                expansionsInBackpack.push(baseName);
            }
        }
    }
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
    const itemEntries = Object.entries(gameData.backpack.items);
    let hasExpansion = false;
    let itemToRemove = null;
    for (const [itemName, count] of itemEntries) {
        const baseName = itemName.split('_')[0];
        if (baseName === expansionName) {
            hasExpansion = true;
            itemToRemove = itemName;
            break;
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
    consumeItem(expansionName, 1);
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
        const currentItemsCount = Object.keys(gameData.backpack.items).length;
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
        
        if (currentItemsCount > tempCapacity) {
            alert('背包空间不足！移除扩充背包会导致物品溢出！');
            return;
        }
        
        addToBackpack(expansion);
        gameData.backpack.expansionSlots[slotIndex] = null;
        calculateBackpackStats();
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
    const pickaxeBonus = Math.min(0.4, gameData.tools.pickaxe.level * 0.05);
    const actualTime = mineral.baseTime * (1 - pickaxeBonus);
    let elapsed = 0;
    const interval = 100;
    countdown.textContent = `${actualTime.toFixed(1)}s`;
    const miningInterval = setInterval(() => {
        elapsed += interval;
        const progress = Math.min(100, (elapsed / (actualTime * 1000)) * 100);
        const remaining = Math.max(0, actualTime - (elapsed / 1000));
        progressFill.style.width = `${progress}%`;
        countdown.textContent = `${remaining.toFixed(1)}s`;
        if (progress >= 100) {
            clearInterval(miningInterval);
            progressContainer.style.display = 'none';
            mineBtn.disabled = false;
            const isContinuousUnlocked = gameData.miningCount[mineral.name] >= 10;
            continuousBtn.disabled = !isContinuousUnlocked;
            continuousBtn.textContent = isContinuousUnlocked ? '连续开采 (已解锁)' : `连续开采 (${gameData.miningCount[mineral.name] || 0}/10)`;
            completeMining(mineral);
        }
    }, interval);
}

let continuousMining = false;
let currentContinuousMineral = null;
let continuousMiningInterval = null;
let continuousProgressInterval = null;
let continuousElapsedTime = 0;

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
    continuousMining = true;
    currentContinuousMineral = mineralName;
    continuousElapsedTime = 0;
    mineBtn.disabled = true;
    continuousBtn.textContent = '停止连续开采';
    progressContainer.style.display = 'block';
    const pickaxeBonus = Math.min(0.4, gameData.tools.pickaxe.level * 0.05);
    const actualTime = mineral.baseTime * (1 - pickaxeBonus);
    const interval = 100;
    progressFill.style.width = '0%';
    countdown.textContent = `${actualTime.toFixed(1)}s`;
    continuousProgressInterval = setInterval(() => {
        continuousElapsedTime += interval;
        const progress = Math.min(100, (continuousElapsedTime / (actualTime * 1000)) * 100);
        const remaining = Math.max(0, actualTime - (continuousElapsedTime / 1000));
        progressFill.style.width = `${progress}%`;
        countdown.textContent = `${remaining.toFixed(1)}s`;
    }, interval);
    continuousMiningInterval = setInterval(() => {
        const currentMineral = minerals.find(m => m.name === currentContinuousMineral);
        if (currentMineral) {
            completeMining(currentMineral);
            continuousElapsedTime = 0;
            progressFill.style.width = '0%';
            countdown.textContent = `${actualTime.toFixed(1)}s`;
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
        const isContinuousUnlocked = gameData.miningCount[mineralName] >= 10;
        if (isContinuousUnlocked) {
            continuousBtn.textContent = `连续开采 (已解锁)`;
        } else {
            continuousBtn.textContent = `连续开采 (${gameData.miningCount[mineralName] || 0}/10)`;
        }
        continuousBtn.disabled = false;
    }
    generateMineralGrid();
}

function completeMining(mineral) {
    if (!gameData.miningCount) {
        gameData.miningCount = {};
    }
    if (!continuousMining) {
        gameData.miningCount[mineral.name] = (gameData.miningCount[mineral.name] || 0) + 1;
    }
    gameData.player.exp += mineral.exp;
    gameData.tools.pickaxe.exp += mineral.exp;
    if (gameData.tools.cart.crafted) {
        gameData.tools.cart.exp += mineral.exp;
    }
    if (gameData.tools.headlight.crafted) {
        gameData.tools.headlight.exp += mineral.exp;
    }
    addGainedExp(mineral.exp);
    checkLevelUp();
    addToBackpack(mineral.name);
    addGainedMineral();
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
    const miningMessage = generateMiningMessage(mineral, obtainedDrops);
    addMessage(miningMessage);
    updateUI();
    updateBackpackDisplay();
    updateMessages();
    if (!continuousMining) {
        generateMineralGrid();
    }
    saveGame();
}

function addToBackpack(itemName) {
    calculateBackpackStats();
    const currentStackSize = gameData.backpack.currentStackSize;
    let added = false;
    const itemsCopy = { ...gameData.backpack.items };
    for (const [name, count] of Object.entries(itemsCopy)) {
        const baseName = name.split('_')[0];
        if (baseName === itemName && count < currentStackSize) {
            gameData.backpack.items[name]++;
            added = true;
            break;
        }
    }
    if (!added) {
        const itemEntries = Object.entries(gameData.backpack.items);
        let itemCount = itemEntries.length;
        if (itemCount >= gameData.backpack.capacity) {
            addMessage('背包已满，无法添加新物品！');
            return;
        }
        let suffix = 1;
        let newItemName = itemName;
        while (gameData.backpack.items[newItemName]) {
            suffix++;
            newItemName = `${itemName}_${suffix}`;
        }
        gameData.backpack.items[newItemName] = 1;
    }
    updateBackpackDisplay();
}

function checkLevelUp() {
    while (gameData.player.exp >= gameData.player.nextExp) {
        gameData.player.exp -= gameData.player.nextExp;
        gameData.player.level++;
        gameData.player.nextExp = Math.floor(gameData.player.nextExp * 1.5);
        addMessage(`玩家升级到 ${gameData.player.level} 级！`);
    }
    while (gameData.tools.pickaxe.exp >= gameData.tools.pickaxe.nextExp) {
        gameData.tools.pickaxe.exp -= gameData.tools.pickaxe.nextExp;
        gameData.tools.pickaxe.level++;
        gameData.tools.pickaxe.nextExp = Math.floor(gameData.tools.pickaxe.nextExp * 1.5);
        addMessage(`采矿锄升级到 ${gameData.tools.pickaxe.level} 级！`);
    }
    if (gameData.tools.cart.crafted) {
        if (gameData.tools.cart.exp === undefined) gameData.tools.cart.exp = 0;
        if (gameData.tools.cart.nextExp === undefined) gameData.tools.cart.nextExp = 50;
        while (gameData.tools.cart.exp >= gameData.tools.cart.nextExp) {
            gameData.tools.cart.exp -= gameData.tools.cart.nextExp;
            gameData.tools.cart.level++;
            gameData.tools.cart.nextExp = Math.floor(gameData.tools.cart.nextExp * 1.5);
            addMessage(`矿车升级到 ${gameData.tools.cart.level} 级！`);
        }
    }
    if (gameData.tools.headlight.crafted) {
        if (gameData.tools.headlight.exp === undefined) gameData.tools.headlight.exp = 0;
        if (gameData.tools.headlight.nextExp === undefined) gameData.tools.headlight.nextExp = 50;
        while (gameData.tools.headlight.exp >= gameData.tools.headlight.nextExp) {
            gameData.tools.headlight.exp -= gameData.tools.headlight.nextExp;
            gameData.tools.headlight.level++;
            gameData.tools.headlight.nextExp = Math.floor(gameData.tools.headlight.nextExp * 1.5);
            addMessage(`头灯升级到 ${gameData.tools.headlight.level} 级！`);
        }
    }
}

function updateUI() {
    document.getElementById('player-level').textContent = `lv${gameData.player.level}`;
    document.getElementById('player-exp').textContent = gameData.player.exp;
    document.getElementById('player-next-exp').textContent = gameData.player.nextExp;
    document.getElementById('player-gold').textContent = gameData.player.gold;
    document.getElementById('pickaxe-level').textContent = `lv${gameData.tools.pickaxe.level}`;
    document.getElementById('pickaxe-exp').textContent = gameData.tools.pickaxe.exp;
    document.getElementById('pickaxe-next-exp').textContent = gameData.tools.pickaxe.nextExp;
    document.getElementById('cart-status').textContent = gameData.tools.cart.crafted ? `lv${gameData.tools.cart.level}` : '未制作';
    document.getElementById('headlight-status').textContent = gameData.tools.headlight.crafted ? `lv${gameData.tools.headlight.level}` : '未制作';
    document.getElementById('furnace-level').textContent = gameData.furnace.level;
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
    const itemEntries = Object.entries(gameData.backpack.items);
    let total = 0;
    for (const [name, count] of itemEntries) {
        const baseName = name.split('_')[0];
        if (baseName === itemName) {
            total += count;
        }
    }
    return total >= amount;
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
            cloth: 0
        };
    }
}

function updateGainedInfo() {
    ensureGainedInfoExists();
    document.getElementById('gained-exp').textContent = gameData.gainedInfo.exp;
    document.getElementById('gained-gold').textContent = gameData.gainedInfo.gold;
    document.getElementById('gained-minerals').textContent = gameData.gainedInfo.minerals;
    document.getElementById('gained-cloth').textContent = gameData.gainedInfo.cloth;
}

function resetGainedInfo() {
    ensureGainedInfoExists();
    gameData.gainedInfo.exp = 0;
    gameData.gainedInfo.gold = 0;
    gameData.gainedInfo.minerals = 0;
    gameData.gainedInfo.cloth = 0;
    updateGainedInfo();
}

function addGainedExp(amount) {
    ensureGainedInfoExists();
    gameData.gainedInfo.exp += amount;
    updateGainedInfo();
}

function addGainedGold(amount) {
    ensureGainedInfoExists();
    gameData.gainedInfo.gold += amount;
    updateGainedInfo();
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

function generateMiningMessage(mineral, drops) {
    let message = '恭喜获得：';
    message += `${mineral.name}*1, `;
    drops.forEach(drop => {
        message += `${drop}*1, `;
    });
    message += `人物经验*${mineral.exp}, `;
    message += `采矿锄经验*${mineral.exp}, `;
    if (gameData.tools.cart.crafted) {
        message += `矿车经验*${mineral.exp}, `;
    }
    if (gameData.tools.headlight.crafted) {
        message += `头灯经验*${mineral.exp}, `;
    }
    message = message.slice(0, -2);
    message += '！';
    return message;
}

function addEventListeners() {
    document.getElementById('sell-btn').addEventListener('click', () => {
        const sellPanel = document.getElementById('sell-panel');
        sellPanel.classList.toggle('active');
        updateSellPanel();
        document.getElementById('disassemble-panel').classList.remove('active');
    });
    document.getElementById('organize-btn').addEventListener('click', organizeBackpack);
    document.getElementById('disassemble-btn').addEventListener('click', () => {
        const disassemblePanel = document.getElementById('disassemble-panel');
        disassemblePanel.classList.toggle('active');
        updateDisassemblePanel();
        document.getElementById('sell-panel').classList.remove('active');
    });
    document.getElementById('confirm-sell').addEventListener('click', sellItem);
    document.getElementById('confirm-disassemble').addEventListener('click', disassembleItem);
    document.getElementById('craft-cart').addEventListener('click', craftCart);
    document.getElementById('craft-headlight').addEventListener('click', craftHeadlight);
    document.getElementById('craft-furnace').addEventListener('click', craftFurnace);
    document.getElementById('craft-backpack').addEventListener('click', openBackpackCraftPanel);
    document.getElementById('smelt-stone').addEventListener('click', smeltStone);
    document.getElementById('make-alloy').addEventListener('click', () => {
        const requiredLevel = 15;
        if (gameData.player.level < requiredLevel) {
            alert(`等级不足！需要${requiredLevel}级才能制作合金`);
        } else {
            openAlloyCraftPanel();
        }
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
    const items = Object.keys(gameData.backpack.items);
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        const displayName = item.split('_')[0];
        option.textContent = `${displayName} (${gameData.backpack.items[item]})`;
        sellItemSelect.appendChild(option);
    });
}

function sellItem() {
    const sellItemSelect = document.getElementById('sell-item');
    const sellAmountInput = document.getElementById('sell-amount');
    const itemName = sellItemSelect.value;
    const amount = parseInt(sellAmountInput.value);
    if (!itemName || isNaN(amount) || amount <= 0) {
        return;
    }
    let price = 0;
    const baseItemName = itemName.split('_')[0];
    const mineral = minerals.find(m => m.name === baseItemName);
    if (mineral) {
        price = mineral.price;
    } else {
        price = 1;
    }
    if (gameData.backpack.items[itemName] < amount) {
        alert('物品数量不足！');
        return;
    }
    const totalPrice = price * amount;
    gameData.player.gold += totalPrice;
    addGainedGold(totalPrice);
    gameData.backpack.items[itemName] -= amount;
    const displayName = itemName.split('_')[0];
    const sellMessage = `出售成功：${displayName}*${amount}，获得金币*${totalPrice}！`;
    addMessage(sellMessage);
    if (gameData.backpack.items[itemName] <= 0) {
        delete gameData.backpack.items[itemName];
    }
    updateUI();
    updateBackpackDisplay();
    updateSellPanel();
}

function consumeItem(itemName, amount) {
    const itemEntries = Object.entries(gameData.backpack.items);
    let remaining = amount;
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
    if (gameData.player.gold < 100) {
        alert('金币不足！需要100金币');
        return;
    }
    if (!consumeItem('铁矿', 50)) {
        alert('材料不足！需要铁矿50');
        return;
    }
    gameData.player.gold -= 100;
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
        const furnaceContainer = document.querySelector('.furnace');
        const furnaceControls = furnaceContainer.querySelector('.furnace-controls');
        const upgradeContainer = document.createElement('div');
        upgradeContainer.className = 'furnace-upgrade';
        upgradeContainer.innerHTML = '<button id="upgrade-furnace">升级熔炉</button>';
        furnaceContainer.appendChild(upgradeContainer);
        document.getElementById('upgrade-furnace').addEventListener('click', upgradeFurnace);
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
            } else {
                upgradeBtn.textContent = '熔炉已达到最高等级';
                upgradeBtn.disabled = true;
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
        }
    }
}

function smeltStone() {
    if (!gameData.furnace.crafted) {
        alert('请先制作熔炉！');
        return;
    }
    const furnaceLevel = gameData.furnace.level;
    let stoneCost = 10;
    let coalCost = 1;
    let limeOutput = 1;
    
    if (furnaceLevel >= 2) {
        coalCost *= 0.9;
    }
    if (furnaceLevel >= 3) {
        coalCost *= 0.95;
    }
    if (furnaceLevel >= 4) {
        coalCost *= 0.9;
    }
    if (furnaceLevel >= 5) {
        coalCost *= 0.8;
    }
    
    coalCost = Math.max(1, Math.floor(coalCost));
    
    if (!consumeItem('石矿', stoneCost)) {
        alert(`材料不足！需要石矿${stoneCost}`);
        return;
    }
    if (!consumeItem('煤矿', coalCost)) {
        alert(`材料不足！需要煤矿${coalCost}`);
        return;
    }
    
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
        for (let i = 0; i < stoneCost; i++) {
            addToBackpack('石矿');
        }
        for (let i = 0; i < coalCost; i++) {
            addToBackpack('煤矿');
        }
        alert('背包已满，无法融石！');
        return;
    }
    
    for (let i = 0; i < limeOutput; i++) {
        addToBackpack('石灰');
    }
    
    let message = `融石成功！获得石灰*${limeOutput}！`;
    if (furnaceLevel >= 2) {
        message += ` (燃料消耗减少${getFuelReduction(furnaceLevel)}%)`;
    }
    if (furnaceLevel >= 3) {
        message += ` (燃烧时间延长${getBurnTimeIncrease(furnaceLevel)}%)`;
    }
    
    addMessage(message);
    updateBackpackDisplay();
    updateMessages();
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
        materials: { '铜矿': 2, '铁矿': 3 },
        description: '用于熔炉升级和高级工具制作'
    },
    '铜钴合金': {
        materials: { '铜矿': 3, '钴矿': 2 },
        description: '用于高级熔炉升级'
    },
    '铜镍合金': {
        materials: { '铜矿': 3, '镍矿': 2 },
        description: '用于顶级熔炉升级'
    },
    '铜银合金': {
        materials: { '铜矿': 4, '银矿': 1 },
        description: '用于终极熔炉升级'
    }
};

function openAlloyCraftPanel() {
    let panelHTML = '<h3>制作合金</h3><div class="alloy-craft-list">';
    for (const [alloy, data] of Object.entries(alloyRecipes)) {
        let materialsText = '';
        for (const [material, amount] of Object.entries(data.materials)) {
            materialsText += `${material}×${amount} `;
        }
        let sourceText = '';
        let levelText = '';
        const requiredLevel = getRequiredLevelForAlloy(alloy);
        switch (alloy) {
            case '铜铁合金':
                sourceText = '配方出处：熔炉升级需要';
                levelText = `需要等级：${requiredLevel}`;
                break;
            case '铜钴合金':
                sourceText = '配方出处：高级熔炉升级需要';
                levelText = `需要等级：${requiredLevel}`;
                break;
            case '铜镍合金':
                sourceText = '配方出处：顶级熔炉升级需要';
                levelText = `需要等级：${requiredLevel}`;
                break;
            case '铜银合金':
                sourceText = '配方出处：终极熔炉升级需要';
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
    
    for (const [material, amount] of Object.entries(recipe.materials)) {
        consumeItem(material, amount);
    }
    
    addToBackpack(alloyName);
    addMessage(`合金制作成功！获得${alloyName}*1！`);
    updateUI();
    updateBackpackDisplay();
    openAlloyCraftPanel();
}

function getRequiredLevelForAlloy(alloyName) {
    const levelRequirements = {
        '铜铁合金': 15,
        '铜钴合金': 20,
        '铜镍合金': 25,
        '铜银合金': 30
    };
    return levelRequirements[alloyName] || 15;
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
    calculateBackpackStats();
    generateBackpack();
    generateExpansionSlots();
    updateBackpackDisplay();
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
            maxExpansionSlots: 10,
            baseStackSize: 20,
            currentStackSize: 20
        };
    }
    if (!gameData.miningCount) {
        gameData.miningCount = {};
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
    if (!gameData.backpack.maxExpansionSlots) {
        gameData.backpack.maxExpansionSlots = 10;
    }
    while (gameData.backpack.expansionSlots.length < gameData.backpack.maxExpansionSlots) {
        gameData.backpack.expansionSlots.push(null);
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
            maxExpansionSlots: 10,
            baseStackSize: 20,
            currentStackSize: 20
        },
        miningCount: {},
        selectedMineral: null
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

window.addEventListener('DOMContentLoaded', initGame);
