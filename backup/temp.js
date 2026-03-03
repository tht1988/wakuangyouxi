// 临时文件，用于重写toggleMinersGuild函数
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
            autoMining: {
                enabled: false,
                selectedMiner: null,
                selectedMineral: null,
                interval: 60,
                lastMiningTime: 0
            },
            commissionRate: 0.1,
            maxMiners: 5
        };
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
                        <button onclick="saveAutoMiningSettings()" style="margin-top: 15px; padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer;">
                            确认派遣
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
    style.textContent = '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } } .miners-guild-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; animation: fadeIn 0.3s ease-in-out; } .miners-guild-panel { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); width: 90%; max-width: 600px; max-height: 80vh; overflow-y: auto; animation: slideIn 0.3s ease-out; } .miners-guild-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: linear-gradient(90deg, #2c3e50 0%, #34495e 100%); color: white; border-radius: 12px 12px 0 0; } .miners-guild-header h3 { margin: 0; font-size: 1.5em; font-weight: 600; } .miners-guild-header button { padding: 8px 16px; background: linear-gradient(45deg, #e74c3c 0%, #c0392b 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.3s ease; } .miners-guild-header button:hover { background: linear-gradient(45deg, #c0392b 0%, #a93226 100%); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4); } .miners-guild-content { padding: 25px; } .miners-section, .auto-mining-section, .badge-upgrade-section { background: white; border-radius: 10px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; } .miners-section:hover, .auto-mining-section:hover, .badge-upgrade-section:hover { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15); transform: translateY(-2px); } .badge-info { margin-bottom: 15px; } .badge-level, .badge-efficiency { margin-bottom: 5px; font-size: 0.95em; } .upgrade-materials { margin-bottom: 15px; } .material-item { margin-bottom: 8px; display: flex; justify-content: space-between; } .material-amount.enough { color: #4CAF50; font-weight: bold; } .material-amount.not-enough { color: #f44336; } .max-level { color: #FF9800; font-weight: bold; margin-top: 10px; } .miners-section h4, .auto-mining-section h4 { margin: 0 0 15px 0; color: #2c3e50; font-size: 1.2em; font-weight: 600; border-bottom: 2px solid #3498db; padding-bottom: 8px; } .miners-list { margin-bottom: 15px; } .miner-item { display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; border-radius: 8px; padding: 12px; margin-bottom: 10px; border-left: 4px solid #3498db; transition: all 0.3s ease; } .miner-item:hover { background: #e3f2fd; transform: translateX(5px); } .miner-info { flex: 1; } .miner-name { font-weight: 600; color: #2c3e50; margin-bottom: 4px; } .miner-status { font-size: 0.9em; color: #7f8c8d; } .miner-actions button { padding: 6px 14px; background: linear-gradient(45deg, #e74c3c 0%, #c0392b 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85em; font-weight: 500; transition: all 0.3s ease; } .miner-actions button:hover { background: linear-gradient(45deg, #c0392b 0%, #a93226 100%); transform: translateY(-1px); box-shadow: 0 2px 8px rgba(231, 76, 60, 0.4); } .no-miners { text-align: center; padding: 30px; color: #7f8c8d; font-style: italic; background: #f8f9fa; border-radius: 8px; border: 2px dashed #dee2e6; } .auto-mining-settings { display: flex; flex-direction: column; gap: 15px; } .setting-item { display: flex; align-items: center; gap: 10px; } .setting-item label { flex: 0 0 120px; font-weight: 500; color: #2c3e50; } .setting-item input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; } .setting-item select, .setting-item input[type="number"] { flex: 1; padding: 8px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 1em; transition: all 0.3s ease; } .setting-item select:focus, .setting-item input[type="number"]:focus { outline: none; border-color: #3498db; box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1); } .miners-section button, .auto-mining-section button { padding: 10px 20px; border: none; border-radius: 8px; font-size: 1em; font-weight: 600; cursor: pointer; transition: all 0.3s ease; margin-top: 10px; } .miners-section button { background: linear-gradient(45deg, #3498db 0%, #2980b9 100%); color: white; } .miners-section button:hover:not(:disabled) { background: linear-gradient(45deg, #2980b9 0%, #1f618d 100%); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4); } .miners-section button:disabled { background: #bdc3c7; cursor: not-allowed; opacity: 0.7; } .auto-mining-section button { background: linear-gradient(45deg, #27ae60 0%, #229954 100%); color: white; align-self: flex-start; } .auto-mining-section button:hover { background: linear-gradient(45deg, #229954 0%, #1e8449 100%); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4); animation: pulse 0.6s ease-in-out; }';
    document.head.appendChild(style);
    
    // 添加点击外部关闭功能
    panel.addEventListener('click', (e) => {
        if (e.target === panel) {
            panel.remove();
        }
    });
}